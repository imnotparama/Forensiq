import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Suspects from "./pages/Suspects";
import SuspectDetail from "./pages/SuspectDetail";
import Help from "./pages/Help";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/suspects" element={<Suspects />} />
          <Route path="/suspects/:id" element={<SuspectDetail />} />
          <Route path="/help" element={<Help />} />
          <Route path="/intel" element={<div className="p-8 text-cyber hover:text-white transition-colors">INTEL FEED - ACCESS RESTRICTED (DEMO)</div>} />
          <Route path="/alerts" element={<div className="p-8 text-red-500 animate-pulse">HIGH PRIORITY ALERTS - COMING SOON</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
