import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/* components */
import TouchDnd from "../components/updateplan/TouchDnd";
import CalendarPicker from "../components/updateplan/CalendarPicker";
import TopBtnBar from "../components/TopBtnBar";
import SearchPlace from "../components/updateplan/SearchPlace";

/* library */
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faMapPin,
  faTrash,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Popup, Tag } from "antd-mobile";
import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

/* etc */
import mapPicture from "../../images/map.png";
import { getDateToString } from "../components/makeplan/DatePickerCustom";
import axios from "axios";

// 날짜 사이의 날짜 배열 생성
const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime());
  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

function PlanUpdate() {
    const location = useLocation();
    const go = useNavigate();

    const { date, budget, tags } = location.state; // 일정 만들기 과정에서 가져온 파라미터를 형식에 맞춰 변환
    const dateString = `${getDateToString(date.toString(), 0)} ~ ${getDateToString(date.toString(), 1)}`;
    const budgetString = `₩ ${budget[0]} ~ ₩ ${budget[1]}`;

    const [visibleCalendar, setVisibleCalendar] = useState(false); // 달력 보임 state
    const [visibleSearchPlace, setVisibleSearchPlace] = useState(false); // 장소 검색 state

    // 장소 추가 관련 변수
    const [route, setRoute] = useState();
    const [placeArray, setPlaceArray] = useState([]);

    // 날짜 선택 관련 변수
    const [valFromCal, setValFromCal] = useState( dateString || "" ); // 달력에서 날짜 선택시
    const [daily, setDaily] = useState(0); // N일차 -- N
    const [dateRange, setDateRange] = useState([]);
    

    // 날짜 변수 변경
    const handleValueChange = (value) => {
        setValFromCal(value);
        const [start, end] = value.split("~").map((date) => new Date(date));
        const dates = getDatesInRange(start, end);
        setDateRange(dates);
    };

    // 장소 추가
    const addPlaceRoute = async (daily) => {
        setVisibleSearchPlace(false);
        // console.log(route);
        try {
            const res = await axios.get(`/api/place/getPlace/${route}`);
            const result = res.data[0];
            const newRoute =   {
                id: result.pla_id,
                placeName: result.pla_name,
                placeCate: result.pla_cate,
                placeRate: result.pla_rate_avg,
            };

            setPlaceArray(prevPlaceArray => {
                const newPlaceArray = [...prevPlaceArray];

                if (!Array.isArray(newPlaceArray[daily])) {
                    newPlaceArray[daily] = [];
                }
                if (newPlaceArray) {
                    newPlaceArray[daily] = [...newPlaceArray[daily], newRoute];
                } else {
                    newPlaceArray[daily] = [newRoute];
                };

                return newPlaceArray;
            });
            // console.log('>>> placeArray : ' , updatedPlaceArray);

        } catch (error) {
            console.error("Error fetching product detail : ",error);
        }
    };


    useEffect(() => {
        getDatesInRange(new Date(date[0]), new Date(date[1]));
        handleValueChange(dateString);
        // eslint-disable-next-line
    }, [date]);

    // 삭제 전 경고 모달 팝업
    const warning = () => {
        Modal.alert({
        header: (
            <ExclamationCircleFilled
            style={{
                fontSize: 64,
                color: "var(--adm-color-warning)",
            }}
            />
        ),
        title: "일정 삭제",
        content: (
            <>
            <div> 일정을 정말 삭제할까요? </div>
            <div> 삭제된 일정은 복구하기 어렵습니다! </div>
            </>
        ),
        showCloseButton: true,
        confirmText: "삭제하기",
        onConfirm: async () => deletAlert(),
        });
    };

    // 삭제 완료 모달 팝업
    const deletAlert = async () => {
        Modal.alert({
        header: (
            <CheckCircleFilled
            style={{
                fontSize: 64,
                color: "var(--adm-color-confirm)",
            }}
            />
        ),
        title: "일정 삭제 완료",
        content: "일정이 정상적으로 삭제되었습니다.",
        confirmText: "확인",
        closeOnMaskClick: true,
        onConfirm: () => go("/viewplan"),
        });
    };

    // 저장 완료 모달 팝업
    const saveConfirm = () => {
        Modal.alert({
        header: (
            <CheckCircleFilled
            style={{
                fontSize: 64,
                color: "var(--adm-color-confirm)",
            }}
            />
        ),
        title: "일정 저장 완료",
        content: "일정이 저장 및 업로드 되었습니다.",
        confirmText: "확인",
        closeOnMaskClick: true,
        onConfirm: () => go("/viewplan"),
        });
    };

    return (
        <div className="homeBgDiv viewDetailWrapper">
        <TopBtnBar />
        <div className="planTitle">
            <PlanTitle type="text" placeholder="혼자 떠나는 제주여행" />
        </div>
        <PlanInfo>
            <div className="planDate">
            예산 : {budget ? budgetString : "예산 정보가 없습니다."}
            </div>
        </PlanInfo>
        <PlanDate>
            {valFromCal ? valFromCal : "날짜가 설정되지 않았습니다."}
            <DateBtn className="dateBtn" onClick={() => setVisibleCalendar(true)}>
            <FontAwesomeIcon icon={faCalendar} />
            </DateBtn>
        </PlanDate>

        {/* 일정 설정 */}
        <Popup
            position="right"
            visible={visibleCalendar}
            showCloseButton
            onClose={() => {
            setVisibleCalendar(false);
            }}
        >
            <CalendarPicker onValChange={handleValueChange} />
            <ConfirmBtn
            onClick={() => {
                setVisibleCalendar(false);
            }}
            >
            확인
            </ConfirmBtn>
        </Popup>

        {/* N일차 라디오 버튼 */}
        <div className="dateRadioBtn">
            <div className="dateRadioBoxWrapper">
            {dateRange.map((dateN, index) => (
                <React.Fragment key={index}>
                    <InfoRadioBoxInput
                        type="radio"
                        id={`day${index + 1}`}
                        name="day"
                        value={index}
                        onChange={(e) => {setDaily(e.target.value);}}
                        checked = {index === daily}
                    />
                    <InfoCheckBoxLabel htmlFor={`day${index + 1}`}>
                        {index + 1}일차
                    </InfoCheckBoxLabel>
                </React.Fragment>
            ))}
            </div>
        </div>

        <div className="mapWrapper">
            <img src={mapPicture} alt="지도 예시" />
        </div>

        <div className="routesWrapper">
            {/* 여행 장소 경유지 설정 */}
            <div className="wrapper2">
                <div className="wrapper3">
                    <TouchDnd 
                        list={placeArray} setList={setPlaceArray} 
                        daily={daily}
                        setDaily = {setDaily}
                        dateRange={dateRange}
                    />
                </div>
            </div>

            {/* 선택된 태그 */}
            <div className="wrapper2">
            <div className="wrapper3 tags">
            {tags && tags.length > 0 ? 
                tags.map((tag, idx) => {
                    return (<Tag key={idx} color='#45866B'>{tag}</Tag>)
                })
            : "태그가 없습니다."}
            </div>
            </div>
        </div>

        <VPlanDetailBtnWrapper className="vPlanDetailBtnWrapper">
            <div
            className="vPlanDetailBtn"
            onClick={() => {
                setVisibleSearchPlace(true);
            }}
            >
            <FontAwesomeIcon
                className="icon"
                size="2xl"
                icon={faMapPin}
                style={{ color: "#c9c9c9" }}
            />
            <span>장소 추가</span>
            </div>

            <Popup
            visible={visibleSearchPlace}
            showCloseButton
            onClose={() => {
                setVisibleSearchPlace(false);
            }}
            >
            <SearchPlace onValChange={handleValueChange} route={route} setRoute={setRoute}/>
            <ConfirmBtn
                onClick={() => {
                    addPlaceRoute(daily);
                }}
            >
                등록하기
            </ConfirmBtn>
            </Popup>

            <div className="vPlanDetailBtn" onClick={() => saveConfirm()}>
            <FontAwesomeIcon
                className="icon"
                size="2xl"
                icon={faFloppyDisk}
                style={{ color: "#c9c9c9" }}
            />
            <span>일정 저장</span>
            </div>
            <div className="vPlanDetailBtn" onClick={() => warning()}>
            <FontAwesomeIcon
                className="icon"
                size="2xl"
                icon={faTrash}
                style={{ color: "#c9c9c9" }}
            />
            <span>일정 삭제</span>
            </div>
        </VPlanDetailBtnWrapper>
        </div>
    );
};

const PlanInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  width: 94vw;
  padding: 0vh 1.5vw;
  margin: 1.5vh 0vw;
`;

const InfoRadioBoxInput = styled.input`
  position: relative;
  width: 0px;
  height: 0px;
  padding: 0;
  /* margin: -1; */
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  display: none;
  &:checked + label {
    background-color: #45866b;
    color: white;
  }
`;

const InfoCheckBoxLabel = styled.label`
  max-height: 1.2vh;
  padding: 0.5rem 1rem 0.5rem;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 2rem;
  background-color: #f2f4f6;
  font-size: 0.8rem;
  color: #383838;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2vw;
`;

const VPlanDetailBtnWrapper = styled.div`
  display: flex;
  margin-top: 5vh !important;
`;

const PlanTitle = styled.input`
  /* display: block; */
  font-family: "KCC-Hanbit";
  font-size: 1.75rem;
  padding: 1.4vh 5vw;
  border-radius: 30px;
  border: none;
  box-shadow: 0px 0px 27px -9px rgba(130, 130, 130, 0.75);
  margin-top: 7vh;
`;

const DateBtn = styled.button`
  width: 0.5vw;
  display: flex;
  margin: 0% !important;
  justify-content: center;
  border-radius: 30px;
  border: none;
`;

const PlanDate = styled.div`
  font-size: 1rem;
  width: 89vw;
  padding: 0vh 0vw 0vh 3vw;
  margin: 1.5vh 2.3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ConfirmBtn = styled.div`
  width: 60%;
  height: 6vh;
  border-radius: 10px;
  color: white;
  font-size: 1.15rem;
  background-color: #45866b;
  box-shadow: 3px 3px 3px #375d4e;
  transition-duration: 0.3s;

  margin: 2vh auto;

  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    background-color: #81c1a7;
    color: #45866b;
    box-shadow: none;
  }
`;
export default PlanUpdate;
