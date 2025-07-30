// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";                 // Initiator landing page
import Confirm from "./Pages/confirm";           // Initiator confirmation page
import PartnerConfirm from "./Pages/PartnerConfirm"; // Partner confirmation page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm" element={<Confirm />} />                 {/* Initiator confirms */}
        <Route path="/partner-confirm" element={<PartnerConfirm />} /> {/* Partner confirms */}
      </Routes>
    </Router>
  );
}

export default App;

