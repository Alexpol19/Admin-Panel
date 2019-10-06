export const actionCreator_setCateg=(categs)=>({type: 'SET_CATEGORIES', categs});

export const actionCreator_addCategory=(array)=>{
   return {type: 'ADD_CATEGORY',
         categs: array,
      }
}

export const actionCreator_updatePosts=(categId, posts)=>{
   return {
      type: 'UPDATE_POSTS',
      categId: categId,
      posts: posts,
   }
}

export const actionCreator_UpdateCategName=(text)=>{
   return{
      type: 'UPDATE_CATEG_NAME',
      newCategName: text,
   }
}

export const actionCreator_UpdatePhotoExemple=(text)=>{
   return{
      type: 'UPDATE_PHOTO_EXEMPLE',
      newPhoto: text,
   }
}
export const actionCreator_UpdateAllPhoto=(text)=>{
   return{
      type: 'UPDATE_ALL_PHOTO',
      newPhoto: text,
   }
}
export const actionCreator_EditPost=(categId, newpost)=>{
   return{
      type: 'EDIT_POST',
      categId: categId,
      editedPost: newpost,
   }
}

