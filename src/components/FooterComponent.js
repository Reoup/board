import React, { Component } from 'react';

class FooterComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <footer className="footer">
          <div className="text-center p-3 footer-background">
            <span className="text-muted ">ⓒ 2021 Copyright: </span><span className="text-muted "><a className="text-dark" href="https://fnsvalue.co.kr/" style={{ textDecoration: "none" }}> fnsvalue.co.kr</a></span>
          </div>
        </footer>
      </div >
    );
  }
}

export default FooterComponent;