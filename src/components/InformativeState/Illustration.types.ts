import type { HTMLAttributes, ReactNode } from "react";

export type IllustrationProps = HTMLAttributes<HTMLImageElement> & {
  imageUrl: string;
  maxWidth?: string | number;
  height?: string | number;
  alt?: string;
};

export type InformativeStateProps = IllustrationProps & {
  title?: string | null;
  subtitle?: string | null;
  children?: ReactNode | null;
};
