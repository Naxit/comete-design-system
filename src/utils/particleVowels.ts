/**
 * Retourne la particule 'd' ou 'de' en fonction de la première lettre de la chaîne de texte.
 * @param string - La chaîne de texte à vérifier.
 * @returns La particule 'd' ou 'de' en fonction de la première lettre de la chaîne de texte.
 */
const particleVowels = (string: string): string => {
  const vowels = ["a", "e", "i", "o", "u", "y"];
  return vowels.includes(string.charAt(0)) ? "d'" : "de ";
};

export { particleVowels };
