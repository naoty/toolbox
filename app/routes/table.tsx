import { Link } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { Page } from "~/components/page";

export default function Table() {
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
              <div>
                <label htmlFor="editor" className="text-secondary">
                  入力
                </label>
              </div>
              <textarea
                id="editor"
                rows={20}
                spellCheck={false}
                className="w-full p-2 border border-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <label htmlFor="preview" className="text-secondary">
                  出力
                </label>
              </div>
              <textarea
                id="preview"
                readOnly
                rows={20}
                spellCheck={false}
                className="w-full p-2 border border-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-red-400"
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
