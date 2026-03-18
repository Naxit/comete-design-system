import { Chip, Table } from "@aexae/design-system";
import type { TableColumn, CustomTableProps } from "@aexae/design-system";
import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ----------------------------------------------------------------------

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

// ----------------------------------------------------------------------

// Type pour les données utilisateur
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  status: "active" | "inactive";
};

// Données d'exemple pour les utilisateurs
const users: User[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    age: 32,
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    age: 28,
    role: "User",
    status: "active",
  },
  {
    id: 3,
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    age: 45,
    role: "Editor",
    status: "inactive",
  },
  {
    id: 4,
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    age: 35,
    role: "User",
    status: "active",
  },
  {
    id: 5,
    name: "Luc Moreau",
    email: "luc.moreau@example.com",
    age: 29,
    role: "Admin",
    status: "active",
  },
  {
    id: 6,
    name: "Emma Petit",
    email: "emma.petit@example.com",
    age: 26,
    role: "User",
    status: "inactive",
  },
  {
    id: 7,
    name: "Thomas Roux",
    email: "thomas.roux@example.com",
    age: 38,
    role: "Editor",
    status: "active",
  },
  {
    id: 8,
    name: "Léa Simon",
    email: "lea.simon@example.com",
    age: 31,
    role: "User",
    status: "active",
  },
  {
    id: 9,
    name: "Hugo Laurent",
    email: "hugo.laurent@example.com",
    age: 27,
    role: "User",
    status: "active",
  },
];

// Colonnes de base pour les utilisateurs
const userColumns: TableColumn[] = [
  { id: "name", label: "Nom", sortable: true },
  { id: "email", label: "Email", sortable: true },
  { id: "age", label: "Âge", sortable: true },
  { id: "role", label: "Rôle", sortable: true },
  {
    id: "status",
    label: "Statut",
    disablePadding: true,
    mergeWithPrevious: true,
    render: (_value: unknown, row: unknown) => (
      <Chip
        label={(row as User).status === "active" ? "Actif" : "Inactif"}
        color={(row as User).status === "active" ? "success" : "warning"}
        size="small"
      />
    ),
  },
];

// ----------------------------------------------------------------------

// Story complète avec toutes les fonctionnalités
export const Complete: StoryObj<CustomTableProps> = {
  args: {
    rows: users,
    columns: userColumns,
    getRowId: (row) => (row as User).id,
    enableSelection: true,
    enableSorting: true,
    enablePagination: true,
    rowsPerPageOptions: [5, 10, 25],
    defaultRowsPerPage: 5,
    onRowClick: (_event, row) => {
      console.log("Ligne cliquée:", row);
    },
    onCheckboxClick: (_event, row) => {
      console.log("Checkbox cliquée:", row);
    },
  },
};

// ----------------------------------------------------------------------

// Story simple avec données basiques
type SimpleData = {
  id: number;
  nom: string;
  ville: string;
};

const simpleData: SimpleData[] = [
  { id: 1, nom: "Alice", ville: "Paris" },
  { id: 2, nom: "Bob", ville: "Lyon" },
  { id: 3, nom: "Charlie", ville: "Marseille" },
];

const simpleColumns: TableColumn[] = [
  { id: "nom", label: "Nom" },
  { id: "ville", label: "Ville" },
];

export const Simple: StoryObj<CustomTableProps> = {
  args: {
    columns: simpleColumns,
    rows: simpleData,
    getRowId: (row) => (row as SimpleData).id,
    enableSelection: false,
    enableSorting: false,
    enablePagination: false,
  },
};

// ----------------------------------------------------------------------

// Story avec état de chargement
export const Loading: StoryObj<CustomTableProps> = {
  args: {
    columns: userColumns,
    rows: users,
    getRowId: (row) => (row as User).id,
    enableSelection: true,
    enableSorting: true,
    enablePagination: true,
    rowsPerPageOptions: [5, 10, 25],
    defaultRowsPerPage: 5,
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple montrant le tableau en état de chargement. Lorsque `isLoading` est `true`, des squelettes de chargement sont affichés à la place du contenu du tableau.",
      },
    },
  },
};

// ----------------------------------------------------------------------

// Story simple avec données basiques
type SimpleDataWithChip = {
  id: number;
  nom: string;
  ville: string;
};

const simpleDataWithChip: SimpleDataWithChip[] = [
  { id: 1, nom: "Alice", ville: "Paris" },
  { id: 2, nom: "Bob", ville: "Lyon" },
  { id: 3, nom: "Charlie", ville: "Marseille" },
];

const simpleColumnsWithChip: TableColumn[] = [
  { id: "nom", label: "Nom" },
  {
    id: "ville",
    label: "",
    disablePadding: true,
    mergeWithPrevious: true,
    render: (_value: unknown, row: unknown) => (
      <Chip
        label={(row as SimpleDataWithChip).ville}
        color={(row as SimpleDataWithChip).ville === "Paris" ? "success" : "default"}
        size="small"
      />
    ),
  },
];

export const SimpleWithChip: StoryObj<CustomTableProps> = {
  args: {
    columns: simpleColumnsWithChip,
    rows: simpleDataWithChip,
    getRowId: (row) => (row as SimpleDataWithChip).id,
    enableSelection: false,
    enableSorting: false,
    enablePagination: false,
  },
};
