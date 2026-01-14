import clsx from "clsx";
import { Check, Copy, RotateCw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { Page } from "~/components/page";

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
  const [version, setVersion] = useState(1);
  const [copied, setCopied] = useState(false);

  const parsedLength = parseInt(lengthText, 10);
  const length =
    Number.isNaN(parsedLength) || parsedLength < 0 ? 0 : parsedLength;

  const availableChars = charSets
    .filter((set) => selectedCharSetIds.includes(set.id))
    .map((set) => set.chars)
    .join("");

  const randomText = useMemo(
    () =>
      Array.from({ length })
        .map(() =>
          availableChars.charAt(
            Math.floor(Math.random() * availableChars.length),
          ),
        )
        .join(""),
    [length, availableChars, version],
  );

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLengthText(event.currentTarget.value);
  };

  const handleGenerateButtonClick = () => {
    setVersion((v) => v + 1);
  };

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(randomText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <Page.Container className="bg-green-50">
      <Page.Header>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link>
                {({ className }) => (
                  <Link to="/" className={className}>
                    ホーム
                  </Link>
                )}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.CurrentItem>ランダム文字列生成</Breadcrumb.CurrentItem>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Page.Header>

      <Page.Body>
        <Page.Main>
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
              <button
                className="flex-1 flex items-center justify-center gap-x-2 px-4 py-2 bg-green-600 text-white cursor-pointer transition-colors hover:bg-green-700"
                onClick={handleGenerateButtonClick}
              >
                <RotateCw className="size-4" />
                再生成
              </button>

              <button
                className={clsx(
                  "flex-1 flex items-center justify-center gap-x-2 px-4 py-2 text-green-700 border border-green-300 cursor-pointer transition-colors",
                  copied ? "bg-green-100" : "bg-white hover:bg-green-50",
                )}
                onClick={handleCopyButtonClick}
              >
                {copied ? (
                  <>
                    <Check className="size-4" />
                    コピーしました
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    コピー
                  </>
                )}
              </button>
            </div>
          </div>
        </Page.Main>
      </Page.Body>
    </Page.Container>
  );
}
