const express = require('express');
const bodyParser = require('body-parser');
const sqlite4 = require('sqlite3');
const cors = require('cors');
const app = express();
const port=8080
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
  }));

app.use(bodyParser.json());

const db =  new sqlite4.Database("./mydb.db" , sqlite4.OPEN_READWRITE , (err)=>{
if(err) return console.error(err.message);

});

//Creating Table if not exits in the Database
mq='CREATE TABLE IF NOT EXISTS users (name TEXT,email TEXT UNIQUE)';

db.run(
    // 'Create Table if not exists users (name, email)'
    mq
);

//Root api
app.get('/', (req, res) => {
   res.json("At the root file");
  });

//API to insert value from React Form to database
app.post('/post-data', (req, res) => {
    const { name, email } = req.body;
    const db =  new sqlite4.Database("./mydb.db" , sqlite4.OPEN_READWRITE , (err)=>{
        if(err) return console.error(err.message);
        });
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.run(sql, [name, email], (err) => {
      if (err) {
        res.json("Gmail Already Exist");
        // res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json("Data successfully inserted into the database");
      }
    });
    db.close();
  });



//api to show all data 
app.get("/show-all-data" , (req , res)=>{
    const sql = 'Select * from users';
    const db =  new sqlite4.Database("./mydb.db" , sqlite4.OPEN_READWRITE , (err)=>{
        if(err) return console.error(err.message);
        });

    db.all(sql, [], (err, rows)=>{
    if(err) return console.error(err.message);
    const a = []

    rows.forEach((row)=>{
        console.log(row);
        a.push(row)

    });
    res.json(a)
    db.close();
    
});
})


 //api to check the user is exist or not if exist then return the gmail addess associated with the user
app.post('/check-user', (req, res) => {
    var { user } = req.body;
    const db = new sqlite4.Database("./mydb.db", sqlite4.OPEN_READWRITE, (err) => {
      if (err) return console.error(err.message);
    });
    const query = `SELECT * FROM users WHERE name = '${user}'`;
    const data='';
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (rows.length > 0) {
        console.log("User exists in the database");
          let data = [];
        rows.forEach((row) => {
        console.log(data);
        data.push(row.email);
        });
          res.json(data)   
        } else {
          res.json("User does not exist in the database");
        }
      }
    });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  });




  //delete by name
  app.post('/delete-user', (req, res) => {
    var { user } = req.body;
    const db = new sqlite4.Database("./mydb.db", sqlite4.OPEN_READWRITE, (err) => {
      if (err) return console.error(err.message);
    });
    const query = `DELETE FROM users WHERE name = '${user}'`;
    console.log(query)
    
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (rows.length == 0) {
        res.json("User Deleted");  
        } else {
          res.json("User does not exist in the database");
        }
      }
    });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  });
  

  app.post('/Edit-user', (req, res)=>{
    var {name, email} = req.body;
    const db = new sqlite4.Database("./mydb.db", sqlite4.OPEN_READWRITE, (err)=>{
      if(err) return console.error(err.message);
    });
    const query =`UPDATE USERS SET Name='${name}' Where email='${email}'`;

    db.run(query, function(err) {
      if (err) {
        res.json(err.message);
      }
      res.json(`${this.changes} record(s) updated`);
    });
    db.close();
  })


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
// console.log("--------------")
// const sql = 'INSERT INTO users (name, email) values(?,?)';
// db.run(sql, ["irfan","irfan@mgmail.com"], (err)=>{
//     if(err) return console.error(err.message);

//     console.log("A new row inserted into the database") ;
// });

// db.close((err)=>{
//     if(err) return console.log(err.message);
// });



