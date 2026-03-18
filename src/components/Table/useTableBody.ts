import type { CustomTableBodyProps } from "./Table.types";
import { type MouseEvent, type ChangeEvent } from "react";

/**
 * Hook personnalisé pour gérer les interactions du composant TableBody
 * @returns {Object} Un objet contenant les handlers
 */
export const useTableBody = <T>({
  onRowClick,
  onCheckboxClick,
}: Pick<CustomTableBodyProps<T>, "onRowClick" | "onCheckboxClick">) => {
  const handleRowClick = (event: MouseEvent<unknown>, row: T) => {
    if (onRowClick) {
      onRowClick(event, row);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, row: T) => {
    event.stopPropagation();
    if (onCheckboxClick) {
      onCheckboxClick(event, row);
    }
  };

  return {
    handleRowClick,
    handleCheckboxChange,
  };
};
