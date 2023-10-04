import {
  MenuItem,
  TextField,
  Card,
  CardHeader,
  CardActions,
  IconButton,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { getBooks } from "../books";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchMUI(props) {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const [option, setOption] = useState("title");
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [virhe, setVirhe] = useState("Haetaan");

  const listBooks = async () => {
    try {
      let data = await getBooks();
      setBooks(data);

      setVirhe("");
    } catch (error) {
      setVirhe("Tietojen haku ei onnistunut");
    }
  };

  useEffect(() => {
    listBooks();
  }, []);

  const change = (e) => {
    setKeyword(e.target.value);
    setSearch(false);
  };

  const doSearch = () => {
    setSearch(true);
  };

  const openBook = (id) => {
    navigate("/books/" + id);
  };

  const searchBook = (e) => {
    if (search) {
      let result;
      if (option === "title") {
        result = books.filter((book) =>
          book.title.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        result = books.filter((book) =>
          book.author.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      if (result.length > 0) {
        const search = result.map((book) => {
          return (
            <Card key={book.id}>
              <CardHeader title={book.title} subheader={book.author} />
              <CardActions>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={openBook.bind(null, book.id)}
                >
                  <InfoIcon />
                  Lisätietoja
                </IconButton>
              </CardActions>
            </Card>
          );
        });
        return search;
      } else {
        return (
          <Typography>Kyseisellä hakusanalla ei löytynyt kirjoja</Typography>
        );
      }
    }
  };

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <Grid sx={{ marginTop: "20px" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Hakusana"
          name="keyword"
          value={keyword}
          onChange={(e) => change(e)}
          fullWidth
        />
        <TextField
          select
          value={option}
          label="Valitse"
          onChange={handleChange}
        >
          <MenuItem value={"title"}>Nimi</MenuItem>
          <MenuItem value={"author"}>Kirjailija</MenuItem>
        </TextField>
        <Button
          onClick={(e) => doSearch(e)}
          color="primary"
          size="large"
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          <SearchIcon />
          Hae
        </Button>

        {searchBook()}
      </Box>
    </Grid>
  );
}

export default SearchMUI;
