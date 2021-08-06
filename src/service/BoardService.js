import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
  getBoards() {
    return axios.get(BOARD_API_BASE_URL);
  }

  createBoard(board){
    return axios.post(BOARD_API_BASE_URL, board);
  }

  getOneBoard(seq) {
    return axios.get(BOARD_API_BASE_URL + "/" + seq);
  }

  updateBoard(seq, board) {
    return axios.put(BOARD_API_BASE_URL+ "/" + seq, board);
  }

  deleteBoard(seq){
    return axios.delete(BOARD_API_BASE_URL + "/" + seq);
  }

}

export default new BoardService();