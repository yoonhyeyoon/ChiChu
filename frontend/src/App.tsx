import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import Landing from './pages/Landing';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Landing />} />
          <Route path="search/result" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
