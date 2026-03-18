import { type FC } from "react";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { DotMenuProps } from "./DotMenu.types";
import { useDotMenu } from "./useDotMenu";

/**
 * Composant DotMenu qui affiche un bouton avec un popover contenant une liste d'actions.
 * Le popover s'adapte automatiquement à la position du bouton (aligné à gauche ou à droite).
 */
export const DotMenu: FC<DotMenuProps> = ({
  actions,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  transformOrigin = { vertical: "top", horizontal: "right" },
  ...props
}) => {
  const { anchorEl, open, handleClick, handleClose, handleActionClick } = useDotMenu();

  return (
    <>
      <IconButton
        aria-label="Menu d'actions"
        aria-haspopup="true"
        aria-expanded={open}
        size="medium"
        onClick={handleClick}
        color="default"
        sx={{
          borderRadius: "4px",
          backgroundColor: "action.hover",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
        {...props}
      >
        <MoreHorizIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              mb: anchorOrigin?.vertical === "bottom" ? 0.5 : undefined,
              minWidth: 240,
            },
          },
        }}
      >
        <MenuList>
          {actions.map((action) => (
            <MenuItem
              key={action.id}
              onClick={() => handleActionClick(action)}
              disabled={action.disabled}
            >
              <ListItemText
                primary={action.label}
                secondary={action.description}
                slotProps={{
                  primary: {
                    variant: "body2",
                    fontWeight: 500,
                    color: action.color ?? "text.primary",
                  },
                  secondary: {
                    variant: "caption",
                    color: action.disabled ? "text.disabled" : "text.secondary",
                  },
                }}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

export default DotMenu;
