
import TabMUI from "./navigaatio/TabMUI";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/system";
import BannerContainer from "./Banner/BannerContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewBookMUI from "./MUI/AddNewBookMUI";
import ListMUI from "./MUI/ListMUI";
import FrontPageMUI from "./MUI/FrontPageMUI";
import { Typography } from "@mui/material";
import BookMUI from "./MUI/BookMUI";



const tags = [
  "romantiikka",
  "jännitys",
  "dekkari",
  "chick lit",
  "Hildur-sarja",
  "romaani",
  "lastenkirjallisuus",
  "fantasia",
  "historiallinen romaani"
]




const theme = createTheme({
  palette: {
    mode: 'dark',
    
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#D9ACF5',
      
    },
    secondary: {
      light: '#0066ff',
      main: '#AAE3E2',
      
    },
  }, // Värimaailma
  typography: {
    fontFamily: "'Quicksand', 'sans-serif'", } // Fontti
});

function BookListApp() {
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BannerContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TabMUI />}>
              <Route index element={<FrontPageMUI />} />
              <Route
                path="frontpage"
                element={<FrontPageMUI />}
              />
              <Route path="add" element={<AddNewBookMUI  tags={tags} />} />
              <Route path="books" element={<ListMUI />} />
              <Route path="books/:bookId" element={<BookMUI />} />
              <Route path="books/:bookId/edit" element={<AddNewBookMUI tags={tags}/>} />
              <Route path="*" element={<Typography>Sivua ei ole</Typography>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  );
}

export default BookListApp;
