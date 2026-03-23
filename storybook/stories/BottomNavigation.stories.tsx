// BottomNavigation — stories Storybook
import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import {
  Home,
  CalendarMonth,
  Person,
  Notifications,
  Dashboard,
} from "@naxit/comete-icons";
import type { IconProps } from "@naxit/comete-icons";
import type { ComponentType } from "react";
import {
  BottomNavigation,
  BottomNavigationItem,
} from "@naxit/comete-design-system/components";

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// REASON: React.ComponentType<IconProps> n'est pas sérialisable dans Storybook args.
// On passe une clé string résolue via mapping avant rendu.
const ICON_MAPPING: Record<string, ComponentType<IconProps>> = {
  Home,
  CalendarMonth,
  Person,
  Notifications,
  Dashboard,
};
const ICON_OPTIONS = Object.keys(ICON_MAPPING);

// -----------------------------------------------------------------------
// Meta — on documente l'item individuel pour le contrôle interactif

const meta = {
  title: "Components/BottomNavigation",
  component: BottomNavigationItem,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: figmaUrl("2524:18591") },
  },
  decorators: [
    (Story: () => ReactNode) => (
      <div style={{ display: "flex", alignItems: "flex-end", minHeight: "100vh" }}>
        <div style={{ width: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    icon: {
      control: "select",
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
    },
    isSelected: { control: "boolean" },
    badge: { control: "text" },
    onClick: { action: "clicked" },
  },
  args: {
    label: "Accueil",
    // REASON: mapping Storybook résout la clé string en ComponentType avant rendu — cast nécessaire pour TS.
    icon: "Home" as unknown as ComponentType<IconProps>,
    isSelected: false,
  },
} satisfies Meta<typeof BottomNavigationItem>;

export default meta;
type Story = StoryObj<typeof BottomNavigationItem>;

// -----------------------------------------------------------------------
// Stories

export const Default: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("14:1031") } },
  render: (args) => (
    <BottomNavigation>
      <BottomNavigationItem {...args} />
    </BottomNavigation>
  ),
};

export const Selected: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("14:1031") } },
  args: { isSelected: true },
  render: (args) => (
    <BottomNavigation>
      <BottomNavigationItem {...args} />
    </BottomNavigation>
  ),
};

export const WithBadge: Story = {
  name: "With badge",
  parameters: { design: { type: "figma", url: figmaUrl("14:1031") } },
  args: { label: "Notifications", icon: "Notifications" as unknown as ComponentType<IconProps>, badge: "3" },
  render: (args) => (
    <BottomNavigation>
      <BottomNavigationItem {...args} />
    </BottomNavigation>
  ),
};

export const FullNav: Story = {
  name: "Full navigation bar",
  parameters: { design: { type: "figma", url: figmaUrl("2524:18591") } },
  render: () => (
    <BottomNavigation>
      <BottomNavigationItem label="Accueil" icon={Home} isSelected />
      <BottomNavigationItem label="Agenda" icon={CalendarMonth} />
      <BottomNavigationItem
        label="Notifications"
        icon={Notifications}
        badge="5"
      />
      <BottomNavigationItem label="Profil" icon={Person} />
      <BottomNavigationItem label="Dashboard" icon={Dashboard} />
    </BottomNavigation>
  ),
};
