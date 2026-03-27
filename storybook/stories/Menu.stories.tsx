// Menu — stories Storybook
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  MenuPopover,
  MenuSection,
  MenuDivider,
  Button,
} from "@naxit/comete-design-system/components";

// -----------------------------------------------------------------------
// Meta

const meta = {
  title: "Components/Menu",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// -----------------------------------------------------------------------
// Stories

/** Menu basique avec quelques items. */
export const Default: Story = {
  render: () => (
    <MenuTrigger>
      <Button>Options</Button>
      <MenuPopover>
        <Menu>
          <MenuItem id="edit" iconBefore="Edit">Modifier</MenuItem>
          <MenuItem id="duplicate" iconBefore="ContentCopy">Dupliquer</MenuItem>
          <MenuDivider />
          <MenuItem id="delete" iconBefore="Delete">Supprimer</MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

/** Items avec icônes avant le label. */
export const WithIconsBefore: Story = {
  name: "Icons before",
  render: () => (
    <MenuTrigger>
      <Button>Fichier</Button>
      <MenuPopover>
        <Menu>
          <MenuItem id="new" iconBefore="Add">Nouveau</MenuItem>
          <MenuItem id="open" iconBefore="Folder">Ouvrir</MenuItem>
          <MenuItem id="save" iconBefore="Save">Enregistrer</MenuItem>
          <MenuItem id="download" iconBefore="Download">Télécharger</MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

/** Items avec icônes après le label (ex : sous-menu). */
export const WithIconsAfter: Story = {
  name: "Icons after",
  render: () => (
    <MenuTrigger>
      <Button>Navigation</Button>
      <MenuPopover>
        <Menu>
          <MenuItem id="settings" iconBefore="Settings" iconAfter="ChevronRight">
            Paramètres
          </MenuItem>
          <MenuItem id="help" iconBefore="Help" iconAfter="ChevronRight">
            Aide
          </MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

/** Items avec description secondaire sous le label. */
export const WithDescription: Story = {
  name: "With description",
  render: () => (
    <MenuTrigger>
      <Button>Mon compte</Button>
      <MenuPopover>
        <Menu>
          <MenuItem id="profile" iconBefore="Person" description="Voir et modifier votre profil">
            Profil
          </MenuItem>
          <MenuItem id="settings" iconBefore="Settings" description="Préférences et configuration">
            Paramètres
          </MenuItem>
          <MenuItem id="logout" iconBefore="Logout" description="Se déconnecter de votre compte">
            Déconnexion
          </MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

/** Items avec un slot après (raccourci clavier). */
export const WithShortcuts: Story = {
  name: "With shortcuts",
  render: () => (
    <MenuTrigger>
      <Button>Édition</Button>
      <MenuPopover>
        <Menu>
          <MenuItem id="undo" iconBefore="Undo" slotAfter={<kbd>⌘Z</kbd>}>
            Annuler
          </MenuItem>
          <MenuItem id="redo" iconBefore="Redo" slotAfter={<kbd>⌘⇧Z</kbd>}>
            Rétablir
          </MenuItem>
          <MenuDivider />
          <MenuItem id="cut" iconBefore="ContentCut" slotAfter={<kbd>⌘X</kbd>}>
            Couper
          </MenuItem>
          <MenuItem id="copy" iconBefore="ContentCopy" slotAfter={<kbd>⌘C</kbd>}>
            Copier
          </MenuItem>
          <MenuItem id="paste" iconBefore="Download" slotAfter={<kbd>⌘V</kbd>}>
            Coller
          </MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

/** Items désactivés. */
export const DisabledItems: Story = {
  name: "Disabled items",
  render: () => (
    <MenuTrigger>
      <Button>Actions</Button>
      <MenuPopover>
        <Menu>
          <MenuItem id="edit" iconBefore="Edit">Modifier</MenuItem>
          <MenuItem id="duplicate" iconBefore="ContentCopy" isDisabled>
            Dupliquer
          </MenuItem>
          <MenuDivider />
          <MenuItem id="delete" iconBefore="Delete" isDisabled>
            Supprimer
          </MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

/** Menu avec des sections regroupées. */
export const WithSections: Story = {
  name: "With sections",
  render: () => (
    <MenuTrigger>
      <Button>Menu</Button>
      <MenuPopover>
        <Menu>
          <MenuSection title="Navigation">
            <MenuItem id="home" iconBefore="Home">Accueil</MenuItem>
            <MenuItem id="dashboard" iconBefore="Dashboard">Tableau de bord</MenuItem>
          </MenuSection>
          <MenuSection title="Compte">
            <MenuItem id="profile" iconBefore="Person">Profil</MenuItem>
            <MenuItem id="settings" iconBefore="Settings">Paramètres</MenuItem>
          </MenuSection>
          <MenuSection title="Autres">
            <MenuItem id="help" iconBefore="Help">Aide</MenuItem>
            <MenuItem id="logout" iconBefore="Logout">Déconnexion</MenuItem>
          </MenuSection>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

/** Exemple complet combinant icônes, descriptions, sections, dividers et items désactivés. */
export const KitchenSink: Story = {
  name: "Kitchen sink",
  render: () => (
    <MenuTrigger>
      <Button iconAfter="ArrowDropDown">Menu complet</Button>
      <MenuPopover width={360}>
        <Menu>
          <MenuSection title="Fichier">
            <MenuItem id="new" iconBefore="Add" slotAfter={<kbd>⌘N</kbd>}>
              Nouveau
            </MenuItem>
            <MenuItem id="open" iconBefore="Folder" slotAfter={<kbd>⌘O</kbd>}>
              Ouvrir
            </MenuItem>
            <MenuItem id="save" iconBefore="Save" slotAfter={<kbd>⌘S</kbd>}>
              Enregistrer
            </MenuItem>
          </MenuSection>
          <MenuSection title="Édition">
            <MenuItem id="cut" iconBefore="ContentCut" slotAfter={<kbd>⌘X</kbd>}>
              Couper
            </MenuItem>
            <MenuItem id="copy" iconBefore="ContentCopy" slotAfter={<kbd>⌘C</kbd>}>
              Copier
            </MenuItem>
            <MenuItem id="paste" iconBefore="Save" slotAfter={<kbd>⌘V</kbd>} isDisabled>
              Coller
            </MenuItem>
          </MenuSection>
          <MenuSection title="Compte">
            <MenuItem id="profile" iconBefore="Person" description="Voir et modifier votre profil">
              Mon profil
            </MenuItem>
            <MenuItem id="settings" iconBefore="Settings" description="Préférences de l'application" iconAfter="ChevronRight">
              Paramètres
            </MenuItem>
          </MenuSection>
          <MenuDivider />
          <MenuItem id="logout" iconBefore="Logout">
            Déconnexion
          </MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};
