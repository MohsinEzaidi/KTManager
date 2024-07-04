/** @format */

import React from "react";

function CommentsPopUp({ comments }) {
  return (
    
      <div className='container'>
        <ul className="comment  mt-3 text-gray-500 text-sm border-t  pt-5">
          {comments.map((comment, c) => {
            return <li key={c}>-{comment.comment}</li>;
          })}
        </ul>
      </div>
  );
}

export default CommentsPopUp;
