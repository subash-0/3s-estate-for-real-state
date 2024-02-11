
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {About , Home , SignIn, SignUp, Profile,CreateListing} from "./pages";
import { Header, PrivateRoute} from './components';
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/sign-in' element={<SignIn />}  />
        <Route path='/sign-up' element={<SignUp />}  />
        <Route element ={<PrivateRoute />}  >
        <Route path='/profile' element={<Profile />}  />
        <Route path='/listing/create' element={<CreateListing />}  />
        </Route>
        <Route path='/about' element={<About />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App