import React from 'react';
// request from sending Category
import {sendNewCateg} from '../api/requests'

import {NavLink} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
class GetCategory extends React.Component{
  constructor(props){
    super(props);
    this.state={
      identic: {
        display: "none",
      },
      noname: {
        display: "none",
      }
    }
  }
   render(){
      let nameCateg=React.createRef();
      let descrCateg=React.createRef();
      let updateCategName=()=>{
        // state for tooltips
        this.setState({
          identic:{
            display: "none",
          },
          noname: {
            display: "none"
          }
      })
      let text=nameCateg.current.value; 
      this.props.updateCategName(text);
    }
    // Checking categories on identical names and empty name
    let CheckingCategName=()=>{
      var er=0; // if one of this checking be good sending category doesn'n maked
      if(this.props.categNames){
        for(var i=0;i<this.props.categNames.length;i++){
          if(nameCateg.current.value.toLowerCase() == this.props.categNames[i].toLowerCase() ){
            er=1;
            // identic names
            this.setState({
              identic:{
                display: "inline",
              }
            })
            break;
          }else if(this.props.newCategName == ''){
            er=1;
            // empty name
            this.setState({
              noname:{
                display:"inline"
              }
            })
            break;
          }
        }
      }
      
      if(er == 0){
         // description of the category 
         let text=descrCateg.current.value;
         // sending on server
         sendNewCateg(this.props.newCategName, text, this.props.addCategory, this.props.categId);
         descrCateg.current.value='';
      }
    }
      return (
         <div>
              <Row>
                <NavLink to={this.props.parentLink} className="ml-2 mr-3 arrow"  >&#8592;</NavLink>
                <h3>Add category:</h3>
              </Row>
              <Container className="bg-white p-4">
                <Row noGutters="true">
                  <label className="w-100">Title
                    <br/>
                    <input ref={nameCateg} onChange={updateCategName}  placeholder='Add category name' 
                    value={this.props.newCategName} className="w-100 form-inp p-1"/>
                    <span style={this.state.identic} className="text-danger">Identical name category</span>
                    <span style={this.state.noname} className="text-danger">Write Category name</span>

                  </label>
                </Row>
                <Row noGutters="true">
                  <label className="w-100">Description
                    <textarea ref={descrCateg}  placeholder='Add description' 
                    className="w-100 form-inp p-1"/>
                  </label>
                </Row>
                <Row noGutters="true">
                <NavLink to={this.props.parentLink} onClick={CheckingCategName} className="btn">Add</NavLink>
                </Row>
              </Container>
         </div>
      );
   }
}

export default GetCategory;