import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoPage from './pages/NoPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Listing from './pages/Listing/Listing.jsx';
import Results from './pages/Results.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
      <Routes>
        <Route index element={<Results />} />
        <Route path="listing" element={<Listing />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
