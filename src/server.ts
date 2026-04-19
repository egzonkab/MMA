import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { Anime, Manga } from "./types";
import { animeList } from "./data/anime";
import { mangaList } from "./data/manga";

const app = express();
const PORT = 3000;
const _dir = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(_dir, "..", "public")));

let nextAnimeId =
  animeList.length > 0 ? Math.max(...animeList.map((a) => a.id)) + 1 : 1;

let nextMangaId =
  mangaList.length > 0 ? Math.max(...mangaList.map((m) => m.id)) + 1 : 1;

// ---------- Hilfsfunktionen ----------

function filterAnime(search?: string, genre?: string) {
  let result = animeList;

  if (genre) {
    result = result.filter(
      (a) => a.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (search) {
    result = result.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return result;
}

function filterManga(search?: string, genre?: string) {
  let result = mangaList;

  if (genre) {
    result = result.filter(
      (m) => m.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (search) {
    result = result.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return result;
}

// ---------- ANIME CRUD ----------

// GET alle Anime + Filter
app.get("/api/anime", (req, res) => {
  const search = req.query.search ? String(req.query.search) : undefined;
  const genre = req.query.genre ? String(req.query.genre) : undefined;

  res.json(filterAnime(search, genre));
});

// GET einzelner Anime
app.get("/api/anime/:id", (req, res) => {
  const id = Number(req.params.id);
  const anime = animeList.find((a) => a.id === id);

  if (!anime) {
    res.status(404).json({ message: "Anime nicht gefunden" });
    return;
  }

  res.json(anime);
});

// POST Anime
app.post("/api/anime", (req, res) => {
  const { title, description, episodes, rating, genre } = req.body;

  const newAnime: Anime = {
    id: nextAnimeId++,
    title,
    description,
    episodes,
    rating,
    genre
  };

  animeList.push(newAnime);
  res.status(201).json(newAnime);
});

// PUT Anime
app.put("/api/anime/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = animeList.findIndex((a) => a.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Anime nicht gefunden" });
    return;
  }

  const { title, description, episodes, rating, genre } = req.body;

  animeList[index] = {
    ...animeList[index],
    title,
    description,
    episodes,
    rating,
    genre
  };

  res.json(animeList[index]);
});

// DELETE Anime
app.delete("/api/anime/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = animeList.findIndex((a) => a.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Anime nicht gefunden" });
    return;
  }

  animeList.splice(index, 1);
  res.status(204).send();
});

// ---------- MANGA CRUD ----------

// GET alle Manga + Filter
app.get("/api/manga", (req, res) => {
  const search = req.query.search ? String(req.query.search) : undefined;
  const genre = req.query.genre ? String(req.query.genre) : undefined;

  res.json(filterManga(search, genre));
});

// GET einzelner Manga
app.get("/api/manga/:id", (req, res) => {
  const id = Number(req.params.id);
  const manga = mangaList.find((m) => m.id === id);

  if (!manga) {
    res.status(404).json({ message: "Manga nicht gefunden" });
    return;
  }

  res.json(manga);
});

// POST Manga
app.post("/api/manga", (req, res) => {
  const { title, description, chapters, rating, genre } = req.body;

  const newManga: Manga = {
    id: nextMangaId++,
    title,
    description,
    chapters,
    rating,
    genre
  };

  mangaList.push(newManga);
  res.status(201).json(newManga);
});

// PUT Manga
app.put("/api/manga/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mangaList.findIndex((m) => m.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Manga nicht gefunden" });
    return;
  }

  const { title, description, chapters, rating, genre } = req.body;

  mangaList[index] = {
    ...mangaList[index],
    title,
    description,
    chapters,
    rating,
    genre
  };

  res.json(mangaList[index]);
});

// DELETE Manga
app.delete("/api/manga/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mangaList.findIndex((m) => m.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Manga nicht gefunden" });
    return;
  }

  mangaList.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});