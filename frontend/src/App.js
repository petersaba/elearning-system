import logo from './logo.svg';
import './App.css';
import Hero from './components/Hero';
import Form from './components/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSignUpSwitch from './components/LoginSignUpSwitch';

function App() {
  return (
    <BrowserRouter>
    <section className='body'>
    <Routes>
      <Route path='/' element={
        <>
          <Hero/>
          <Form/>
        </>
      }/>
      <Route path='/signup' element={
        <>
          <Hero/>
          <LoginSignUpSwitch type={'signup'}/>
        </>
      }/>
    </Routes>
    </section>
    </BrowserRouter>
  );
}

export default App;