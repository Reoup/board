import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ReadBoardComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            seq: this.props.match.params.seq,
            board: {}
        };
    }

    componentDidMount() {
        BoardService.getOneBoard(this.state.seq)
        .then( res => {
            this.setState({board: res.data});
        });
    }

    returnDate(cTime){
        return (
            <div className= "row">
                <label>생성일: [{cTime}]</label>
            </div>
        )
    }

    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.seq}`);
    }

    deleteView = async function() {
        if(window.confirm("정말로 글을 삭제하시겠습니까?\n")){
            BoardService.deleteBoard(this.state.seq)
            .then(res => {
                console.log("delete result =>" +JSON.stringify(res));
                if(res.status == 200) {
                    this.props.history.push('/board');
                }
                else{
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className = "text-center">Read Detail</h3>
                    <div className="card-body">
                        <div className= "row">
                            <span><label>Title</label>: {this.state.board.title}</span>
                        </div>

                        <div className="row">
                            <span><label>Contents</label>:</span> <br></br>
                            <textarea value={this.state.board.content} readOnly/>
                        </div>
                        {this.returnDate(this.state.board.reg_dt)}
                        <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                        <button className="btn btn-info" onClick={this.goToUpdate.bind(this)} style={{marginLeft: "10px"}}>수정</button>
                        <button className="btn btn-danger" onClick={() => this.deleteView()} style={{marginLeft: "10px"}}>글 삭제</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadBoardComponent;