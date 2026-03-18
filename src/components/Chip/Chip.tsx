import Chip from "@mui/material/Chip";
import type { ChipProps } from "./Chip.types";

const ChipComponent = ({ size = "small", children, ...props }: ChipProps) => {
  return (
    <Chip size={size} {...props}>
      {children}
    </Chip>
  );
};

export default ChipComponent;
