import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("count", "routes/count.tsx"),
] satisfies RouteConfig;
