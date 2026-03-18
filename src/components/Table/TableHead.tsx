import type { MouseEvent } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { Checkbox } from "../Input";
import type { CustomTableHeadProps } from "../../types/Table";
import Typography from "../Text/Typography";

const TableHeadComponent = ({
  columns,
  order = "asc",
  orderBy,
  onRequestSort,
  numSelected = 0,
  rowCount = 0,
  onSelectAllClick,
  enableSelection = false,
}: CustomTableHeadProps) => {
  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    if (onRequestSort) {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {enableSelection && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {columns.map((column) => {
          // Masquer les colonnes fusionnées dans l'en-tête
          if (column.mergeWithPrevious) {
            return null;
          }

          const isSortable = column.sortable !== false && onRequestSort !== undefined;
          const isActive = orderBy === column.id;

          return (
            <TableCell
              key={column.id}
              align={column.align || "left"}
              padding={column.disablePadding ? "none" : "normal"}
              sortDirection={isActive ? order : false}
            >
              {isSortable ? (
                <TableSortLabel
                  active={isActive}
                  direction={isActive ? order : "asc"}
                  onClick={createSortHandler(column.id)}
                >
                  <Typography variant="caption">{column.label}</Typography>
                  {isActive ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                column.label
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
