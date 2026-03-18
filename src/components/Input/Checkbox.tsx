import Checkbox from "@mui/material/Checkbox";
import type { CheckboxProps } from "./Input.types";

const CheckboxInput = ({ ...props }: CheckboxProps) => {
  return <Checkbox {...props} />;
};

export default CheckboxInput;
