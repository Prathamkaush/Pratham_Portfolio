import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));


const projects = {
  "books-app": {
  "title": "Books Management App",
  "description": "A web application to manage and explore a collection of books with features like adding, updating, and deleting book records.",
  "technologies": ["Node.js", "Express.js", "PostgreSQL", "Bootstrap"],
  "features": [
    "Add / Update / Delete books",
    "View detailed book information",
    "Search and filter books",
    "Responsive and user-friendly UI",
    "Data stored securely in PostgreSQL"
  ],
  "github": "https://github.com/Prathamkaush/book-keeping-blog",
  "live": "https://book-keeping-blog.onrender.com/",
  "screenshots": ["/images/Screenshot (8).png", "/images/Screenshot (9).png"]
}
,

  "portfolio": {
    title: "Portfolio Website",
    description: "My personal portfolio to showcase skills, projects, and achievements.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js (Express)"],
    features: [
      "Fully responsive design",
      "Smooth animations",
      "Projects showcase",
      "Contact form with validation"
    ],
    github: "https://github.com/pratham/portfolio",
    live: "https://pratham-portfolio.com",
    screenshots: ["/images/Screenshot (10).png", "/images/Screenshot (11).png"]
  }
};

// Route to all projects

app.get('/',(req,res)=>{
    res.render('index', { title: 'Pratham Portfolio' });
})

app.get('/about',(req,res)=>{
    res.render('about', { title: 'About Me' });
})

app.get('/contact',(req,res)=>{
    res.render('contact', { title: 'Contact me' });
})

app.get('/projects',(req,res)=>{
    res.render('projects', { title: 'Projects' });
})

app.get("/projects", (req, res) => {
  res.render("projects"); 
});


app.get("/projects/:id", (req, res) => {
  const project = projects[req.params.id];
  if (project) {
    res.render("project-details", { project });
  } else {
    res.status(404).send("Project not found");
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})