/********************************************************************************
 *  WEB322 – Assignment 03
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Haadi Imran Mithawala    Student ID: 173049230    Date: 2025-06-24
 *  Published URL: https://<your-vercel-url>.vercel.app
 *
 ********************************************************************************/
const express = require("express");
const path = require("path");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;
const projects = require("./data/projectData.json");

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ---------- ROUTES ----------

// Home page
app.get("/", (req, res) => {
  res.render("home", { page: "/" });
});

// About page
app.get("/about", (req, res) => {
  res.render("about", { page: "/about" });
});

// All projects or filter by sector
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  let filteredProjects = projects;

  if (sector) {
    filteredProjects = projects.filter(
      (p) => p.sector && p.sector.toLowerCase() === sector.toLowerCase()
    );
  }

  res.render("projects", { page: "/solutions/projects", projects: filteredProjects });
});

// Single project by ID
app.get("/solutions/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return res.status(404).render("404", { page: "", message: "Project not found." });
  }

  res.render("project", { page: "", project });
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).render("404", { page: "", message: "Page not found." });
});

// Start server
app.listen(HTTP_PORT, () => {
  console.log(`Server running at http://localhost:${HTTP_PORT}`);
});