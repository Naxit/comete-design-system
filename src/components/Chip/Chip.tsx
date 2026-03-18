import Chip from "@mui/material/Chip";
import type { ChipProps } from "../../types/Chip";

const ChipComponent = ({ size = "small", children, ...props }: ChipProps) => {
  return (
    <Chip size={size} {...props}>
      {children}
    </Chip>
  );
};

export default ChipComponent;
