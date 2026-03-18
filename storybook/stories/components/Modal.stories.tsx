import { Modal } from "@naxit/comete-design-system";
import type { ModalProps } from "@naxit/comete-design-system";
import { useState } from "react";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
    },
    maxWidth: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    fullWidth: {
      control: "boolean",
    },
    disablePadding: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<ModalProps>;

// ----------------------------------------------------------------------

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Stack spacing={2}>
            <Typography variant="h5">Modal Title</Typography>
            <Typography>
              This is a simple modal with basic content.
            </Typography>
          </Stack>
        </Modal>
      </>
    );
  },
};

// ----------------------------------------------------------------------

export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open "Confirm Action"
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Stack spacing={3}>
            <Typography variant="h5">Confirm Action</Typography>
            <Typography color="text.secondary">
              Are you sure you want to continue this action?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  console.log("Confirmed");
                  setOpen(false);
                }}
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </>
    );
  },
};

// ----------------------------------------------------------------------

export const LargeContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Large Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
          <Stack spacing={2}>
            <Typography variant="h4">Large Modal</Typography>
            <Typography>
              This modal uses maxWidth="lg" and fullWidth to display more content.
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris.
            </Typography>
            <Typography>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Stack>
        </Modal>
      </>
    );
  },
};

// ----------------------------------------------------------------------

export const SmallModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Small Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} maxWidth="xs">
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6">Small Modal</Typography>
            <Typography align="center">
              Compact modal with maxWidth="xs"
            </Typography>
            <Button fullWidth onClick={() => setOpen(false)}>
              Close
            </Button>
          </Stack>
        </Modal>
      </>
    );
  },
};

// ----------------------------------------------------------------------

export const NoPadding: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open without Padding
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} disablePadding maxWidth="md">
          <div style={{ padding: 0 }}>
            <div style={{ 
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              padding: "32px",
              color: "white"
            }}>
              <Typography variant="h5" color="inherit">
                Modal without Padding
              </Typography>
            </div>
            <div style={{ padding: "24px" }}>
              <Typography>
                This modal uses disablePadding for full layout control.
              </Typography>
              <Typography sx={{ mt: 2 }}>
                You can create custom layouts with different sections.
              </Typography>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// ----------------------------------------------------------------------

export const DifferentSizes: Story = {
  render: () => {
    const [openXs, setOpenXs] = useState(false);
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);

    return (
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => setOpenXs(true)}>
          Open XS
        </Button>
        <Button variant="contained" onClick={() => setOpenSm(true)}>
          Open SM
        </Button>
        <Button variant="contained" onClick={() => setOpenMd(true)}>
          Open MD
        </Button>
        <Button variant="contained" onClick={() => setOpenLg(true)}>
          Open LG
        </Button>

        <Modal
          open={openXs}
          onClose={() => setOpenXs(false)}
          maxWidth="xs"
          fullWidth
        >
          <Stack spacing={2}>
            <Typography variant="h6">Modal XS</Typography>
            <Typography>Extra small size (444px max width)</Typography>
            <Button onClick={() => setOpenXs(false)}>Close</Button>
          </Stack>
        </Modal>

        <Modal
          open={openSm}
          onClose={() => setOpenSm(false)}
          maxWidth="sm"
          fullWidth
        >
          <Stack spacing={2}>
            <Typography variant="h6">Modal SM</Typography>
            <Typography>Small size - default (600px max width)</Typography>
            <Button onClick={() => setOpenSm(false)}>Close</Button>
          </Stack>
        </Modal>

        <Modal
          open={openMd}
          onClose={() => setOpenMd(false)}
          maxWidth="md"
          fullWidth
        >
          <Stack spacing={2}>
            <Typography variant="h6">Modal MD</Typography>
            <Typography>Medium size (900px max width)</Typography>
            <Button onClick={() => setOpenMd(false)}>Close</Button>
          </Stack>
        </Modal>

        <Modal
          open={openLg}
          onClose={() => setOpenLg(false)}
          maxWidth="lg"
          fullWidth
        >
          <Stack spacing={2}>
            <Typography variant="h6">Modal LG</Typography>
            <Typography>Large size (1200px max width)</Typography>
            <Button onClick={() => setOpenLg(false)}>Close</Button>
          </Stack>
        </Modal>
      </Stack>
    );
  },
};

// ----------------------------------------------------------------------

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
      console.log("Form submitted:", { name, email });
      setOpen(false);
      setName("");
      setEmail("");
    };

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Form Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <Stack spacing={3}>
            <Typography variant="h5">User Information</Typography>
            <Stack spacing={2}>
              <div>
                <Typography variant="body2" sx={{ mb: 1 }}>Name</Typography>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSubmit}
                disabled={!name || !email}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </>
    );
  },
};

// ----------------------------------------------------------------------

export const WithScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Scrollable Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} maxWidth="md">
          <Stack spacing={2}>
            <Typography variant="h5">Terms and Conditions</Typography>
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography paragraph>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography paragraph>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </Typography>
              <Typography paragraph>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Typography>
              <Typography paragraph>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium.
              </Typography>
              <Typography paragraph>
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                architecto beatae vitae dicta sunt explicabo.
              </Typography>
            </div>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Decline
              </Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Accept
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </>
    );
  },
};
