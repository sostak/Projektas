import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoPage from './pages/NoPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Listing from './pages/Listing/Listing.jsx';
import SearchResults from './pages/SearchResults.jsx';
import Search from './pages/Search/Search.jsx';
import Upload from './pages/Upload.jsx';
import PersonalInformation from './pages/PersonalInformation';
import Edit from './pages/Edit';

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState();
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{token, setToken}}>
        <NavigationBar/>
        <Routes>
          <Route index element={<Search />} />
          <Route path='searchResults/:filters' element={<SearchResults />} />
          <Route path='upload' element={<Upload />} />
          <Route path='listing/:listingId' element={<Listing />} />
          <Route path='personalInformation' element={<PersonalInformation />} />
          <Route path='edit/:listingId' element={<Edit />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
