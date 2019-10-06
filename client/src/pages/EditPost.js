import React from 'react';
import {NavLink} from 'react-router-dom';   
// request
import {sendUpdPost, sendImg} from '../api/requests'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// страница категории с постами
class EditPost extends React.Component{
   componentDidMount(){
      this.props.updatePhotoExemple(this.props.post.photo)
      this.props.updateAllPhoto('');
    }
   render(){
      let name=React.createRef();
      let descr=React.createRef();
      let photo=React.createRef();
      // show <img/>
      let showImg=()=>{
         if(this.props.photoExemple!=''){
            return <img src={'http://localhost:4000/'+this.props.photoExemple} className="img-fluid img-thumbnail"
            ref={photo} alt="not on server" />
         }
      }

      // send img on server
      let sendImage=(e)=>{
         e.preventDefault();
         var form=document.getElementById('fileinfo')
         var formData=new FormData(form);
         this.props.updateAllPhoto(this.props.photoExemple);
         // this.props.updateAllPhoto('');

         sendImg(formData, this.props.updatePhotoExemple, this.props.updateAllPhoto);
      }
      let sendChanges=()=>{
         // if some field updated send data
         if((this.props.photoExemple != this.props.post.photo)
            || (descr.current.value != this.props.post.description)
            || (name.current.value != this.props.post.name) ){

            let newpost={
               id: this.props.post._id,
               name: name.current.value,
               description: descr.current.value,
               photo: this.props.photoExemple,   
            }
             // sending on server
            let delPhotos=this.props.allPhoto.slice(0,-1);

            // sending on server
            sendUpdPost(this.props.categId, newpost, delPhotos, this.props.editPost);
         } 
      }
      return(
         <div className="post">
            <NavLink to={this.props.link} className="ml-2 mr-3 arrow">/{this.props.categName}</NavLink>
            <h3 className="mt-2">Edit post {this.props.post.name}:</h3>
            <Container >
               <Row>
                  <Col className="bg-white  p-4 mr-3 col-md-7">
                     <Row noGutters="true">
                        <label className="w-100">Title:
                        <br/>
                        <input name="name" type="text"  ref={name} defaultValue={this.props.post.name} className="w-100 form-inp p-1"/></label>
                     </Row>
                     <Row noGutters="true">
                        <label className="w-100">Description:
                        <br/>
                        <textarea name="description" type="text" ref={descr} defaultValue={this.props.post.description} className="w-100 form-inp p-1"/></label>
                     </Row>
                  </Col>
                  <Col className="bg-white  p-4 ">
                     <form method="POST" encType="multipart/form-data" id="fileinfo"
                      onChange={sendImage}>
                        <label className="w-100">Photo:
                           <br/> 
                           <input  type="file" accept=".img,png,jpg,image/*" 
                           id="photo" name="photo" />
                        </label>
                     </form>
                     {/* preview post image */}
                     {showImg()}
                  </Col>
                  
               </Row>
               <Row className="mt-3">               
                  <NavLink onClick={sendChanges} to={this.props.link} className="btn">Save Changes</NavLink>
               </Row>
            </Container>
         </div>
      );
   }
}

export default EditPost;