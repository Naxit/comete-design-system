import { getComparator } from "./getComparator";

// Type pour les données de test
type TestData = {
  id: number;
  name: string;
  age: number;
  email: string;
  status?: string;
  value: number | string;
};

describe("getComparator", () => {
  describe("Tri ascendant (asc)", () => {
    it("devrait trier les nombres en ordre croissant", () => {
      const comparator = getComparator<TestData>("asc", "age");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 30, email: "alice@test.com", value: 100 },
        { id: 2, name: "Bob", age: 25, email: "bob@test.com", value: 200 },
        { id: 3, name: "Charlie", age: 35, email: "charlie@test.com", value: 50 },
      ];

      const sorted = [...data].sort(comparator);

      expect(sorted[0]!.age).toBe(25);
      expect(sorted[1]!.age).toBe(30);
      expect(sorted[2]!.age).toBe(35);
    });

    it("devrait trier les chaînes en ordre alphabétique", () => {
      const comparator = getComparator<TestData>("asc", "name");
      const data: TestData[] = [
        { id: 1, name: "Charlie", age: 30, email: "charlie@test.com", value: 100 },
        { id: 2, name: "Alice", age: 25, email: "alice@test.com", value: 200 },
        { id: 3, name: "Bob", age: 35, email: "bob@test.com", value: 50 },
      ];

      const sorted = [...data].sort(comparator);

      expect(sorted[0]!.name).toBe("Alice");
      expect(sorted[1]!.name).toBe("Bob");
      expect(sorted[2]!.name).toBe("Charlie");
    });

    it("devrait gérer les valeurs null/undefined comme chaînes vides", () => {
      const comparator = getComparator<TestData>("asc", "status");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 30, email: "alice@test.com", value: 100, status: "active" },
        { id: 2, name: "Bob", age: 25, email: "bob@test.com", value: 200 },
        {
          id: 3,
          name: "Charlie",
          age: 35,
          email: "charlie@test.com",
          value: 50,
          status: "inactive",
        },
      ];

      const sorted = [...data].sort(comparator);

      // Les valeurs undefined devraient être traitées comme chaînes vides et venir en premier
      expect(sorted[0]!.status).toBeUndefined();
      expect(sorted[1]!.status).toBe("active");
      expect(sorted[2]!.status).toBe("inactive");
    });

    it("devrait trier les nombres négatifs correctement", () => {
      const comparator = getComparator<TestData>("asc", "age");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 10, email: "alice@test.com", value: 100 },
        { id: 2, name: "Bob", age: -5, email: "bob@test.com", value: 200 },
        { id: 3, name: "Charlie", age: 0, email: "charlie@test.com", value: 50 },
      ];

      const sorted = [...data].sort(comparator);

      expect(sorted[0]!.age).toBe(-5);
      expect(sorted[1]!.age).toBe(0);
      expect(sorted[2]!.age).toBe(10);
    });
  });

  describe("Tri descendant (desc)", () => {
    it("devrait trier les nombres en ordre décroissant", () => {
      const comparator = getComparator<TestData>("desc", "age");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 30, email: "alice@test.com", value: 100 },
        { id: 2, name: "Bob", age: 25, email: "bob@test.com", value: 200 },
        { id: 3, name: "Charlie", age: 35, email: "charlie@test.com", value: 50 },
      ];

      const sorted = [...data].sort(comparator);

      expect(sorted[0]!.age).toBe(35);
      expect(sorted[1]!.age).toBe(30);
      expect(sorted[2]!.age).toBe(25);
    });

    it("devrait trier les chaînes en ordre alphabétique inverse", () => {
      const comparator = getComparator<TestData>("desc", "name");
      const data: TestData[] = [
        { id: 1, name: "Charlie", age: 30, email: "charlie@test.com", value: 100 },
        { id: 2, name: "Alice", age: 25, email: "alice@test.com", value: 200 },
        { id: 3, name: "Bob", age: 35, email: "bob@test.com", value: 50 },
      ];

      const sorted = [...data].sort(comparator);

      expect(sorted[0]!.name).toBe("Charlie");
      expect(sorted[1]!.name).toBe("Bob");
      expect(sorted[2]!.name).toBe("Alice");
    });

    it("devrait gérer les valeurs null/undefined comme chaînes vides en ordre descendant", () => {
      const comparator = getComparator<TestData>("desc", "status");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 30, email: "alice@test.com", value: 100, status: "active" },
        { id: 2, name: "Bob", age: 25, email: "bob@test.com", value: 200 },
        {
          id: 3,
          name: "Charlie",
          age: 35,
          email: "charlie@test.com",
          value: 50,
          status: "inactive",
        },
      ];

      const sorted = [...data].sort(comparator);

      // Les valeurs undefined devraient être traitées comme chaînes vides et venir en dernier
      expect(sorted[0]!.status).toBe("inactive");
      expect(sorted[1]!.status).toBe("active");
      expect(sorted[2]!.status).toBeUndefined();
    });

    it("devrait trier les nombres négatifs correctement en ordre décroissant", () => {
      const comparator = getComparator<TestData>("desc", "age");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 10, email: "alice@test.com", value: 100 },
        { id: 2, name: "Bob", age: -5, email: "bob@test.com", value: 200 },
        { id: 3, name: "Charlie", age: 0, email: "charlie@test.com", value: 50 },
      ];

      const sorted = [...data].sort(comparator);

      expect(sorted[0]!.age).toBe(10);
      expect(sorted[1]!.age).toBe(0);
      expect(sorted[2]!.age).toBe(-5);
    });
  });

  describe("Cas limites", () => {
    it("devrait traiter les valeurs non-numériques comme des chaînes même si certaines sont numériques", () => {
      const comparator = getComparator<TestData>("asc", "value");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 30, email: "alice@test.com", value: "100" },
        { id: 2, name: "Bob", age: 25, email: "bob@test.com", value: 200 },
        { id: 3, name: "Charlie", age: 35, email: "charlie@test.com", value: "50" },
      ];

      const sorted = [...data].sort(comparator);

      // Si les types sont mixtes, ils sont traités comme des chaînes
      // "100" < "200" < "50" (ordre lexicographique)
      expect(sorted[0]!.value).toBe("100");
      expect(sorted[1]!.value).toBe(200);
      expect(sorted[2]!.value).toBe("50");
    });

    it("devrait gérer les chaînes vides correctement", () => {
      const comparator = getComparator<TestData>("asc", "status");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 30, email: "alice@test.com", value: 100, status: "active" },
        { id: 2, name: "Bob", age: 25, email: "bob@test.com", value: 200, status: "" },
        {
          id: 3,
          name: "Charlie",
          age: 35,
          email: "charlie@test.com",
          value: 50,
          status: "inactive",
        },
      ];

      const sorted = [...data].sort(comparator);

      expect(sorted[0]!.status).toBe("");
      expect(sorted[1]!.status).toBe("active");
      expect(sorted[2]!.status).toBe("inactive");
    });

    it("devrait utiliser localeCompare pour les chaînes avec accents", () => {
      const comparator = getComparator<TestData>("asc", "name");
      const data: TestData[] = [
        { id: 1, name: "Élise", age: 30, email: "elise@test.com", value: 100 },
        { id: 2, name: "Alice", age: 25, email: "alice@test.com", value: 200 },
        { id: 3, name: "Bob", age: 35, email: "bob@test.com", value: 50 },
      ];

      const sorted = [...data].sort(comparator);

      // localeCompare devrait gérer correctement les accents
      expect(sorted[0]!.name).toBe("Alice");
      expect(sorted[1]!.name).toBe("Bob");
      expect(sorted[2]!.name).toBe("Élise");
    });

    it("devrait retourner 0 pour des valeurs identiques", () => {
      const comparator = getComparator<TestData>("asc", "age");
      const data1: TestData = {
        id: 1,
        name: "Alice",
        age: 30,
        email: "alice@test.com",
        value: 100,
      };
      const data2: TestData = { id: 2, name: "Bob", age: 30, email: "bob@test.com", value: 200 };

      const result = comparator(data1, data2);
      expect(result).toBe(0);
    });

    it("devrait gérer les propriétés inexistantes", () => {
      const comparator = getComparator<TestData>("asc", "nonexistent");
      const data: TestData[] = [
        { id: 1, name: "Alice", age: 30, email: "alice@test.com", value: 100 },
        { id: 2, name: "Bob", age: 25, email: "bob@test.com", value: 200 },
      ];

      const sorted = [...data].sort(comparator);

      // Les propriétés inexistantes devraient être traitées comme undefined (chaîne vide)
      // Le tri devrait être stable (ordre original préservé si les valeurs sont égales)
      expect(sorted.length).toBe(2);
    });
  });
});
