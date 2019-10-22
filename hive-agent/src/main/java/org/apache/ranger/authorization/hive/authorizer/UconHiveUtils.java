package org.apache.ranger.authorization.hive.authorizer;

import com.huawei.policy.core.dto.XacmlAttributeCategory;
import com.huawei.policy.core.dto.XacmlAttributeIdentifier;
import com.huawei.policy.core.dto.XacmlDataType;
import com.huawei.policy.core.dto.ucon.AttributeElementDTO;
import com.huawei.policy.core.dto.ucon.AttributeValueElementDTO;
import com.huawei.policy.core.dto.ucon.AttributesElementDTO;
import com.huawei.policy.core.dto.ucon.RequestElementDTO;
import com.huawei.policy.core.pep.PEPUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.hive.ql.parse.ASTNode;
import org.apache.hadoop.hive.ql.parse.ParseDriver;
import org.apache.hadoop.hive.ql.parse.ParseException;
import org.apache.hadoop.hive.ql.security.authorization.plugin.HivePrivilegeObject;
import org.apache.hadoop.hive.ql.session.SessionState;
import org.apache.ranger.authorization.utils.StringUtil;
import org.apache.ranger.plugin.policyengine.RangerAccessResource;

import java.util.*;
import java.util.stream.Collectors;

import static org.apache.hadoop.hive.ql.parse.HiveParser_SelectClauseParser.DOT;
import static org.apache.hadoop.hive.ql.parse.HiveParser_SelectClauseParser.TOK_TABLE_OR_COL;


public class UconHiveUtils {
    private static final Log LOG = LogFactory.getLog(RangerHiveAuthorizer.class);

    private static final String  RANGER_PLUGIN_HIVE_UCON_VARIABLE = "uconId";


    /**
     *  Build RequestElementDTO
     *
     * @param uconId
     * @param action
     * @param resources
     * @param environments
     * @return
     */
    protected static RequestElementDTO buildRequestElementDTO(String uconId, String action, List<String> resources, List<String> environments){
        RequestElementDTO requestElementDTO = new RequestElementDTO();
        AttributesElementDTO attributesElementDTO = null;
        requestElementDTO.setReturnPolicyIdList(true);

        attributesElementDTO = PEPUtils.buildAttributesElementDTO(uconId, XacmlDataType.STRING, XacmlAttributeIdentifier.SUBJECT_ID, XacmlAttributeCategory.ACCESS_SUBJECT, true);
        requestElementDTO.getAttributesElementDTOs().add(attributesElementDTO);

        attributesElementDTO = PEPUtils.buildAttributesElementDTO(action, XacmlDataType.STRING, XacmlAttributeIdentifier.ACTION_ID, XacmlAttributeCategory.ACTION, true);
        requestElementDTO.getAttributesElementDTOs().add(attributesElementDTO);

        if(!CollectionUtils.isEmpty(resources)) {
            List<AttributeValueElementDTO> actionAttributeValueElementDTOS = new ArrayList<>();
            for(String resource : resources){
                AttributeValueElementDTO actionAttributeValueElementDTO = PEPUtils.buildAttributeValueElementDTO(resource, XacmlDataType.STRING);
                actionAttributeValueElementDTOS.add(actionAttributeValueElementDTO);
            }
            AttributeElementDTO actionAttributeElementDTO = PEPUtils.buildAttributeElement(actionAttributeValueElementDTOS, XacmlAttributeIdentifier.RESOURCE_ID, true);
            AttributesElementDTO actionAttributesElementDTO = PEPUtils.buildAttributesElementDTO(actionAttributeElementDTO, XacmlAttributeCategory.RESOURCE);
            requestElementDTO.getAttributesElementDTOs().add(actionAttributesElementDTO);
        }

        if(!CollectionUtils.isEmpty(environments)) {
            List<AttributeValueElementDTO> envAttributeValueElementDTOS = new ArrayList<>();
            for(String environment : environments){
                AttributeValueElementDTO attributeValueElementDTO = PEPUtils.buildAttributeValueElementDTO(environment, XacmlDataType.STRING);
                envAttributeValueElementDTOS.add(attributeValueElementDTO);
            }
            AttributeElementDTO envAttributeElementDTO = PEPUtils.buildAttributeElement(envAttributeValueElementDTOS, XacmlAttributeIdentifier.ENVIRONMENT_ID, true);
            AttributesElementDTO envAttributesElementDTO = PEPUtils.buildAttributesElementDTO(envAttributeElementDTO, XacmlAttributeCategory.RESOURCE);
            requestElementDTO.getAttributesElementDTOs().add(envAttributesElementDTO);
        }

        return requestElementDTO;
    }


