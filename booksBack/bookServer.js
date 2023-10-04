const express = require("express");
const app = express();

var helmet = require("helmet");
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const cors = require("cors");
app.use(cors());

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("books.db");

app.listen(8080, () => {
  console.log("Node toimii localhost:8080");
});

app.get("/", (req, res, next) => {
  return res.status(200).json({ error: false, message: "Toimii" });
});



app.get("/book/", (req, res, next) => {
  //  https://til.simonwillison.net/sqlite/related-rows-single-query
  db.all(
    `SELECT book.*, json_group_array(tag.tag) filter (where tag.tag is not null) AS tags FROM book 
    LEFT JOIN tag ON (book.id = tag.book_id)
    GROUP BY book.id`,
    (error, results) => {
      if (error) throw error;

      return res.status(200).json(
        results.map((book) => {
          return {
            ...book,
            tags: JSON.parse(book.tags), //kyselyn palauttama json string muunnetaan JavaScript objektiksi
          };
        })
      );
    }
  ); // db.all
});



app.get("/book/:id", (req, res, next) => {
  const id = req.params.id;

  db.get(
    `SELECT book.*, json_group_array(tag.tag) filter (where tag.tag is not null) AS tags FROM book 
    LEFT JOIN tag ON (book.id = tag.book_id) where book.id=?`,
    [id],
    (error, result) => {
      if (error) throw error;
      if (typeof result == "undefined") {
        return res.status(200).json({});
      }
      return res.status(200).json({...result, tags: JSON.parse(result.tags)});
    }
  ); // db.get
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images"); // Mihin kansioon ladataan
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Millä tiedostonimellä
  },
});

const upload = multer({ storage: storage });


app.post("/book/", upload.single("image"), (req, res, next) => {
  let book = req.body;

  let imgName = null;
  if (req.file) {
    imgName = req.file.originalname;
  }
  
  const tags = JSON.parse(book.tags)

  db.run(
    "INSERT into book (title, author, rate, image) values (?, ?, ?, ?)",
    [book.title, book.author, book.rate, imgName],
    function (error, result) {
      if (error) throw error;

      db.run(
        //yhdellä kyselyllä insertoidaan kaikki tagit, lastId viittaa aiemmin lisättyyn primaryKey arvoon
        "insert into tag (book_id, tag) values " + "(?, ?), ".repeat(tags.length).slice(0, -2) ,
        tags.map((tag) => [this.lastID, tag]).flat(),
        (error, result) => {
          if (error) throw error;
    
          return res.status(200).json({ count: 1, id: this.lastID });
        }
      );
      
    }
  );
});

app.put("/book/:id", upload.single("image"), (req, res, next) => {
  const book = req.body;
  const id = req.params.id;

  let imgName = null;
  if (req.file) {
    imgName = req.file.originalname;
  }
  
  const tags = JSON.parse(book.tags)

  db.run(
    //kuva päivitetään vain tarvittaessa
    "UPDATE book SET title = ?, author = ?, rate = ?, image = " + (imgName === null ? "image" : "?") + " WHERE id = ? ",
    imgName === null ? [book.title, book.author, book.rate, id] : [book.title, book.author, book.rate, imgName, id],
    function (error, result) {
      if (error) throw error;

      db.run(
        //poistetaan kaikki tagit muokattaessa
        "DELETE FROM tag WHERE book_id = ?" , 
        [id],
        (error, result) => {
          if (error) throw error;
          
          db.run(
            //lisätään tagit uudestaan muokattaessa 
            "insert into tag (book_id, tag) values " + "(?, ?), ".repeat(tags.length).slice(0, -2) ,
            tags.map((tag) => [id, tag]).flat(),
            (error, result) => {
              if (error) throw error;
        
              return res.status(200).json({ count: 1, id: id });
            }
          );
        }
      );
      
      

    }
  );
});

app.get("/download/:name", (req, res, next) => {
  let file = "./images/" + req.params.name;
  res.download(file);
});

app.delete("/book/:id", (req, res, next) => {
  let id = req.params.id;

  db.run("DELETE FROM book WHERE id = ?", [id], function (error, result) {
    if (error) throw error;
    return res.status(200).json({ count: this.changes });
  });
});

app.get("*", (req, res, next) => {
  return res
    .status(404)
    .json({ error: true, message: "Ei pyydettyä palvelua" });
});
