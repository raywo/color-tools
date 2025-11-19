export type NewClickSource = "palettes" | "convert";

export function routePathToSource(routePath: string): NewClickSource {
  const splitRoute = routePath.split("/");

  if (splitRoute.length < 2) return "convert";

  return splitRoute[1] as NewClickSource;
}
