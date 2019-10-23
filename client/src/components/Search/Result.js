import React from 'react';
import Row from 'react-bootstrap/Row';
import Search from './Search';
import {NavLink, Route} from 'react-router-dom';
import Post from '../Post/Post';
import Container from 'react-bootstrap/Container';

export default class Result extends React.Component {
   
  render() {
   let posts=[]
   let showPosts=()=>{
      if(posts.length !=0){
         return posts
      }
      else{
         return <Row className="justify-content-center mt-3">
                  <h6>By request <i className="text-info">'{this.props.query}'</i> nothing was found!</h6>
               </Row>
      }
   }
   // function searching posts in the one category and veryfying query=name/descr
   let searchPosts=(category)=>{
      // if exists posts
      if(category.postsData.length !=0){
         category.postsData.map((post)=>{
            // if post dates equal search query 
            if(this.props.query && (post.name.toLowerCase().indexOf(this.props.query.toLowerCase()) != -1 || post.description.toLowerCase().indexOf(this.props.query.toLowerCase()) != -1)){

               let showImg=()=>{
                  if(post.photo){
                     return <img src={'http://localhost:4000/'+post.photo} className="w-25 img-thumbnail" alt=''  />
                  }
               }
               this.props.getPostRoute(
                  <Route exact path={'/'+post.name+'-'+post._id} render={()=>{
                     return <Post key={post._id} link={"/search?q="+this.props.query} post={post} categName={'search'} />
                  }} />
               )
               posts.push( <Row key={post._id} className="justify-content-center align-items-center my-3">
                  <NavLink to={'/'+post.name+'-'+post._id} >{post.name}</NavLink>
                  {showImg()}
                  <i>Category: {category.name}</i> 
               </Row>
               )
            }
            
         })
      }
   }
   // function searching all posts
   let getPosts=(categories)=>{
      categories.map((category)=>{
         if(category.categories.length !=0){
            // recursive call 
            getPosts(category.categories);
            // push posts
            searchPosts(category)

         }else{
            // push posts
            searchPosts(category)
         }
         
         
      })
      
   }
   getPosts(this.props.categories)


   
  
   return (
      <div>
         <NavLink to='/' className="ml-2 mr-3 arrow">&#8592;</NavLink>
         <div className="text-center">
         <h4>Results:</h4>
         <Row className="w-50 mx-auto">
            <Search query={this.props.query} updateQuery={this.props.updateQuery} />
         </Row>
         <Container>
            {/* Founded posts */}
            {showPosts()}
         </Container>
      </div>
      </div>
      
   );
  }
}
