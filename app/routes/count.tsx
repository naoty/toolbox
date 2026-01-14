import { useState } from "react";
import { Link } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { Container } from "~/components/container";

const numberFormat = new Intl.NumberFormat("ja-JP");

export default function Count() {
  const [text, setText] = useState("");
  const count = numberFormat.format(text.length);
  const countWithoutSpaces = numberFormat.format(
    text.replace(/\s+/g, "").length,
  );

  return (
    <Container className="bg-blue-50">
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
          <Breadcrumb.CurrentItem>文字数カウンター</Breadcrumb.CurrentItem>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <div className="w-full flex-grow flex items-center justify-center">
        <main className="w-full max-w-2xl p-4 space-y-6 bg-white shadow-sm border border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">文字数カウンター</h1>

          <textarea
            placeholder="テキストを入力"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            className="w-full min-h-[200px] p-2 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
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
    </Container>
  );
}
