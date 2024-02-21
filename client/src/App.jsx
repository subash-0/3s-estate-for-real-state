
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {About , Home , SignIn, SignUp, Profile,CreateListing, UpdateListing, ListingPage, SearchPage} from "./pages";
import { Header, PrivateRoute} from './components';
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/listing/:listId' element={<ListingPage />}  />
        <Route path='/sign-in' element={<SignIn />}  />
        <Route path='/search' element={<SearchPage />}  />
        <Route path='/sign-up' element={<SignUp />}  />
        <Route element ={<PrivateRoute />}  >
        <Route path='/profile' element={<Profile />}  />
        <Route path='/listing/create' element={<CreateListing />}  />
        <Route path='/listing/upate-listing/:listingId' element={<UpdateListing />}  />
        </Route>
        <Route path='/about' element={<About />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App