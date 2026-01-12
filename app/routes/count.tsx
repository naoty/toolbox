import { useState } from "react";

const numberFormat = new Intl.NumberFormat("ja-JP");

export default function Count() {
  const [text, setText] = useState("");
  const count = numberFormat.format(text.length);
  const countWithoutSpaces = numberFormat.format(
    text.replace(/\s+/g, "").length,
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <main className="w-full max-w-2xl p-4 space-y-6 bg-white shadow-sm border border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">文字数カウンター</h1>

        <textarea
          placeholder="テキストを入力"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="w-full min-h-[200px] p-2 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />

        <div className="flex flex-row gap-x-4">
          <div className="flex-1 space-y-2 text-center">
            <p className="text-sm text-slate-500">文字数</p>
            <p className="text-3xl">{count}</p>
          </div>

          <div className="flex-1 space-y-2 text-center">
            <p className="text-sm text-slate-500">空白・改行を除く</p>
            <p className="text-3xl">{countWithoutSpaces}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
