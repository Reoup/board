import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import moment from 'moment';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        // this.state에 글 상세보기에 사용될 파라미터 정의
        this.state = {
            seq: this.props.match.params.seq,
            board: {}
        };
    }

    // 페이지가 로딩될 때 API와 통신하여 글 객체를 가져옴
    componentDidMount() {
        BoardService.getOneBoard(this.state.seq)
            .then(res => {
                this.setState({ board: res.data });
            });
    }

    // 글 목록으로 이동하는 함수를 정의
    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.seq}`);
    }

    // 글 삭제 함수 추가, alert 창을 띄워서 삭제할 지를 결정
    // alert 창에서 확인 버튼이 클릭되면, API와 통신하여 글을 삭제한 후 성공하면 글 목륵으로 이동
    deleteView = async function () {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n")) {
            BoardService.deleteBoard(this.state.seq)
                .then(res => {
                    console.log("delete result =>" + JSON.stringify(res));
                    if (res.status === 200) {
                        this.props.history.push('/board');
                    }
                    else {
                        alert("글 삭제가 실패했습니다.");
                    }
                });
        }
    }

    _dataFormat(data, format) {
        return moment(new Date(data)).format(format);
    }

    initialRegistrationTime = (cTime) => {
        if(!cTime) return;
        return cTime ? this._dataFormat(cTime, 'YYYY-MM-DD') : '-';
    }

    render() {
        return ( 
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Read Detail</h3>
                    <div className="card-body">
                        <div className="row">
                            {/*파라미터 값을 그대로 표시*/}
                            <span><label>Title</label>: {this.state.board.title}</span>
                        </div>
                        <div className="row">
                            <span><label>Contents</label>:</span> <br></br>
                            <textarea style={{minHeight:"200px"}} value={this.state.board.content} readOnly />
                        </div>
                        <label>생성자: </label><span> {this.initialRegistrationTime(this.state.board.reg_dt)}</span>
                        {/*글 목록, 글 수정, 글 삭제하는 함수*/ }
                        <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{ marginLeft: "10px" }}>글 목록으로 이동</button>
                        <button className="btn btn-info" onClick={this.goToUpdate.bind(this)} style={{ marginLeft: "10px" }}>수정</button>
                        <button className="btn btn-danger" onClick={() => this.deleteView()} style={{ marginLeft: "10px" }}>글 삭제</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadBoardComponent;