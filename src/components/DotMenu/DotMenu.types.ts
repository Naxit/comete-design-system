import type { IconButtonProps as MuiButtonProps } from "@mui/material/IconButton";
import type { PopoverProps } from "@mui/material/Popover";

export type DotMenuProps = MuiButtonProps &
  Omit<PopoverProps, "anchorEl" | "open" | "onClose"> & {
    actions: Array<{
      id?: string | number;
      label: string;
      description?: string;
      color?: "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
      onClick: () => void;
      disabled?: boolean;
      anchorOrigin?: {
        vertical: "bottom" | "top";
        horizontal: "left" | "right";
      };
      transformOrigin?: {
        vertical: "bottom" | "top";
        horizontal: "left" | "right";
      };
    }>;
  };
