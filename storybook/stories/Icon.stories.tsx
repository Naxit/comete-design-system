import { Icon } from "@naxit/comete-design-system";
import type { IconComponentProps } from "@naxit/comete-design-system";
import * as Icons from "@naxit/comete-icons";
import type { IconColor, IconName, IconProps, IconVariant } from "@naxit/comete-icons";
import { iconRegistry } from "@naxit/comete-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ComponentType, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

// ----------------------------------------------------------------------
// Build icon name list from the registry (always in sync with the package)

const ICON_NAMES: IconName[] = Object.keys(iconRegistry).sort() as IconName[];

// ----------------------------------------------------------------------
// Figma design URLs

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";

/** Builds a Figma URL with a specific node ID for the addon-designs panel */
const figmaUrl = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// ----------------------------------------------------------------------

const VARIANTS: IconVariant[] = ["outlined", "filled", "duotone"];

const COLORS: IconColor[] = [
  "default",
  "subtle",
  "subtlest",
  "disabled",
  "inverted",
  "brand",
  "selected",
  "information",
  "success",
  "warning",
  "on-warning",
  "critical",
  "accent",
  "day",
  "night",
];

// ----------------------------------------------------------------------

const meta: Meta<IconComponentProps> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: ICON_NAMES,
      description: "Name of the icon to render",
    },
    variant: {
      control: "select",
      options: VARIANTS,
    },
    color: {
      control: "select",
      options: COLORS,
    },
    size: {
      control: { type: "number", min: 12, max: 64, step: 4 },
    },
    spacing: {
      control: "select",
      options: ["default", "none"],
    },
    label: {
      control: "text",
      description: "Accessible label (makes the icon non-decorative)",
    },
  },
  args: {
    icon: "AddBox",
    variant: "outlined",
    color: "default",
    size: 24,
    spacing: "default",
  },
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("5133-3041"),
    },
  },
};

export default meta;
type Story = StoryObj<IconComponentProps>;

// ----------------------------------------------------------------------

export const Default: Story = {};

export const Filled: Story = {
  args: { icon: "AddBox", variant: "filled" },
};

export const Duotone: Story = {
  args: { icon: "AddBox", variant: "duotone" },
};

export const Size16: Story = {
  args: { icon: "AddBox", size: 16, spacing: "none" },
};

export const Size48: Story = {
  args: { icon: "AddBox", size: 48 },
};

export const WithLabel: Story = {
  args: { icon: "AddBox", label: "Erreur" },
};

// ----------------------------------------------------------------------
// Showcase : all colors for a single icon

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {COLORS.map((c) => (
        <div
          key={c}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: c === "inverted" ? "8px" : undefined,
            background: c === "inverted" ? "var(--background-brand-bold-default, #22427c)" : undefined,
            borderRadius: c === "inverted" ? 8 : undefined,
          }}
        >
          <Icon {...args} color={c} icon="AddBox" />
          <span
            style={{
              fontSize: 10,
              color:  c === "inverted" ? "var(--text-inverted, #fff)" : "var(--text-secondary, #888)",
            }}
          >
            {c}
          </span>
        </div>
      ))}
    </div>
  ),
};

