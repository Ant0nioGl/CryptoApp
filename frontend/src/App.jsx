import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Market from './pages/Market.jsx'
import NoPage from './pages/NoPage.jsx';
import Registration from './pages/Registration/Registration.jsx';
import Success from './pages/Registration/Success.jsx';
import Login from './pages/Login.jsx'


function App() {  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/markets' element={<Market />} />
          <Route path='/register' element={<Registration/>} />
          <Route path='/register-success' element={<Success />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
