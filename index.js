const express = require("express");
const mysql = require('mysql');
const app = express();
const pool = dbConnection();

app.set("view engine", "ejs");
app.use(express.static("public"));
 

//routes
app.get('/', async (req, res) => {
  
   //TODO:
   //Retrieve authorId, firstName, lastName
   //Pass info to the view

   //Retrieve list of categories
   //SELECT DISTINCT category 
   //FROM q_quotes
   //ORDER BY category

   let sql = `SELECT firstName, lastName, authorId
              FROM q_authors
              ORDER BY lastName`;

    let cat = `SELECT DISTINCT category FROM q_quotes`;

    let categories = await executeSQL(cat);
    let rows = await executeSQL(sql);
    console.log(categories);

   res.render('index', {"author": rows, "categories":categories})
});

app.get('/searchByAuthor', async (req, res) => {
   //searching quotes by authorId
   let author_id = req.query.authorId;
   let sql = `SELECT firstName, lastName, quote, authorId
              FROM q_authors
              NATURAL JOIN q_quotes
              WHERE authorId = ${author_id}`;
   let rows = await executeSQL(sql);
   console.log(author_id);
   res.render('results', {"quotes":rows})
});


app.get('/searchByKeyword', async (req, res) => {
   //searcsearchByKeywordauthorId
   let keyword = req.query.keyword;
   let sql = `SELECT * From q_quotes
              NATURAL JOIN q_authors
              WHERE quote LIKE '%${keyword}%'`;
   let rows = await executeSQL(sql);
   //console.log(keyword);
   res.render('keyword', {"quotes":rows})

});

app.get('/searchByCategory', async (req, res) => {
   //searching quotes by authorId
   let category = req.query.category; 
   // * is like select everything in the q_quotes
   let sql = `SELECT * From q_quotes
              NATURAL JOIN q_authors
              WHERE category = '${category}'`;
   let rows = await executeSQL(sql);
   console.log(rows)
   //what kind data you want to find? quotes where the categiry is selected
   res.render('category', {"category":rows})
});

app.get('/searchByLikes', async (req, res) => {
   //search by range of likes
   let likes = req.query.likes;
   let sql = `SELECT * FROM q_quotes
              NATURAL JOIN q_authors
              WHERE likes < ${likes}`;
   let rows = await executeSQL(sql);
   console.log(likes);
   res.render('likes', {"quotes":rows, "likes":likes})

});

app.get('/api/authorInfo', async (req, res) => {
   //searching quotes by authorId
   let author_id = req.query.authorId;
   let sql = `SELECT *
              FROM q_authors
              WHERE authorId = ${author_id}`;
   let rows = await executeSQL(sql);
   //console.log(author_id);
   res.send(rows);
});

app.get('/api/author/:id', async (req, res) => {
   //searching quotes by authorId
   let author_id = req.params.id;
   let sql = `SELECT *
              FROM q_authors
              WHERE authorId = ${author_id}`;
   let rows = await executeSQL(sql);
   //console.log(author_id);
   res.send(rows);
});



app.get("/dbTest", async function(req, res){
let sql = "SELECT CURDATE()";
let rows = await executeSQL(sql);
res.send(rows);
});//dbTest

//functions
async function executeSQL(sql, params){
return new Promise (function (resolve, reject) {
pool.query(sql, params, function (err, rows, fields) {
if (err) throw err;
   resolve(rows);
});
});
}//executeSQL
//values in red must be updated
function dbConnection(){

   const pool  = mysql.createPool({

      connectionLimit: 10,
      host: "x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      user: "jbujpgcwh0slwrkp",
      password: "e62mvhxl3ak0v2ze",
      database: "ebnlpsznktwvls96"

   }); 

   return pool;

} //dbConnection

//start server
app.listen(3000, () => {
console.log("Expresss server running...")
} )