import React from 'react';
import {NavLink} from 'react-router-dom';
class Post extends React.Component{
   render(){
      // show <img/>
      let showImg=()=>{
         if(this.props.post.photo !=''){
            return <img src={'http://localhost:4000/'+this.props.post.photo} className="img-fluid img-thumbnail mb-3" alt=""/>
         }
      }
      // show normal data
      let showData=()=>{
         var dat=new Date(this.props.post.datePublication);
         var normalDate=dat.getHours()+':'+dat.getMinutes()+'  '+dat.getDate()+'.'+dat.getMonth()+'.'+dat.getFullYear();
         return normalDate
      }
      return(
         <div className='post'>
            <NavLink to={ this.props.link} className="ml-2 mr-3 arrow">/{this.props.categName}</NavLink>
            <h3 className="mt-2">{this.props.post.name}</h3>
            <p className="data">Data: {showData()} </p>
            {showImg()}
            <p>Description: {this.props.post.description} </p>
         </div>
      );
   }
}
export default Post;