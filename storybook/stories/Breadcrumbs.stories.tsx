// Breadcrumbs — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@naxit/comete-design-system/components";

const FIGMA_FILE =
  "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) =>
  `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "padded",
    design: { type: "figma", url: figmaUrl("3132:44041") },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// -----------------------------------------------------------------------
// Stories

export const Default: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("3132:44041") } },
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem label="Accueil" href="/" />
      <BreadcrumbItem label="Clients" href="/clients" />
      <BreadcrumbItem label="Fiche client" isCurrent />
    </Breadcrumbs>
  ),
};

export const WithIcons: Story = {
  name: "With icons",
  parameters: { design: { type: "figma", url: figmaUrl("3018:11522") } },
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem
        label="Accueil"
        href="/"
        iconBefore="Home"
      />
      <BreadcrumbItem label="Clients" href="/clients" />
      <BreadcrumbItem label="Fiche client" isCurrent />
    </Breadcrumbs>
  ),
};

export const WithChevronSeparator: Story = {
  name: "With chevron separator",
  parameters: { design: { type: "figma", url: figmaUrl("3018:11522") } },
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem
        label="Accueil"
        href="/"
        iconAfter="KeyboardArrowDown"
      />
      <BreadcrumbItem
        label="Clients"
        href="/clients"
        iconAfter="KeyboardArrowDown"
      />
      <BreadcrumbItem label="Fiche client" isCurrent />
    </Breadcrumbs>
  ),
};

export const DeepHierarchy: Story = {
  name: "Deep hierarchy",
  parameters: { design: { type: "figma", url: figmaUrl("3132:44041") } },
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem label="Accueil" href="/" />
      <BreadcrumbItem label="Gestion" href="/gestion" />
      <BreadcrumbItem label="Contrats" href="/gestion/contrats" />
      <BreadcrumbItem label="2024" href="/gestion/contrats/2024" />
      <BreadcrumbItem label="Contrat #4521" isCurrent />
    </Breadcrumbs>
  ),
};
