import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuspectList from "./pages/SuspectList";
import SuspectDetail from "./pages/SuspectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suspects" element={<SuspectList />} />
        <Route path="/suspects/:id" element={<SuspectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
