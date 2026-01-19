import { Link } from "react-router";

const tools = [
  {
    name: "文字数カウンター",
    description: "テキストの文字数をカウントします",
    path: "/count",
    icon: "Aa",
    iconBackgroundColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "ランダム文字列生成",
    description: "指定した条件でランダムな文字列を生成します",
    path: "/random-text",
    icon: "?#",
    iconBackgroundColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    name: "UNIX時間変換",
    description: "UNIX時間と通常の日時を相互に変換します",
    path: "/unix-time",
    icon: "⏱️",
    iconBackgroundColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    name: "正規表現テスター",
    description: "正規表現を任意の文字列でテストします",
    path: "/regexp-tester",
    icon: "/.*/",
    iconBackgroundColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <main className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center mt-8">
          toolbox.naoty.dev
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              to={tool.path}
              className="flex flex-col bg-white shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div
                className={`${tool.iconBackgroundColor} h-32 flex items-center justify-center`}
              >
                <span className={`text-5xl font-bold ${tool.iconColor}`}>
                  {tool.icon}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{tool.name}</h2>
                <p className="text-sm text-secondary">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
