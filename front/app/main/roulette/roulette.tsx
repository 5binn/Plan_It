'use client'

import React, { useEffect, useRef, useState } from "react";

const Roulette = ({ openModal }: any) => {
  const [result, setResult] = useState("");
  const [items, setItems] = useState([{ id: 0, item: '아이템' }]);
  const [item, setItem] = useState<string>('');
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const lastId = useRef(1);

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length == 10) {
      return alert("최대 9개 까지 가능 합니다.")
    }
    if (item != '') {
      setItems([...items, { id: lastId.current, item: item }]);
      lastId.current++;
    }
    setItem('');
  }

  const calculateRotation = (index, totalItems) => {
    // 각 아이템 간의 각도 계산
    return (360 / totalItems) * index;
  };

  const rotateRoulette = () => {
    setIsSpinning(true);
    let totalRotation = 0;
    const interval = setInterval(() => {
      const rotationIncrement = 3; // 매번 회전하는 각도
      totalRotation += rotationIncrement;
      const randomAngle = Math.random() * (4000 - 800) + 800;
      setRotation(totalRotation);
      if (totalRotation >= randomAngle) {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * items.length);
        setResult(items[randomIndex].item);
        setIsSpinning(false);
      }
    }, 0.1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
    console.log(e.target.value);
  }

  const onDelete = (id: number) => {
    const updateItems = items.filter(item => item.id != id);
    setItems(updateItems);
  }

  const getBackgroundColor = (itemCount) => {
    if (itemCount === 1) {
      return "lightblue"; // 아이템이 하나인 경우의 배경색
    } else if (itemCount === 2) {
      return "lightgreen"; // 아이템이 두 개인 경우의 배경색
    } else {
      return "lightyellow"; // 아이템이 세 개 이상인 경우의 배경색
    }
  };

  // function calculatePoints(n) {
  //   const points = [];
  //   const angleIncrement = (2 * Math.PI) / n;

  //   for (let i = 0; i < n; i++) {
  //     const angle = i * angleIncrement;
  //     const x = 150 + 120 * Math.cos(angle); // x 좌표 계산
  //     const y = 150 + 120 * Math.sin(angle); // y 좌표 계산
  //     points.push({ x, y });
  //   }

  //   return points;
  // }

  // const points = calculatePoints(10);
  // console.log(points)

  return (

    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="bg-white rounded w-10/12 md:w-1/3">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-extrabold">원판 돌리기</h3>
          <button onClick={openModal}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-center ">
          <form onSubmit={addItem} className="flex justify-between tems-center contents-center w-1/2 mt-2 border rounded border-gray-500">
            <input type="text" value={item} name="item" onChange={handleChange} className="p-1 rounded text-base h-full w-9/12" />
            <button type="submit" className="w-3/12 py-1 border-l border-gray-500 h-full hover:bg-gray-200">
              추가
            </button>
          </form>
        </div>
        <div className="my-1 flex justify-around flex-wrap">
          {items.map((item) =>
            <div className="flex justify-between border border-gray-400 rounded w-1/5 mx-2 my-1" key={item.id}>
              <div className="px-1 max-w-1/5 truncate">{item.item}</div>
              <button onClick={() => onDelete(item.id)} className="border-l border-gray-400 font-bold px-1 hover:bg-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 12L18 12M"
                  ></path>
                </svg>
              </button>
            </div>)}
        </div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
          <span className="text-4xl">▼</span>
          <div className="flex justify-center items-center mb-4">
            <svg width="300" height="300" style={{ transform: `rotate(${rotation}deg)` }}>
              {/* 원 그리기 */}
              <circle cx="150" cy="150" r="120" fill="lightblue" stroke="black" strokeWidth="3" />
              {items.length == 1 || items.length == 2 ?
                <>
                  <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" />
                  <line x1="150" y1="150" x2="150" y2="270" stroke="black" stroke-width="2" />
                </>
                : items.length == 3 ?
                  <g transform={`rotate(60, 150, 150)`}>
                    <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                    <line x1="150" y1="150" x2="90" y2="254" stroke="black" stroke-width="2" />
                    <line x1="150" y1="150" x2="90" y2="46" stroke="black" stroke-width="2" />
                  </g>
                  : items.length == 4 ?
                    <g transform={`rotate(45, 150, 150)`}>
                      <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                      <line x1="150" y1="150" x2="150" y2="270" stroke="black" stroke-width="2" />
                      <line x1="150" y1="150" x2="30" y2="150" stroke="black" stroke-width="2" />
                      <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" />
                    </g> :
                    items.length == 5 ?
                      <g transform={`rotate(37, 150, 150)`}>
                        <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                        <line x1="150" y1="150" x2="187" y2="264" stroke="black" stroke-width="2" />
                        <line x1="150" y1="150" x2="53" y2="220" stroke="black" stroke-width="2" />
                        <line x1="150" y1="150" x2="53" y2="79" stroke="black" stroke-width="2" />
                        <line x1="150" y1="150" x2="187" y2="36" stroke="black" stroke-width="2" />
                      </g> : items.length == 6 ?
                        <g transform={`rotate(30, 150, 150)`}>
                          <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                          <line x1="150" y1="150" x2="210" y2="254" stroke="black" stroke-width="2" />
                          <line x1="150" y1="150" x2="90" y2="254" stroke="black" stroke-width="2" />
                          <line x1="150" y1="150" x2="30" y2="150" stroke="black" stroke-width="2" />
                          <line x1="150" y1="150" x2="90" y2="46" stroke="black" stroke-width="2" />
                          <line x1="150" y1="150" x2="210" y2="46" stroke="black" stroke-width="2" />
                        </g> : items.length == 7 ?
                          <g transform={`rotate(26, 150, 150)`}>
                            <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                            <line x1="150" y1="150" x2="224.8" y2="243.8" stroke="black" stroke-width="2" />
                            <line x1="150" y1="150" x2="123.3" y2="267" stroke="black" stroke-width="2" />
                            <line x1="150" y1="150" x2="41.9" y2="202" stroke="black" stroke-width="2" />
                            <line x1="150" y1="150" x2="41.9" y2="98" stroke="black" stroke-width="2" />
                            <line x1="150" y1="150" x2="123.3" y2="33" stroke="black" stroke-width="2" />
                            <line x1="150" y1="150" x2="224.8" y2="56.2" stroke="black" stroke-width="2" />
                          </g> : items.length == 8 ?
                            <g transform={`rotate(23, 150, 150)`}>
                              <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                              <line x1="150" y1="150" x2="234.85" y2="234.86" stroke="black" stroke-width="2" />
                              <line x1="150" y1="150" x2="150" y2="270" stroke="black" stroke-width="2" />
                              <line x1="150" y1="150" x2="65.14" y2="234.86" stroke="black" stroke-width="2" />
                              <line x1="150" y1="150" x2="30" y2="150" stroke="black" stroke-width="2" />
                              <line x1="150" y1="150" x2="65.15" y2="65.15" stroke="black" stroke-width="2" />
                              <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" />
                              <line x1="150" y1="150" x2="234.85" y2="65.15" stroke="black" stroke-width="2" />
                            </g> : items.length == 9 ?
                              <g transform={`rotate(20, 150, 150)`}>
                                <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="241.9" y2="227.1" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="170.8" y2="268.2" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="90" y2="253.9" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="37.2" y2="191" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="37.2" y2="108.9" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="90" y2="46" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="170.8" y2="31.8" stroke="black" stroke-width="2" />
                                <line x1="150" y1="150" x2="241.9" y2="72.9" stroke="black" stroke-width="2" />
                              </g> : items.length == 10 ?
                                <g transform={`rotate(18, 150, 150)`}>
                                  <line x1="150" y1="150" x2="270" y2="150" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="247.1" y2="220.5" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="187.1" y2="264.1" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="113" y2="264.1" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="53" y2="220.5" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="30" y2="150" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="113" y2="35.9" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="187" y2="35.9" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="247" y2="79.5" stroke="black" stroke-width="2" />
                                  <line x1="150" y1="150" x2="53" y2="79.5" stroke="black" stroke-width="2" />
                                </g> : <></>}
              {/* 아이템 배치 */}
              {items.map((item, index) => (
                <text
                  key={item.id}
                  x={150 + Math.cos((calculateRotation(index, items.length) * Math.PI) / 180) * 80}
                  y={150 + Math.sin((calculateRotation(index, items.length) * Math.PI) / 180) * 80}
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {item.item}
                </text>
              ))}
            </svg>
          </div>
          <button onClick={rotateRoulette} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">회전</button>
        </div>
        <div className="flex justify-end items-center w-100 border-t p-3 text-gray-500">
          <button onClick={openModal} className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roulette;