import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class CreateBoardComponent extends Component {
  constructor(props){
    super(props)

    this.state = {
      seq: this.props.match.params.seq,
      title: '',
      content: ''
    }

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
  }


  changeTitleHandler = (event) => {
    this.setState({title: event.target.value});
}

changeContentsHandler = (event) => {
    this.setState({content: event.target.value});
}

createBoard = (event) => {
  event.preventDefault();
  
  let board = {
      title: this.state.title,
      content: this.state.content,
  };

  console.log("board => "+ JSON.stringify(board));
  if(this.state.seq === '_create'){
    BoardService.createBoard(board)
    .then(res =>{
      this.props.history.push('/board');
    });
  }
  else{
    BoardService.updateBoard(this.state.seq, board)
    .then(res => {
      this.props.history.push('/board');
    });
  }
}

cancel() {
  this.props.history.push('/board');
}

getTitle() {
  if(this.state.seq === '_create'){
    return <h3 className="text-center">새 글을 작성해주세요.</h3>
  }
  else{
    return <h3 className="text-center">{this.state.seq} 글을 수정 합니다.</h3>
  }
}

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
                                  <textarea placeholder="contents" name="contents" className="form-control" 
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