

import React, { useState } from "react";

const Roulette = ({openModal}: any) => {
  const [result, setResult] = useState("");
  const items = ["아이템 1", "아이템 2", "아이템 3", "아이템 4", "아이템 5"];

  const rotateRoulette = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setResult(items[randomIndex]);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-4">룰렛 돌리기</h1>
      <div className="flex justify-center items-center mb-4">
        <div className="w-64 h-64 relative rounded-full overflow-hidden border-8 border-gray-300">
          <div className="absolute w-full h-full flex justify-center items-center text-3xl font-semibold text-blue-500 transform transition-transform" style={{ transform: `rotate(${(items.indexOf(result) * (360 / items.length))}deg)` }}>
            {result}
          </div>
        </div>
      </div>
      <button onClick={rotateRoulette} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">회전</button>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
            <div className="bg-white rounded w-10/12 md:w-1/3">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-extrabold">경고</h3>
                    <span onClick={openModal}>
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
                    </span>
                </div>
                <div className="text-gray-500 text-sm px-4 py-8">
                    1개 이상의 항목을 선택하시기 바랍니다.
                </div>
                <div className="flex justify-end items-center w-100 border-t p-3 text-gray-500">
                    <button onClick={openModal} className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Roulette;