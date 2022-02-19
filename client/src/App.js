import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/**************** REACT TOASTIFY ****************/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**************** PAGES ****************/
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateGoal from './pages/UpdateGoal';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/update' element={<UpdateGoal />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
