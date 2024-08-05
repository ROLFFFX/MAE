import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";

const Chat = ({ messages }) => {
  const conversationEndRef = useRef(null);
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box>
      <ConversationBox>
        {messages.map((message, index) => (
          <MessageBox key={index} sender={message.sender}>
            {message.sender !== "user" && (
              <Avatar
                {...stringAvatar(message.sender.toUpperCase())}
                sx={{ marginRight: 2, height: 28, width: 28, fontSize: 14 }}
              />
            )}
            <Typography variant="body1">{message.text}</Typography>
          </MessageBox>
        ))}
        <div ref={conversationEndRef} />
      </ConversationBox>
    </Box>
  );
};

export default Chat;

const MessageBox = styled(Box)(({ theme, sender }) => ({
  maxWidth: "60%",
  padding: theme.spacing(1.5),
  margin: theme.spacing(1),
  borderRadius: theme.spacing(2),
  backgroundColor: sender === "bot" ? "#F8F9FA" : "#F8F9FA",
  alignSelf: sender === "user" ? "flex-end" : "flex-start",
  display: "flex",
  alignItems: "center",
}));

const ConversationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  maxHeight: "80vh",
  overflowY: "auto",
  width: "100%",
}));

const stringAvatar = (name) => {
  const nameParts = name.split("_");
  return {
    children: `${nameParts[0][0]}${nameParts[1] ? nameParts[1][0] : ""}`,
  };
};
