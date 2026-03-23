// Banner — stories Storybook
import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "@naxit/comete-design-system/components";
import type { BannerAppearance } from "@naxit/comete-design-system/components";

const FIGMA_FILE = "https://www.figma.com/design/YO9cW75K8aLcM5BbojZAqB/Com%C3%A8te-Design-System";
const figmaUrl = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: figmaUrl("4559-5335") },
  },
  argTypes: {
    appearance: {
      control: "select",
      options: ["warning", "critical"] satisfies BannerAppearance[],
    },
    children: { control: "text" },
  },
  args: {
    appearance: "warning",
    children: "Mettez à jour vos informations de contact avant le 31 mars.",
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof Banner>;

// -----------------------------------------------------------------------
// Stories

export const Default: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("4559-5188") } },
};

export const Warning: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("4559-5188") } },
  args: {
    appearance: "warning",
    children: "Votre session expire dans 5 minutes. Sauvegardez votre travail.",
  },
};

export const Critical: Story = {
  parameters: { design: { type: "figma", url: figmaUrl("4559-5336") } },
  args: {
    appearance: "critical",
    children: "Une erreur critique a été détectée. Contactez l'administrateur immédiatement.",
  },
};

export const AllAppearances: Story = {
  name: "All appearances",
  parameters: { design: { type: "figma", url: figmaUrl("4559-5335") } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <Banner appearance="warning">
        Mettez à jour vos informations de contact avant le 31 mars pour continuer à recevoir
        les notifications.
      </Banner>
      <Banner appearance="critical">
        Une erreur critique a été détectée sur votre compte. Contactez l&apos;administrateur.
      </Banner>
    </div>
  ),
};

export const WithRichContent: Story = {
  name: "With rich content",
  parameters: { design: { type: "figma", url: figmaUrl("4559-5335") } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <Banner appearance="warning">
        <span>
          Maintenance planifiée le <strong>15 avril de 2h à 4h</strong>. Le service sera
          temporairement indisponible.{" "}
          <a href="https://example.com" style={{ color: "inherit" }}>
            En savoir plus
          </a>
        </span>
      </Banner>
      <Banner appearance="critical">
        <span>
          Votre abonnement a expiré.{" "}
          <a href="https://example.com" style={{ color: "inherit" }}>
            Renouveler maintenant
          </a>
        </span>
      </Banner>
    </div>
  ),
};
