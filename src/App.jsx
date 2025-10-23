import React, { useState, useEffect } from "react";
import JsonToTable from "./components/JsonToTable";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 기본 API 주소 (원하면 input으로 변경 가능)
  const apiUrl = "https://api.publicapis.org/entries";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(apiUrl)}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result.entries); // JsonToTable에 전달할 데이터
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

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

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {data && <JsonToTable data={data} />}

        <footer className="text-center text-xs text-gray-400 mt-8">
          Made with 코딩하는쿼카
        </footer>
      </div>
    </div>
  );
}