// Showcase : all variants for a single icon

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {VARIANTS.map((v) => (
        <div
          key={v}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Icon {...args} variant={v} icon="AddBox" />
          <span
            style={{
              fontSize: 10,
              color: "var(--text-secondary, #888)",
            }}
          >
            {v}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ----------------------------------------------------------------------
// Icon Explorer — parcourir et copier toutes les icônes

type IconComponent = ComponentType<IconProps>;

const ICON_ENTRIES: Array<[string, IconComponent]> = (
  Object.entries(Icons as Record<string, unknown>)
).filter(
  (entry): entry is [string, IconComponent] =>
    typeof entry[1] === "function" && /^[A-Z]/.test(entry[0])
);

interface IconCardProps {
  name: string;
  Component: IconComponent;
  variant: IconVariant;
  color: IconColor;
  size: number;
  isCopied: boolean;
  onCopy: (name: string) => void;
}

function IconCard({
  name,
  Component,
  variant,
  color,
  size,
  isCopied,
  onCopy,
}: IconCardProps): ReactElement {
  return (
    <button
      onClick={() => {
        onCopy(name);
      }}
      title={`Copier "${name}"`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "12px 4px 8px",
        border: `1.5px solid ${isCopied ? "var(--border-focus, #4a90e2)" : "transparent"}`,
        borderRadius: 8,
        background: isCopied
          ? "var(--background-selected-subtlest-default, rgba(74,144,226,0.08))"
          : "transparent",
        cursor: "pointer",
        width: "100%",
        transition: "background 0.1s, border-color 0.1s",
      }}
    >
      <Component variant={variant} color={color} spacing="none" size={size} />
      <span
        style={{
          fontSize: 10,
          color: isCopied
            ? "var(--text-selected, #4a90e2)"
            : "var(--text-secondary, #888)",
          textAlign: "center",
          lineHeight: 1.2,
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {isCopied ? "✓ copié" : name}
      </span>
    </button>
  );
}

function IconExplorer(): ReactElement {
  const [search, setSearch] = useState("");
  const [variant, setVariant] = useState<IconVariant>("outlined");
  const [color, setColor] = useState<IconColor>("default");
  const [size, setSize] = useState(24);
  const [copied, setCopied] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  const filtered = ICON_ENTRIES.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  function handleCopy(name: string): void {
    void navigator.clipboard.writeText(name);
    setCopied(name);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setCopied(null);
    }, 1500);
  }

  const label: CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 4,
    color: "var(--text-secondary, #888)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const control: CSSProperties = {
    padding: "5px 10px",
    border: "1px solid var(--border-default, #ddd)",
    borderRadius: 6,
    background: "var(--background-default, #fff)",
    color: "var(--text-primary, #111)",
    fontSize: 13,
  };

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "var(--font-family-primary, system-ui, sans-serif)",
        minHeight: "100vh",
      }}
    >
      {/* Barre d'outils */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-end",
          flexWrap: "wrap",
          marginBottom: 20,
          padding: 16,
          background: "var(--background-neutral-subtler-default, #f7f7f7)",
          borderRadius: 12,
          border: "1px solid var(--border-default, #eee)",
        }}
      >
        {/* Recherche */}
        <div style={{ flex: "1 1 220px", minWidth: 160 }}>
          <div style={label}>Recherche</div>
          <input
            type="search"
            placeholder="Filtrer par nom…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{ ...control, width: "100%", boxSizing: "border-box" }}
          />
        </div>

        {/* Variant */}
        <div>
          <div style={label}>Variant</div>
          <div style={{ display: "flex", gap: 4 }}>
            {VARIANTS.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setVariant(v);
                }}
                style={{
                  ...control,
                  background:
                    variant === v
                      ? "var(--background-selected-subtlest-default, rgba(74,144,226,0.1))"
                      : "var(--background-default, #fff)",
                  borderColor:
                    variant === v
                      ? "var(--border-focus, #4a90e2)"
                      : "var(--border-default, #ddd)",
                  color:
                    variant === v
                      ? "var(--text-selected, #4a90e2)"
                      : "var(--text-primary, #111)",
                  fontWeight: variant === v ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Couleur */}
        <div>
          <div style={label}>Couleur</div>
          <select
            value={color}
            onChange={(e) => {
              setColor(e.target.value as IconColor);
            }}
            style={{ ...control, cursor: "pointer" }}
          >
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Taille */}
        <div>
          <div style={label}>Taille — {size}px</div>
          <input
            type="range"
            min={12}
            max={48}
            step={4}
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
            }}
            style={{ width: 100, cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Compteur */}
      <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--text-secondary, #888)" }}>
        <strong style={{ color: "var(--text-primary, #111)" }}>{filtered.length}</strong>
        {" / "}
        {ICON_ENTRIES.length} icônes
        {search !== "" && ` — "${search}"`}
        {" · cliquer pour copier le nom"}
      </p>

      {/* Grille */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", padding: 48, color: "var(--text-secondary, #888)" }}>
          Aucune icône pour &ldquo;{search}&rdquo;
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
            gap: 4,
          }}
        >
          {filtered.map(([name, Component]) => (
            <IconCard
              key={name}
              name={name}
              Component={Component}
              variant={variant}
              color={color}
              size={size}
              isCopied={copied === name}
              onCopy={handleCopy}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const Explorer: Story = {
  name: "Icon Explorer",
  parameters: { layout: "fullscreen" },
  render: () => <IconExplorer />,
};
