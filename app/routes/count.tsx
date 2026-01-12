import { useState } from "react";
import { Link } from "react-router";

const numberFormat = new Intl.NumberFormat("ja-JP");

export default function Count() {
  const [text, setText] = useState("");
  const count = numberFormat.format(text.length);
  const countWithoutSpaces = numberFormat.format(
    text.replace(/\s+/g, "").length,
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <nav className="w-full max-w-2xl mx-auto">
        <ol className="flex flex-row items-center gap-x-2 text-sm text-slate-500">
          <li>
            <Link to="/" className="hover:text-slate-700 transition-colors">
              ホーム
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li className="text-slate-800">文字数カウンター</li>
        </ol>
      </nav>

      <div className="w-full flex-grow flex items-center justify-center">
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

      <title>文字数カウンター - toolbox.naoty.dev</title>
      <meta name="description" content="テキストの文字数をカウントします" />
    </div>
  );
}
