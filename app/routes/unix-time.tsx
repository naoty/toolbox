import { ArrowRightLeft } from "lucide-react";
import { Link } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { Page } from "~/components/page";

export default function UnixTime() {
  return (
    <Page.Container className="bg-purple-50">
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
            <Breadcrumb.CurrentItem>UNIX時間変換</Breadcrumb.CurrentItem>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Page.Header>

      <Page.Body>
        <Page.Main>
          <h1 className="text-xl font-bold">UNIX時間変換</h1>

          <div className="flex flex-row items-center gap-x-2">
            <div className="flex-1 space-y-2">
              <label
                htmlFor="unix-time"
                className="block text-sm text-secondary"
              >
                UNIX時間
              </label>
              <input
                id="unix-time"
                type="number"
                placeholder="1767193319"
                className="w-full p-2 border border-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>

            <div className="self-stretch">
              <ArrowRightLeft className="mt-10 size-6 text-purple-400" />
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="datetime"
                className="block text-sm text-secondary"
              >
                日時
              </label>
              <input
                id="datetime"
                type="datetime-local"
                className="w-full p-2 border border-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>
        </Page.Main>
      </Page.Body>

      <title>UNIX時間変換</title>
      <meta name="description" content="UNIX時間と日時を相互に変換します" />
    </Page.Container>
  );
}
