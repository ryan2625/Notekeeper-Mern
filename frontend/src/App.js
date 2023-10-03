import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { UseAuthContext } from './hooks/UseAuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  
  const { user } = UseAuthContext()
  const [edit, setEdit] = useState(false)

  const setEditBool = () => {
    setEdit(!edit)
}
  return (
    <div className={"App" + (edit ? " dimmer" : "")} >
      <BrowserRouter>
      <Navbar edit = {edit}/>
        <div className={'pages' + (edit ? " dimmer2" : "")}>
          <Routes>
            <Route path='/' element={ user ? <Home edit = {edit} setEditBool={setEditBool}/> : <Navigate to="/login" />} />
            <Route path='/login' element={!user ? <Login/> : <Navigate to="/" />}/>
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to ="/" />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
