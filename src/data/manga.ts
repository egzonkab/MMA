import type { Manga } from "../types";

export const mangaList: Manga[] = [
  {
    id: 1,
    title: "Naruto",
    description: "Ein junger Ninja auf der Suche nach Anerkennung.",
    chapters: 700,
    rating: 8,
    genre: "Shonen"
  },
  {
    id: 2,
    title: "One Piece",
    description: "Die Abenteuer von Monkey D. Luffy und seiner Piratencrew.",
    chapters: 1100,
    rating: 10,
    genre: "Shonen"
  },
  {
    id: 3,
    title: "Vinland Saga",
    description: "Die Geschichte von Thorfinn und seiner Suche nach Sinn und Rache.",
    chapters: 210,
    rating: 10,
    genre: "Seinen"
  }
];