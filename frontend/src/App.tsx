import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
