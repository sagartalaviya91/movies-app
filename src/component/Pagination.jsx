import React, { useState } from 'react'

function Pagination() {
    const [pageNo,setpageNo] = useState(1);
    const goToPrev = ()=>{
        if(pageNo==1) return;
        setpageNo(currentPage => currentPage-1);
    }
    const goToNext = ()=>{
        setpageNo(currentPage => currentPage+1);
    }
  return (
   <>
     <div className="flex justify-center gap-2 bg-gray-400 p-4 h-[50px] w-full mt-8">
        <div onClick={goToPrev} className="px-8"><i class="fa-solid fa-arrow-left"></i></div>
        <div>{pageNo}</div>
        <div onClick={goToNext} className="px-8"><i class="fa-solid fa-arrow-right"></i></div>
    </div>
   </>
  )
}

export default Pagination