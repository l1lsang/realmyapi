import React, { useState } from "react";
import JsonToTable from "./components/JsonToTable";

export default function App() {
  const [apiUrl, setApiUrl] = useState("https://api.publicapis.org/entries");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    if (!apiUrl) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(apiUrl)}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result.entries || result); // entries 없으면 전체 전달
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🌐 JSON API → Table 변환기
          </h1>
          <p className="text-gray-500 text-sm">
            공개된 JSON 데이터 주소를 입력하고 버튼을 누르면, 자동으로 테이블로 변환됩니다 💡
          </p>
        </header>

        {/* URL 입력 & 버튼 */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4 justify-center">
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="JSON API URL 입력"
            className="border rounded px-4 py-2 w-full sm:w-96"
          />
          <button
            onClick={handleFetch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Fetch
          </button>
        </div>

        {/* 상태 표시 */}
        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        {/* 데이터 테이블 */}
        {data && <JsonToTable data={data} />}

        <footer className="text-center text-xs text-gray-400 mt-8">
          Made with 코딩하는쿼카
        </footer>
      </div>
    </div>
  );
}
