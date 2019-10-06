import React from 'react';
import {NavLink} from 'react-router-dom';

// Post Link
class PostLink extends React.Component {
  render() {
    let link=this.props.link+'/'+this.props.name+'-'+this.props.id;
    return (
      <tr className="post">
        <td><NavLink to={link}>{this.props.name}</NavLink></td>
        <td><NavLink to={link+'/edit'} className="btn">Edit</NavLink></td>
        <td><NavLink to={link+'/delete'} className="btn" >Delete </NavLink></td>
      </tr>
    );
  }
}

export default PostLink;