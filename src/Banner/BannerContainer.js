import { Typography, Box } from "@mui/material";



function BannerContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100px",
       // backgroundColor: "#FFEBEB",
      }}
    >
      <Typography variant="h1" sx={{color: "#FFCEFE"}}>Kirjakuumetta
      </Typography>
    </Box>
  );
}

export default BannerContainer;
