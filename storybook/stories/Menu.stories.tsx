// Menu — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menu,
  MenuItem,
  MenuSection,
} from "@naxit/comete-design-system/components";

// -----------------------------------------------------------------------
// Figma

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Types pour les args du composant Menu

interface MenuStoryArgs {
  menus: 1 | 2 | 3;
  hasSeparator: boolean;
  title: string;
}

// -----------------------------------------------------------------------
// Helper — génère une section avec 3 items

function SampleSection({
  sectionTitle,
  hasSeparator = true,
  offset = 0,
}: {
  sectionTitle: string;
  hasSeparator?: boolean;
  offset?: number;
}) {
  return (
    <MenuSection title={sectionTitle} hasSeparator={hasSeparator}>
      <MenuItem
        id={`item-${offset + 1}`}
        iconBefore="Star"
        iconAfter="ChevronRight"
        description="Description"
      >
        Option
      </MenuItem>
      <MenuItem
        id={`item-${offset + 2}`}
        iconBefore="Star"
        iconAfter="ChevronRight"
        description="Description"
      >
        Option
      </MenuItem>
      <MenuItem
        id={`item-${offset + 3}`}
        iconBefore="Star"
        iconAfter="ChevronRight"
        description="Description"
      >
        Option
      </MenuItem>
    </MenuSection>
  );
}

// -----------------------------------------------------------------------
// Meta — Composant Menu

const meta = {
  title: "Components/Menu",
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: figmaUrl("4711:14452"),
    },
  },
  argTypes: {
    menus: {
      control: { type: "inline-radio" },
      options: [1, 2, 3],
      description: "Nombre de sections affichées",
    },
    hasSeparator: {
      control: "boolean",
      description: "Afficher le séparateur entre les sections",
    },
    title: {
      control: "text",
      description: "Titre du heading item (section)",
    },
  },
  args: {
    menus: 1,
    hasSeparator: true,
    title: "HEADING ITEM",
  },
} satisfies Meta<MenuStoryArgs>;

export default meta;
type Story = StoryObj<MenuStoryArgs>;

// -----------------------------------------------------------------------
// Render partagé

function MenuStory(args: MenuStoryArgs) {
  return (
    <div style={{ width: 360 }}>
      <Menu>
        <SampleSection sectionTitle={args.title} hasSeparator={args.hasSeparator} />
        {args.menus >= 2 && (
          <SampleSection sectionTitle={args.title} hasSeparator={args.hasSeparator} offset={3} />
        )}
        {args.menus >= 3 && (
          <SampleSection sectionTitle={args.title} hasSeparator={args.hasSeparator} offset={6} />
        )}
      </Menu>
    </div>
  );
}

// -----------------------------------------------------------------------
// Stories — Figma variants (menus = 1, 2, 3)

/** Variante menus = 1 : menu avec une seule section. */
export const OneSection: Story = {
  name: "menus = 1",
  args: { menus: 1 },
  parameters: {
    design: { type: "figma", url: figmaUrl("4711:14820") },
  },
  render: MenuStory,
};

/** Variante menus = 2 : menu avec deux sections. */
export const TwoSections: Story = {
  name: "menus = 2",
  args: {
    menus: 2,
    hasSeparator: false
  },
  parameters: {
    design: { type: "figma", url: figmaUrl("4711:14822") },
  },
  render: MenuStory,
};

/** Variante menus = 3 : menu avec trois sections. */
export const ThreeSections: Story = {
  name: "menus = 3",
  args: { menus: 3 },
  parameters: {
    design: { type: "figma", url: figmaUrl("4711:14825") },
  },
  render: MenuStory,
};
