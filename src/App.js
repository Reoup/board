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
              {/*경로 파라미터의 값을 통해서 글 작성 기능인지 글 수정 기능인지를 구분*/}
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

// React Router란
// SPA의 라우팅 문제를 해결하기 위한 표준처럼 사용되고 있는 네비게이션 라이브러리입니다.
// React Router를 사용하면 앱에서 발생하는 라우팅이 location or history와 같은 브라우저 내장 API와 완벽하게 연동이 됩니다.
// SPA에서 제공하는 다이나믹한 사용자 경험을 그대로 살리면서도 기존 웹 사이트에서 가능하던 브라우저상의 매끈한 라우팅을 제공할 수 있습니다.