    public static String getUconId(){
        SessionState sessionState = SessionState.get();
        Optional<String> first = sessionState.getHiveVariables().entrySet().stream()
                .filter(entry -> entry.getKey().equals(RANGER_PLUGIN_HIVE_UCON_VARIABLE))
                .map(entry -> entry.getValue()).findFirst();

        if(first.isPresent()) return first.get();
        return null;
    }


    /**
     *
     * Returns the list of columns to include in the UCON authorization request
     *
     * @param command
     * @param inputHiveObj
     * @return
     */
    protected static List<String> getAuthZColumns(String command, HivePrivilegeObject inputHiveObj){
        List<String> authZCols = new ArrayList<>();
        try {
            ParseDriver parseDriver = new ParseDriver();
            ASTNode tree = parseDriver.parse(command);
            LOG.info(tree.dump());
            Set<String> columnsFound = new HashSet<String>();
            getColumnSelectAST(tree, (HashSet<String>) columnsFound);

            if(CollectionUtils.isEmpty(columnsFound)) return inputHiveObj.getColumns();

            authZCols = columnsFound.stream()
                    .map(col -> {
                        String[] split = col.split("\\.");
                        if (split.length == 2) {
                            if (split[0].equals(inputHiveObj.getObjectName())) return split[1];
                            else return null;
                        } else return col;
                    })
                    .filter(col -> {
                        return inputHiveObj.getColumns().contains(col);
                    })
                    .collect(Collectors.toList());


            LOG.debug(inputHiveObj.getObjectName().toUpperCase() + " authZ columns: " + authZCols);

        } catch (ParseException e) {
            LOG.error("Error while parsing HiveQL command");
        }
        return authZCols;
    }


    private static void getColumnSelectAST(ASTNode from, Set<String> fromTables) {
        for (int i = 0; i < from.getChildCount(); i++) {
            ASTNode ch = (ASTNode) from.getChild(i);
            if (1061 == ch.getToken().getType()) { //TOK_TABLE_OR_COL
                if(DOT == ch.getParent().getType()) {
                    fromTables.add(ch.getChild(0).getText() + "." + ch.getParent().getChild(1).getText());
                }
                else fromTables.add(ch.getChild(0).getText());
            }
            else getColumnSelectAST(ch, fromTables);
        }
    }

    protected static List<String> parseRequestResources(String database, String table, List<String> authZColumns){
        List<String> resources = new ArrayList<>();

        if(StringUtil.isEmpty(database) || StringUtil.isEmpty(table) || CollectionUtils.isEmpty(authZColumns)) return resources;

        StringBuilder stringBuilder = new StringBuilder();

        String databaseTable = stringBuilder.append("/").append(database).append("/").append(table).append("/").toString();

        authZColumns.stream().forEach(authZColumn -> resources.add(databaseTable + authZColumn));

        return resources;
    }

    protected static List<String> parseRequestResources(RangerAccessResource resource){
        List<String> parsed = new ArrayList<>();
        String str = resource.getAsString();
        if(resource == null || str == null) return parsed;

        String split[] = str.split("/");

        if(split.length != 3) return parsed;

        String database = split[0];
        String table = split[1];
        String columns = split[2];

        for(String col : columns.split(",")){
            parsed.add("/" + database + "/" + table + "/" + col);
        }

        return parsed;
    }

}
