const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("books.db");

db.serialize(() => {
  let sql = `
    CREATE TABLE book (
        id integer PRIMARY KEY  AUTOINCREMENT NOT NULL,
        title text NOT NULL,
        author text NOT NULL,
        rate real,
        image text,
        timeStamp datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `;

  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu tehtiin");
  });

  sql =
    "INSERT INTO `book` (`id`, `title`, `author`, `rate`, `image`, `timeStamp`) " +
    " VALUES (1, 'Niin pienestä kiinni', 'Lucy Diamond', 4, 'niinpienestakiinni.jpg', '2023-02-12T11:43:23.123Z')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `book` (`id`, `title`, `author`, `rate`, `image`, `timeStamp`) " +
    " VALUES (2, 'Ylpeyttä ja ennakkkoluuloa Bloomsburyn kirjakaupassa', 'Annie Darling', 5, 'yebk.avif', '2023-02-18T11:43:23.123Z')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `book` (`id`, `title`, `author`, `rate`, `image`, `timeStamp`) " +
    " VALUES (3, 'Ja sitten tulit takaisin', 'Jill Mansell', 4.5, 'jasittentulittakaisin.jpeg', '2023-02-18T11:45:23.123Z')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `book` (`id`, `title`, `author`, `rate`, `image`, `timeStamp`) " +
    " VALUES (4, 'Taatelitalvi', 'Maija Kajanto', 5, 'taatelitalvi.avif', '2023-03-03T11:43:23.123Z')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `book` (`id`, `title`, `author`, `rate`, `image`, `timeStamp`) " +
    " VALUES (5, 'Korvapuustikesä', 'Maija Kajanto', 5, 'korvapuustikesa.jpeg', '2023-03-20T11:43:23.123Z')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  db.each("SELECT id, title FROM book", function (err, row) {
    if (err) {
      return console.log(err.message);
    }
    console.log(row.id + ", " + row.title);
  });
});

db.serialize(() => {
  let sql = `
    CREATE TABLE tag (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        book_id integer NOT NULL,
        tag text NOT NULL,
        FOREIGN KEY (book_id) REFERENCES book (id)
    )
    `

  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu tehtiin");
  });

  sql =
    "INSERT INTO `tag` (`id`, `book_id`, `tag`) " +
    " VALUES (1, 1, 'romantiikka')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `tag` (`id`, `book_id`, `tag`) " +
    " VALUES (2, 1, 'feel good')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `tag` (`id`, `book_id`, `tag`) " +
    " VALUES (3, 2, 'romantiikka')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `tag` (`id`, `book_id`, `tag`) " +
    " VALUES (4, 4, 'kahvila Koivu')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql =
    "INSERT INTO `tag` (`id`, `book_id`, `tag`) " +
    " VALUES (5, 5, 'kahvila Koivu')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });


  db.each("SELECT * FROM tag", function (err, row) {
    if (err) {
      return console.log(err.message);
    }
    console.log(row.id + ", " + row.book_id + ", " +row.tag);
  });

  db.close();

});
