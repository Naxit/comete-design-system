import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ButtonGroup } from "../Button";
import Illustration from "./Illustration";
import type { InformativeStateProps } from "./Illustration.types";

/**
 * Composant Illustration avec titre et sous-titre
 * @param imageUrl - URL de l'illustration
 * @param title - Titre de l'illustration
 * @param subtitle - Sous-titre de l'illustration
 * @param children - Enfant de l'illustration
 * @returns Composant Illustration avec titre et sous-titre
 */

const InformativeState = ({
  imageUrl,
  title,
  subtitle,
  children,
  maxWidth,
  height,
}: InformativeStateProps) => {
  return (
    <Stack spacing={3} justifyContent="center" alignItems="center" sx={{ p: 6 }}>
      <Illustration imageUrl={imageUrl} maxWidth={maxWidth} height={height} />
      <Stack spacing={1} alignItems="center">
        <Typography variant="h5" fontWeight={600} sx={{ textAlign: "center" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {children && <ButtonGroup sx={{ justifyContent: "center" }}>{children}</ButtonGroup>}
    </Stack>
  );
};

export default InformativeState;
