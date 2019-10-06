import {connect} from 'react-redux';
import React from 'react';
import { NavLink} from 'react-router-dom';
import Categoryes from './Categoryes';

class SideBar extends React.Component {
  render() {
    // initial Link for Categoryes
    let link=''
    return (
      <div className="sidebarAdm" >
        <h4 >Choose Category:</h4>
          <hr className="mt-0"/>
          <Categoryes categories={this.props.categories} link={link} pul="pl-1" />
          <hr/>
        <NavLink to='/getCategory' className="btn"> Add Category!</NavLink>
      </div>
    );
  }
}

// get state from redux
let mapStateToProps=(state)=>{
   return{
      categories: state.categories.categoriesData,
   }
}

export default connect(mapStateToProps)(SideBar);