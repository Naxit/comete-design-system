import Typography from "@mui/material/Typography";
import type { TypographyProps } from "../../types/Text";

const TypographyComponent = ({ children, ...props }: TypographyProps) => {
  return <Typography {...props}>{children}</Typography>;
};

export default TypographyComponent;
