import React from 'react'
import {Route} from 'react-router-dom'
import './App.css';
import MultistepForm from './components/MultistepForm';

function App() {
  return (
    <div >
      <Route path='/' component={MultistepForm} /> 
    </div>
  );
}

export default App;
