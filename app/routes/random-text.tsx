import clsx from "clsx";
import { Copy, RotateCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

type CharSetType = (typeof charSets)[number]["id"];

const charSets = [
  {
    id: "hiragana" as const,
    label: "ひらがな",
    chars:
      "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゃゅょっ",
  },
  {
    id: "katakana" as const,
    label: "カタカナ",
    chars:
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポャュョッ",
  },
  {
    id: "uppercase" as const,
    label: "アルファベット大文字",
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    id: "lowercase" as const,
    label: "アルファベット小文字",
    chars: "abcdefghijklmnopqrstuvwxyz",
  },
  { id: "numbers" as const, label: "数字", chars: "0123456789" },
  {
    id: "symbols" as const,
    label: "記号",
    chars: "!@#$%^&*()-_=+[]{}|;:',.<>?/`~",
  },
];

export default function RandomText() {
  const [lengthText, setLengthText] = useState("8");
  const [selectedCharSetIds, setSelectedCharSetIds] = useState<CharSetType[]>([
    "hiragana",
  ]);

  const parsedLength = parseInt(lengthText, 10);
  const length =
    Number.isNaN(parsedLength) || parsedLength < 0 ? 0 : parsedLength;

  const availableChars = charSets
    .filter((set) => selectedCharSetIds.includes(set.id))
    .map((set) => set.chars)
    .join("");
  const randomText = Array.from({ length })
    .map(() =>
      availableChars.charAt(Math.floor(Math.random() * availableChars.length)),
    )
    .join("");

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLengthText(event.currentTarget.value);
  };

  const handleCharSetToggle = (charSetId: CharSetType) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        event.currentTarget.checked &&
        !selectedCharSetIds.includes(charSetId)
      ) {
        setSelectedCharSetIds([...selectedCharSetIds, charSetId]);
      }
      if (
        !event.currentTarget.checked &&
        selectedCharSetIds.includes(charSetId)
      ) {
        setSelectedCharSetIds(
          selectedCharSetIds.filter((id) => id !== charSetId),
        );
      }
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-green-50">
      <nav className="w-full max-w-2xl mx-auto">
        <ol className="flex flex-row items-center gap-x-2 text-sm text-slate-500">
          <li>
            <Link to="/" className="hover:text-slate-700 transition-colors">
              ホーム
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li className="text-slate-800">ランダム文字列生成</li>
        </ol>
      </nav>

      <div className="w-full flex-grow flex items-center justify-center">
        <main className="w-full max-w-2xl p-4 space-y-6 bg-white shadow-sm border border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">
            ランダム文字列生成
          </h1>

          <div className="space-y-2">
            <label htmlFor="length" className="block text-sm text-slate-700">
              文字数
            </label>
            <input
              id="length"
              type="number"
              min={1}
              value={lengthText}
              onChange={handleLengthChange}
              className="w-full p-2 border border-slate-300 focus:outline-none focus:ring focus:ring-green-400 text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-slate-700">文字種</p>
            <div className="grid grid-cols-2 gap-2">
              {charSets.map((set) => (
                <label
                  key={set.id}
                  className={clsx(
                    "flex items-center gap-x-2 p-2 border cursor-pointer transition-colors",
                    selectedCharSetIds.includes(set.id)
                      ? "bg-green-50 border-green-300"
                      : "bg-slate-50 border-slate-200",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedCharSetIds.includes(set.id)}
                    onChange={handleCharSetToggle(set.id)}
                    className="size-4 accent-green-600"
                  />
                  <span>{set.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="relative bg-green-50 p-4">
            <p className="mb-2 text-sm text-slate-500">生成結果</p>
            <p className="mb-4 text-lg font-mono text-slate-800 break-all">
              {randomText}
            </p>
            <div className="flex gap-x-2">
              <button className="flex-1 flex items-center justify-center gap-x-2 px-4 py-2 bg-green-600 text-white cursor-pointer transition-colors hover:bg-green-700">
                <RotateCw className="size-4" />
                再生成
              </button>
              <button className="flex-1 flex items-center justify-center gap-x-2 px-4 py-2 bg-white text-green-700 border border-green-300 cursor-pointer transition-colors hover:bg-green-50">
                <Copy className="size-4" />
                コピー
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
