import React, { Component } from 'react';
import BoardSerivce from '../service/BoardService';
import moment from 'moment';

class ListBoardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // p_num: 1,
      // paging: {},
      boards: [], // 페이지에 표시될 글 목록데이터를 넣기 위한 boards를 this.state에 선언
    };

    this.createBoard = this.createBoard.bind(this); //  글 작성 버튼을 클릭 했을 때 동작하는 createBoard 함수를 바인드( bind 메소드가 호출되면 새로운 함수를 생성)
  }

  _dataFormat(data, format) {
    return moment(new Date(data)).format(format);
  }

  initialRegistrationTime = (cTime) => {
    console.log(cTime);
    if(!cTime) return;
    return cTime ? this._dataFormat(cTime, 'YYYY-MM-DD') : '-';
}

  componentDidMount() { // 리엑트의 생명주기 메소드인 'componentDidMount'에서 'BoardService'의 메소드를 호출해서 데이터를 가져옴
    BoardSerivce.getBoards(this.state.p_num).then((res) => {
      this.setState({
        // p_num: res.data.pagingData.currentPageNum,
        // paging: res.data.pagingData,
         boards: res.data.list }); // this.state에 선언한 변수의 값을 변경하기 위해서 setState 사용함
    });
  }


  createBoard() { // 글 작성 버튼을 클릭 시 글 작성 페이지로 이동하게 해주는 함수를 정의한 것(경로에 파라미터 추가)
    this.props.history.push('/create-board/_create');
  }

  readBoard(seq) { // 글을 클릭 했을 때 글 상세보기 페이지로 이동하게 해주는 함수를 정의한 것
    this.props.history.push(`/read-board/${seq}`);
  }

  // listBoard(p_num){
  //   console.log("pageNum: " +p_num);
  //   BoardSerivce.getBoards(p_num).then((res) => {
  //     console.log(res.data);
  //     this.setState({
  //       p_num: res.data.pagingData.currentPageNum,
  //       paging: res.data.pagingData,
  //       boards: res.data.list
  //     });
  //   });
  // }

  // viewPaging() {
  //   const pageNums = [];

  //   for(let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++){
  //     pageNums.push(i);
  //   }

  //   return (pageNums.map((page) =>
  //     <li className="page-item" key={page.toString()}>
  //       <a className="page-link" onClick= {() => this.listBoard(page)}>{page}</a>
  //     </li>
  //   ));
  // }

  // isPagingPrev() {
  //   if(this.state.paging.prev){
  //     return(
  //       <li className="page-item">
  //         <a className="page-link" onClick= {() => this.listBoard((this.state.paging.currentPageNum - 1))} tabindex="-1">Previous</a>
  //       </li>
  //     );
  //   }
  // }

  // isPagingNext() {
  //   if(this.state.paging.next){
  //     return (
  //       <li className="page-item">
  //         <a className="page-link" onClick={() => this.listBoard((this.state.paging.currentPageNum + 1))} tabIndex="-1">Next</a>
  //       </li>
  //     );
  //   }
  // }

  // isMoveToFirstPage() {
  //   if(this.state.p_num != 1){
  //     return (
  //       <li className="page-item">
  //         <a className="page-link" onClick={() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
  //       </li>
  //     );
  //   }
  // }

  // isMoveToLastPage() {
  //   if(this.state.p_num != this.state.paging.pageNumCountTotal){
  //     return (
  //       <li className="page-item">
  //         <a className="page-link" onClick={() => this.listBoard((this.state.paging.pageNumCountTotal))} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
  //       </li>
  //     )
  //   }
  // }



  render() {
    return (
      <div>
        <div className="btn-position">
          <input />
          <button className="btn btn-outline-primary btn-custom" onClick={this.createBoard}>글 작성</button>
        </div>
        <div className="row">
          <table className="table table-bordered table-hover">
            <thead className="thead-color text-cent">
              <tr>
                <th>글 번호</th>
                <th>타이틀 </th>
                <th>작성일 </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.boards.map( // boards의 데이터를 출력
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
        {/* <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {
                this.isMoveToFirstPage()
              }
              {
                this.isPagingPrev()
              }
              {
                this.viewPaging()
              }
              {
                this.isPagingNext()
              }
              {
                this.isMoveToLastPage
              }
            </ul>
          </nav>
        </div> */}
      </div>
    );
  }
}


export default ListBoardComponent;