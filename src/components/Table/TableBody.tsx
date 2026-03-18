import type { ReactNode } from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import { Checkbox } from "../Input";
import type { CustomTableBodyProps } from "./Table.types";
import { useTableBody } from "./useTableBody";

const TableBodyComponent = <T,>({
  columns,
  rows,
  enableSelection = false,
  selected = [],
  onRowClick,
  onCheckboxClick,
  getRowId,
}: CustomTableBodyProps<T>) => {
  const { handleRowClick, handleCheckboxChange } = useTableBody<T>({ onRowClick, onCheckboxClick });
  const isRowSelected = (row: T) => {
    if (!getRowId) return false;
    const rowId = getRowId(row);
    return selected.includes(rowId);
  };

  return (
    <TableBody>
      {rows.map((row, index) => {
        const rowId = getRowId ? getRowId(row) : index;
        const isItemSelected = isRowSelected(row);
        const labelId = `enhanced-table-checkbox-${index}`;

        const cells = columns
          .map((column, colIndex) => {
            // Si cette colonne doit être fusionnée avec la précédente, on l'ajoute à la cellule précédente
            if (column.mergeWithPrevious) {
              // Trouver la colonne précédente qui n'est pas fusionnée
              let previousColIndex = colIndex - 1;
              while (previousColIndex >= 0 && columns[previousColIndex]?.mergeWithPrevious) {
                previousColIndex--;
              }

              // Si on trouve une colonne précédente valide, on ajoute le contenu à cette cellule
              // Sinon, on crée une cellule normale (cas limite)
              if (previousColIndex >= 0) {
                // Le contenu sera ajouté dans la cellule précédente, donc on skip cette itération
                return null;
              }
            }

            const cellValue = (row as Record<string, unknown>)[column.id];
            const isFirstColumnWithNoPadding = colIndex === 0 && column.disablePadding;

            // Utiliser la fonction render personnalisée si elle existe, sinon utiliser la valeur par défaut
            let cellContent: ReactNode;
            if (column.render) {
              cellContent = column.render(cellValue, row);
            } else if (cellValue !== undefined && cellValue !== null) {
              cellContent = String(cellValue);
            } else {
              cellContent = "";
            }

            // Collecter le contenu des colonnes fusionnées suivantes
            const mergedContent: ReactNode[] = [cellContent];
            let nextColIndex = colIndex + 1;
            while (nextColIndex < columns.length && columns[nextColIndex]?.mergeWithPrevious) {
              const mergedColumn = columns[nextColIndex];
              if (mergedColumn) {
                const mergedCellValue = (row as Record<string, unknown>)[mergedColumn.id];
                let mergedCellContent: ReactNode;
                if (mergedColumn.render) {
                  mergedCellContent = mergedColumn.render(mergedCellValue, row);
                } else if (mergedCellValue !== undefined && mergedCellValue !== null) {
                  mergedCellContent = String(mergedCellValue);
                } else {
                  mergedCellContent = "";
                }
                mergedContent.push(mergedCellContent);
              }
              nextColIndex++;
            }

            return (
              <TableCell
                key={column.id}
                component={isFirstColumnWithNoPadding ? "th" : "td"}
                id={isFirstColumnWithNoPadding ? labelId : undefined}
                scope={isFirstColumnWithNoPadding ? "row" : undefined}
                align={column.align || "left"}
                padding={column.disablePadding ? "none" : "normal"}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{mergedContent}</Box>
              </TableCell>
            );
          })
          .filter((cell) => cell !== null);

        // Ne pas créer de TableRow si aucune cellule n'est générée
        if (cells.length === 0 && !enableSelection) {
          return null;
        }

        return (
          <TableRow
            hover
            onClick={(event) => handleRowClick(event, row)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={rowId}
            selected={isItemSelected}
            sx={{ cursor: onRowClick ? "pointer" : "default" }}
          >
            {enableSelection && (
              <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onChange={(event) => handleCheckboxChange(event, row)}
                  onClick={(e) => e.stopPropagation()}
                  slotProps={{
                    input: { "aria-labelledby": labelId },
                  }}
                />
              </TableCell>
            )}
            {cells}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyComponent;
