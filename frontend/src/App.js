import './App.css';
import Hero from './components/Hero';
import Form from './components/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

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
            <Form type={'Sign Up'}/>
          </>
        }/>
        <Route path='/admin/add_user' element={
          <>
            <Dashboard type='admin'/>
            <Navbar/>
            <Form type='Add User'/>
          </>
        }/>
        <Route path='/admin/add_course' element={
          <>
            <Dashboard type='admin'/>
            <Navbar/>
            <Form type='Add Course'/>
          </>
        }/>
      </Routes>
    </section>
    </BrowserRouter>
  );
}

export default App;