import React from 'react';
import CategoryLink from './CategoryLink';
import Categoryes from './Categoryes';

export default class RecursiveCategory extends React.Component{
   constructor(props){
      super(props);
      this.state={
        display:"d-none"
      }
    }
   render(){
      let showUl=()=>{  
         if(this.state.display == "d-none"){
            this.setState({
               display: "d-block",
            })
         }else{
            this.setState({
               display: "d-none"
            })
         }
      }
      return(
         <li key={this.props.category._id} >
         <CategoryLink key={this.props.category._id} 
          name={this.props.category.name} link={this.props.link}
          showUl={showUl} dropdown="dropdown-toggle" />
         <Categoryes categories={this.props.category.categories} display={this.state.display}  link={this.props.link}  />
         </li>
      )
   }
}