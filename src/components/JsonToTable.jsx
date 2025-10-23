import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

import { Loader2 } from "lucide-react";

export default function JsonToTable() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await fetch(url);
      if (!res.ok) throw new Error("🚫 접근할 수 없는 데이터셋이에요.");

      const json = await res.json();

      // 배열 형태 자동 탐지
      const arr = Array.isArray(json)
        ? json
        : Object.values(json).find((v) => Array.isArray(v)) || [];

      if (!arr.length)
        throw new Error("📭 JSON 안에 테이블로 변환할 배열이 없어요.");

      setData(arr);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">
        🧩 JSON → Table 변환기
      </h1>

      <div className="flex gap-2">
        <Input
          placeholder="공개 JSON API 주소를 입력하세요"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={fetchData} disabled={loading}>
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "불러오기"}
        </Button>
      </div>

      {error && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="p-3 text-red-600">{error}</CardContent>
        </Card>
      )}

      {data && (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="table-auto w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-3 py-2 text-left font-semibold">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  {Object.keys(data[0]).map((key) => (
                    <td key={key} className="px-3 py-2 align-top">
                      {typeof row[key] === "object"
                        ? JSON.stringify(row[key])
                        : String(row[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
