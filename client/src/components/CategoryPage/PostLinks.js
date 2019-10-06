import React from 'react';
import PostLink from './PostLink';
import Table from 'react-bootstrap/Table';

// Post Links
class PostLinks extends React.Component {
  render() {
   var postLinks=[]
   if(this.props.posts){
      postLinks=this.props.posts.map((post, index)=>{
         return <PostLink link={this.props.link} key={post._id} id={post._id}  name={post.name} />
      })
   }
   return(<Table bordered hover responsive striped >
      <tr >
         <th>Title</th>
         <th className="cell-size">Edit</th>
         <th className="cell-size">Delete</th>
      </tr>
      {postLinks}
      </Table>
   )
  }
}

export default PostLinks;