import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuyerDashboard from './pages/BuyerDashboard'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuyerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
