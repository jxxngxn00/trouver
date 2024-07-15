import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faGripLines } from '@fortawesome/free-solid-svg-icons'

export default function TouchDnd({ List, setList }) {
  const dragTarget = useRef(null);
  const cloneDragTarget = useRef(null);
  const dragzone = useRef(null);
  const targetTouch = useRef(null);
  const shiftY = useRef(null);
  const dontScroll = useRef(null);
  const insertTargetIndex = useRef(null);
  const [dragMode, setDragMode] = useState(null);
  const [scrollOff, setScrollOff] = useState(true);

  const grab = (e) => {
    if (e.target.id !== "drag") return;
    const target = e.target.parentNode;
    dragTarget.current = target;
    cloneDragTarget.current = target.cloneNode(true);
    cloneDragTarget.current.removeAttribute("index");
    // console.log(cloneDragTarget.current);
    dragzone.current = target.parentNode;
    targetTouch.current = e.targetTouches[0];
    shiftY.current =
      e.targetTouches[0].clientY - target.getBoundingClientRect().top;
    setDragMode(true);

    console.log("grab - cloneDratTarget.current : ", cloneDragTarget.current);
  };

  const drop = () => {
    if (dragTarget.current === null) return;
    setDragMode(false);
    setScrollOff(true);

    if (cloneDragTarget.current) {
      cloneDragTarget.current.remove();
      console.log("drop - cloneDragTarget.current removed:", cloneDragTarget.current);
    } else {
      console.log("drop - cloneDragTarget.current is null");
    }
    // console.log("drop - cloneDratTarget.current : ", cloneDragTarget.current);
  };

  const drag = (e) => {
    if (scrollOff) return;
    if (!dragMode) return;
    if (!targetTouch.current) return;

    // element move
    dragTarget.current.style.top =
      e.targetTouches[0].pageY - shiftY.current + "px";

    // screen move
    const persent = (e.targetTouches[0].clientY / window.screen.height) * 100;
    if (persent >= 95) window.scrollBy(0, 2);
    if (persent <= 20) window.scrollBy(0, -2);

    // drag 후 over되는 element 위에서 상위 50% 일때 element의 위로 하위 50% 일때 아래로 clonenode가 위치
    const compareNode = document
      .elementsFromPoint(
        e.targetTouches[0].pageX - window.pageXOffset,
        e.targetTouches[0].pageY - window.pageYOffset
      )
      .filter((e) => e.attributes.index)[1];
    const newInsertTargetIndex = compareNode?.attributes.index.value;
    if (!newInsertTargetIndex) return;
    const comparPersent =
      ((e.targetTouches[0].pageY - compareNode.getBoundingClientRect().top) /
        compareNode.getBoundingClientRect().height) *
      100;
    let insertNode = [...dragzone.current.childNodes].filter(
      (e) => e !== cloneDragTarget.current
    );
    if (comparPersent < 50) insertNode = compareNode;
    if (comparPersent >= 50) insertNode = insertNode[+newInsertTargetIndex + 1];
    if (cloneDragTarget.current) cloneDragTarget.current.remove();
    dragzone.current.insertBefore(cloneDragTarget.current, insertNode);

    // clonenode의 위치를 기반으로 리스트 변경
    const targetNodeIndex =
      [...dragzone.current.childNodes]
        .filter((e) => e !== dragTarget.current)
        .map((e, i) => !e.attributes.index && i + 1)
        .filter((x) => x)[0] - 1;
    if (insertTargetIndex.current === null)
      insertTargetIndex.current = targetNodeIndex;
    if (insertTargetIndex.current === targetNodeIndex) return;
    let copyList = [...List];

    [copyList[insertTargetIndex.current], copyList[targetNodeIndex]] = [
      copyList[targetNodeIndex],
      copyList[insertTargetIndex.current]
    ];
    setList(copyList);
    insertTargetIndex.current = targetNodeIndex;
  };

  // tochmove drag handler (scroll move)
  useEffect(() => {
    dontScroll.current = (e) => {
      if (e.cancelable) {
        e.preventDefault();
        setScrollOff(false);
      } else {
        setScrollOff(true);
      }
    };
    if (dragMode) {
      document.addEventListener("touchmove", dontScroll.current, {
        passive: false
      });
    }
    return () => {
      document.removeEventListener("touchmove", dontScroll.current);
    };
  }, [dragMode, scrollOff]);

  // tochmove drag handler (element move)
  const dragHandler = useCallback(
    (e) => {
      // eslint-disable-next-line
      drag(e);
    },
    [scrollOff, dragMode, List]
  );
  useEffect(() => {
    document.addEventListener("touchmove", dragHandler, { passive: false });
    return () => {
      document.removeEventListener("touchmove", dragHandler);
    };
  }, [dragHandler, scrollOff, dragMode]);

  // grab and drop handlers
  useEffect(() => {
    if (!scrollOff) {
      if (!targetTouch.current) return;

      // target setting
      dragTarget.current.classList.remove("defalut");
      dragTarget.current.classList.add("absolute");
      dragTarget.current.style.top =
        targetTouch.current.pageY - shiftY.current + "px";

      // clone setting
      if (cloneDragTarget.current) {
        cloneDragTarget.current.style.opacity = 0;
        const index = dragTarget.current.attributes["index"].value;
        dragzone.current.insertBefore(
          cloneDragTarget.current,
          dragzone.current.childNodes[index]
        );
      }

      console.log("useEffect - cloneDratTarget.current : ", cloneDragTarget.current);
    } else {
      if (dragMode === null) return;
      // target reset
      dragTarget.current.classList.remove("absolute");
      dragTarget.current.classList.add("defalut");

      // clone reset
      if (cloneDragTarget.current) cloneDragTarget.current.remove();

      // ref and state reset
      dragTarget.current.style = null;
      cloneDragTarget.current = null;
      dragzone.current = null;
      targetTouch.current = null;
      shiftY.current = null;
      insertTargetIndex.current = null;
    }
  }, [dragMode, scrollOff]);


  return List.map((item, idx) => (
    <RouteDiv key={item.id}             
      onTouchStart={grab}
      onTouchEnd={drop}
      index={idx}
      className="default"
    >
        <div className='route'>
            <span className='placeName'>{item.placeName}</span>
            <div className='detailsWrapper'>
                <span className='placeCate'>{item.placeCate}</span>
                { item.placeRate ? (
                    <span className='placeRate'>
                    <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}}/>
                    {item.placeRate}</span>
                ) : null}
            </div>
        </div>
        <FontAwesomeIcon className='gripLines' icon={faGripLines} id="drag"/>
    </RouteDiv>
  ));
}

const RouteDiv = styled.div`
    border-radius: 10px;
    box-shadow: 0px 4px 18px -5px  hsla(234, 44%, 26%, 0.411);
    width: 95%;
    padding: 0.5% 3.5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
        & .detailsWrapper {
            gap: 0vw!important;
            justify-content: flex-start;
        }

        & .gripLines {
            margin-right: 4.5%;
        }
`;
