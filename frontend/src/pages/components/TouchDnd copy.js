import { useCallback, useEffect, useRef, useState } from "react";

export default function DndList({ List = [], setList }) {
  const dragTarget = useRef(null);
  const cloneDragTarget = useRef(null);
  const dragzone = useRef(null);
  const targetTouch = useRef(null);
  const shiftY = useRef(null);
  const dontScroll = useRef(null);
  const insertTargetIndex = useRef(null);
  const [dragMode, setDragMode] = useState(null);
  const [scrollOff, setScrollOff] = useState(true);

  const grap = (e) => {
    if (e.target.id !== "drag") return;
    const target = e.target.parentNode;
    dragTarget.current = target;
    cloneDragTarget.current = target.cloneNode(true);
    cloneDragTarget.current.removeAttribute("index");
    dragzone.current = target.parentNode;
    targetTouch.current = e.targetTouches[0];
    shiftY.current =
      e.targetTouches[0].clientY - target.getBoundingClientRect().top;
    setDragMode(true);
  };

  const drop = () => {
    if (dragTarget.current === null) return;
    setDragMode(false);
    setScrollOff(true);
  };

  const drag = (e) => {
    if (scrollOff) return;
    if (!dragMode) return;
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
    cloneDragTarget.current.remove();
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

  // grap and drop handlers
  useEffect(() => {
    if (!scrollOff) {
      // target setting
      dragTarget.current.classList.remove("defalut");
      dragTarget.current.classList.add("absolute");
      dragTarget.current.style.top =
        targetTouch.current.pageY - shiftY.current + "px";

      // clone setting
      cloneDragTarget.current.style.opacity = 0;
      const index = dragTarget.current.attributes["index"].value;
      dragzone.current.insertBefore(
        cloneDragTarget.current,
        dragzone.current.childNodes[index]
      );
    } else {
      if (dragMode === null) return;
      // target reset
      dragTarget.current.classList.remove("absolute");
      dragTarget.current.classList.add("defalut");

      // clone reset
      cloneDragTarget.current.remove();

      // ref and state reset
      dragTarget.current.style = null;
      cloneDragTarget.current = null;
      dragzone.current = null;
      targetTouch.current = null;
      shiftY.current = null;
      insertTargetIndex.current = null;
    }
  }, [scrollOff]);

  return List.map((item, index) => (
    <div
      key={item}
      onTouchStart={grap}
      onTouchEnd={drop}
      index={index}
      className="defalut"
      style={{border: "1px solid"}}
    >
      <div
        style={{
          width: "2rem",
          aspectRatio: "1/1",
          backgroundColor: "red",
          borderRadius: "50%"
        }}
        id="drag"
      />
      <div style={{ flex: "1" }}>{item}</div>
    </div>
  ));
}
