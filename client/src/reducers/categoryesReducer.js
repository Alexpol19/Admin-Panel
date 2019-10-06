
let initialState={
   // categories
   categoriesData:[
   ],
   // date for new categroy
   newCategName:'',
   // date for new loaded Photo
   newPhotoExemple: '',
   allPhoto:[],
  
}

const categoryesReducer=(state=initialState, action)=>{
   switch(action.type){
      case 'UPDATE_CATEG_NAME':{
         return {...state, newCategName: action.newCategName};
      }
      case 'UPDATE_PHOTO_EXEMPLE':{
         let newState={...state}
         newState.newPhotoExemple= action.newPhoto;
         return newState
      }
      case 'UPDATE_ALL_PHOTO':{
         let newState={...state}
         if(action.newPhoto != ''){
            newState.allPhoto.push(action.newPhoto)
         }else{
            newState.allPhoto=[]
         }
         return newState;
      }
      case 'ADD_CATEGORY':{
         let newState={...state, categoriesData: [...state.categoriesData], }
         newState.categoriesData=[...action.categs]
         newState.newCategName= '';     
         return newState;
         }
      case 'UPDATE_POSTS':{
         // let i=action.categId;
         let newState={...state, categoriesData: [...state.categoriesData], };
         let findCategory=(categs)=>{
            categs.map((category)=>{
               if(category._id==action.categId){
                  category.postsData=[...action.posts];
               } 
               else{
                  if(category.categories !=0){
                     findCategory(category.categories)
                  }
               }
               return category;
            })
         }
         findCategory(newState.categoriesData)
        
         newState.newPhotoExemple='';
         newState.allPhoto=[];
         return newState;
      }

      case 'EDIT_POST':{
         let newState={...state, categoriesData: [...state.categoriesData], };
         
         let findCategory=(categs)=>{
            categs.map((category)=>{
               if(category._id==action.categId){
                  category.postsData.map((post)=>{
                     if(post._id==action.editedPost._id){
                        post.name=action.editedPost.name;
                        post.description=action.editedPost.description;
                        post.photo=action.editedPost.photo;
                        post.datePublication=action.editedPost.datePublication;
                     }
                     return post
                  })
               } 
               else{
                  if(category.categories !=0){
                     findCategory(category.categories)
                  }
               }
               return category;
            })
         }
         findCategory(newState.categoriesData)
         newState.newPhotoExemple='';
         newState.allPhoto=[];
         return newState;
      }
      case 'SET_CATEGORIES': 

            return {...state, categoriesData: [...action.categs] }
      default :
         return state;
   }
}
export default categoryesReducer;