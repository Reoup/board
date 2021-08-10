import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class CreateBoardComponent extends Component {
  constructor(props){
    super(props)

    // this.state에 폼 양식에서 사용될 파라미터 정의
    this.state = {
      seq: this.props.match.params.seq, // 글 작성인지 수정인지 구분하기 위한 파라미터 선언
      title: '',
      content: ''
    }

    // 폼 양식에 값이 입력되면 this.state에 정의 된 변수의 값을 변경하도록 바인드
    // Save 버튼을 클릭 시 API에 글 작성 리퀘스트를 보내는 함수를 바인드
    console.log(this.changeTitleHandler.bind(this));
    console.log(this.createBoard.bind(this));
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }


  // this.setState로 this.state에 정의된 변수에 값을 대입하게 해주는 함수를 선언
  changeTitleHandler = (event) => {
    this.setState({title: event.target.value});
}

  // this.setState로 this.state에 정의된 변수에 값을 대입하게 해주는 함수를 선언
changeContentsHandler = (event) => {
    this.setState({content: event.target.value});
}

// save 버튼을 클릭 시 API에 글 작성 또는 글 수정 리퀘스트를 보내도록 수정
createBoard = (event) => {
  event.preventDefault();
  
  let board = {
      title: this.state.title,
      content: this.state.content,
  };


  if(this.state.seq === '_create'){
    BoardService.createBoard(board)
    .then(res =>{
      this.props.history.push('/board');
    });
  }
  else{
    BoardService.updateBoard(this.state.seq, board)
    .then(res => {
      this.props.history.push(`/read-board/${this.state.seq}`);
    });
  }
}

// 글작성 취소버튼이 클릭 되었을 시 글 목록 페이지로 이동하는 함수를 선언
cancel = (event) => {
  event.preventDefault();
  if(this.state.seq === '_create'){
    this.props.history.push('/board')
  }
  else{
    this.props.history.push(`/read-board/${this.state.seq}`);
  }
}

// 페이지 타이틀을 글 작성인지 글 수정인지에 따라서 구분해서 출력하도록 수정
getTitle() {
  if(this.state.seq === '_create'){
    return <h3 className="text-center">새 글을 작성해주세요.</h3>
  }
  else{
    return <h3 className="text-center">{this.state.seq} 글을 수정 합니다.</h3>
  }
}

// 페이지 로딩 시 글 작성이면 비어있는 폼, 글 수정이면 글의 객체 값을 가져와서 바인딩해주도록 수정
componentDidMount() {
  if(this.state.seq === '_create'){
    return
  }
  else{
    BoardService.getOneBoard(this.state.seq)
    .then((res) => {
      let board = res.data;
      console.log("board =>" + JSON.stringify(board));

      this.setState({
        title: board.title,
        content: board.content
      });
    });
  }
}

render() {
  return (
      <div>
          <div className = "container">
              <div className = "row">
                  <div className = "card col-md-6 offset-md-3 offset-md-3">
                      {
                        this.getTitle()  
                      }
                      <div className = "card-body">
                          <form>
                              <div className = "form-group">
                                  <label> Title </label>
                                  <input type="text" placeholder="title" name="title" className="form-control" 
                                  value={this.state.title} onChange={this.changeTitleHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Contents  </label>
                                  <textarea placeholder="contents" name="contents" className="form-control" style={{minHeight:"200px"}}
                                  value={this.state.content} onChange={this.changeContentsHandler}/>
                              </div>
                              <button className="btn btn-success" onClick={this.createBoard}>Save</button>
                              <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default CreateBoardComponent;