import { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Rating,
  IconButton,
  CardHeader,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import { getBook, getImage, deleteBook } from "../books";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BookMUI() {
  const [book, setBook] = useState(undefined);
  const [, setVirhe] = useState("Haetaan");
  const { bookId } = useParams();
  const navigate = useNavigate();

  const getOneBook = async (id) => {
    try {
      let data = await getBook(id);
      setBook(data);
      setVirhe("");
    } catch (error) {
      setVirhe("Haku ei onnistunut");
    }
  };

  useEffect(() => {
    getOneBook(bookId);
  }, []);

  const doDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      await getOneBook();
      setVirhe("");
      navigate("/books/");
    } catch (error) {
      setVirhe("Poistaminen epäonnistui");
    }
  };

  const doEditBook = async (id) => {
    navigate("/books/" + id + "/edit");
  };

    /* tällä estetään sivun renderointi ennen kuin tiedot on saatu backistä */
  if (book === undefined) {
    return <h1>Ladataan...</h1>;
  }


  return (
    <Grid container justifyContent="center">
      <Box width={500} padding={10}>
        <Card>
          <CardHeader title={book.title} subheader={book.author} />
          <Rating value={book.rate} readOnly precision={0.5} />

          <Box sx={{ padding: 3 }}>
            <CardMedia
              sx={{ borderRadius: 2.5, border: 1 }}
              component="img"
              height="250"
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
            <IconButton color="primary" size="small" onClick={doEditBook.bind(null, book.id)}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              size="small"
              onClick={(e) => doDeleteBook(book.id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}
export default BookMUI;
