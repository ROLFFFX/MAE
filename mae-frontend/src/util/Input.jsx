import AtIcon from "@mui/icons-material/AlternateEmail";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

function Input() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          bgcolor: "#FFFFFF",
          p: 1,
          borderRadius: 1,
        }}
      >
        <InputAdornment position="start">
          <IconButton edge="start">
            <AtIcon />
          </IconButton>
        </InputAdornment>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send a message"
          multiline
          maxRows={6}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default Input;
