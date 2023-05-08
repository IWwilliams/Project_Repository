import { Route, Routes } from "react-router-dom";
import MainNav from "./components/layout/MainNav";

import NowPlaying from "./pages/NowPlaying";
import Register from "./pages/RegisterForm";
import CancelTicket from "./pages/cancelTicket";

function App() {
  sessionStorage.setItem("loggedpass", "*");
  // localhost:3000
  // my-page.com or IP

  return (
    <div>
      <MainNav />

      <Routes>
        <Route path="/" element={<NowPlaying />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cancel" element={<CancelTicket />} />
      </Routes>
    </div>
  );
}

export default App;
