import React from 'react';
import {NavLink} from 'react-router-dom';
// request
import {deleteCateg} from '../api/requests'
import Row from 'react-bootstrap/Row';
// страница категории с постами
class DeleteCategory extends React.Component{
   delete=()=>{
      // send on server
      deleteCateg(this.props.category._id, this.props.setCategs)
   }
   render(){
      return(
         <div className="delcateg">
            <Row>
               <NavLink to='/' className="ml-2 mr-3 arrow" >&#8592;</NavLink>
               <h3>Delete category '{this.props.category.name}' ?: </h3>
            </Row>
            <Row className="ml-5 mt-3">
               <NavLink to='/' onClick={this.delete} className="btn mr-5">Delete</NavLink>
               <NavLink to='/' className="btn" >Cancel</NavLink>
            </Row>
         </div>
      );
   }
}

export default DeleteCategory;