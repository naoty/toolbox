import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("count", "routes/count.tsx"),
  route("random-text", "routes/random-text.tsx"),
] satisfies RouteConfig;
