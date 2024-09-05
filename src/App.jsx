import { createContext, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Watchlist from './component/WatchList'

export const WatchListContext = createContext();
function App() {
  const [watchList,setWatchList] = useState([]);
  return (
    <>
    <WatchListContext.Provider value={[watchList,setWatchList]}>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/watchlist" element={<Watchlist></Watchlist>}></Route>
      </Routes>
      </WatchListContext.Provider>
    </>
  )
}

export default App
