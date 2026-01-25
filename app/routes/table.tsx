import clsx from "clsx";
import { parse } from "csv-parse/browser/esm/sync";
import { useState } from "react";
import { Link } from "react-router";
import stringWidth from "string-width";
import { Breadcrumb } from "~/components/breadcrumb";
import { Page } from "~/components/page";

type InputFormat = (typeof inputFormats)[number]["value"];
type OutputFormat = (typeof outputFormats)[number]["value"];

const inputFormats = [
  { value: "csv", label: "CSV" },
  { value: "tsv", label: "TSV" },
] as const;
const outputFormats = [
  { value: "ascii", label: "ASCII" },
  { value: "markdown", label: "Markdown" },
] as const;

function parseCSV(
  csv: string,
  { delimiter }: { delimiter?: string } = {},
): string[][] {
  try {
    return parse(csv, { delimiter });
  } catch (error) {
    return [];
  }
}

function formatASCII(records: string[][], { hasHeader = false } = {}) {
  if (records.length === 0) return "";

  const columnWidths: number[] = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    for (let j = 0; j < record.length; j++) {
      const value = record[j];
      columnWidths[j] = Math.max(columnWidths.at(j) ?? 0, stringWidth(value));
    }
  }

  const border =
    "+-" + columnWidths.map((width) => "-".repeat(width)).join("-+-") + "-+";

  const lines = [];
  lines.push(border);

  for (let i = 0; i < records.length; i++) {
    const line = [];
    line.push("|");

    const record = records[i];
    for (let j = 0; j < record.length; j++) {
      const value = record[j];
      line.push(` ${value}`);
      line.push(" ".repeat(columnWidths[j] - stringWidth(value)));
      line.push(" |");
    }

    lines.push(line.join(""));

    if (hasHeader && i === 0) {
      lines.push(border);
    }
  }

  lines.push(border);
  return lines.join("\n");
}

function formatMarkdown(records: string[][]) {
  if (records.length === 0) return "";

  const columnWidths: number[] = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    for (let j = 0; j < record.length; j++) {
      const value = record[j];
      // 最低幅を3にする
      columnWidths[j] = Math.max(columnWidths.at(j) ?? 3, stringWidth(value));
    }
  }

  const border =
    "| " + columnWidths.map((width) => "-".repeat(width)).join(" | ") + " |";

  const lines = [];
  for (let i = 0; i < records.length; i++) {
    const line = [];
    line.push("|");

    const record = records[i];
    for (let j = 0; j < record.length; j++) {
      const value = record[j];
      line.push(` ${value}`);
      line.push(" ".repeat(columnWidths[j] - stringWidth(value)));
      line.push(" |");
    }

    lines.push(line.join(""));

    if (i === 0) {
      lines.push(border);
    }
  }

  return lines.join("\n");
}

export default function Table() {
  const [input, setInput] = useState("");
  const [inputFormat, setInputFormat] = useState<InputFormat>("csv");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("ascii");
  const [hasHeader, setHasHeader] = useState(false);

  const records =
    inputFormat === "csv"
      ? parseCSV(input)
      : parseCSV(input, { delimiter: "\t" });
  const output =
    outputFormat === "ascii"
      ? formatASCII(records, { hasHeader })
      : formatMarkdown(records);

  return (
    <Page.Container className="bg-red-50">
      <Page.Header className="max-w-4xl">
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
            <Breadcrumb.CurrentItem>テーブル変換</Breadcrumb.CurrentItem>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Page.Header>

      <Page.Body>
        <Page.Main className="max-w-4xl">
          <h1 className="text-xl font-bold">テーブル変換</h1>

          <div className="flex gap-x-4">
            <div className="flex-1 space-y-2">
              <select
                value={inputFormat}
                onChange={(e) =>
                  setInputFormat(e.currentTarget.value as InputFormat)
                }
                className="min-h-8 pr-1 text-secondary focus:outline-none"
              >
                {inputFormats.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <textarea
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                rows={10}
                spellCheck={false}
                className="w-full p-2 border border-slate-300 text-sm font-table focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center min-h-8">
                <select
                  value={outputFormat}
                  onChange={(e) =>
                    setOutputFormat(e.currentTarget.value as OutputFormat)
                  }
                  className="pr-1 text-secondary focus:outline-none"
                >
                  {outputFormats.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                {outputFormat === "ascii" && (
                  <button
                    onClick={() => setHasHeader((previous) => !previous)}
                    className={clsx(
                      "px-2 py-1 border rounded-lg text-xs cursor-pointer transition-colors",
                      hasHeader
                        ? "text-primary bg-red-50 border-red-200 hover:border-red-400 active:bg-red-100"
                        : "text-secondary bg-slate-50 border-slate-200 hover:border-slate-400 active:bg-slate-100",
                    )}
                  >
                    ヘッダー
                  </button>
                )}
              </div>
              <textarea
                id="preview"
                value={output}
                readOnly
                rows={10}
                spellCheck={false}
                className="w-full p-2 border border-slate-300 text-sm font-table focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>
          </div>
        </Page.Main>
      </Page.Body>

      <title>テーブル変換</title>
      <meta name="description" content="CSVなどのデータを表形式に変換します" />
    </Page.Container>
  );
}
