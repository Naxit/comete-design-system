import { default as MuiModal } from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import type { ModalProps } from "../../types/Modal";

const StyledModalBox = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== "fullWidth" && 
    prop !== "disablePadding" && 
    prop !== "maxWidth",
})<{
  fullWidth: boolean;
  disablePadding: boolean;
  maxWidth: number;
}>(({ theme, fullWidth, disablePadding, maxWidth }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: fullWidth ? "90%" : "auto",
  maxWidth: maxWidth,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: disablePadding ? 0 : theme.spacing(4),
  outline: "none",
  overflow: "hidden",
}));

/**
 * Modal component based on MUI Modal.
 * A flexible modal dialog that can contain any content.
 */
export const Modal = ({
  open,
  onClose,
  children,
  maxWidth = "sm",
  fullWidth = false,
  disablePadding = false,
  ...props
}: ModalProps) => {
  const getMaxWidth = () => {
    const widths = {
      xs: 320,
      sm: 400,
      md: 600,
      lg: 752,
      xl: 968,
    };
    return widths[maxWidth];
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-content"
      {...props}
    >
      <StyledModalBox
        fullWidth={fullWidth}
        disablePadding={disablePadding}
        maxWidth={getMaxWidth()}
      >
        {children}
      </StyledModalBox>
    </MuiModal>
  );
};

Modal.displayName = "Modal";
