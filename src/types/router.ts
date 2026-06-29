type BaseRoute = {
  path: string
  children?: Array<Route>
}

type PageRoute = BaseRoute & {
  type: "page"
  page: React.ReactElement
}

type LayoutRoute = BaseRoute & {
  type: "layout",
  layout: React.ReactElement
  element: Array<Route>
}

type Route = PageRoute | LayoutRoute

export type { BaseRoute, PageRoute, LayoutRoute, Route }
