import React, { Component } from 'react';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-dark">
            <div><a href="http://localhost:3000" className="navbar-brand">게시판 연습중</a></div>
            <h2 className="text-center">Boards List</h2>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;