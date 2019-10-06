import * as axios from 'axios';

export const getCategs =(setCategs)=>{
 axios.get('http://localhost:4000/data').then(res=>{
     setCategs(res.data)
  })
};

export const sendNewCateg=(categName, descr, addCategory, categId)=>{
   axios.post('http://localhost:4000/newcateg', {
         // date category parent
         categId: categId,
         // date category
         name: categName,
         description: descr,
         postsData: [],
         subcategories:[]
      })
      .then((res)=> {
       addCategory(res.data);
      })
      .catch(function (error) {
         console.log(error);
      });
};

export const sendImg=(formData, updatePhotoExemple, updateAllPhoto)=>{
   axios({
      method:'post',
      url:'http://localhost:4000/sendimg',
      data: formData,
      processData: false,
      contentType: false,
      success: function(r){
         console.log(r)
      },
      error: function(e){
         console.log(e)
      }
   })
   .then(res=>{
      // update src on photo
      updatePhotoExemple(res.data.filename)
      updateAllPhoto(res.data.filename);
   })
  
}
export const sendNewPost=(categId, post, delPhotos, updatePosts,)=>{
   axios.post('http://localhost:4000/newpost', {
            categid: categId,
            // date post
            post: post,
            // photos what need to delete
            delPhotos: delPhotos
         })
         .then((res)=> {
         updatePosts(categId, res.data);
         })
         .catch(function (error) {
            console.log(error);
         });
};

export const sendUpdPost=(categId, newpost, delPhotos, editPost)=>{
   axios.post('http://localhost:4000/updpost', {
               categid: categId,
               // date post
               post: newpost,
               // photos what need to delete
               delPhotos: delPhotos
            })
            .then((res)=> {
               editPost(categId, res.data);
            })
            .catch(function (error) {
               console.log(error);
            });
};

export const deletePost=(categId, postId, updatePosts)=>{
   let url='http://localhost:4000/del/'+categId+'/'+postId
   axios.get(url)
   .then((res)=> {
      updatePosts(categId, res.data); 
      })
      .catch(function (error) {
         console.log(error);
      }); 
};

export const deleteCateg=(categId, setCategs)=>{
   let url='http://localhost:4000/del/'+categId;
   axios.get(url)
   .then((res)=>{
      setCategs(res.data);
   })
   .catch(function(error){
      console.log(error);
   })
}

