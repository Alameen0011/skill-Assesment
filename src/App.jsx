import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesPage from "./pages/salesPage";
import VoucherPrintPage from "./pages/VoucherPrintPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/print" element={<VoucherPrintPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
