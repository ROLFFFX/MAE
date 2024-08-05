import { Box, CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import * as React from "react";

export default function Loader({ openLoader }) {
  // const [openLoader, setOpenLoader] = React.useState(false);
  // const handleClose = () => {
  //   setOpenLoader(false);
  // };
  // const handleOpen = () => {
  //   setOpenLoader(true);
  // };
  return (
    <div>
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
    </div>
  );
}
