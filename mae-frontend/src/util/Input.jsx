import AtIcon from "@mui/icons-material/AlternateEmail";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

const agents = [
  "Reasoner Agent",
  "Actor Agent",
  "Actor Agent",
  "RA + AA + Loop",
];

function Input({ input, onInputChange, handleSend }) {
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
      onInputChange("");
    }
  };
  const handleSendClick = () => {
    handleSend();
    onInputChange("");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
          <IconButton edge="start" onClick={handleClickMenu}>
            <AtIcon />
          </IconButton>
        </InputAdornment>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {agents.map((agent, index) => (
            <MenuItem
              key={index}
              onClick={handleCloseMenu}
              sx={{ fontSize: 14 }}
            >
              {agent}
            </MenuItem>
          ))}
        </Menu>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send a message"
          multiline
          maxRows={6}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
                <IconButton edge="end" onClick={handleSendClick}>
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
