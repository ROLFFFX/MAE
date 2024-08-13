import React from "react";
import { Box, CircularProgress, Backdrop } from "@mui/material";

export default function Loader({ openLoader }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openLoader}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="3rem" color="inherit" />
      </Box>
    </Backdrop>
  );
}
