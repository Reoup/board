import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Switch>
              <Route path = "/" exact component = {ListBoardComponent}></Route> 
              <Route path = "/board" component = {ListBoardComponent}></Route>
              {/*경로 파라미터의 값을 통해서 글 작성 기능인지 굴 수정 기능인지를 구분*/}
              {/*URL의 params를 설정 할 때 :foo의 형식으로 설정함, 이렇게 하면 foo라는 params가 생김 */}
              <Route path = "/create-board/:seq" component = {CreateBoardComponent}></Route>
              <Route path = "/read-board/:seq" component = {ReadBoardComponent}></Route>
            </Switch>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  )
}

export default App;