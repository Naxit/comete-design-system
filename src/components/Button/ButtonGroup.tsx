import ButtonGroup from "@mui/material/ButtonGroup";
import type { ButtonGroupProps } from "../../types/Button";

/**
 * Composant ButtonGroup
 * @param children - Enfants du composant
 * @param sx - Styles du composant
 * @returns Composant ButtonGroup
 */
// TODO CW-21558: Utiliser ButtonGroup de MUI
const ButtonGroupComponent = ({ children, sx = {} }: ButtonGroupProps) => {
  return <ButtonGroup sx={sx}>{children}</ButtonGroup>;
};

export default ButtonGroupComponent;
