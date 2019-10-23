// main component
import React from 'react';
// styles
import {main} from '../main.css'
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Route} from 'react-router-dom';
// requests
import {getCategs} from '../api/requests';

import SideBarContainer from '../components/SideBar/SideBarContainer';
import GetCategory from './GetCategory';
import CategoriesRoutes from './CategoriesRoutes';
// imports for props on redux
import {connect} from 'react-redux';
import { actionCreator_UpdateCategName, actionCreator_addCategory, 
   actionCreator_updatePosts, actionCreator_EditPost, 
   actionCreator_setCateg,
   actionCreator_UpdatePhotoExemple,
   actionCreator_UpdateAllPhoto,
   actionCreator_UpdateQuery} from "../reducers/actionCreators";
import Search from '../components/Search/Search';
import Result from '../components/Search/Result';


class MainPageAdm extends React.Component {

  componentDidMount(){
    // categories. sends in redux
    if(this.props.categories.length===0){
      // request on server from full data
      getCategs(this.props.setCategs);
    }
  }


  render() {
    // link for Categories routes
    let link=''    
   // name of the categoies(level1) for verifying on identicals
   let categNames=this.props.categories.map((category)=>{
      return category.name
   })
   // function which return Route from Search
   let postRoutes=[]
   let getPostRoute=(route)=>{
      postRoutes.push(route)
   }

    return (
      <div >
            <Row className="align-items-center bg-header" noGutters="true">
               <Col>
                  <h3 className="text-left ml-4 text-light">Admin Lite</h3>
               </Col>
               <Col sm={3} className="pr-3">
                  {/* Search the posts */}
                  <Search updateQuery={this.props.updateQuery} />
               </Col>
               
            </Row>
         
        
        <Container fluid="true" className=""
        >
         <Row>
            <Col sm={3} className="py-3 sidebar">
               <SideBarContainer />
            </Col>
            <Col className="content  px-4 py-3 ">
               {/* getCategory only for main url(/) */}
               <Route path='/getCategory' render={()=>{
               return <GetCategory
               parentLink='/' categNames={categNames}
               newCategName={this.props.newCategName} 
               updateCategName={this.props.updateCategName} 
               addCategory={this.props.addCategory} 
               sendCategory={this.sendCategory}/>
               }} />
               {/* content when url is '/' */}
               <Route exact path='/' render={()=>{
                  return <div className="text-center mt-3">
                     <h4>This Admin Panel created to add, edit, delete some posts, categoryes with text, photo.</h4>
                     <h5 className="mb-4">&#8592; To start choose some category in the Sidebar or choose button 'Add Category'</h5>
                     
                  </div>
               }}/>
               {/* Answers Result */}
               <Route exact path="/search" render={()=>{
                  return <Result query={this.props.query} updateQuery={this.props.updateQuery}
                  categories={this.props.categories}  getPostRoute={getPostRoute}
                  />
               }} />
               {/* Route for Post in the Search */}
               {postRoutes}
               

               

               {/* get categories all levels */}
               <CategoriesRoutes 
                  // for all components Routes
                  categories={this.props.categories} link={link}
                  // for addPost, edit post, delete post
                  updatePosts={this.props.updatePosts} 
                  updatePhotoExemple={this.props.updatePhotoExemple} photoExemple={this.props.photoExemple}
                  updateAllPhoto={this.props.updateAllPhoto} allPhoto={this.props.allPhoto}
                  // for edit post
                  editPost={this.props.editPost}
                  // for deletecategory
                  setCategs={this.props.setCategs}
                  // for getCategory
                  newCategName={this.props.newCategName} 
                  updateCategName={this.props.updateCategName} 
                  addCategory={this.props.addCategory} 
                  sendCategory={this.sendCategory}
               />    
            </Col>
         </Row>
        </Container>
      </div>
    ); 
  }
}

// get state from redux
let mapStateToProps=(state)=>{
   return {
      categories: state.categories.categoriesData,
      newCategName: state.categories.newCategName,
      photoExemple: state.categories.newPhotoExemple,
      allPhoto: state.categories.allPhoto,
      query: state.categories.query,
   }

}
// get actions from redux
let mapDispatchToProps=(dispatch)=>{
   return {
      updateQuery:text=>{
         dispatch(actionCreator_UpdateQuery(text))
      },
      updateCategName:(text)=>{
         dispatch(actionCreator_UpdateCategName(text))
      },
      addCategory:(arr)=>{
         dispatch(actionCreator_addCategory(arr))
      },
      updatePhotoExemple:(text)=>{
         dispatch(actionCreator_UpdatePhotoExemple(text))
      },
      updateAllPhoto:(text)=>{
         dispatch(actionCreator_UpdateAllPhoto(text))
      },
      // all of this 2 methods get updated posts
      updatePosts:(categId, posts)=>{
         dispatch(actionCreator_updatePosts(categId, posts))
      },
      editPost:(categId, newpost)=>{
         dispatch(actionCreator_EditPost(categId, newpost))
      },
     
      setCategs:(categs)=>{
         dispatch(actionCreator_setCateg(categs))
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps )(MainPageAdm)