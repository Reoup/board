import React, { Component } from 'react';
import BoardSerivce from '../service/BoardService';
import moment from 'moment';
import _ from 'lodash';

class ListBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boards: []
    };

    this.createBoard = this.createBoard.bind(this);
  }

  _dataFormat(data, dataType, format) {
    if (data === undefined || data === null) {
      return null;
    }
    if (dataType === 'date') {
      let dateFormat = 'YYYY-MM-DD';
      if (format !== undefined) {
        dateFormat = format;
      }
      return moment(new Date(data)).format(dateFormat)
    } else if (dataType === 'number') {
      if (_.isNumber(data)) {
        return new Intl.NumberFormat().format(data);
      }
    }
    return data;
  }

  initialRegistrationTime = (boards) => {
    console.log(boards)
    return boards ? this._dataFormat(boards, 'date', 'YYYY-MM-DD') : '-';
  }



  componentDidMount() {
    BoardSerivce.getBoards().then((res) => {
      this.setState({ boards: res.data });
    });
  }

  createBoard() {
    this.props.history.push('/create-board/_create');
  }

  readBoard(seq) {
    this.props.history.push(`/read-board/${seq}`);
  }

  render() {
    return (
      <div>
        <div className="btn-position">
          <button className="btn btn-primary btn-custom" onClick={this.createBoard}>글 작성</button>
        </div>
        <div className="row">
          <table className="table table-bordered table-hover">
            <thead className="thead-color">
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
                      key={board.seq}
                      onClick={() => this.readBoard(board.seq)}>
                      <td> {board.seq} </td>
                      <td> {board.title} </td>
                      <td> {this.initialRegistrationTime(board.reg_dt)} </td>
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