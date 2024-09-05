import React, { useEffect, useState, useContext } from "react";
import { WatchListContext } from "../App";
import genreids from "../utils/utils";
console.log(genreids);
function watchList() {
  const [watchList,setwatchList] = useContext(WatchListContext);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([
    "All Genres",
    "Thriller",
    "Action",
  ]);
  const [currGenre, setCurrGenre] = useState("All Genres")
  // useEffect(() => {
  //   let moviesFromLS = localStorage.getItem("watchList");
  //   if (!moviesFromLS) return;
  //   setwatchList(JSON.parse(moviesFromLS));
  //   console.log(watchList);
  // }, []);

  useEffect(()=>{
    let temp=watchList.map(movie=>genreids[movie.genre_ids[0]]);
    temp=new Set(temp);
    console.log(temp);
    setGenreList(["All Genres", ...temp])
  },[watchList])

  const handleAscendindRatings = () => {
    // console.log("low to high");
    let sortedAscending = watchList.sort(
      (m1, m2) => m1.vote_average - m2.vote_average
    );
    // console.log(sortedAscending);
    setwatchList([...sortedAscending]);
  };

  const handleDecendindRatings = () => {
    // console.log("hight to low");
    let sortedDescending = watchList.sort(
      (m1, m2) => m2.vote_average - m1.vote_average
    );
    // console.log(sortedDescending);
    setwatchList([...sortedDescending]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  const removeFromwatchList = (id)=>{
    let restOfTheMovies=watchList.filter(movie=>{
      return movie.id!=id;
    })
    setwatchList(restOfTheMovies);
    // localStorage.setItem("watchList",JSON.stringify(restOfTheMovies));
  }  

  return (
    <>
      <div className="flex justify-center m-4">
        {genreList.map((genre) => {
          return (
            <>
              <div onClick={()=>handleFilter(genre)} className={genre==currGenre ? "mx-4 flex justify-center items-center cursor-pointer bg-blue-400 h-[3rem] w-[9rem] text-white font-bold border rounded-xl" :"flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4"}>{genre}</div>
            </>
          );
        })}
      </div>
      <div>
        <input
          className="h-[3rem] w-[19rem] bg-gray-200 px-4 outline-none border border-slate-600"
          placeholder="Search Movies"
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th>
                <div className="flex">
                  <i
                    onClick={handleAscendindRatings}
                    class="fa-solid fa-arrow-up"
                  ></i>
                  <div>Ratings</div>
                  <i
                    onClick={handleDecendindRatings}
                    class="fa-solid fa-arrow-down"
                  ></i>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Popularity</div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Genre</div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Delete</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {watchList
              .filter(movie=>{
                if(currGenre == "All Genres") return true;
                else return genreids[movie.genre_ids[0]] == currGenre
              })
              .filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
              )
              .map(
                ({
                  id,
                  poster_path,
                  title,
                  vote_average,
                  popularity,
                  genre_ids,
                }) => {
                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                        <img
                          className="h-[6rem] w-[10rem] object-fit"
                          src={`https://image.tmdb.org/t/p/original+temp${poster_path}`}
                        />
                        <div className="font-medium text-gray-700 text-sm">
                          {title}
                        </div>
                      </td>
                      <td className="pl-6 py-4">{vote_average}</td>
                      <td className="pl-6 py-4">{popularity}</td>
                      <td className="pl-6 py-4">{genreids[genre_ids?.[0]]}</td>
                      <td className="pl-6 py-4 text-red-500" onClick={()=>removeFromwatchList(id)}><i class="fa-solid fa-trash"></i></td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default watchList;




// import React, { useEffect, useState } from 'react'
// import genreids from '../utils/utils';
// function watchList() {

//   const [watchList,setwatchList]= useState([]);
//   const [genrelist,setGenrelist] = useState([]);
//   const [currentGenre,setCurrentGenre] = useState(['All Genre']);
//   useEffect(()=>{
//     let localwatchList = [];
//     if(localStorage.getItem('watchList')){
//       localwatchList = JSON.parse(localStorage.getItem('watchList'));
//       let genre_ids = localwatchList.map((list)=>genreids[list.genre_ids[0]]);
//       let uniqueGenre = new Set(genre_ids);

//       setGenrelist(["All Genre", ...Array.from(uniqueGenre)]);
//     }
//     setwatchList(localwatchList);
//   },[]);
//   const sortByVote = (sortBy) =>{
//     let sortedwatchList = [];
//     if(sortBy == "ASC"){
//       sortedwatchList = watchList.sort((a,b)=>{
//         return a.vote_average - b.vote_average;
//       });
//     }else{
//       sortedwatchList = watchList.sort((a,b)=>{
//         return b.vote_average - a.vote_average;
//       });
//     }
//     setwatchList([...sortedwatchList]);
//   }
//   const removeFromwatchList = (id)=>{
//     let updatedwatchList = watchList.filter((list)=>{
//       return list.id!=id;
//     });
//     setwatchList(updatedwatchList);
//     localStorage.setItem('watchList', JSON.stringify(updatedwatchList));
//   }
//   const filterByGenre = (genre) =>{
//    setCurrentGenre(genre);
//   };
//   return (
//     <>
//     <div className='flex items-center mb-10'>
//     {genrelist?.map((genre)=>
//        (
//         <button key={genre} onClick={()=>{filterByGenre(genre)}} className='w-28 ml-6 border text-black rounded bg-gray-400'>{genre}</button>
//       )
//     )}
//     </div>
//     <table className='table table-auto border w-[1000px]'>
//       <thead>
//         <tr>
//           <th>Title</th>
//           <th><i onClick={()=>sortByVote("ASC")} class="fa-regular fa-circle-up"></i> vote_average <i onClick={()=>sortByVote("DESC")} class="fa-regular fa-circle-down"></i></th>
//           <th>release_date</th>
//           <th>Genre</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           watchList?.filter((list)=>{
//             if(currentGenre == "All Genre")return true;
//             else{
//               return genreids[list.genre_ids[0]] == currentGenre;
//             }
//           }).map((list)=>{ 
//           return(
//           <tr key={list.id}>
//           <td>{list.title}</td>
//           <td>{list.vote_average}</td>
//           <td>{list.release_date}</td>
//           <td>{genreids[list.genre_ids[0]]}</td>
//           <td className='text-red-800'><i onClick={()=>removeFromwatchList(list.id)} className="cursor-pointer fa-regular fa-trash-can"></i></td>
//           </tr>
//         );})}
//         <tr>
//           <td>

//           </td>
//         </tr>
//       </tbody>
//     </table>
//     </>
//   )
// }

// export default watchList