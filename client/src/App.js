/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, {useEffect,createContext, useReducer, useContext} from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Signin from './components/screens/Login';
import Profile from './components/screens/Profile';
import UserProfile from './components/screens/UserProfile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'


export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    }else{
      navigate('/signin')
    }
  },[])
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/signin" element={<Signin/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/user/:userid" element={<UserProfile/>} />
      <Route exact path="/create" element={<CreatePost/>} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
