import React from 'react'

const Pagination=({postsPerPage, totalPosts, paginate})=>{
   const pageNumbers=[];
   for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
      pageNumbers.push(i);
   }
   return (
         <ul className="pagination mt-3 justify-content-center" >
            {pageNumbers.map(number => {
               return <li key={number} className="page-item mx-1">
                  <button onClick={()=>paginate(number)}  className="page-link btn">
                     {number}
                  </button>
               </li>
            })}
         </ul>
   )
}
export default Pagination;