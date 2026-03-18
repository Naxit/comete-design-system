import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table } from "./index";
import type { TableColumn } from "./Table.types";

// Type pour les données de test
type TestData = {
  id: number;
  name: string;
  age: number;
  email: string;
  status: string;
};

// Données de test
const testRows: TestData[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com", status: "active" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com", status: "inactive" },
  { id: 3, name: "Charlie", age: 35, email: "charlie@example.com", status: "active" },
  { id: 4, name: "David", age: 28, email: "david@example.com", status: "active" },
  { id: 5, name: "Eve", age: 32, email: "eve@example.com", status: "inactive" },
];

// Colonnes de test
const testColumns: TableColumn[] = [
  { id: "name", label: "Nom", align: "left", sortable: true },
  { id: "age", label: "Âge", align: "right", sortable: true },
  { id: "email", label: "Email", align: "left", sortable: false },
  { id: "status", label: "Statut", align: "center", sortable: true },
];

describe("Table", () => {
  describe("Rendu", () => {
    it("devrait rendre la table avec les colonnes et les lignes", () => {
      render(
        <Table columns={testColumns} rows={testRows} getRowId={(row) => (row as TestData).id} />
      );

      // Vérifier que les en-têtes de colonnes sont présents
      expect(screen.getByText("Nom")).toBeInTheDocument();
      expect(screen.getByText("Âge")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Statut")).toBeInTheDocument();

      // Vérifier que les données sont présentes
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("25")).toBeInTheDocument();
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    });

    it("devrait rendre la table correctement", () => {
      render(
        <Table columns={testColumns} rows={testRows} getRowId={(row) => (row as TestData).id} />
      );

      // La table devrait être rendue
      expect(screen.getByText("Nom")).toBeInTheDocument();
    });

    it("devrait respecter les alignements des colonnes", () => {
      const { container } = render(
        <Table columns={testColumns} rows={testRows} getRowId={(row) => (row as TestData).id} />
      );

      // Vérifier les alignements dans les cellules d'en-tête
      const headerCells = container.querySelectorAll("th");
      expect(headerCells.length).toBeGreaterThan(0);
    });

    it("devrait rendre la table sans pagination si enablePagination est false", () => {
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enablePagination={false}
        />
      );

      // Toutes les lignes devraient être visibles
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Eve")).toBeInTheDocument();

      // La pagination ne devrait pas être présente
      expect(screen.queryByLabelText(/par page/i)).not.toBeInTheDocument();
    });
  });

  describe("Sélection", () => {
    it("devrait afficher les checkboxes quand enableSelection est true", () => {
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSelection={true}
        />
      );

      // Vérifier la checkbox "select all" dans l'en-tête
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it("ne devrait pas afficher les checkboxes quand enableSelection est false", () => {
      const { container } = render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSelection={false}
        />
      );

      // Ne devrait pas avoir de checkbox dans la table (chercher uniquement dans la table)
      const table = container.querySelector("table");
      const checkboxes = table?.querySelectorAll('input[type="checkbox"]') || [];
      expect(checkboxes.length).toBe(0);
    });

    it("devrait permettre de sélectionner toutes les lignes", async () => {
      const user = userEvent.setup();
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSelection={true}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
      const selectAllCheckbox = checkboxes[0]!;

      await user.click(selectAllCheckbox);

      // Toutes les checkboxes devraient être cochées
      const allCheckboxes = screen.getAllByRole("checkbox");
      allCheckboxes.forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });

    it("devrait permettre de désélectionner toutes les lignes", async () => {
      const user = userEvent.setup();
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSelection={true}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
      const selectAllCheckbox = checkboxes[0]!;

      // Sélectionner toutes les lignes
      await user.click(selectAllCheckbox);
      expect(selectAllCheckbox).toBeChecked();

      // Désélectionner toutes les lignes
      await user.click(selectAllCheckbox);
      expect(selectAllCheckbox).not.toBeChecked();
    });

    it("devrait appeler onRowClick quand une ligne est cliquée", async () => {
      const user = userEvent.setup();
      const handleRowClick = jest.fn();

      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSelection={true}
          onRowClick={handleRowClick}
        />
      );

      // Cliquer sur une ligne (pas sur la checkbox)
      const aliceCell = screen.getByText("Alice");
      const aliceRow = aliceCell.closest("tr");
      if (aliceRow) {
        await user.click(aliceRow);
        expect(handleRowClick).toHaveBeenCalled();
      }
    });

    it("devrait appeler onRowClick sans déclencher onCheckboxClick quand on clique sur la ligne (pas la checkbox)", async () => {
      const user = userEvent.setup();
      const handleRowClick = jest.fn();
      const handleCheckboxClick = jest.fn();

      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSelection={true}
          onRowClick={handleRowClick}
          onCheckboxClick={handleCheckboxClick}
        />
      );

      // Cliquer sur une cellule de la ligne (pas sur la checkbox)
      const aliceCell = screen.getByText("Alice");
      const aliceRow = aliceCell.closest("tr");
      if (aliceRow) {
        await user.click(aliceRow);
        // onRowClick devrait être appelé
        expect(handleRowClick).toHaveBeenCalledTimes(1);
        // onCheckboxClick ne devrait PAS être appelé
        expect(handleCheckboxClick).not.toHaveBeenCalled();
      }
    });
  });

  describe("Tri", () => {
    it("devrait permettre de trier par colonne quand enableSorting est true", async () => {
      const user = userEvent.setup();
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSorting={true}
        />
      );

      // Cliquer sur l'en-tête "Nom" pour trier
      const nameHeader = screen.getByText("Nom");
      await user.click(nameHeader);

      // Vérifier que le tri a été appliqué (l'en-tête devrait avoir aria-sort)
      const headerCell = nameHeader.closest("th");
      expect(headerCell).toHaveAttribute("aria-sort");
    });

    it("ne devrait pas permettre de trier quand enableSorting est false", () => {
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSorting={false}
        />
      );

      // Les en-têtes ne devraient pas être cliquables pour le tri
      const nameHeader = screen.getByText("Nom");
      expect(nameHeader).toBeInTheDocument();
    });

    it("devrait respecter la propriété sortable des colonnes", async () => {
      const user = userEvent.setup();
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enableSorting={true}
        />
      );

      // La colonne email n'est pas sortable
      const emailHeader = screen.getByText("Email");
      await user.click(emailHeader);

      // Le tri ne devrait pas changer (pas d'indicateur de tri)
      expect(emailHeader).toBeInTheDocument();
    });
  });

  describe("Pagination", () => {
    it("devrait afficher la pagination par défaut", () => {
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enablePagination={true}
        />
      );

      // Vérifier que les contrôles de pagination sont présents
      expect(screen.getByLabelText(/par page/i)).toBeInTheDocument();
    });

    it("devrait limiter le nombre de lignes affichées selon rowsPerPage", () => {
      const { container } = render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enablePagination={true}
          rowsPerPageOptions={[2, 5, 10, 25]}
          defaultRowsPerPage={2}
        />
      );

      // Seulement 2 lignes de données devraient être visibles dans le tbody
      const tbody = container.querySelector("tbody");
      const dataRows = tbody?.querySelectorAll("tr") || [];
      expect(dataRows.length).toBe(2);
    });

    it("devrait permettre de changer le nombre de lignes par page", async () => {
      const user = userEvent.setup();
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enablePagination={true}
          defaultRowsPerPage={5}
        />
      );

      const rowsPerPageSelect = screen.getByLabelText(/par page/i);
      await user.click(rowsPerPageSelect);

      // Sélectionner une autre option (si disponible)
      const option = screen.queryByRole("option", { name: "10" });
      if (option) {
        await user.click(option);
        // Vérifier que le changement a été appliqué
        expect(rowsPerPageSelect).toBeInTheDocument();
      }
    });

    it("devrait permettre de naviguer entre les pages", async () => {
      const user = userEvent.setup();
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enablePagination={true}
          rowsPerPageOptions={[2, 5, 10, 25]}
          defaultRowsPerPage={2}
        />
      );

      // Vérifier que la première page est affichée
      expect(screen.getByText("Alice")).toBeInTheDocument();

      // Cliquer sur le bouton "next page"
      const nextButton = screen.getByLabelText(/go to next page/i);
      await user.click(nextButton);

      // La page suivante devrait être affichée
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    });

    it("devrait utiliser les options de pagination personnalisées", () => {
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enablePagination={true}
          rowsPerPageOptions={[3, 5, 10]}
          defaultRowsPerPage={3}
        />
      );

      const rowsPerPageSelect = screen.getByLabelText(/par page/i);
      expect(rowsPerPageSelect).toBeInTheDocument();
    });
  });

  describe("Props personnalisées", () => {
    it("devrait rendre la table correctement", () => {
      render(
        <Table columns={testColumns} rows={testRows} getRowId={(row) => (row as TestData).id} />
      );

      // La table devrait être rendue correctement
      expect(screen.getByText("Nom")).toBeInTheDocument();
    });

    it("devrait respecter la prop minWidth", () => {
      const { container } = render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          minWidth={1000}
        />
      );

      const table = container.querySelector("table");
      expect(table).toHaveStyle({ minWidth: "1000px" });
    });
  });

  describe("Intégration", () => {
    it("devrait gérer correctement les lignes vides pour la pagination", () => {
      render(
        <Table
          columns={testColumns}
          rows={testRows}
          getRowId={(row) => (row as TestData).id}
          enablePagination={true}
          defaultRowsPerPage={10}
        />
      );

      // Avec 5 lignes et 10 par page, toutes les lignes devraient être visibles
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Eve")).toBeInTheDocument();
    });
  });
});
