import { useState, useMemo, type MouseEvent, type ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from "@mui/material/Skeleton";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import type { Order, CustomTableProps } from "../../types/Table";
import { getComparator } from "../../utils/getComparator";

export const EnhancedTable = <T,>({
  selectedRows,
  columns,
  rows,
  enableSelection = false,
  enableSorting = true,
  enablePagination = true,
  getRowId,
  rowsPerPageOptions = [5, 10, 25, 100],
  defaultRowsPerPage = 5,
  onRowClick,
  onCheckboxClick,
  minWidth = 750,
  onSelectAll,
  isLoading = false,
  rowsPerPageLabel = "Par page :",
  labelDisplayedRows,
}: CustomTableProps<T>) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(() => {
    const firstColumnId = columns[0]?.id;
    return typeof firstColumnId === "string" ? firstColumnId : "";
  });
  const [selected, setSelected] = useState<readonly (string | number)[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleRequestSort = (_event: MouseEvent<unknown>, property: string) => {
    if (!enableSorting) return;
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => getRowId(row));
      setSelected(newSelected);
      if (onSelectAll) {
        onSelectAll(rows);
      }
      return;
    }
    setSelected([]);
    if (onSelectAll) {
      onSelectAll([]);
    }
  };

  const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>, row: T) => {
    if (!enableSelection) return;

    // Gestion de la sélection interne
    const id = getRowId(row);
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);

    // Appel du callback personnalisé si fourni
    if (onCheckboxClick) {
      onCheckboxClick(event, row);
    }
  };

  const handleClick = (event: MouseEvent<unknown>, row: T) => {
    if (onRowClick) {
      onRowClick(event, row);
    }
  };

  const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = useMemo(() => {
    if (!enableSorting || !orderBy) {
      return rows;
    }
    return [...rows].sort(getComparator(order, orderBy));
  }, [rows, order, orderBy, enableSorting]);

  const visibleRows = useMemo(() => {
    if (!enablePagination) {
      return sortedRows;
    }
    return sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedRows, page, rowsPerPage, enablePagination]);

  if (isLoading) {
    return (
      <Stack sx={{ width: "100%" }} gap={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            variant="rectangular"
            height={40}
            width="100%"
            key={index}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Stack>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth }} aria-labelledby="tableTitle" size={"medium"}>
          <TableHead
            columns={columns}
            numSelected={selectedRows?.length ?? selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={enableSelection ? handleSelectAllClick : undefined}
            onRequestSort={enableSorting ? handleRequestSort : undefined}
            rowCount={rows.length}
            enableSelection={enableSelection}
          />
          <TableBody
            columns={columns}
            rows={visibleRows}
            enableSelection={enableSelection}
            selected={selected}
            onRowClick={handleClick}
            onCheckboxClick={enableSelection ? handleCheckboxClick : undefined}
            getRowId={getRowId}
          />
        </Table>
      </TableContainer>
      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          labelRowsPerPage={rowsPerPageLabel}
          labelDisplayedRows={
            labelDisplayedRows ?? (({ from, to, count }) => `${from}-${to} sur ${count}`)
          }
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};
