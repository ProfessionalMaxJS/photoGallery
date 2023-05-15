import PhotoDisplayPage from "./PhotoDisplayPage";
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <Routes>
      <Route path="/" element={<PhotoDisplayPage />} />
    </Routes>
  );
}

export default App;