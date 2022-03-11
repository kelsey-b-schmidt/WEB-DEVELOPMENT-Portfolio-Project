import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddExercisePage from './pages/AddExercisePage'
import EditExercisePage from './pages/EditExercisePage'
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div>
      <header>
      <h1>
        <img src="exercise1.png" alt="Person doing a sit-up"></img>
        <img src="exercise2.png" alt="Person doing weightlifting"></img>
        Exercise Tracker 
        <img src="exercise3.png" alt="Person doing a pull-up"></img>
        <img src="exercise4.png" alt="Person doing a leg-press"></img>
      </h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}>
          </Route>
          <Route path="/add-exercise" element={<AddExercisePage />}>
          </Route>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}>
          </Route>
        </Routes>
      </Router>
      <footer>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></footer>
    </div>
  )
}

export default App