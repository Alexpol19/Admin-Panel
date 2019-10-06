import React from 'react';
import {NavLink} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class CategoryLink extends React.Component {
  render() {
    return (<li>
          <Row>
            <Col>
              <NavLink to={this.props.link}>
                {this.props.name}
              </NavLink>
            </Col>
            <Col>
              <a className={this.props.dropdown} onClick={this.props.showUl} id={this.props.toggleid}></a>
            </Col>
            <Col>
              <NavLink to={this.props.link+'/delete'} className="btn buttonSidebar">Delete </NavLink>
            </Col>
          </Row>
        </li>
    );
  }
}

export default CategoryLink;