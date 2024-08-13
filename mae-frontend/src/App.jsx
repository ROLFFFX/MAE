import { Route, Routes } from "react-router-dom";
import Nav from "./util/Nav";
import ConfigPage from "./pages/config/ConfigPage";

// const Layout = ({ children }) => {
//   return (
//     <div>
//       <Nav children={children} />
//     </div>
//   );
// };

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </>
  );
}

export default App;
