import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import ChatWindow from "./ChatWindow";
import Input from "../../components/Input";
import Loader from "../../components/Loader";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "How could I assist you today?", sender: "Moxin Agent" },
  ]);
  const [agentList, setAgentList] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const getAgentList = async () => {
      setOpenLoader(true);
      try {
        const response = await axios.get(`${serverUrl}/agent_list`);
        setAgentList(response.data.data);
      } catch (error) {
        console.error("Error getting agent list:", error);
      } finally {
        setOpenLoader(false);
      }
    };
    getAgentList();
  }, [serverUrl]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const agentMatch = input.match(/^@(\w+)\s*(.*)/);
    const agentName = agentMatch ? agentMatch[1].toLowerCase() : "reasoner";
    const taskInput = agentMatch ? agentMatch[2] : input;
    const agentPath = getAgentPath(agentName);

    if (!agentPath) {
      console.error("Unknown agent:", agentName);
      return;
    }

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post(`${serverUrl}/run_agent`, {
        agent_name: agentName,
        agent_path: agentPath,
        task_input: taskInput,
        is_load_node_log: true,
        work_dir: "string",
      });

      if (response.data.status === "success") {
        const agentResponse = response.data.data.find(
          (item) => item[`${agentName}_agent`]
        );
        if (agentResponse) {
          const rawResponse = agentResponse[`${agentName}_agent`];
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: rawResponse, sender: agentName },
          ]);
        }
      } else {
        console.error("Error in response:", response.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getAgentPath = (agentName) => {
    switch (agentName) {
      case "reasoner":
        return "mae/agent_link/agent_template/reasoner/scripts/reasoner_agent.py";
      case "web_search":
        return "mae/agent_link/agent_template/web_search/scripts/web_search_agent.py";
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Loader openLoader={openLoader} />
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <ChatWindow messages={messages} />
      </Box>
      <Box
        sx={{
          minHeight: "80px",
          width: "100%",
          position: "sticky",
          bottom: 0,
          bgcolor: "#FFFFFF",
          zIndex: 1,
        }}
      >
        <Input
          input={input}
          onInputChange={setInput}
          handleSend={handleSend}
          agents={agentList}
        />
      </Box>
    </Box>
  );
}
