import { Route, Routes} from 'react-router-dom'
import PhotoDisplayPage from "./PhotoDisplayPage";

function App() {


  return (
    <Routes>
      <Route path="/" element={<PhotoDisplayPage />} />
      <Route path="/:searchRoute" element={<PhotoDisplayPage />} />
    </Routes>
  );
}

export default App;