/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.ranger.authorization.hbase;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import com.google.common.net.HostAndPort;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.hbase.*;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.coprocessor.*;
import org.apache.hadoop.hbase.master.RegionPlan;
import org.apache.hadoop.hbase.net.Address;
import org.apache.hadoop.hbase.protobuf.generated.QuotaProtos.Quotas;
import org.apache.hadoop.hbase.regionserver.Region;
import org.apache.hadoop.hbase.replication.ReplicationEndpoint;
import org.apache.hadoop.hbase.shaded.protobuf.generated.AdminProtos.WALEntry;
import org.apache.hadoop.hbase.shaded.protobuf.generated.HBaseProtos.RegionInfo;
import org.apache.hadoop.hbase.shaded.protobuf.generated.SnapshotProtos.SnapshotDescription;
import org.apache.hadoop.hbase.shaded.protobuf.generated.WALProtos.WALEdit;


/**
 * This class exists only to prevent the clutter of methods that we don't intend to implement in the main co-processor class.
 * @author alal
 *
 */
public abstract class RangerAuthorizationCoprocessorBase
		implements MasterObserver, RegionServerObserver, BulkLoadObserver, RegionObserver {

	private static final Log LOG = LogFactory.getLog(RangerAuthorizationCoprocessorBase.class.getName());

	@Override
	public void preMergeCommit(
			ObserverContext<RegionServerCoprocessorEnvironment> ctx,
			Region regionA, Region regionB, List<Mutation> metaEntries)
			throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postMergeCommit(
			ObserverContext<RegionServerCoprocessorEnvironment> ctx,
			Region regionA, Region regionB, Region mergedRegion)
			throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preRollBackMerge(
			ObserverContext<RegionServerCoprocessorEnvironment> ctx,
			Region regionA, Region regionB) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postRollBackMerge(
			ObserverContext<RegionServerCoprocessorEnvironment> ctx,
			Region regionA, Region regionB) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preCreateTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableDescriptor desc, HRegionInfo[] regions) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedCreateTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableDescriptor desc, HRegionInfo[] regions) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preDeleteTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedDeleteTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			org.apache.hadoop.hbase.TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preModifyTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, TableDescriptor htd) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedModifyTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, TableDescriptor htd) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preAddColumnFamilyAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, ColumnFamilyDescriptor column) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedAddColumnFamilyAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, ColumnFamilyDescriptor column) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preModifyColumnFamilyAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, ColumnFamilyDescriptor descriptor)
			throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedModifyColumnFamilyAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, ColumnFamilyDescriptor descriptor)
			throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preDeleteColumnFamilyAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, byte[] c) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedDeleteColumnFamilyAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName, byte[] c) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preEnableTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedEnableTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preDisableTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCompletedDisableTableAction(
			ObserverContext<MasterCoprocessorEnvironment> ctx,
			TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void preMasterInitialization(
			ObserverContext<MasterCoprocessorEnvironment> ctx)
			throws IOException {
		// Not applicable.  Expected to be empty
	}

	public void preRollWALWriterRequest(ObserverContext<RegionServerCoprocessorEnvironment> ctx) throws IOException {
		// Not applicable.  Expected to be empty
	}

	public void postRollWALWriterRequest(ObserverContext<RegionServerCoprocessorEnvironment> ctx) throws IOException {
		// Not applicable.  Expected to be empty
	}

    public void preReplicateLogEntries(final ObserverContext<RegionServerCoprocessorEnvironment> ctx, List<WALEntry> entries, CellScanner cells) throws IOException {
    }

    public void postReplicateLogEntries(final ObserverContext<RegionServerCoprocessorEnvironment> ctx, List<WALEntry> entries, CellScanner cells) throws IOException {
    }

	/*@Override
	public void preGetTableDescriptors(ObserverContext<MasterCoprocessorEnvironment> ctx, List<TableName> tableNamesList,  List<TableDescriptor> descriptors) throws IOException {
		if (LOG.isDebugEnabled()) {
			LOG.debug(String.format("==> postGetTableDescriptors(count(tableNamesList)=%s, count(descriptors)=%s)", tableNamesList == null ? 0 : tableNamesList.size(),
					descriptors == null ? 0 : descriptors.size()));
		}

	}*/
	
	@Override
	public void preGetTableDescriptors(ObserverContext<MasterCoprocessorEnvironment> ctx, List<TableName> tableNamesList, List<TableDescriptor> descriptors, String regex) throws IOException {
		if (LOG.isDebugEnabled()) {
			LOG.debug(String.format("==> postGetTableDescriptors(count(tableNamesList)=%s, count(descriptors)=%s, regex=%s)", tableNamesList == null ? 0 : tableNamesList.size(),
					descriptors == null ? 0 : descriptors.size(), regex));
		}
	}

    public  void preGetTableNames(ObserverContext<MasterCoprocessorEnvironment> ctx, List<TableDescriptor> descriptors, String regex) throws IOException {
    }

    public  void postGetTableNames(ObserverContext<MasterCoprocessorEnvironment> ctx, List<TableDescriptor> descriptors, String regex) throws IOException {
    }

    public void preGetNamespaceDescriptor(ObserverContext<MasterCoprocessorEnvironment> ctx, String namespace) throws IOException {
    }

    public void postGetNamespaceDescriptor(ObserverContext<MasterCoprocessorEnvironment> ctx, NamespaceDescriptor ns) throws IOException {
    }

    public void preListNamespaceDescriptors(ObserverContext<MasterCoprocessorEnvironment> ctx, List<NamespaceDescriptor> descriptors) throws IOException {
    }

    public void postListNamespaceDescriptors(ObserverContext<MasterCoprocessorEnvironment> ctx, List<NamespaceDescriptor> descriptors) throws IOException {
    }
	
	public void preTableFlush(final ObserverContext<MasterCoprocessorEnvironment> ctx, final TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	public void postTableFlush(ObserverContext<MasterCoprocessorEnvironment> ctx, TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	public void preTruncateTableHandler(final ObserverContext<MasterCoprocessorEnvironment> ctx, TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	public void postTruncateTableHandler(final ObserverContext<MasterCoprocessorEnvironment> ctx, TableName tableName) throws IOException {
			// Not applicable.  Expected to be empty
	}

	public void preTruncateTable(final ObserverContext<MasterCoprocessorEnvironment> ctx, TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	public void postTruncateTable(final ObserverContext<MasterCoprocessorEnvironment> ctx, TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}

	public ReplicationEndpoint postCreateReplicationEndPoint(ObserverContext<RegionServerCoprocessorEnvironment> ctx, ReplicationEndpoint endpoint) {
		return endpoint;
	}

	@Override
	public void stop(CoprocessorEnvironment env) {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postAddColumnFamily(ObserverContext<MasterCoprocessorEnvironment> c, TableName tableName, ColumnFamilyDescriptor column) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postAssign(ObserverContext<MasterCoprocessorEnvironment> c, HRegionInfo regionInfo) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postBalance(ObserverContext<MasterCoprocessorEnvironment> c,List<RegionPlan> aRegPlanList) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postBalanceSwitch(ObserverContext<MasterCoprocessorEnvironment> c, boolean oldValue, boolean newValue) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postCloneSnapshot(ObserverContext<MasterCoprocessorEnvironment> ctx, SnapshotDescription snapshot, TableDescriptor hTableDescriptor) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postCreateTable(ObserverContext<MasterCoprocessorEnvironment> ctx, TableDescriptor desc, HRegionInfo[] regions) throws IOException {
		// Not applicable.  Expected to be empty
	}
	/*@Override
	public void postDelete(ObserverContext<RegionCoprocessorEnvironment> c, Delete delete, WALEdit edit, Durability durability) throws IOException {
		// Not applicable.  Expected to be empty
	}*/
	@Override
	public void postDeleteColumnFamily(ObserverContext<MasterCoprocessorEnvironment> c, TableName tableName, byte[] col) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postDeleteSnapshot(ObserverContext<MasterCoprocessorEnvironment> ctx, SnapshotDescription snapshot) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postDeleteTable(ObserverContext<MasterCoprocessorEnvironment> c, TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postDisableTable(ObserverContext<MasterCoprocessorEnvironment> c, TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postEnableTable(ObserverContext<MasterCoprocessorEnvironment> c, TableName tableName) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postModifyColumnFamily(ObserverContext<MasterCoprocessorEnvironment> c, TableName tableName, ColumnFamilyDescriptor descriptor) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postModifyTable(ObserverContext<MasterCoprocessorEnvironment> c, TableName tableName, TableDescriptor htd) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postMove(ObserverContext<MasterCoprocessorEnvironment> c, HRegionInfo region, ServerName srcServer, ServerName destServer) throws IOException {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postOpen(ObserverContext<RegionCoprocessorEnvironment> ctx) {
		// Not applicable.  Expected to be empty
	}
	@Override
	public void postRestoreSnapshot(ObserverContext<MasterCoprocessorEnvironment> ctx, SnapshotDescription snapshot, TableDescriptor hTableDescriptor) throws IOException {
		// Not applicable.  Expected to be empty
	}

	/*@Override
	public void postPut(ObserverContext<RegionCoprocessorEnvironment> c, Put put, WALEdit edit, Durability durability) {
		// Not applicable.  Expected to be empty
	}*/
	
	@Override
	public void postGetOp(final ObserverContext<RegionCoprocessorEnvironment> env, final Get get, final List<Cell> results) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postRegionOffline(ObserverContext<MasterCoprocessorEnvironment> c, HRegionInfo regionInfo) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postCreateNamespace(ObserverContext<MasterCoprocessorEnvironment> ctx, NamespaceDescriptor ns) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postDeleteNamespace(ObserverContext<MasterCoprocessorEnvironment> ctx, String namespace) throws IOException {
		// Not applicable.  Expected to be empty
	}
	
	@Override
	public void postModifyNamespace(ObserverContext<MasterCoprocessorEnvironment> ctx, NamespaceDescriptor ns) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postGetTableDescriptors(ObserverContext<MasterCoprocessorEnvironment> ctx, List<TableName> tableName, List<TableDescriptor> descriptors, String regex) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postMerge(ObserverContext<RegionServerCoprocessorEnvironment> c, Region regionA, Region regionB, Region mergedRegion) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postSnapshot(ObserverContext<MasterCoprocessorEnvironment> ctx, SnapshotDescription snapshot, TableDescriptor hTableDescriptor) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postUnassign(ObserverContext<MasterCoprocessorEnvironment> c, HRegionInfo regionInfo, boolean force) throws IOException {
		// Not applicable.  Expected to be empty
	}

	//TODO - add @Override directive when hbase changes to MasterObserver go mainstream
	public void postListSnapshot( ObserverContext<MasterCoprocessorEnvironment> ctx, SnapshotDescription snapshot) throws IOException {
		// Not applicable.  Expected to be empty
	}

	//TODO - add @Override directive when hbase changes to MasterObserver go mainstream
	public void preListSnapshot( ObserverContext<MasterCoprocessorEnvironment> ctx, SnapshotDescription snapshot) throws IOException {
		// Not applicable.  Expected to be empty
	}

	@Override
	public void postAbortProcedure(ObserverContext<MasterCoprocessorEnvironment> observerContext) throws IOException {

	}

	@Override
	public void preGetProcedures(ObserverContext<MasterCoprocessorEnvironment> observerContext) throws IOException {

	}

	public void preSetUserQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String userName, final Quotas quotas) throws IOException {
  }

  public void postSetUserQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String userName, final Quotas quotas) throws IOException {
  }

  public void preSetUserQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String userName, final TableName tableName, final Quotas quotas) throws IOException {
  }

  public void postSetUserQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String userName, final TableName tableName, final Quotas quotas) throws IOException {
  }

  public void preSetUserQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String userName, final String namespace, final Quotas quotas) throws IOException {
  }

  public void postSetUserQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String userName, final String namespace, final Quotas quotas) throws IOException {
  }

  public void preSetTableQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final TableName tableName, final Quotas quotas) throws IOException {
  }

  public void postSetTableQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final TableName tableName, final Quotas quotas) throws IOException {
  }

  public void preSetNamespaceQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String namespace, final Quotas quotas) throws IOException {
  }

  public void postSetNamespaceQuota(final ObserverContext<MasterCoprocessorEnvironment> ctx,
      final String namespace, final Quotas quotas) throws IOException{
  }

  // TODO : need override annotations for all of the following methods

    public void preMoveServers(final ObserverContext<MasterCoprocessorEnvironment> ctx, Set<Address> servers, String targetGroup) throws IOException {}
    public void postMoveServers(ObserverContext<MasterCoprocessorEnvironment> ctx, Set<Address> servers, String targetGroup) throws IOException {}
    public void preMoveTables(final ObserverContext<MasterCoprocessorEnvironment> ctx, Set<TableName> tables, String targetGroup) throws IOException {}
    public void postMoveTables(final ObserverContext<MasterCoprocessorEnvironment> ctx, Set<TableName> tables, String targetGroup) throws IOException {}
    public void preRemoveRSGroup(final ObserverContext<MasterCoprocessorEnvironment> ctx, String name) throws IOException {}
    public void postRemoveRSGroup(final ObserverContext<MasterCoprocessorEnvironment> ctx, String name) throws IOException {}
    public void preBalanceRSGroup(final ObserverContext<MasterCoprocessorEnvironment> ctx, String groupName) throws IOException {}
    public void postBalanceRSGroup(final ObserverContext<MasterCoprocessorEnvironment> ctx, String groupName, boolean balancerRan) throws IOException {}
    public void preAddRSGroup(ObserverContext<MasterCoprocessorEnvironment> ctx, String name) throws IOException {}
    public void postAddRSGroup(ObserverContext<MasterCoprocessorEnvironment> ctx, String name) throws IOException {}
}
