import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database setup
  const db = new Database('database.sqlite');
  db.exec(`
    CREATE TABLE IF NOT EXISTS estimations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      type TEXT,
      location TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS vendre (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      location TEXT,
      surface TEXT,
      rooms TEXT,
      bedrooms TEXT,
      price TEXT,
      description TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/estimation", (req, res) => {
    const { category, type, location, name, email, phone } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO estimations (category, type, location, name, email, phone) VALUES (?, ?, ?, ?, ?, ?)');
      stmt.run(category, type, location, name, email, phone);
      res.json({ success: true, message: "Estimation request received" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error saving estimation" });
    }
  });

  app.post("/api/vendre", (req, res) => {
    const { type, location, surface, rooms, bedrooms, price, description, name, email, phone } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO vendre (type, location, surface, rooms, bedrooms, price, description, name, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
      stmt.run(type, location, surface, rooms, bedrooms, price, description, name, email, phone);
      res.json({ success: true, message: "Vendre request received" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error saving vendre request" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
