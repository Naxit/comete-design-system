import type { Order } from "../components/Table/Table.types";

export function getComparator<T>(order: Order, orderBy: string): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => {
        const aValue = (a as Record<string, unknown>)[orderBy];
        const bValue = (b as Record<string, unknown>)[orderBy];
        if (typeof bValue === "number" && typeof aValue === "number") {
          return bValue - aValue;
        }
        const aStr = String(aValue ?? "");
        const bStr = String(bValue ?? "");
        return bStr.localeCompare(aStr);
      }
    : (a, b) => {
        const aValue = (a as Record<string, unknown>)[orderBy];
        const bValue = (b as Record<string, unknown>)[orderBy];
        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        }
        const aStr = String(aValue ?? "");
        const bStr = String(bValue ?? "");
        return aStr.localeCompare(bStr);
      };
}
