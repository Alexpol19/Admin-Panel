import React from 'react';
import {NavLink} from 'react-router-dom';
import PostLinks from './PostLinks';
import Pagination from './Pagination'
import Row from 'react-bootstrap/Row';

// Page Category with PostLinks
class CategoryPage extends React.Component{
   constructor(props){
      super(props);
      this.state={
         currentPage: 1,
         postsPerPage: 5,
      };
     }
   render(){
      // Pagination
       // get current posts
      //  this indexes is indexes in array
       const indexOfLastPost=this.state.currentPage*this.state.postsPerPage
       const indexOfFirstPost=indexOfLastPost-this.state.postsPerPage
       const currentPosts=this.props.category.postsData.slice(indexOfFirstPost, indexOfLastPost)
      // Change page from the paginate component(buttons)
      let paginate=(pageNumber)=>{
         this.setState({
            currentPage:pageNumber,
         })
      }  
      let displayPosts=()=>{
         if(this.props.category.postsData.length !=0){
            return <div>
               <h4>Posts :</h4>
               <PostLinks link={this.props.link} posts={currentPosts} />
            </div> 
         }
      }
      return(
         <div className="page">
            <Row>
               <NavLink to={this.props.prevLink} className="ml-2 mr-3 arrow">&#8592;</NavLink>
               <h3>Category {this.props.category.name}</h3>
            </Row>
            <p className="m-0 p-0">{this.props.category.description} </p>
            <Row className="my-3 ml-3">
               <NavLink to={`${this.props.link}`+'/addPost'} className="btn mr-3" > Add post!</NavLink>
               <NavLink to={`${this.props.link}`+'/getCategory'} className="btn"> Add SubCategory!</NavLink>
            </Row>
            {/* get current posts in postslinks with Routes*/}
            {displayPosts()}
            <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.props.category.postsData.length} 
            paginate={paginate} />   
         </div>
      );
   }
}

export default CategoryPage;