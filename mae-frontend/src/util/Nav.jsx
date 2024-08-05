import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import Chat from "../pages/chat/Chat";
import Input from "./Input";
import { ListItem, Switch } from "@mui/material";
import Loader from "./Loader";

export default function Nav() {
  /**
   * Drawer States and handle functions
   */
  const [open, setOpen] = React.useState(true); // drawer open/close state
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /**
   * User Input
   */
  const [input, setInput] = React.useState("");
  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const [agentList, setAgentList] = React.useState([]);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [messages, setMessages] = React.useState([
    { text: "How could I assist you today?", sender: "Moxin Agent" },
  ]);

  /**
   * Loader States
   */
  const [openLoader, setOpenLoader] = React.useState(false);
  //   const handleCloseLoader = () => {
  //     setOpenLoader(false);
  //   };
  //   const handleOpenLoader = () => {
  //     setOpenLoader(true);
  //   };

  /*
   * GET request to get agent list
   */
  React.useEffect(() => {
    const getAgentList = async () => {
      try {
        const response = await axios.get(`${serverUrl}/agent_list`);
        setAgentList(response.data.data);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setOpenLoader(false);
      }
    };
    setOpenLoader(true);
    getAgentList();
  }, []);

  /*
   * (dummy) POST request for sending out user input
   */

  const handleSend = async () => {
    if (input.trim() === "") return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments/1"
      );
      //  dummy agent responses
      agentList.map((agent, index) => {
        const dummyMessage = {
          index: index,
          text: response.data.body,
          sender: agent,
        };
        setMessages((prevMessages) => [...prevMessages, dummyMessage]);
      });
      //   const RAMessage = { text: response.data.body, sender: "Reasoner Agent" };
      //   setMessages((prevMessages) => [...prevMessages, RAMessage]);
      //   const CoTMessage = { text: response.data.body, sender: "CoT Agent" };
      //   setMessages((prevMessages) => [...prevMessages, CoTMessage]);
      //   const AAMessage = { text: response.data.body, sender: "Actor Agent" };
      //   setMessages((prevMessages) => [...prevMessages, AAMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100dvh" }}>
      <Loader openLoader={openLoader}></Loader>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
        sx={{ bgcolor: "#FFFFFF" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon style={{ color: "#222222" }} />
          </IconButton>
          <img
            src="/src/assets/mae_icon.png"
            alt="mae icon"
            style={{ height: "30px", width: "30px" }}
          ></img>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontFamily="monospace"
            color={"#222222"}
            ml={2}
          >
            Moxin App Engine
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              window.open(
                "https://github.com/moxin-org/Moxin-App-Engine",
                "_blank"
              );
            }}
            edge="end"
            sx={{
              marginRight: 2,
              ...(open && { display: "none" }),
            }}
          >
            <GitHubIcon style={{ width: 35, height: 35, color: "#222222" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          )}
        </DrawerHeader>
        {/* Drawer Content */}
        <Box sx={{ bgcolor: "#DEE2E6", height: "100%" }}>
          <List>
            {agentList.map(
              (agent, index) =>
                open && (
                  <ListItem key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        direction: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: "15px" }}>
                        {formatText(agent)}
                      </Typography>
                      <Box flexGrow={1}></Box>
                      <Switch defaultChecked color="default" />
                    </Box>
                  </ListItem>
                )
            )}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            mt: "64px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Chat messages={messages} />
        </Box>
        <Box
          sx={{
            minHeight: "80px",
            width: "100%",
            alignSelf: "stretch",
            position: "sticky",
            bottom: 0,
            bgcolor: "#FFFFFF",
            zIndex: 1,
          }}
        >
          <Input
            input={input}
            onInputChange={handleInputChange}
            handleSend={handleSend}
            agents={agentList}
            maxRows={6}
          />
        </Box>
      </Box>
    </Box>
  );
}

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "#DEE2E6",
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function formatText(str) {
  let words = str.split("_");
  let capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}
