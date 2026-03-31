// MenuItem — stories Storybook (Figma code part)
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menu,
  MenuItem,
} from "@naxit/comete-design-system/components";
import type { IconName } from "@naxit/comete-icons";

// -----------------------------------------------------------------------
// Figma

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Types pour les args (Figma code part props)

interface MenuItemStoryArgs {
  title: string;
  descriptionText: string;
  description: boolean;
  iconBefore: boolean;
  iconAfter: boolean;
  slotAfter: boolean;
  isDisabled: boolean;
  isSelected: boolean;
}

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Menu/MenuItem",
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: figmaUrl("4711:15205"),
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Texte principal de l'item",
    },
    descriptionText: {
      control: "text",
      name: "description (text)",
      description: "Texte secondaire sous le titre",
    },
    description: {
      control: "boolean",
      description: "Afficher la description",
    },
    iconBefore: {
      control: "boolean",
      description: "Afficher l'icône avant le label",
    },
    iconAfter: {
      control: "boolean",
      description: "Afficher l'icône après le label",
    },
    slotAfter: {
      control: "boolean",
      description: "Afficher le slot après (raccourci clavier)",
    },
    isDisabled: {
      control: "boolean",
      description: "Item désactivé",
    },
    isSelected: {
      control: "boolean",
      description: "Item sélectionné",
    },
  },
  args: {
    title: "Title",
    descriptionText: "Description",
    description: true,
    iconBefore: true,
    iconAfter: true,
    slotAfter: false,
    isDisabled: false,
    isSelected: false,
  },
} satisfies Meta<MenuItemStoryArgs>;

export default meta;
type Story = StoryObj<MenuItemStoryArgs>;

// -----------------------------------------------------------------------
// Render

function MenuItemStory(args: MenuItemStoryArgs) {
  return (
    <div style={{ width: 360 }}>
      <Menu
        selectionMode={args.isSelected ? "multiple" : undefined}
        selectedKeys={args.isSelected ? ["item"] : []}
      >
        <MenuItem
          id="item"
          isDisabled={args.isDisabled}
          iconBefore={args.iconBefore ? ("Star" as IconName) : undefined}
          iconAfter={args.iconAfter ? ("ChevronRight" as IconName) : undefined}
          description={args.description ? args.descriptionText : undefined}
          slotAfter={args.slotAfter ? <kbd>⌘K</kbd> : undefined}
        >
          {args.title}
        </MenuItem>
      </Menu>
    </div>
  );
}

// -----------------------------------------------------------------------
// Stories

/** État par défaut. */
export const Default: Story = {
  args: {
    description: true,
    iconBefore: true,
    isSelected: false,
    descriptionText: "True",
    slotAfter: false,
    isDisabled: false
  },

  name: "default",

  parameters: {
    design: { type: "figma", url: figmaUrl("4711:15206") },
  },

  render: MenuItemStory
};

/** État sélectionné. */
export const Selected: Story = {
  name: "selected",
  args: { isSelected: true },
  parameters: {
    design: { type: "figma", url: figmaUrl("4711:15213") },
  },
  render: MenuItemStory,
};

/** État désactivé. */
export const Disabled: Story = {
  name: "disabled",
  args: { isDisabled: true },
  parameters: {
    design: { type: "figma", url: figmaUrl("4711:15264") },
  },
  render: MenuItemStory,
};

/** Désactivé + sélectionné. */
export const DisabledSelected: Story = {
  name: "disabled + selected",
  args: { isDisabled: true, isSelected: true },
  parameters: {
    design: { type: "figma", url: figmaUrl("6433:33967") },
  },
  render: MenuItemStory,
};
