import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuspectList from "./pages/SuspectList";
import SuspectDetail from "./pages/SuspectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuspectList />} />
        <Route path="/suspects/:id" element={<SuspectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
