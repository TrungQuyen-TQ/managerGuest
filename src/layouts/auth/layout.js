/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Grid2 } from "@mui/material";

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid2 container sx={{ flex: "1 1 auto" }}>
        <Grid2
          size={{ xs: 12, md: 12 }}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            ></Box>
          </Box>
          {children}
        </Grid2>
      </Grid2>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
