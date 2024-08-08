import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faPersonHiking } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function DistantCalc({xStart, yStart, xEnd, yEnd}) {
    // console.log(xStart, yStart, xEnd, yEnd);
    const [distance, setDistance] = useState();
    const [carDisctance, setCarDistance] = useState();
    const [walkDisctance, setWalkDistance] = useState();
    //TMAP 직선거리 얻어오는 함수
    // eslint-disable-next-line
    const getDistance = async () => {
        const options = {
            method: 'GET',
            url: `https://apis.openapi.sk.com/tmap/routes/distance?version=1&startX=${xStart}&startY=${yStart}&endX=${xEnd}&endY=${yEnd}&reqCoordType=WGS84GEO&callback=function`,
            headers: {
                accept: 'application/json', 
                appKey: 'LGNUEpxYAA5S219MoVvCt5ag82Zdwh6J1u7AQ6sf'
            }
        };
    
        axios
            .request(options)
            .then(function (response) {
                // console.log(response.data);
                setDistance(response.data.distanceInfo.distance);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    const getCarDistance = async () => {
        const options = {
            method: 'POST',
            url: 'https://apis.openapi.sk.com/tmap/routes?version=1&callback=function',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              appKey: 'LGNUEpxYAA5S219MoVvCt5ag82Zdwh6J1u7AQ6sf'
            },
            data: {
              tollgateFareOption: 16,
              roadType: 32,
              directionOption: 1,
              endX: xEnd,
              endY: yEnd,
              endRpFlag: 'G',
              reqCoordType: 'WGS84GEO',
              startX: xStart,
              startY: yStart,
              gpsTime: '20191125153000',
              speed: 10,
              uncetaintyP: 1,
              uncetaintyA: 1,
              uncetaintyAP: 1,
              carType: 0,
              startName: '%EC%9D%84%EC%A7%80%EB%A1%9C%20%EC%9E%85%EA%B5%AC%EC%97%AD',
              endName: '%ED%97%A4%EC%9D%B4%EB%A6%AC',
            //   passList: '127.38454163183215,36.35127257501252',
            //   gpsInfoList: '126.939376564495,37.470947057194365,120430,20,50,5,2,12,1_126.939376564495,37.470947057194365,120430,20,50,5,2,12,1',
              detailPosFlag: '2',
              resCoordType: 'WGS84GEO',
              sort: 'index'
            }
          };
          
          axios
            .request(options)
            .then(function (response) {
            //   console.log(response.data.features[0].properties.totalDistance);
              setCarDistance(response.data.features[0].properties.totalDistance);
            })
            .catch(function (error) {
              console.error(error);
            });
    };
    const getWalkDistance = async () => {
        const options = {
            method: 'POST',
            url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              appKey: 'YEWVxfrK4j8xTNQZURJ4z1Te4JTZs26v45fgmfn7'
            },
            data: {
              startX: xStart,
              startY: yStart,
            //   angle: 20,
            //   speed: 30,
            //   endPoiId: '10001',
              endX: xEnd,
              endY: yEnd,
            //   passList: '126.92774822,37.55395475_126.92577620,37.55337145',
              reqCoordType: 'WGS84GEO',
              startName: '%EC%B6%9C%EB%B0%9C',
              endName: '%EB%8F%84%EC%B0%A9',
              searchOption: '0',
              resCoordType: 'WGS84GEO',
              sort: 'index'
            }
        };
        
        axios
        .request(options)
        .then(function (response) {
            console.log(response.data.features[0].properties.totalDistance);
            setWalkDistance(response.data.features[0].properties.totalDistance);
        })
        .catch(function (error) {
            console.error(error);
        });
    };
    useEffect(()=>{
        getDistance();
        getCarDistance();
        getWalkDistance();
    },[]);
    
    return (
        <>
            <span className='distance'>
                {distance/1000}&nbsp;km
            </span>
            <span className='moveInfo'>
                <FontAwesomeIcon icon={faCar} size="2xl" style={{color: "#7d7d7d",}} />
                &nbsp;{carDisctance/1000}&nbsp;km
            </span>
            <span className='moveInfo'>
                <FontAwesomeIcon icon={faPersonHiking} size="2xl" style={{color: "#7d7d7d",}} />
                &nbsp;{walkDisctance/1000}&nbsp;km
            </span>
        </>
    );
}

export default DistantCalc;