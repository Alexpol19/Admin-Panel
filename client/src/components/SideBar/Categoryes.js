import React from 'react';
import CategoryLink from './CategoryLink';
import RecursiveCategory from './ReverseCategory';

export default class Categoryes extends React.Component {
   
  render() {
  
   let categList=this.props.categories.map((category)=>{
      let link=this.props.link+'/'+category.name
      if(category.categories.length !=0){
         // if exists subCategory need parent component for working dropdown
         return <RecursiveCategory key={category._id} category={category} link={link}/>
      } else {
         return <li key={category._id} >
         <CategoryLink key={category._id}   name={category.name} link={link}/>
       </li>}
   })
   return (
      <ul className={this.props.pul+" "+this.props.display} id={this.props.toggleid} >
      {categList}
      </ul>
   );
  }
}
