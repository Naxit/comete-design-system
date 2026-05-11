// Stepper — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Stepper,
  Step,
  Button,
  ButtonGroup,
} from "@naxit/comete-design-system/components";

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    activeStep: { control: { type: "number", min: 0, step: 1 } },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    isLinear: { control: "boolean" },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof Stepper>;

// -----------------------------------------------------------------------
// Stories

/** Stepper linéaire horizontal, étape active = 1 (`Adresse`). */
export const Default: Story = {
  args: { activeStep: 1 },
  render: (args) => (
    <div style={{ width: 600 }}>
      <Stepper {...args}>
        <Step label="Compte" />
        <Step label="Adresse" />
        <Step label="Paiement" />
        <Step label="Confirmation" />
      </Stepper>
    </div>
  ),
};

/** Étape complétée + active + à venir. */
export const Progression: Story = {
  args: { activeStep: 2 },
  render: (args) => (
    <div style={{ width: 600 }}>
      <Stepper {...args}>
        <Step label="Compte" />
        <Step label="Adresse" />
        <Step label="Paiement" />
        <Step label="Confirmation" />
      </Stepper>
    </div>
  ),
};

/** Une étape en erreur. `isError` est prioritaire sur le status calculé. */
export const WithError: Story = {
  name: "With error",
  args: { activeStep: 2 },
  render: (args) => (
    <div style={{ width: 600 }}>
      <Stepper {...args}>
        <Step label="Compte" />
        <Step label="Adresse" isError />
        <Step label="Paiement" />
        <Step label="Confirmation" />
      </Stepper>
    </div>
  ),
};

/** Stepper vertical. */
export const Vertical: Story = {
  args: { activeStep: 1, orientation: "vertical" },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Stepper {...args}>
        <Step label="Compte" />
        <Step label="Adresse" />
        <Step label="Paiement" />
        <Step label="Confirmation" />
      </Stepper>
    </div>
  ),
};

/** Stepper vertical avec une étape en erreur. */
export const VerticalWithError: Story = {
  name: "Vertical with error",
  args: { activeStep: 2, orientation: "vertical" },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Stepper {...args}>
        <Step label="Compte" />
        <Step label="Adresse" isError />
        <Step label="Paiement" />
        <Step label="Confirmation" />
      </Stepper>
    </div>
  ),
};

/**
 * Stepper non-linéaire : chaque étape est cliquable et déclenche
 * `onStepChange`. Utile pour les wizards où l'utilisateur peut revenir
 * sur une étape précédente librement.
 */
export const NonLinear: Story = {
  name: "Non-linear (clickable)",
  render: () => {
    function NonLinearDemo() {
      const [step, setStep] = useState(1);
      return (
        <div style={{ width: 600, display: "flex", flexDirection: "column", gap: 24 }}>
          <Stepper activeStep={step} isLinear={false} onStepChange={setStep}>
            <Step label="Compte" />
            <Step label="Adresse" />
            <Step label="Paiement" />
            <Step label="Confirmation" />
          </Stepper>
          <p style={{ margin: 0, color: "var(--text-subtle)" }}>
            Étape active : <strong>{step + 1}</strong> / 4 — clique sur une
            étape pour y sauter.
          </p>
        </div>
      );
    }
    return <NonLinearDemo />;
  },
};

/** Étape désactivée — non cliquable même en mode non-linéaire. */
export const DisabledStep: Story = {
  name: "Disabled step",
  render: () => {
    function DisabledDemo() {
      const [step, setStep] = useState(0);
      return (
        <div style={{ width: 600 }}>
          <Stepper activeStep={step} isLinear={false} onStepChange={setStep}>
            <Step label="Compte" />
            <Step label="Adresse" isDisabled />
            <Step label="Paiement" />
          </Stepper>
        </div>
      );
    }
    return <DisabledDemo />;
  },
};

/** Wizard interactif : Précédent / Suivant. */
export const InteractiveWizard: Story = {
  name: "Interactive wizard",
  render: () => {
    function Wizard() {
      const steps = ["Compte", "Adresse", "Paiement", "Confirmation"];
      const [step, setStep] = useState(0);
      return (
        <div
          style={{
            width: 600,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Stepper activeStep={step}>
            {steps.map((label) => (
              <Step key={label} label={label} />
            ))}
          </Stepper>
          <ButtonGroup>
            <Button
              appearance="outlined"
              isDisabled={step === 0}
              onPress={() => setStep((s) => Math.max(0, s - 1))}
            >
              Précédent
            </Button>
            <Button
              isDisabled={step === steps.length - 1}
              onPress={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              Suivant
            </Button>
          </ButtonGroup>
        </div>
      );
    }
    return <Wizard />;
  },
};
