import { useState } from "react";
import { Link } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { Page } from "~/components/page";

export default function RegexpTester() {
  const [text, setText] = useState("");

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
            <div className="flex items-center gap-x-1 px-3 py-2 border border-slate-300 font-mono focus-within:ring focus-within:ring-orange-400 focus-within:border-transparent">
              <span className="text-secondary">/</span>
              <input
                type="text"
                id="regexp"
                placeholder="[a-z]+"
                className="flex-1 focus:outline-none"
              />
              <span className="text-secondary">/</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="text" className="block text-sm text-secondary">
              テスト用文字列
            </label>

            <div className="relative font-mono">
              <pre className="p-2 border border-slate-300">
                {text.length === 0 ? " " : text}
              </pre>

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
