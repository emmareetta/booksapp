import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Rating,
  Stack,
  Autocomplete,
  InputLabel,
  Input,
  Alert,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { addBook, getBook, editBook } from "../books";
import { useNavigate, useParams } from "react-router-dom";

function AddNewBookMUI(props) {
  const { tags } = props;
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    image: "",
    tags: [],
    rate: 0,
  });

  const { bookId } = useParams();

  const [virhe, setVirhe] = useState("");
  const [newBookId, setNewBookId] = useState(undefined);

  const change = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });

    setVirhe("");
  };

  const changeTags = (tags) => {
    setBook({
      ...book,
      tags: tags,
    });

    setVirhe("");
  };

  const changeImage = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.files[0],
    });
    setVirhe("");
  };
  let imgName = "";
  if (book.image !== null) {
    imgName = book.image;
  }

  const addOrEditBook = async (e) => {
    const formData = new FormData();

    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("rate", book.rate);
    formData.append("tags", JSON.stringify(book.tags));

    if ((bookId && typeof book.image === "object") || bookId === undefined) {
      formData.append("image", book.image);
    }
    /* jos book.image on objekti, kirjaa ollaan muokkaamassa joten jos kuvaa ei muuteta käytetään aiempaa kuvaa */

    if (bookId) {
      try {
        await editBook(bookId, formData);
        setBook({ title: "", author: "", rate: "", image: [], tags: [] });
        navigate("/books/" + bookId)
      } catch (error) {
        setVirhe("Muokkaus ei onnistunut");
      }
    } else {
      try {
        const newBookIdResponse = await addBook(formData);
        
        setNewBookId(newBookIdResponse);
        setBook({ title: "", author: "", rate: "", image: [], tags: [] });
        setVirhe("Lisättiin");
      } catch (error) {
        setVirhe("Lisäys ei onnistunut");
        setNewBookId(undefined);
      }
    }
  };

  const cancelChange = (e) => {
    navigate("/books")
  };

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
    if (bookId) {
      getOneBook(bookId);
    }
  }, []);

  return (
    <Paper sx={{ padding: "60px", margin: "10px" }}>
      {newBookId && (
        <Alert severity="success">
          Kirja lisättiin onnistuneesti -{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate("/books/" + newBookId)
            }}
          >
            Näytä Kirja
          </Link>
        </Alert>
      )}
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { marginBottom: 6 }, width: 500 }}
      >
        <TextField
          label="Nimi"
          name="title"
          value={book.title}
          onChange={(e) => change(e)}
          fullWidth
          autoFocus
        />

        <TextField
          label="Kirjailija"
          name="author"
          value={book.author}
          onChange={(e) => change(e)}
          fullWidth
        />

        <Typography>Arvostelu</Typography>
        <Rating
          name="rate"
          aria-label="Arvostelu"
          value={parseFloat(book.rate)}
          onChange={(e) => change(e)}
          precision={0.5}
        />

        <Typography variant="subtitle1" sx={{ paddingTop: 3 }}>
          Lisää tunnisteet
        </Typography>
        <Stack spacing={3} sx={{ width: 500 }}>
          <Autocomplete
            name="tags"
            multiple
            freeSolo
            value={book.tags}
            options={tags}
            onChange={(event, newValue) => {
              changeTags(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="tagit" />
            )}
          />
        </Stack>

        <Input
          accept="image/*"
          name="image"
          type="file"
          id="image"
          onChange={changeImage}
          style={{ display: "none" }}
        />

        <InputLabel htmlFor="image">
          <Typography display="inline">Kansikuva</Typography>
          <Button component="span" startIcon={<AttachmentIcon />} />
          <Typography display="inline">
            {book.image
              ? typeof book.image === "object"
                ? book.image.name
                : book.image
              : ""} {/* notaatiotapa: ehto ? on tosi : ei ole tosi */}
              
          </Typography>
        </InputLabel>

        <Box>
          <Button
            onClick={(e) => addOrEditBook(e)}
            variant="contained"
            sx={{ marginRight: 3 }}
          >
            {bookId ? "Tallenna muutokset" : "Lisää"}
          </Button>
          <Button
            onClick={(e) => cancelChange(e)}
            variant="contained"
            color="secondary"
            
          >
            Peruuta
          </Button>
        </Box>
        {virhe}
      </Box>
    </Paper>
  );
}

export default AddNewBookMUI;
