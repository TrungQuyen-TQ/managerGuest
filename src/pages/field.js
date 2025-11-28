/* eslint-disable react/jsx-max-props-per-line */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Typography, Link, CardMedia, Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Market() {
  const router = useRouter();

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="http://eo.b.tisbase.site/exam-field">
          {/* {window.sessionStorage.setItem("market", JSON.stringify(market[0]))} */}
          CSoft 2024 - version v1.4
        </Link>
      </Typography>
    );
  }
  const handleExamFiedSelection = (examFieldItem) => {
    router.push("/");
    window.sessionStorage.setItem("field", examFieldItem);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "neutral.main",
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Chọn lĩnh vực
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 3 }} maxWidth="md">
          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleExamFiedSelection("Tiếng Anh")}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                  Tiếng Anh
                </Typography>
                <CardMedia
                  sx={{ height: 190 }}
                  image={"assets/page/english.jpg"}
                  title="Tiếng Anh"
                />
              </Card>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleExamFiedSelection("Tiếng Nhật")}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                  Tiếng Nhật
                </Typography>
                <CardMedia
                  sx={{ height: 190 }}
                  image={"assets/page/japan.jpg"}
                  title="Tiếng Nhật"
                />
              </Card>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleExamFiedSelection("Lái xe")}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                  Lái xe
                </Typography>
                <CardMedia sx={{ height: 190 }} image={"assets/page/lai_xe.jpg"} title="Lái xe" />
              </Card>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleExamFiedSelection("Tin học")}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ margin: "0 auto" }}>
                  Tin học
                </Typography>
                <CardMedia sx={{ height: 190 }} image={"assets/page/tin_hoc.png"} title="Tin học" />
              </Card>
            </Grid2>
          </Grid2>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Macaron
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
