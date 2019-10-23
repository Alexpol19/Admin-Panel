import React from 'react';
import {Link} from 'react-router-dom'

export default class Search extends React.Component {
   constructor(props){
      super(props);
      this.state={
         query: '',
      }
      
   }
   componentDidMount(){
      if(this.props.query){
         this.setState({
            query: this.props.query,
         })
      }
   }
   componentWillReceiveProps(nextProps){
      if ( nextProps.query != this.state.query){
        this.setState({
            query : nextProps.query,
        });
      }
    }
   
   
  render() {
   let query=React.createRef();
   // function what update query in the state
   let changeQuery=()=>{
      this.setState({
         query: query.current.value,
      })
   }
   // updat query in the redux. set query state ''
   let search=()=>{
      this.props.updateQuery(this.state.query);
      if(!this.props.query){
         this.setState({
            query: '',
         })
      }
      
   }
   return (
         <div className="input-group search">
            <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Search query" value={this.state.query}  ref={query} onChange={changeQuery}/>
            <div className="input-group-append">
               {/* query in the redux */}
               <Link to={"/search?q="+this.state.query} className="btn btn-outline-secondary" onClick={search}>
                  Search
               </Link>
            </div>
         </div>
   );
  }
}
