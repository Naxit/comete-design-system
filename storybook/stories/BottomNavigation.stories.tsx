// BottomNavigation — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationItem,
} from "@naxit/comete-design-system/components";

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;
const SMALL_WIDTH = 80;

// -----------------------------------------------------------------------
// Meta — on documente l'item individuel pour le contrôle interactif

const meta = {
  title: "Components/BottomNavigation",
  component: BottomNavigationItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl("2524:18591") },
  },
  decorators: [
    (Story: () => ReactNode) => (
      <div style={{ display: "flex", justifyContent: "center", width: 402 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    icon: {
      control: "select",
      options: ["Home", "CalendarMonth", "Person", "Notifications", "Star"],
    },
    isSelected: { control: "boolean" },
    badge: { control: "text" },
    onClick: { action: "clicked" },
  },
  args: {
    label: "Accueil",
    icon: "Home",
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
    <div style={{ width: SMALL_WIDTH }}>
      <BottomNavigation>
        <BottomNavigationItem {...args} />
      </BottomNavigation>
    </div>
  ),
};

export const Selected: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("14:1031") } },
  args: { isSelected: true },
  render: (args) => (
    <div style={{ width: SMALL_WIDTH }}>
      <BottomNavigation>
        <BottomNavigationItem {...args} />
      </BottomNavigation>
    </div>
  ),
};

export const WithBadge: Story = {
  name: "With badge",
  parameters: { design: { type: "figma", url: figmaUrl("14:1031") } },
  args: { label: "Notifications", icon: "Notifications", badge: "3" },
  render: (args) => (
    <div style={{ width: SMALL_WIDTH }}>
      <BottomNavigation>
        <BottomNavigationItem {...args} />
      </BottomNavigation>
    </div>
  ),
};

export const FullNav: Story = {
  name: "Full navigation bar",
  parameters: { design: { type: "figma", url: figmaUrl("2524:18591") } },
  render: () => {
    const items = [
      { label: "Accueil", icon: "Home" as const },
      { label: "Agenda", icon: "CalendarMonth" as const },
      { label: "Notifications", icon: "Notifications" as const, badge: "5" },
      { label: "Profil", icon: "Person" as const },
      { label: "Missions", icon: "Star" as const },
    ];
    const [selected, setSelected] = useState("Accueil");
    return (
      <BottomNavigation>
        {items.map((item) => (
          <BottomNavigationItem
            key={item.label}
            {...item}
            isSelected={selected === item.label}
            onClick={() => { setSelected(item.label); }}
          />
        ))}
      </BottomNavigation>
    );
  },
};
