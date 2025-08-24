import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

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
    github: "https://github.com/Prathamkaush/Pratham_Portfolio",
    live: "https://pratham-portfolio-skz7.onrender.com/",
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

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await db.query(
      "INSERT INTO portfolio_contacts (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.render("contact.ejs",  { successMessage: "✅ Message sent successfully!", failureMessage: null });
  } catch (err) {
    console.error("Error inserting contact:", err);
    res.status(500).render("contact.ejs" , { successMessage: null, failureMessage: "❌ Failed to send message. Please try again later." });
  }
});

app.get('/contact-sub', async(req,res)=>{
  const result = await db.query("SELECT * FROM portfolio_contacts");
  const contacts = result.rows;
    res.render('contact-sub', { contacts});
})

app.post('/delete/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    await db.query("DELETE FROM portfolio_contacts WHERE id = $1", [contactId]);
    res.redirect('/contact-sub');
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).send("Error deleting contact");
  }
});
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