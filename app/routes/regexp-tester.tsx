import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { Page } from "~/components/page";

type Flag = "g" | "i";

const flags = [
  { value: "g" as Flag, label: "global" },
  { value: "i" as Flag, label: "ignore case" },
];

function match(text: string, regexpText: string, flags: Set<Flag>) {
  if (text === "" || regexpText === "") return null;

  try {
    const regexp = new RegExp(regexpText, [...flags].join(""));
    return regexp.exec(text);
  } catch {
    return null;
  }
}

function escapeHTML(text: string) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function buildHighlights(text: string, match: RegExpExecArray | null) {
  if (match === null) return escapeHTML(text);

  const start = match.index;
  const end = start + match[0].length;

  return [
    escapeHTML(text.slice(0, start)),
    `<span class="bg-orange-300 font-semibold">${escapeHTML(text.slice(start, end))}</span>`,
    escapeHTML(text.slice(end)),
  ].join("");
}

export default function RegexpTester() {
  const [regexpText, setRegexpText] = useState("");
  const [text, setText] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<Set<Flag>>(new Set());

  const matched = match(text, regexpText, selectedFlags);

  const handleFlagClick = (flag: Flag) => {
    return () => {
      setSelectedFlags((previous) => {
        const next = new Set(previous);
        next.has(flag) ? next.delete(flag) : next.add(flag);
        return next;
      });
    };
  };

  return (
    <Page.Container className="bg-orange-50">
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
            <Breadcrumb.CurrentItem>正規表現テスター</Breadcrumb.CurrentItem>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Page.Header>

      <Page.Body>
        <Page.Main>
          <h1 className="text-xl font-bold">正規表現テスター</h1>

          <div className="space-y-2">
            <label htmlFor="regexp" className="block text-sm text-secondary">
              正規表現
            </label>
            <div className="flex items-center gap-x-0.5 px-3 py-2 border border-slate-300 font-mono focus-within:ring focus-within:ring-orange-400 focus-within:border-transparent">
              <span className="text-secondary">/</span>
              <input
                type="text"
                id="regexp"
                value={regexpText}
                onChange={(e) => setRegexpText(e.currentTarget.value)}
                placeholder="[a-z]+"
                size={Math.max(5, regexpText.length)}
                spellCheck={false}
                className="focus:outline-none"
              />
              <span className="text-secondary">
                /{[...selectedFlags].join("")}
              </span>
            </div>
            <div className="flex gap-x-2">
              {flags.map((flag) => (
                <button
                  key={flag.value}
                  onClick={handleFlagClick(flag.value)}
                  className={clsx(
                    "flex gap-x-1 px-2 py-1 border rounded-lg text-xs cursor-pointer transition-colors",
                    selectedFlags.has(flag.value)
                      ? "text-primary bg-orange-50 border-orange-200 hover:border-orange-400"
                      : "text-secondary bg-slate-50 border-slate-200 hover:border-slate-400",
                  )}
                >
                  {flag.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="text" className="block text-sm text-secondary">
              テスト用文字列
            </label>

            <div className="relative font-mono">
              {/* マッチ部分をハイライトさせるためtextareaの裏にstyleを適用したHTMLを表示する */}
              <pre
                className="p-2 border border-slate-300"
                dangerouslySetInnerHTML={{
                  __html:
                    text.length === 0 ? " " : buildHighlights(text, matched),
                }}
              />

              {/* 入力のみを受け付ける */}
              <textarea
                id="text"
                onChange={(e) => setText(e.currentTarget.value)}
                spellCheck={false}
                className="absolute inset-0 p-2 border border-transparent text-transparent caret-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </Page.Main>
      </Page.Body>

      <title>正規表現テスター</title>
      <meta name="description" content="正規表現を任意の文字列でテストします" />
    </Page.Container>
  );
}
