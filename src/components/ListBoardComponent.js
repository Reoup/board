import React, { Component } from 'react';
import BoardSerivce from '../service/BoardService';

class ListBoardComponent extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      boards: []
    };

    this.createBoard = this.createBoard.bind(this);
  }

  componentDidMount() {
    BoardSerivce.getBoards().then((res) => {
      this.setState({boards: res.data});
    });
  }

  createBoard() {
    this.props.history.push('/create-board/_create');
  }

  readBoard(seq){
    this.props.history.push(`/read-board/${seq}`);
  }

  render() {
    return (
      <div>
          <div className ="row">
            <button className="btn btn-primary" onClick={this.createBoard}>글 작성</button>
          </div>
          <div className="row">
            <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>글 번호</th>
                    <th>타이틀 </th>
                    <th>작성일 </th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.boards.map(
                    board => 
                      <tr
                      key = {board.seq}
                      onClick={() => this.readBoard(board.seq)}>
                        <td> {board.seq} </td>
                        <td> {board.title} </td>
                        <td> {board.reg_dt} </td>
                      </tr>
                  )
                }

              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

export default ListBoardComponent;