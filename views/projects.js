const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");




let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = projectData.map(p => {
        const sectorObj = sectorData.find(s => s.id === p.sector_id);
        return {
          ...p,
          sector: sectorObj ? sectorObj.sector_name : "Unknown"
        };
      });
      resolve();
    } catch (err) {
      reject("Initialization failed");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No projects found.");
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => p.id === parseInt(projectId));
    project ? resolve(project) : reject("Project not found.");
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const matches = projects.filter(p =>
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
    matches.length > 0 ? resolve(matches) : reject("No matching projects.");
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector
};
