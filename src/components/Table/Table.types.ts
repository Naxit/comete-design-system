import type { ReactNode, MouseEvent, ChangeEvent } from "react";
import type { TableProps as MuiTableProps } from "@mui/material/Table";
import type { TableHeadProps as MuiTableHeadProps } from "@mui/material/TableHead";
import type { ToolbarProps as MuiToolbarProps } from "@mui/material/Toolbar";
import type { TableCellProps as MuiTableCellProps } from "@mui/material/TableCell";
import type { TablePaginationProps as MuiTablePaginationProps } from "@mui/material/TablePagination";
import type { TableSortLabelProps as MuiTableSortLabelProps } from "@mui/material/TableSortLabel";

export type TableProps = MuiTableProps;
export type TableHeadProps = MuiTableHeadProps;
export type TableCellProps = MuiTableCellProps;
export type TablePaginationProps = MuiTablePaginationProps;
export type TableSortLabelProps = MuiTableSortLabelProps;
export type ToolbarConfig = MuiToolbarProps;

export type TableColumn = {
  id: string;
  label: string;
  align?: "left" | "center" | "right" | "justify" | "inherit";
  disablePadding?: boolean;
  sortable?: boolean;
  render?: (value: unknown, row: unknown) => ReactNode;
  mergeWithPrevious?: boolean; // Si true, cette colonne sera fusionnée avec la précédente
};
export type Order = "asc" | "desc";

export type CustomTableHeadProps = {
  columns: TableColumn[];
  order?: Order;
  orderBy?: string;
  onRequestSort?: (event: MouseEvent<unknown>, property: string) => void;
  numSelected?: number;
  rowCount?: number;
  onSelectAllClick?: (event: ChangeEvent<HTMLInputElement>) => void;
  enableSelection?: boolean;
};

export type CustomTableBodyProps<T> = {
  columns: TableColumn[];
  rows: T[];
  enableSelection?: boolean;
  selected?: readonly (string | number)[];
  onRowClick?: (event: MouseEvent<unknown>, row: T) => void;
  onCheckboxClick?: (event: ChangeEvent<HTMLInputElement>, row: T) => void;
  getRowId?: (row: T) => string | number;
};

export type CustomTableProps<T> = {
  selectedRows?: T[];
  columns: TableColumn[];
  rows: T[];
  enableSelection?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  getRowId: (row: T) => string | number;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onRowClick?: (event: MouseEvent<unknown>, row: T) => void;
  onCheckboxClick?: (event: ChangeEvent<HTMLInputElement>, row: T) => void;
  toolbarActions?: ReactNode;
  minWidth?: number;
  onSelectAll?: (rows: T[]) => void;
  isLoading?: boolean;
  rowsPerPageLabel?: string;
  labelDisplayedRows?: (params: { from: number; to: number; count: number }) => string;
};
