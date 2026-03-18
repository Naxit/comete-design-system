import { useState } from "react";
import type * as React from "react";
import type { DotMenuProps } from "./DotMenu.types";

/**
 * Hook personnalisé pour gérer l'état et les interactions du composant DotMenu
 * @returns {Object} Un objet contenant l'état du popover et les handlers
 */
export const useDotMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: DotMenuProps["actions"][number]) => {
    if (action.onClick) {
      action.onClick();
    }
    handleClose();
  };

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleActionClick,
  };
};
