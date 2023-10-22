import { Route, Routes } from "react-router-dom";
import "./App.css";
import Calendar from "./pages/Calendar/Calendar";
import AppStartingPage from "./pages/Home/AppStartingPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<AppStartingPage />} />
        <Route path="/year/:year/month/:month/" element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;
