import { Route, Routes } from "react-router-dom";
import "./App.css";
import Calendar from "./pages/Calendar/Calendar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/year/:year/month/:month/" element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;
