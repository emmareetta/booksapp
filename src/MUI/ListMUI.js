import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { Rating, Typography } from "@mui/material";
import { getBooks, getImage } from "../books";
import { useEffect, useState } from "react";
import { Stack, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";


function ListMUI() {
  const [books, setBooks] = useState([]);
  const [virhe, setVirhe] = useState("Haetaan");
  const navigate = useNavigate();

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


  if (virhe.length > 0) {
    return <Typography>{virhe}</Typography>;
  }

  const openBook = (id) => {
  
    navigate("/books/" + id);
  }

  if (books.length === 0) {
    return <Typography>Ei kirjoja näytettäväksi</Typography>;
  }

  return (
    <Grid container spacing={4} sx={{ paddingTop: "25px" }}>
      {books.map((book) => {
        return (
          <Grid item key={book.id}>
            <Card
              sx={{
                width: 300,
                border: 1,
                borderColor: "darkGray",
                borderRadius: 2.5,
              }}
            >
              <CardHeader title={book.title} />
              <Rating value={book.rate} readOnly precision={0.5} />

              <Box sx={{ padding: 3 }}>
                <CardMedia
                  sx={{ borderRadius: 2.5, border: 1 }}
                  component="img"
                  height="150"
                  image={getImage(book.image)}
                  alt="Kuva"
                />
              </Box>
              <Stack direction={"row"} spacing={1}>
                {book.tags.map((tag) => (
                  <Chip key={tag} label={tag} color="primary" />
                ))}
              </Stack>
              <CardActions sx={{}}>
                <IconButton color="primary" size="medium" onClick={openBook.bind(null, book.id)}>
                  <SearchIcon />
                </IconButton>
                
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ListMUI;
