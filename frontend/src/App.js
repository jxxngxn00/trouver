import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* import page */
import StartPage from './pages/StartPage'
import Home from './pages/Home';
// import TravelPlans from './pages/TravelPlans';
// import Search from './pages/Search';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';

/* component files */
import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';

/* CSS files + images */
import './App.css';
// import logo from './images/trouver_logo.png'

/* Hook */
import { useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
// import axios from "axios";

/* function -- app */
function App() {

  /* BE 연결 테스트 코드 : console에 server에서 전송한 데이터 받아옴 */
  // const getApi = async () => {
  //   axios.get("/api").then((res)=> console.log(res.data));
  // };

  // useEffect(() => {
  //   getApi();  
  // }, []);

  // const navigate = useNavigate();


  /* 비디오 속도 조절 */
  // const videoRef = React.useRef();
  // const setPlayBackRate = () => {
  //   videoRef.current.playbackRate = 0.5;
  // };

  /* 모바일 화면 크기 최적화 훅 */
  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight]);




  return (
    // Routes 
    <Router>
      <div className="App">
        
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/home" Component={Home}/>
            {/* <Route path="/login" component={LoginForm} /> */}
            {/* <Route path="/signup" component={SignupForm} />
            <Route path="/home" component={Home} />
            <Route path="/travel-plans" component={TravelPlans} />
            <Route path="/search" component={Search} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} /> */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;
