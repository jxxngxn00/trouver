import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Map = ({geometry}) => {
    const [loading, setLoading] = useState(true);
    const [road, setRoad] = useState([]);
    // const [route, setRoute] = useState([]);

    const {Tmapv3} = window;
    let map;
    let markerList = [];
    let pass = [];
    let xStart, xEnd, yStart, yEnd;

    const initDiv = () => {
        const mapDiv = document.getElementById('map_div');
        if (mapDiv) {
            mapDiv.innerHTML = '';
        };
    };

    const initTmap = (geometry) => {
        if (!geometry || geometry.length === 0) {
            console.error('geometry is empty');
            return;
        };

        const [xMiddle, yMiddle] = middleGeometry(geometry);
        // console.log(`중심좌표 :: ${xMiddle}, ${yMiddle}`);
        map = new window.Tmapv3.Map("map_div", {
            center : new Tmapv3.LatLng(xMiddle, yMiddle),
            weight : "100%",
            height : "30vh",
            zoom: 9
        });
        // map.on("ConfigLoad", function() {
        //     addPolyline();
        // });
        addMarkers(geometry);

        // return map;
    }

    // 마커 추가
    const addMarkers = (geometry) => {
        removeMarkers(); // 기존의 마커 삭제
        function addMarker(status, lon, lat, tag) {
            //출도착경유구분
            //이미지 파일 변경.
            var markerLayer;
            let imgURL = "";
            switch (status) {
                case "llStart":
                    imgURL = '/upload/tmap/marker/pin_r_m_s.png';
                    break;
                case "llPass":
                    imgURL = '/upload/tmap/marker/pin_b_m_p.png';
                    break;
                case "llEnd":
                    imgURL = '/upload/tmap/marker/pin_r_m_e.png';
                    break;
                default:
            };
            var marker = new Tmapv3.Marker({
                position: new Tmapv3.LatLng(lat,lon),
                // icon: imgURL,
                map: map
            });
            return marker;
        };
        geometry.map((coord, idx) => {
            // console.log(`${idx+1} 좌표 생성 :: ${coord.x}, ${coord.y}`);
            if ( idx === 0 ) {
                addMarker("llStart", coord.y, coord.x , 1);
                xStart = coord.x;
                yStart = coord.y;
            }
            else if (idx === geometry.length - 1) {
                addMarker("llEnd", coord.y, coord.x, 2);
                xEnd = coord.x;
                yEnd = coord.y;
            }
            else { 
                addMarker("llPass", coord.y, coord.x, idx+3);
                pass = [...pass, {
                    viaPointId : `test01`,
                    viaPointName : `name01`,                
                    viaX : `${coord.y}`,
                    viaY : `${coord.x}`,
                    // viaX : toString(coord.y),
                    // viaY : toString(coord.x),
                }];
            }
        });
    };

    // 마커 초기화
    const removeMarkers = () => {
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].setMap(null);
        }
        markerList = [];
    };

    // 지도 중심좌표
    const middleGeometry = ( array ) => {
        let xSum = 0;
        let ySum = 0;
        array.map((item, idx) => {
            xSum += item.x;
            ySum += item.y;
        });

        const xAvg = xSum / array.length;
        const yAvg = ySum / array.length;
        return [xAvg, yAvg]
    };

    // 다중경유지30 API 사용 요청
    const findRoad = async (xStart, yStart, xEnd, yEnd, pass) => {
        // console.log(typeof(`${yStart}`));
        const options = {
            method: 'POST',
            url: 'https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1',
            headers: {
                accept: 'application/json',
                'Content-type': 'application/json',
                appKey: 'LGNUEpxYAA5S219MoVvCt5ag82Zdwh6J1u7AQ6sf'
            },
            data: {    
                reqCoordType: 'WGS84GEO',
                resCoordType: 'WGS84GEO',
                startName: '%EC%B6%9C%EB%B0%9C%EC%A7%80',
                startX: `${yStart || 0}`,
                startY: `${xStart || 0}`,
                startTime: '202412311314',
                endName: '%EB%8F%84%EC%B0%A9%EC%A7%80',
                endX: `${yEnd}`,
                endY: `${xEnd}`,
                viaPoints: pass
            }
        };
        axios.request(options)
        .then(function (response) {
            // console.log(response.data.features);
            const res = response.data.features;
            res?.map((item, idx) => {
                // console.log(item.geometry);
                const updatePoint = item.geometry;
                setRoad([...road, updatePoint]);
            });

            road.map((r, idx) => {
                if (r.type === "LineString") {
                    addMarkers("llPass", r.coordinates[0], r.coordinates[1], idx);
                } else {
                    map.on("ConfigLoad", function() {
                        addPolyline(r) 
                    });
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    // 선으로 지도 그리기
    const addPolyline = (r) => {
        const coordinates = r.coordinates;
        // const test = coordinates.map((item) => {
        //     return new Tmapv3.LatLng(item[0], item[1])
        // });
        // console.log(test);
        const polyLine = new Tmapv3.Polyline({
            path: coordinates.map((item) => {
                return new Tmapv3.LatLng(item[0], item[1])
            }),
            strokeColor: "#dd00dd",
            strokeWeight: 6,
            map: map
        })
    }
    useEffect(()=> {
        if (loading) {
            console.log(`>>> geometry :: `,geometry);
            if (!geometry || geometry.length === 0) {
                console.log('geometry is empty');
                return;
            } else {
                setLoading(false);
            }

            
            const script = document.createElement('script');
            script.src = 'https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=LGNUEpxYAA5S219MoVvCt5ag82Zdwh6J1u7AQ6sf';
            // script.src = 'https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=YOUR_APP_KEY';
    
            script.onload = async (e) => {
                e.preventDefault();
                initDiv();
                initTmap(geometry);
                findRoad(xStart, yStart, xEnd, yEnd, pass);


            };
            document.head.appendChild(script);

        }
    },[geometry, road]);

    return (
        <div id='map_div' style={{ width: '100vw', height: '20vh' }}/>
    );
};

export default Map;