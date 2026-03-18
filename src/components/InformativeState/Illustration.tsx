import { Box } from "@mui/material";
import type { IllustrationProps } from "./Illustration.types";
/**
 * Composant d'illustration affichant une image.
 */
const Illustration = ({ imageUrl, maxWidth = 256, height, alt }: IllustrationProps) => {
  return (
    <Box
      component="img"
      src={imageUrl}
      alt={alt}
      sx={{
        maxWidth,
        height,
        display: "block",
      }}
    />
  );
};

export default Illustration;
