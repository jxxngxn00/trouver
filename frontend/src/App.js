import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* import page & components */
import StartPage from './pages/StartPage';

import Home from './pages/Home';
import Plan from './pages/components/home/Plan';

import MakePlan from './pages/plan/MakePlan';
import ViewPlan from './pages/plan/ViewPlan';
import ViewPlanDetail from './pages/plan/ViewPlanDetail';
import PlanUpdate from './pages/plan/PlanUpdate';

import Product from './pages/Product';
import ViewProductDetail from './pages/product/ViewProductDetail';
import WritingReview from './pages/product/WritingReview';

import Settings from './pages/Settings';

import Profile from './pages/setting/Profile';
import ReserveLog from './pages/setting/ReserveLog';
import FAQ from './pages/setting/FAQ';

import QnA from './pages/setting/QnA';
import QnADetail from './pages/setting/QnADetail';
import QnAInsert from './pages/setting/QnAInsert';

import SearchPage from './pages/SearchPage';

// 페이지 이동시 무조건 맨 위로 스크롤하도록 함
import ScrollToTop from './ScrollToTop';

/* CSS files + images */
import './App.css';
// import logo from './images/trouver_logo.png'


/* Hook */
import axios from "axios";

/* function -- app */
function App() {
  /* BE 연결 테스트 코드 : console에 server에서 전송한 데이터 받아옴 */
  const getApi = async () => {
    axios.get("/api").then((res)=> console.log(res.data));
    axios.get("/recommand").then((res)=> console.log(res.data));
  };

  useEffect(() => {
    getApi();  
  }, []);

  /* 모바일 화면 크기 최적화 훅 */
  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight]);

  return (
    <Router>
      <ScrollToTop />
      <RouteTransitions />
    </Router>
  );
}

function RouteTransitions() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/plan" element={<Plan />} />

        <Route path="/makeplan" element={<MakePlan />} />
        <Route path="/viewplan" element={<ViewPlan />} />
        <Route path="/viewplandetail" element={<ViewPlanDetail />} />

        <Route path='/planupdate' element={<PlanUpdate />} />

        <Route path='/product' element={<Product />} />
        <Route path='/viewprodDetail' element={<ViewProductDetail />} />
        <Route path='/makeReview' element={<WritingReview />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/reserve' element={<ReserveLog />} />

        <Route path='/faq' element={<FAQ />} />

        <Route path='/qna' element={<QnA />} />
        <Route path='/qnaDetail' element={<QnADetail />} />
        <Route path='/qnaInsert' element={<QnAInsert />} />

        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
