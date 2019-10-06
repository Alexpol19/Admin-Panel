import React from 'react';
import {NavLink} from 'react-router-dom';
// request
import {deletePost} from '../api/requests'
import Row from 'react-bootstrap/Row';
// страница категории с постами
class DeletePost extends React.Component{
   delete=()=>{
      // send on server
      deletePost(this.props.categId, this.props.postId, this.props.updatePosts)
   }
   render(){
      return(
         <div className="post">
            <Row>
               <NavLink to={this.props.link} className="ml-2 mr-3 arrow">/{this.props.categName}</NavLink>
            </Row>
            <h3>Delete post '{this.props.postName}' ?: </h3>
            <Row className="ml-4 mt-3">
            <NavLink onClick={this.delete} to={this.props.link} className="btn mr-5">Delete!</NavLink>
            <NavLink to={this.props.link} className="btn">Cancel!</NavLink>
            </Row>
         </div>
      );
   }
}

export default DeletePost;