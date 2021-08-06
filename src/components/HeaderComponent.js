import React, { Component } from 'react';
import fns_logo from '../fns_logo.png';

class HeaderComponent extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-dark">
            <div><a href="http://localhost:3000" className="navbar-brand"> <img src={fns_logo} width="70px" height="70px"/></a></div>
            <h2 className="text-center">Boards List</h2>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;