import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useSelector, useDispatch } from 'react-redux';
import watchListSlice from "../redux/slice/watchlist";
function Movies() {
  const [movies, setMovies] = useState([
    {
      url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      title: "Movie 1",
    },
    {
      url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      title: "Movie 2",
    },
    {
      url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      title: "Movie 3",
    },
    {
      url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      title: "Movie 4",
    },
    {
      url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      title: "Movie 5",
    },
  ]);
  const [pageNo, setPageNo] = useState(1);
  // const [watchList,setWatchList] = useState([]);
  //const [watchList,setWatchList] = useContext(WatchListContext);
  const {watchList}= useSelector((store)=> store.watchListState); 
  const actions = watchListSlice.actions;
  const dispatch=useDispatch();
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "en-US", page: pageNo },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzQ5ZWU4NjkyN2M4NjJlNmFjNDAzNjBlM2ViOGMwZCIsIm5iZiI6MTcyNDk4MjM3OS42MTM2MDgsInN1YiI6IjYyZDA0ZTRmMzk0YTg3MDRhZTVjNWEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6mu6GBcEikhicTypNxIJkLmrXpsy53e8rpwjN75NYIc",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [pageNo]);

  // useEffect(()=>{
  //   //let moviesFromLS = localStorage.getItem("watchList");
  //   let moviesFromLS = watchList;
  //   if(!moviesFromLS) return;
  //   setWatchList(JSON.parse(moviesFromLS));
  // },[])

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };
  const handlePrevious = () => {
    if (pageNo == 1) return;
    setPageNo(pageNo - 1);
  };

  const addToWatchlist=(movieObj)=>{
    const updatedWatchList = [...watchList,movieObj];
    console.log(updatedWatchList);
    //setWatchList(updatedWatchList);
     dispatch(actions.setWatchList(updatedWatchList));
    //localStorage.setItem("watchList",JSON.stringify(updatedWatchList));
  };

  const removeFromWatchlist=(movieObj)=>{
    let updatedWatchList = watchList.filter(obj=>obj.id!=movieObj.id)
    console.log(updatedWatchList);
   // setWatchList(updatedWatchList);
    dispatch(actions.setWatchList(updatedWatchList));
    //localStorage.setItem("watchList",JSON.stringify(updatedWatchList))
  };

  return (
    <div>
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
      </div>
      <div className="flex justify-evenly flex-wrap gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard 
            key={movieObj.id} 
            movieObj={movieObj} 
            addToWatchlist={addToWatchlist} 
            removeFromWatchlist={removeFromWatchlist}
            watchList = {watchList}
            />
          );
        })}
      </div>
      <div className="flex justify-center gap-2 bg-gray-400 p-4 h-[50px] w-full mt-8">
        <div onClick={handlePrevious} className="px-8">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div>{pageNo}</div>
        <div onClick={handleNext} className="px-8">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default Movies;

// import React, { useEffect } from "react";
// import axios from "axios";
// import { useState } from "react";
// import Pagination from "./Pagination";
// import Watchlist from "./Watchlist";
// function Movies() {
//   const [pageNo, setpageNo] = useState(1);
//   const [watchList,setWatchList] = useState([]);
//   //API call
//   useEffect(() => {
//     const options = {
//       method: "GET",
//       url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}`,
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjJmNDdlYzM3ZGNjOTFhYzExNTBlMzUzM2I2NGEyOSIsIm5iZiI6MTcyNTE2NjI2OC40MjAxMTksInN1YiI6IjY2ZDE1ODUyNmU5Nzk1M2IwNTk0MzQ3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dc-_kQadf703GGy7XRT-sdjyHZDXk4tuRHSerEHTGsI",
//       },
//     };
//     axios.request(options).then((response) => {
//       console.log(response.data);
//       setMovies(response.data.results);
//     });
//   }, [pageNo]);
//   const [movies, setMovies] = useState([
    
//   ]);
//   useEffect(()=>{
//     let localWatchlist = [];
//     if(localStorage.getItem('watchList')){
//       localWatchlist = JSON.parse(localStorage.getItem('watchList'));
//     }
//     setWatchList([...localWatchlist]);
//   },[]);

 
//   const goToPrev = () => {
//     if (pageNo == 1) return;
//     setpageNo((currentPage) => currentPage - 1);
//   };
//   const goToNext = () => {
//     setpageNo((currentPage) => currentPage + 1);
//   };
  
  
//   const addToWatchList = (movieObj) =>{
//     let updatedWatchlist = [...watchList,movieObj];
//       localStorage.setItem('watchList', JSON.stringify(updatedWatchlist));
//       setWatchList([...updatedWatchlist]);
//   }
//   const removeFromWatchList = (movieObj) =>{
//     let updatedWatchlist = watchList.filter((list)=>{
//       return list.id!=movieObj.id;
//     });
//     setWatchList(updatedWatchlist);
//     localStorage.setItem('watchList', JSON.stringify(updatedWatchlist));
//   }
//   const alredyAddedInWatchList = (movieObj)=>{
//         const movieIds = watchList.map((list)=> list.id);
//         return movieIds.includes(movieObj.id)?true:false;
//   }
  
//   return (
//     <>
//       <div className="text-2xl font-bold text-center m-5">
//         <h1>Trending Movies</h1>
//       </div>

//       <div className="flex justify-evenly flex-wrap gap-8">
//         {movies.map((movieObj, idx) => {
//           return (
//             <div
//               key={idx}
//               id={idx}
//               className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
//               // style={{
//               //   backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObj.poster_path})`,
//               // }}
//             >
//               <div className="text-white w-full text-center text-2xl p-2 bg-gray-900/70 rounded-lg">
//                 {movieObj.title}
//               </div>
//               {!alredyAddedInWatchList(movieObj)?<div><button onClick={()=>addToWatchList(movieObj)}>Add to watchList</button> </div>:
//               <div><button onClick={()=>removeFromWatchList(movieObj)}>Remove From watchList</button> </div>} 
              
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex justify-center gap-2 bg-gray-400 p-4 h-[50px] w-full mt-8">
//         <div onClick={goToPrev} className="px-8 cursor-pointer">
//           <i class="fa-solid fa-arrow-left"></i>
//         </div>
//         <div>{pageNo}</div>
//         <div onClick={goToNext} className="px-8 cursor-pointer">
//           <i class="fa-solid fa-arrow-right"></i>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Movies;
