import React from "react";
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-bootstrap4";

type Props = {
  rows: Array<any>;
  columns: Array<any>;
};

export const TableView = (props: Props) => {
  return (
    <Grid rows={props.rows} columns={props.columns}>
      <PagingState defaultCurrentPage={0} pageSize={10} />
      <SortingState defaultSorting={[]} />
      <IntegratedSorting />
      <IntegratedPaging />
      <Table />
      <TableHeaderRow showSortingControls />
      <PagingPanel />
    </Grid>
  );
};
