// src/pages/Itinerary.js
import React from 'react';

const Itinerary = () => {
  return (
    <div className="itinerary">
      <h1>여행 일정</h1>
      <div className="map-section">
        <h2>제주도 지도</h2>
        {/* Map component can be integrated here */}
      </div>
      <div className="events-section">
        <h2>9월 7일 주요 일정</h2>
        <div className="event">
          <h3>일정 1</h3>
          <p>상세 설명...</p>
        </div>
        <div className="event">
          <h3>일정 2</h3>
          <p>상세 설명...</p>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
