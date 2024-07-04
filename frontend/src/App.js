import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';

/* import page & components */
import StartPage from './pages/StartPage'

import Home from './pages/Home';
import Plan from './pages/components/home/Plan'
import Menu from './pages/components/Menu';

import MakePlan from './pages/plan/MakePlan';
import ViewPlan from './pages/plan/ViewPlan';
import ViewPlanDetail from './pages/plan/ViewPlanDetail'
import PlanUpdate from './pages/plan/PlanUpdate';

import Product from './pages/Product';
import ViewProductDetail from './pages/product/ViewProductDetail';

import HotSpot from './pages/HotSpot';

import Settings from './pages/Settings';

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
  //   axios.get("/recommand").then((res)=> console.log(res.data));
  // };

  // useEffect(() => {
  //   getApi();  
  // }, []);

  // const navigate = useNavigate();

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
      <Menu/>
        <Routes>
            <Route path="/" element={<StartPage/>} />
            <Route path="/home" Component={Home}/>
            <Route path="/plan" Component={Plan}/>

            <Route path="/makeplan" element={<MakePlan/>} />
            <Route path="/viewplan" element={<ViewPlan/>} />
            <Route path="/viewplandetail" element={<ViewPlanDetail/>}/>
            <Route path='/planupdate' element={<PlanUpdate/>}/>

            <Route path='/product' Component={Product}/>
            <Route path='/viewprodDetail' element={<ViewProductDetail/>}/>
            
            <Route path='/hotspot' Component={HotSpot}/>
            {/* <Route path="/signup" component={SignupForm} />
            <Route path="/profile" component={Profile} />*/}
            <Route path="/settings" Component={Settings} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
