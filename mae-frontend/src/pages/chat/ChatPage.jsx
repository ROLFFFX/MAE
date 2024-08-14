import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import ChatWindow from "./ChatWindow";
import Input from "../../components/Input";
import Loader from "../../components/Loader";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    // { text: "How could I assist you today?", sender: "Moxin Agent" },
    // {
    //   text: '{\'web_search_results\': "## Answer: Paris Olympic Games Overview\\n\\nThe **2024 Summer Olympics**, officially known as the **Games of the XXXIII Olympiad**, will take place in **Paris, France**, from **July 28 to August 11, 2024**. This event marks a significant return of the Olympics to Paris, which last hosted the Games in 1924.\\n\\n### Key Information:\\n- **Dates**: July 28 - August 11, 2024\\n- **Location**: Paris, France\\n- **Events**: The Games will feature a wide array of sports, including:\\n  - 3X3 Basketball\\n  - Archery\\n  - Artistic Gymnastics\\n  - Athletics\\n  - Badminton\\n  - Beach Volleyball\\n  - And many more.\\n\\n### Notable Features:\\n- The **opening ceremony** will be a unique event, taking place along the River Seine, showcasing the city\'s iconic landmarks.\\n- Over **10,000 athletes** from around the world are expected to participate, competing for medals in various disciplines.\\n\\n### Additional Resources:\\n- For the official daily competition schedule and live results, visit the [Olympic Schedule & Results - Paris 2024](https://olympics.com/en/paris-2024/schedule).\\n- For the latest news, schedules, and results, check out [Paris 2024 Olympics - Latest News](https://olympics.com/en/paris-2024).\\n- For ticketing information, visit the [Paris 2024 Official Ticketing](https://tickets.paris2024.org/en/).\\n\\n### Conclusion:\\nThe Paris 2024 Olympics promise to be a spectacular event, blending sports, culture, and the vibrant atmosphere of one of the world\'s most beautiful cities. For more detailed updates and information, you can explore the following links:\\n- [2024 Summer Olympics - Wikipedia](https://en.wikipedia.org/wiki/2024_Summer_Olympics)\\n- [NBC Olympics: Paris 2024 Olympic Games](https://www.nbcolympics.com/)\\n- [2024 Paris Olympic Games | AP News](https://apnews.com/hub/2024-paris-olympic-games)\\n\\nFeel free to reach out for more specific inquiries or details!", \'web_search_resource\': \'[{"name": "Olympic Schedule & Results - Paris 2024", "url": "https://olympics.com/en/paris-2024/schedule", "snippet": "28 July official daily competition schedule and live results for Paris 2024. Find out which athletes are taking home medals for which countries."}, {"name": "Paris 2024 Olympics - Latest News, Schedules & Results", "url": "https://olympics.com/en/paris-2024", "snippet": "What sports are in the Olympic Games Paris 2024? \\· 3X3 Basketball \\· Archery \\· Artistic Gymnastics \\· Artistic Swimming \\· Athletics \\· Badminton \\· Basketball \\· Beach ..."}, {"name": "NBC Olympics: Paris 2024 Olympic Games", "url": "https://www.nbcolympics.com/", "snippet": "Visit NBCOlympics.com for Olympics live streams, highlights, schedules, results, news, athlete bios and more from Paris 2024 and Milano Cortina 2026."}, {"name": "2024 Summer Olympics - Wikipedia", "url": "https://en.wikipedia.org/wiki/2024_Summer_Olympics", "snippet": "The 2024 Summer Olympics, officially the Games of the XXXIII Olympiad and branded as Paris 2024, were an international multi-sport event that occurred from ..."}, {"name": "Paris 2024 Official Ticketing \\– Olympic and Paralympic Games", "url": "https://tickets.paris2024.org/en/", "snippet": "Buy your tickets exclusively on the official Paris 2024 ticketing website and take a seat at the biggest sport event in the world."}, {"name": "2024 Olympics: Paris Games conclude with Tom Cruise, H.E.R. ...", "url": "https://www.nbcnews.com/sports/olympics/live-blog/olympics-2024-closing-ceremony-live-updates-rcna162876", "snippet": "The Paris Games culminated in a spectacular closing ceremony. More than 10,000 athletes paraded through the Stade de France north of Paris."}, {"name": "Full Schedule - NBC Olympics", "url": "https://www.nbcolympics.com/full-schedule", "snippet": "Check out our day-by-day schedule to find out when every ceremony, event, and medal event will be played in the 2024 Summer Olympics from Paris!"}, {"name": "Adieu, Paris: you were chic, spectacular and showed how to stage a ...", "url": "https://www.theguardian.com/sport/article/2024/aug/12/paris-olympic-games", "snippet": "Adieu, Paris: you were chic, spectacular and showed how to stage a handsome Games. There has never been a better-dressed Olympics delivering ..."}, {"name": "Paris put on magnificent Olympic Games that will be hard to top", "url": "https://www.usatoday.com/story/sports/columnist/nancy-armour/2024/08/12/paris-olympics-joy-world-needed/74759903007/", "snippet": "From the venues to the sports to the atmosphere, the 2024 Paris Olympics were perfect."}, {"name": "12 things that wowed us at the Paris Olympics - NPR", "url": "https://www.npr.org/2024/08/12/g-s1-16581/paris-olympics-best-moments", "snippet": "Here are some of our standout moments from the Games. That little lump of red is a mascot? I tend to be a grump when it comes to mascots."}, {"name": "Olympics - YouTube", "url": "https://www.youtube.com/olympics", "snippet": "The #Paris2024 Olympic Games \\· The Paris 2024 Olympic and Paralympic Games will be the biggest event ever organised in France. \\· Sport. \\· #Paris2024 - Pictograms."}, {"name": "The Olympic Games - X", "url": "https://x.com/olympics?lang=en", "snippet": "... picture. The Olympic Games \\· @Olympics. \\·. 19h. And now, the end is near. And so, we face the final curtain. As we bid farewell to the Paris 2024 Olympic ..."}, {"name": "Paris 2024 Olympics - Apps on Google Play", "url": "https://play.google.com/store/apps/details?id=org.olympic.app.mobile&hl=en_US", "snippet": "Welcome to the Paris 2024 Olympics app, your personal companion for the Games. Olympics: 26 July - 11 August 2024. Paralympics: 28 August - 8 September 2024"}, {"name": "Olympic Games Paris 2024| Hospitality and Travel Packages ...", "url": "https://hospitalitytravelpackages.paris2024.org/discover/?language=en", "snippet": "Olympic Games Paris 2024| Hospitality and Travel Packages. Hospitalitytravelpackages.paris2024.org."}, {"name": "2024 Paris Olympic Games | AP News", "url": "https://apnews.com/hub/2024-paris-olympic-games", "snippet": "Paris closes the 2024 Olympics with a final star-studded show \\· PARIS (AP) \\— Paris has closed out two and a half extraordinary weeks of Olympic sports and ..."}, {"name": "Paris 2024: memorable Olympic moments you might have missed", "url": "https://www.theguardian.com/sport/article/2024/aug/12/paris-2024-memorable-olympic-moments-you-might-have-missed", "snippet": "Marriage proposals, gender reveals and moments of friendship and solidarity have characterised these Games."}, {"name": "Paris 24 | Olympic Games - World Athletics", "url": "https://worldathletics.org/competitions/olympic-games/paris24", "snippet": "Record-breaking US 4x400m quartets bring Paris 2024 Olympics track and field programme to a thrilling finale. Report. Ethiopia\\\'s late sub Tola wins marathon in ..."}, {"name": "Paris 2024 Olympic Team Schedule", "url": "https://www.teamusa.com/paris-2024/olympics/schedule", "snippet": "Check out the Team USA 2024 Paris Olympic team schedule and dates for the Paris 2024 games. Don\\\'t miss any events or updates on our athletes\\\' performances."}]\', \'task\': \'Paris Olympic Game\'}',
    //   sender: "Moxin Agent",
    // },
  ]);
  const [agentList, setAgentList] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const getAgentList = async () => {
      setOpenLoader(true);
      try {
        const response = await axios.get(`${serverUrl}/agent_list`);
        const filteredAgentList = response.data.data.filter(
          (agent) => agent !== "__pycache__"
        );
        setAgentList(filteredAgentList);
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
        console.log(response.data);

        response.data.data.forEach((item) => {
          const agentKey = Object.keys(item)[0];
          const rawResponse = item[agentKey];
          if (rawResponse !== null) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: rawResponse, sender: agentKey },
            ]);
          }
        });
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
        return "string";
      case "arxiv_research":
        return "string";
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
