import React from 'react';
import {Route} from 'react-router-dom';
import CategoryPage from '../components/CategoryPage/CategoryPage';
import Post from '../components/Post/Post';
import AddPost from './AddPost';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import DeleteCategory from './DeleteCategory';

import GetCategory from './GetCategory';

export default class CategoriesRoutes extends React.Component {
  render() { 
   // function which called in every category, but not in main url(/)
   let addCategoryRoute=(link, categId, categNames)=>{
      /* Route addCategory (when start and exist recurse) */
      return <Route path={link+'/getCategory'} render={()=>{
         return <GetCategory parentLink={link}
         categId={categId}
         categNames={categNames}
         newCategName={this.props.newCategName} 
         updateCategName={this.props.updateCategName} 
         addCategory={this.props.addCategory} 
         sendCategory={this.sendCategory}/>
      }} />
   }
   // all Categories Routes
   let categRoutes=this.props.categories.map((category)=>{
      // link for category-subcategory....
      let link=this.props.link+'/'+category.name
      // link for addPost Route
      let linkAddPost=link+'/addPost'
      // link for deleteCateg Route
      let linkDelCateg=link+'/delete'

      // Routes for Categories+Subcategories Page
      if(category.categories.length !=0){
         // name of the categoies(levelcurrent) for verifying on identicals
         let categNames=category.categories.map((category)=>{
               return category.name
         })
         // Routes for Posts and edit,delete post
         let posts=[]
         if(category.postsData.length !==0){
            posts=category.postsData.map((post)=>{
               let linkPost=link+'/'+post.name+'-'+post._id;
               let linkEditPost=linkPost+'/edit'
               let linkDeletePost=linkPost+'/delete'

               return <div key={post._id}>
                  {/* Route Post */}
                  <Route exact path={linkPost} render={()=>{
                   return <Post key={post._id} link={link} post={post} categName={category.name} />
                  }} />
                  {/* Route editPost */}
                  <Route path={linkEditPost} render={()=>{
                     return <EditPost post={post} categId={category._id} 
                     link={link} editPost={this.props.editPost}
                     updatePhotoExemple={this.props.updatePhotoExemple} photoExemple={this.props.photoExemple}
                     updateAllPhoto={this.props.updateAllPhoto} allPhoto={this.props.allPhoto} 
                     categName={category.name} />
                  }} />
                  {/* Route deletePost */}
                  <Route path={linkDeletePost} render={()=>{
                     return <DeletePost postId={post._id} categId={category._id} 
                     link={link} categName={category.name} 
                     postName={post.name} updatePosts={this.props.updatePosts}  />
                  }} />
               </div>
            })
            
         }
         // return and Routes for posts and routes for Categories if is subcatgegs
         return <div key={category._id}> 
               {/* addCategory which called for Categories who exists subcategoris */}
               {addCategoryRoute(link, category._id, categNames)}
               {/* Routes Posts */}
               {posts}
               {/* Route addPost */}
               <Route path={linkAddPost} render={()=>{
                  return <AddPost link={link} category={category} updatePosts={this.props.updatePosts} 
                  updatePhotoExemple={this.props.updatePhotoExemple} photoExemple={this.props.photoExemple}
                  updateAllPhoto={this.props.updateAllPhoto} allPhoto={this.props.allPhoto} />
               }} />
               {/* Route Category */}
               <Route exact 
                  path={link}
                  render={() => {
                  return <CategoryPage key={category._id}  category={category} link={link} prevLink={this.props.link}/>
               }}/> 
               {/* Route delete Category */}
               <Route exact 
                  path={linkDelCateg}
                  render={() => {
                  return <DeleteCategory key={category._id}  category={category} setCategs={this.props.setCategs}/>
               }}/>
               {/* Recursive call */}
               <CategoriesRoutes 
               // for all components Routes
               categories={category.categories} link={link}
               // for addPost, edit post, delete post
               updatePosts={this.props.updatePosts} 
               updatePhotoExemple={this.props.updatePhotoExemple} photoExemple={this.props.photoExemple}
               updateAllPhoto={this.props.updateAllPhoto} allPhoto={this.props.allPhoto}
               // for edit post
               editPost={this.props.editPost}
               // for deletecategory
               setCategs={this.props.setCategs}
               // for getCategory
               newCategName={this.props.newCategName} 
               updateCategName={this.props.updateCategName} 
               addCategory={this.props.addCategory} 
               sendCategory={this.sendCategory}
               />
               </div>
      }
// Routes for only Categories Page, without Subcategories
      else {
         // Routes for Posts and edit,delete post
         let posts=[]
         if(category.postsData.length !==0){
            posts=category.postsData.map((post)=>{
               let linkPost=link+'/'+post.name+'-'+post._id;
               let linkEditPost=linkPost+'/edit'
               let linkDeletePost=linkPost+'/delete'
               return <div key={post._id}>
                  {/* Route Post */}
                  <Route exact path={linkPost} render={()=>{
                     return <Post key={post._id} link={link} categName={category.name} post={post} />
                  }} />
                  {/* Route editPost */}
                  <Route path={linkEditPost} render={()=>{
                     return <EditPost post={post} categId={category._id} 
                     editPost={this.props.editPost}
                     updatePhotoExemple={this.props.updatePhotoExemple} photoExemple={this.props.photoExemple}
                     updateAllPhoto={this.props.updateAllPhoto} allPhoto={this.props.allPhoto} 
                     link={link} 
                     categName={category.name}/>
                  }} />
                  {/* Route deletePost */}
                  <Route path={linkDeletePost} render={()=>{
                     return <DeletePost postId={post._id} categId={category._id} 
                     link={link}  
                     postName={post.name} updatePosts={this.props.updatePosts} categName={category.name}  />
                  }} />
               </div>
            })
            
         }
         // return and Routes for posts and routes for Categories without subcategories
         return <div key={category._id}>
            {/* addCategory which called for Categories not have Subcategories, or for Subcategories */}
            {addCategoryRoute(link, category._id)}
            {/* Routes Posts */}
            {posts}
            {/* Route addPost*/}
            <Route path={linkAddPost} render={()=>{
              return <AddPost category={category} link={link} updatePosts={this.props.updatePosts} 
              updatePhotoExemple={this.props.updatePhotoExemple} photoExemple={this.props.photoExemple}
              updateAllPhoto={this.props.updateAllPhoto} allPhoto={this.props.allPhoto} />
            }} />
            {/* Route Category */}
             <Route exact 
            path={link}
            render={() => {
            return <CategoryPage key={category._id}  category={category} link={link} prevLink={this.props.link}/>
            }}/>
            {/* Route delete Category */}
            <Route exact 
               path={linkDelCateg}
               render={() => {
               return <DeleteCategory key={category._id}  category={category} setCategs={this.props.setCategs}/>
            }}/>
         </div>
         }
   }) 
   return (
      <div>
      {categRoutes}
      </div>
   );
  }
}
