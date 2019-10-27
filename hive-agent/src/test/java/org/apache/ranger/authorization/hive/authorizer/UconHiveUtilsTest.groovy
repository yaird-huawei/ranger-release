package org.apache.ranger.authorization.hive.authorizer

import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import org.apache.hadoop.hive.ql.parse.ASTNode
import org.apache.hadoop.hive.ql.parse.ParseDriver
import org.apache.hadoop.hive.ql.parse.ParseException
import org.apache.hadoop.hive.ql.security.authorization.plugin.HivePrivilegeObject
import org.junit.Before
import org.junit.Test
import org.springframework.util.CollectionUtils

import java.util.stream.Collectors

import static org.apache.hadoop.hive.ql.parse.HiveParser_SelectClauseParser.DOT
import static org.apache.hadoop.hive.ql.parse.HiveParser_SelectClauseParser.TOK_TABLE_OR_COL
import static org.apache.hadoop.hive.ql.parse.HiveParser_SelectClauseParser.TOK_TABLE_OR_COL

class UconHiveUtilsTest  {
    private static final Log LOG = LogFactory.getLog(UconHiveUtilsTest.class);

    private List<String> commandStrings;
    private ParseDriver parseDriver;

    @Before
    public void setup(){
        parseDriver = new ParseDriver();
        commandStrings = Arrays.asList(
                "select name, ssn from drivers",
                "select drivers.name, ssn from drivers",
                "select * from default.drivers",
                "select name, ssn from default.drivers",
                "select drivers.name, ssn from drivers",
                "select * from drivers",
                "SELECT ROW_NUMBER() OVER() AS rowId3 FROM drivers",
                "select field1, field2, sum(field3+field4)",
                "select drivers.field1, drivers.field2, sum(drivers.field3+drivers.field4)",
                "select count(t.ssn) from (select miles_logged, ssn from timesheet join drivers) t",
                "select count(t.ssn) from (select miles_logged, ssn from timesheet join drivers where abc= 'cart') t",
                "select count(t.ssn) from (select timesheet.miles_logged, drivers.ssn from timesheet join drivers where abc= 'cart') t",
                "select timesheet.ssn, drivers.ssn from timesheet join drivers"
        );
    }


    void testBuildRequestElementDTO() {
    }

    void testGetUconId() {
    }

    @Test
    void testGetAuthZColumns() {
    }

    void testParseRequestResources() {
    }

    void testTestParseRequestResources() {
    }

    @Test
    public void parseTest() {
        commandStrings.stream().forEach({ commandString ->
            try {
                ASTNode tree = parseDriver.parse(commandString, null);
                String dump = tree.dump();
                int columnCount = getColumnCount(tree);
                Set<String> theColumns = new HashSet<String>();
                getColumnSelectAST(tree, (HashSet<String>) theColumns);
                printIt(columnCount, dump, theColumns);

            } catch (ParseException e) {
                e.printStackTrace();
            }

        });
    }

    @Test
    public void testGetColumns(){
        HivePrivilegeObject inputHiveObjDrivers = new HivePrivilegeObject(HivePrivilegeObject.HivePrivilegeObjectType.TABLE_OR_VIEW,
                "default", "drivers", null, Arrays.asList("ssn", "name", "driverid","field1","field2","field3","field4"), null);
        HivePrivilegeObject inputHiveObjTimesheet = new HivePrivilegeObject(HivePrivilegeObject.HivePrivilegeObjectType.TABLE_OR_VIEW,
                "default", "timesheet", null, Arrays.asList("miles_logged", "ssn"), null);

        List<HivePrivilegeObject> inputHiveObjs = Arrays.asList(inputHiveObjDrivers, inputHiveObjTimesheet);


        inputHiveObjs.stream().forEach({ inputHiveObj ->

            commandStrings.stream().forEach({ commandString ->
                getAuthZColumns(commandString, inputHiveObj);


            });
        });
    }

    /**
     *
     *
     * Returns the list of columns to include in the UCON authorization request
     *
     * @param command
     * @param inputHiveObj
     * @return
     */
    public static List<String> getAuthZColumns(String command, HivePrivilegeObject inputHiveObj){
        List<String> authZCols = new ArrayList<>();
        try {
            ParseDriver parseDriver = new ParseDriver();
            ASTNode tree = parseDriver.parse(command);
            LOG.info(tree.dump());
            Set<String> columnsFound = new HashSet<String>();
            getColumnSelectAST(tree, (HashSet<String>) columnsFound);

            if(CollectionUtils.isEmpty(columnsFound)) return inputHiveObj.getColumns();

            authZCols = columnsFound.stream()
                    .map({ col ->
                        String[] split = col.split("\\.");
                        if (split.length == 2) {
                            if (split[0].equals(inputHiveObj.getObjectName())) return split[1];
                            else return null;
                        } else return col;
                    })
                    .filter({ col ->
                        return inputHiveObj.getColumns().contains(col);
                    })
                    .collect(Collectors.toList());


            LOG.info(inputHiveObj.getObjectName().toUpperCase() + " authZ columns: " + authZCols);

        } catch (ParseException e) {
            LOG.error("Error while parsing HiveQL command");
        }
        return authZCols;
    }


    private static void getColumnSelectAST(ASTNode from, Set<String> fromTables) {
        for (int i = 0; i < from.getChildCount(); i++) {
            ASTNode ch = (ASTNode) from.getChild(i);
            if (TOK_TABLE_OR_COL == ch.getToken().getType()) {
                if(DOT == ch.getParent().getType()) {
                    fromTables.add(ch.getChild(0).getText() + "." + ch.getParent().getChild(1).getText());
                }
                else fromTables.add(ch.getChild(0).getText());
            }
            else getColumnSelectAST(ch, fromTables);
        }



    }


    private int getColumnCount(ASTNode node) {
        int count = 0;
        for (int i = 0; i < node.getChildCount(); i++) {
            ASTNode child = (ASTNode) node.getChild(i);
            if (child.getToken().getType() == TOK_TABLE_OR_COL) {
                count++;
            } else {
                count += getColumnCount(child);
            }
        }
        return count;
    }

    private void printIt(int columnCount, String dump, Set<String> theColumns){
        LOG.info("");
        LOG.info("Cols: " + columnCount);
        LOG.info("dump: " + dump);
        LOG.info("Cols names: " + theColumns.toString());
    }
}
