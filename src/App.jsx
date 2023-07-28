import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PokedexListView from './views/PokedexListView'
import './App.css'


function AppContent() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<PokedexListView />} />
      </Routes>
    </div>
  );

}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


export default App
