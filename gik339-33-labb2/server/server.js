// Variabeldeklarationer
const express = require("express");
const server = express();

// Importera npm-paketet sqlite3
const sqlite3 = require("sqlite3").verbose();

// Övergripande inställningar (kopierat från uppgiftsbeskrivningen)
server
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', '*');
res.header('Access-Control-Allow-Methods', '*');
next();
});

server.listen(3000, () => console.log('Server is running on port 3000'));
    
// GET-routen för /users endpoint enligt instruktioner
server.get("/users", (req, res) => {
    // Variabel för att lagra databaskopplning
    const db = new sqlite3.Database("./gik339-labb2.db");

    db.all("SELECT * FROM USERS", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(rows);
        }
    });
    
  });



