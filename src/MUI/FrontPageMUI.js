import {
  Typography,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchMUI from "./SearchMUI";
import { useState } from "react";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getBooks, getImage } from "../books";
import { useEffect } from "react";




function FrontPage(props) {
  
  const [books, setBooks] = useState([]);
  const [, setVirhe] = useState("Haetaan");  
  
  const listBooks = async () => {
    try{
      let data = await getBooks();
      setBooks(data);
   
      setVirhe("");
    } catch (error) {
      setVirhe("Tietojen haku ei onnistunut")
    }
  }

  useEffect(() => {
    listBooks();
  }, []);

  return (
    <Grid container justifyContent="center">
     
      <Box sx={{width: 700}}>
      
        <SearchMUI books={props.books} />

        <Typography variant="h6" sx={{paddingTop: 5, paddingBottom: 5}}>
          Tervetuloa Kirjakuumetta sovellukseen. Kirjakuumetta on tehty opiskelujeni Front-End opintojakson harjoitustyönä keväällä 2023.
           Ohjelmassa voi tallentaa kirjoja tietokantaan, muokata kirjan tietoja ja poistaa kirjan
          tarpeen mukaan. Ohjelma myös listaa tietokannan kirjat ja niitä voidaan hakea kirjailijan tai kirjan nimen perusteella.
        </Typography>

        <ImageList sx={{ width: 700, height: 500 }} cols={3} rowHeight={234} variant="quilted">
          {books.map((book) => (
            <ImageListItem key={book.id}>
              <img
                src={`${getImage(book.image)}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${getImage(book.image)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={book.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Grid>
  );
}

export default FrontPage;
