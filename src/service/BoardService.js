import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; // spring boot api의 url 

class BoardService {
  getBoards() { // 글목록 데이터를 가져오는 함수
    return axios.get(BOARD_API_BASE_URL);
  }

  createBoard(board){ // 글 작성 함수를 추가, axios의 post 함수를 사용해서 통신
    return axios.post(BOARD_API_BASE_URL, board);
  }

  getOneBoard(seq) { // 글 상세보기 함수 추가, 경로 파라미터로 글 번호를 설정하여 통신
    return axios.get(BOARD_API_BASE_URL + "/" + seq);
  }

  updateBoard(seq, body) { // 글 수정 함수 추가, 경로 파라미터로 글 번호를 수정, 수정할 객체정보를 body에 담아 통신
    return axios.put(BOARD_API_BASE_URL+ "/" + seq, body);
  }

  deleteBoard(seq){ // 글 삭제 함수 추가, 경로 파라미터로 글 번호를 설정, 글 번호에 해당하는 글을 삭제
    return axios.delete(BOARD_API_BASE_URL + "/" + seq);
  }
}

export default new BoardService();

// axios는 HTTP 클라이언트 라이브러리로써, 비동기 방식으로 HTTP 데이터 요청을 실행합니다.
