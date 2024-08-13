// import { Box } from "@mui/material";
// import React from "react";
// import ChatWindow from "./ChatWindow";
// import Input from "../../util/Input";

// export default function ChatPage() {
//   /**
//    * User Input
//    */
//   const [input, setInput] = React.useState("");
//   const handleInputChange = (newInput) => {
//     setInput(newInput);
//   };

//   /*
//    * (dummy) POST request for sending out user input
//    */
//   const handleSend = async () => {
//     if (input.trim() === "") return;
//     const userMessage = { text: input, sender: "user" };
//     setMessages([...messages, userMessage]);
//     setInput("");
//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/comments/1"
//       );
//       //  dummy agent responses
//       agentList.map((agent, index) => {
//         const dummyMessage = {
//           index: index,
//           text: response.data.body,
//           sender: agent,
//         };
//         setMessages((prevMessages) => [...prevMessages, dummyMessage]);
//       });
//       //   const RAMessage = { text: response.data.body, sender: "Reasoner Agent" };
//       //   setMessages((prevMessages) => [...prevMessages, RAMessage]);
//       //   const CoTMessage = { text: response.data.body, sender: "CoT Agent" };
//       //   setMessages((prevMessages) => [...prevMessages, CoTMessage]);
//       //   const AAMessage = { text: response.data.body, sender: "Actor Agent" };
//       //   setMessages((prevMessages) => [...prevMessages, AAMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };
//   const serverUrl = import.meta.env.VITE_SERVER_URL;

  
//   return (
//     <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//       }}
//     >
//       <Box
//         sx={{
//           flexGrow: 1,
//           mt: "64px",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <ChatWindow messages={messages} />
//       </Box>
//       <Box
//         sx={{
//           minHeight: "80px",
//           width: "100%",
//           alignSelf: "stretch",
//           position: "sticky",
//           bottom: 0,
//           bgcolor: "#FFFFFF",
//           zIndex: 1,
//         }}
//       >
//         <Input
//           input={input}
//           onInputChange={handleInputChange}
//           handleSend={handleSend}
//           agents={agentList}
//           maxRows={6}
//         />
//       </Box>
//     </Box>
//   );
// }
