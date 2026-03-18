import { particleVowels } from "./particleVowels";

describe("particleVowels", () => {
  it('retourne "d\'" quand le mot commence par une voyelle minuscule', () => {
    expect(particleVowels("ami")).toBe("d'");
    expect(particleVowels("ecole")).toBe("d'");
    expect(particleVowels("institut")).toBe("d'");
    expect(particleVowels("orchestre")).toBe("d'");
    expect(particleVowels("univers")).toBe("d'");
    expect(particleVowels("yoga")).toBe("d'");
  });

  it('retourne "de " quand le mot commence par une consonne minuscule', () => {
    expect(particleVowels("banane")).toBe("de ");
    expect(particleVowels("chat")).toBe("de ");
    expect(particleVowels("fruit")).toBe("de ");
  });

  it('retourne "de " pour les majuscules (comportement actuel)', () => {
    expect(particleVowels("Ami")).toBe("de ");
    expect(particleVowels("Ecole")).toBe("de ");
  });

  it('retourne "de " pour une chaîne vide', () => {
    expect(particleVowels("")).toBe("de ");
  });
});
