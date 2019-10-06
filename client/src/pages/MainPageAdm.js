// // main component
// import React from 'react';
// import {main} from '../main.css'
// import {Route} from 'react-router-dom';
// // requests
// import {getCategs} from '../api/requests';

// import SideBarContainer from '../components/SideBar/SideBarContainer';
// import GetCategory from './GetCategory';
// import CategoriesRoutes from './CategoriesRoutes';



// class MainPageAdm extends React.Component {

//   componentDidMount(){
//     // categories. sends in redux
//     if(this.props.categories.length===0){
//       // request on server from full data
//       getCategs(this.props.setCategs);
//     }
//   }

//   render() {
//     // link for Categories routes
//     let link=''    
//       // name of the categoies(level1) for verifying on identicals
//       let categNames=this.props.categories.map((category)=>{
//         return category.name
//       })

//     return (
//       <div >
//         <h2>ADMIN PANEL</h2>
//         <SideBarContainer />
//         <div className='content' >
//           {/* getCategory only for main url(/) */}
//           <Route path='/getCategory' render={()=>{
//           return <GetCategory
//           parentLink='/' categNames={categNames}
//           newCategName={this.props.newCategName} 
//           updateCategName={this.props.updateCategName} 
//           addCategory={this.props.addCategory} 
//           sendCategory={this.sendCategory}/>
//           }} />

//           {/* get categories all levels */}
//           <CategoriesRoutes 
//             // for all components Routes
//             categories={this.props.categories} link={link}
//             // for addPost, edit post, delete post
//             updatePosts={this.props.updatePosts} 
//             updatePhotoExemple={this.props.updatePhotoExemple} photoExemple={this.props.photoExemple}
//             updateAllPhoto={this.props.updateAllPhoto} allPhoto={this.props.allPhoto}
//             // for edit post
//             editPost={this.props.editPost}
//             // for deletecategory
//             setCategs={this.props.setCategs}
//             // for getCategory
//             newCategName={this.props.newCategName} 
//             updateCategName={this.props.updateCategName} 
//             addCategory={this.props.addCategory} 
//             sendCategory={this.sendCategory}
//           />    
//         </div>
//       </div>
//     ); 
//   }
// }

// export default MainPageAdm;
