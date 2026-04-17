import { AvatarGroup } from "@naxit/comete-design-system";
import type { AvatarGroupProps, AvatarGroupItem } from "@naxit/comete-design-system";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

// ----------------------------------------------------------------------
// Figma

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// ----------------------------------------------------------------------
// Sample data

const PHOTO_ITEMS: AvatarGroupItem[] = [
  { key: "alice", src: "https://i.pravatar.cc/128?img=3", alt: "Alice" },
  { key: "bob", src: "https://i.pravatar.cc/128?img=4", alt: "Bob" },
  { key: "carol", src: "https://i.pravatar.cc/128?img=5", alt: "Carol" },
  { key: "dan", src: "https://i.pravatar.cc/128?img=8", alt: "Dan" },
  { key: "eve", src: "https://i.pravatar.cc/128?img=9", alt: "Eve" },
];

const INITIALS_ITEMS: AvatarGroupItem[] = [
  { key: "a", initials: "AB" },
  { key: "b", initials: "CD" },
  { key: "c", initials: "EF" },
  { key: "d", initials: "GH" },
  { key: "e", initials: "IJ" },
];

// ----------------------------------------------------------------------

const meta: Meta<AvatarGroupProps> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
        labels: {
          xsmall: "xsmall (16px)",
          small: "small (24px)",
          medium: "medium (32px)",
          large: "large (40px)",
          xlarge: "xlarge (64px)",
          xxlarge: "xxlarge (96px)",
          xxxlarge: "xxxlarge (128px)",
        },
      },
      options: ["xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"],
    },
    overflow: { control: { type: "number", min: 0 } },
    borderColor: { control: "color" },
  },
  args: {
    items: PHOTO_ITEMS.slice(0, 3),
    overflow: 2,
    size: "large",
    onItemPress: fn(),
  },
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("2726:20433"),
    },
  },
};

export default meta;
type Story = StoryObj<AvatarGroupProps>;

// ----------------------------------------------------------------------

export const WithPhotos: Story = {};

export const WithInitials: Story = {
  args: { items: INITIALS_ITEMS.slice(0, 3), overflow: 4 },
};

export const NoOverflow: Story = {
  args: { overflow: 0 },
};

export const ManyAvatars: Story = {
  args: { items: PHOTO_ITEMS, overflow: 12 },
};

// ----------------------------------------------------------------------
// Sizes

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(
        ["xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"] as const
      ).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text-subtle)", width: 120 }}>
            {size}
          </span>
          <AvatarGroup items={PHOTO_ITEMS.slice(0, 3)} overflow={2} size={size} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
