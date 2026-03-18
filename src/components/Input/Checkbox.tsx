import Checkbox from "@mui/material/Checkbox";
import type { CheckboxProps } from "../../types/Input";

const CheckboxInput = ({ ...props }: CheckboxProps) => {
  return <Checkbox {...props} />;
};

export default CheckboxInput;
