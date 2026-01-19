import clsx from "clsx";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { Page } from "~/components/page";

type TimeZone = "jst" | "utc";

export default function UnixTime() {
  const currentDate = new Date();

  const [timeZone, setTimeZone] = useState<TimeZone>("jst");
  const [timestamp, setTimestamp] = useState(() =>
    Math.floor(currentDate.getTime() / 1000),
  );
  const [dateString, setDateString] = useState(() =>
    timeZone === "jst"
      ? new Date(currentDate.getTime() + 9 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 16)
      : currentDate.toISOString().slice(0, 16),
  );

  const handleTimestampChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTimestamp = event.currentTarget.valueAsNumber;
    setTimestamp(newTimestamp);

    const newDate =
      timeZone === "jst"
        ? new Date((newTimestamp + 9 * 60 * 60) * 1000)
        : new Date(newTimestamp * 1000);
    const newDateString = newDate.toISOString().slice(0, 16);
    setDateString(newDateString);
  };

  const handleDateStringChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newDateString = event.currentTarget.value;
    setDateString(newDateString);

    const newDate =
      timeZone === "jst"
        ? new Date(`${newDateString}:00+09:00`)
        : new Date(`${newDateString}:00Z`);
    const newTimestampInSeconds = Math.floor(newDate.getTime() / 1000);
    setTimestamp(newTimestampInSeconds);
  };

  const handleTimeZoneChange = (newTimeZone: TimeZone) => {
    return () => {
      setTimeZone(newTimeZone);

      const newDate =
        newTimeZone === "jst"
          ? new Date((timestamp + 9 * 60 * 60) * 1000)
          : new Date(timestamp * 1000);
      const newDateString = newDate.toISOString().slice(0, 16);
      setDateString(newDateString);
    };
  };

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

          <div className="flex items-center gap-x-2">
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
                value={timestamp}
                onChange={handleTimestampChange}
                placeholder="1767193319"
                className="w-full p-2 border border-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>

            <div className="self-stretch">
              <ArrowRightLeft className="mt-10 size-5 text-purple-400" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="datetime" className="text-sm text-secondary">
                  日時
                </label>
                <div className="flex border border-slate-300 rounded-lg divide-x divide-slate-300 overflow-hidden">
                  <button
                    onClick={handleTimeZoneChange("jst")}
                    className={clsx(
                      "px-2 py-0.5 text-xs text-secondary transition-colors",
                      timeZone === "jst"
                        ? "bg-purple-500 text-white"
                        : "cursor-pointer hover:bg-purple-100",
                    )}
                  >
                    JST
                  </button>
                  <button
                    onClick={handleTimeZoneChange("utc")}
                    className={clsx(
                      "px-2 py-0.5 text-xs text-secondary transition-colors",
                      timeZone === "utc"
                        ? "bg-purple-500 text-white"
                        : "cursor-pointer hover:bg-purple-100",
                    )}
                  >
                    UTC
                  </button>
                </div>
              </div>
              <input
                id="datetime"
                type="datetime-local"
                value={dateString}
                onChange={handleDateStringChange}
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
