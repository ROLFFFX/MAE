import { Route, Routes } from "react-router-dom";
import Nav from "./util/Nav";
import ChatPage from "./pages/chat/ChatPage";
import ConfigPage from "./pages/config/ConfigPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<ChatPage />} />
        <Route path="/config" element={<ConfigPage />} />
      </Route>
    </Routes>
  );
}

export default App;
