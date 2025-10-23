import React from "react";
import JsonToTable from "./components/JsonToTable";

export default function App() {
  const response = await fetch(`/api/proxy?url=${encodeURIComponent(apiUrl)}`);
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🌐 JSON API → Table 변환기
          </h1>
          <p className="text-gray-500 text-sm">
            공개된 JSON 데이터 주소만 입력하면, 자동으로 테이블로 변환됩니다 💡
          </p>
        </header>

        <JsonToTable />

        <footer className="text-center text-xs text-gray-400 mt-8">
          Made with 코딩하는쿼카
        </footer>
      </div>
    </div>
  );
}
