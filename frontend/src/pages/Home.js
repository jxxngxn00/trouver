import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>여행을 시작해볼까요?</h1>
      <button onClick={() => navigate('/itinerary')}>일정 보러 가기</button>
    </div>
  );
};

export default Home;
