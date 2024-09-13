import { createContext, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Watchlist from './component/WatchList'
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/watchlist" element={<Watchlist></Watchlist>}></Route>
      </Routes>
    </>
  )
}

export default App
