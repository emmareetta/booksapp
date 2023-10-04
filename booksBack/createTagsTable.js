const { id } = require("date-fns/locale");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("tags.db");

db.serialize(() => {
  let sql =
    "CREATE TABLE tag (" +
    "id integer PRIMARY KEY  AUTOINCREMENT NOT NULL, " +
    "tag text NOT NULL, " +
    "FOREIGN KEY(id) REFERENCES (book(id)) )";

  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Taulu tehtiin");
  });

  sql = "INSERT INTO `tag` (`id`, `tag`) " + " VALUES (1, 'romantiikka')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `tag` (`id`, `tag`) " + " VALUES (1, 'feel good)";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `tag` (`id`, `tag`) " + " VALUES (2, 'romantiikka')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `tag` (`id`, `tag`) " + " VALUES (4, 'kahvila Koivu')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  sql = "INSERT INTO `tag` (`id`, `tag`) " + " VALUES (5, 'kahvila Koivu')";
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Rivi lisättiin");
  });

  db.each("SELECT id, title FROM tag", function (err, row) {
    if (err) {
      return console.log(err.message);
    }
    console.log(row.id + ", " + row.tag);
  });

  db.close();
});
