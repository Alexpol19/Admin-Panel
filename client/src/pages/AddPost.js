import React from 'react';
import {NavLink, Route} from 'react-router-dom';

// request
import {sendNewPost, sendImg} from '../api/requests';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AddPost extends React.Component{
   
   componentDidMount(){
      this.props.updatePhotoExemple('')
      this.props.updateAllPhoto('')
    }
   render(){

      let postName=React.createRef();
      let postDescr=React.createRef();
      let postPhoto=React.createRef();

      // show <img/>
      let showImg=()=>{
         if(this.props.photoExemple !=''){
            return <img src={'http://localhost:4000/'+this.props.photoExemple} className="img-fluid img-thumbnail"
            ref={postPhoto} alt="not on server" />
         }
      }

       // send img on server
      let sendImage=(e)=>{
         e.preventDefault();
         var form=document.getElementById('fileinfo')
         var formData=new FormData(form);
         sendImg(formData, this.props.updatePhotoExemple, this.props.updateAllPhoto);
      }
      
      // send new post
      let sendPost=()=>{
         // if field postName has some text send data
         if(postName.current.value != ''){
         let categId=this.props.category._id;
         let post={
            name: postName.current.value,
            description: postDescr.current.value,
            photo: this.props.photoExemple,
         }  
          // sending on server
         let delPhotos=this.props.allPhoto.slice(0,-1);
         
         sendNewPost(categId, post, delPhotos, this.props.updatePosts);

      }
      
      }

      return (
         <div className="addPost">
            <NavLink to={this.props.link} className="ml-2 mr-3 arrow">/{this.props.category.name}</NavLink>
            <h3 className="mt-2">Add post:</h3>
            <Container >
               <Route render={({ history}) => (
                  <form onSubmit={()=>{ history.push(this.props.link);
                     sendPost()}} >
                  <Row>
                     <Col className="bg-white  p-4 mr-3 col-md-7">
                        <Row noGutters="true">
                           <label className="w-100">Title:
                           <br/>
                           <input ref={postName} placeholder='Add post name' className="w-100 form-inp p-1"/></label>
                        </Row>
                        <Row noGutters="true">
                           <label className="w-100">Description:
                           <br/>
                           <textarea ref={postDescr} placeholder='Add description' className="w-100 form-inp p-1"/></label>
                        </Row>
                     </Col>
                     <Col className="bg-white  p-4 ">
                        <form method="POST" encType="multipart/form-data" id="fileinfo"
                        ref={postPhoto} onChange={sendImage}>
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
                     <NavLink onClick={sendPost} to={this.props.link} className="btn" >Add</NavLink>
                  </Row>
                  </form>
                  )} />
            </Container>
           
         </div>
      );
   }
}

export default AddPost;