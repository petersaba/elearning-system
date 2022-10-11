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
            <Navbar text='Add User'/>
            <Form type='Add User'/>
          </>
        }/>
        <Route path='/admin/add_course' element={
          <>
            <Dashboard type='admin'/>
            <Navbar text='Add Course'/>
            <Form type='Add Course'/>
          </>
        }/>
        <Route path='/admin/assign_instructor' element={
          <>
            <Dashboard type='admin'/>
            <Navbar text='Assign Instructor'/>
            <Form type='Assign Instructor'/>
          </>
        }/>
      </Routes>
    </section>
    </BrowserRouter>
  );
}

export default App;