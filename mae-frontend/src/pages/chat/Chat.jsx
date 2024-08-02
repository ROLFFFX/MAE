import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const MessageBox = styled(Box)(({ theme, sender }) => ({
  maxWidth: "60%",
  padding: theme.spacing(1.5),
  margin: theme.spacing(1),
  borderRadius: theme.spacing(2),
  backgroundColor: sender === "bot" ? "#F8F9FA" : "#F8F9FA",
  alignSelf: sender === "bot" ? "flex-start" : "flex-end",
  // boxShadow: theme.shadows[1],
}));

const ConversationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  maxHeight: "80vh",
  overflowY: "auto",
  width: "100%",
}));

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
            <Typography variant="body1">{message.text}</Typography>
          </MessageBox>
        ))}
        <div ref={conversationEndRef} />
      </ConversationBox>
    </Box>
  );
};

export default Chat;
