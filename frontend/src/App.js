import './App.css';
import Hero from './components/Hero';
import Form from './components/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Courses from './components/Courses';

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
        <Route path='/instructor/add_student' element={
          <>
            <Dashboard type='instructor'/>
            <Navbar text='Add Student'/>
            <Form type='Add Student'/>
          </>
        }/>
        <Route path='/instructor/create_assignment' element={
          <>
            <Dashboard type='instructor'/>
            <Navbar text='Create Assignment'/>
            <Form type='Create Assignment'/>
          </>
        }/>
        <Route path='/instructor/create_announcement' element={
          <>
            <Dashboard type='instructor'/>
            <Navbar text='Create Announcement'/>
            <Form type='Create Announcement'/>
          </>
        }/>
        <Route path='/student/enroll_in_course' element={
          <>
            <Dashboard type='student'/>
            <Navbar text='Enroll In Course'/>
            <Form type='Enroll In Course'/>
          </>
        }/>
        <Route path='/student/enrolled_courses' element={
          <>
            <Dashboard type='student'/>
            <Navbar text='Enrolled Courses'/>
            <Courses/>
          </>
        }/>
      </Routes>
    </section>
    </BrowserRouter>
  );
}

export default App;