import express from "express"; // Imports the Express module
import bodyParser from "body-parser"; // Imports the body-parser module for parsing request bodies
import cors from "cors"; // Imports the CORS module for enabling Cross-Origin Resource Sharing
import mysql from "mysql"; // Import the mysql package for connecting to a MySQL database

const app = express();//Creates an Express application
const port = 3002;

app.use(cors());// Enables CORS middleware to allow cross-origin requests

app.use(bodyParser.json()); // Sets up middleware to parse incoming JSON data in the Express application

// Establishes a connection to the MySQL database server using the provided credentials and selects the "to_do_list" database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
});

// Establishes a connection to the MySQL database and logs whether the connection was successful or if there was an error
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Graceful shutdown on SIGINT (CTRL+C)
process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  db.end();
  process.exit(0);
});

// Route: GET / - Returns all To-Do items
app.get("/", (req, res) => {
  const query = "SELECT * FROM todo_items";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching items:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// Route: PUT /:id/complete - Marks a To-Do item as completed
app.put("/:id/complete", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE todo_items SET completed = TRUE WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error updating item:", err);
      res.status(500).send("Error marking item as completed");
    } else {
      res.send("Item marked as completed successfully!");
    }
    console.log(`Completed data ID: ${id}`);
  });
});


// Route: POST / - Adds a new To-Do item
app.post("/", (req, res) => {
  const { text } = req.body;
  const query = "INSERT INTO todo_items (text) VALUES (?)";
  db.query(query, [text], (err, result) => {
    if (err) {
      console.error("Error adding item:", err);
      res.status(500).send("Error adding item");
    } else {
      const id = result.insertId;
      console.log(`Entry data : ${text}`)
      console.log(`Input data ID : ${id}`);
      res.send("Added note successfully!!");
    }
    
  });
});

// Route: DELETE /:id - Deletes a To-Do item by ID
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todo_items WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting item:", err);
      res.status(500).send("Error deleting item");
    } else {
      res.send("Deleted note successfully!!");
    }
    console.log(`Deleted data ID: ${id}`);
  });
});

// Starts the server 
app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});