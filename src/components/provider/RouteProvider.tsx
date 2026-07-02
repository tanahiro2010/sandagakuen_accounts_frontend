import { BrowserRouter, useRoutes } from 'react-router-dom'
import { createRoutes } from '../../lib/dsl'
import type { AppRoute } from '../../types/router'

function RouteContent({ routes }: { routes: AppRoute[] }) {
  return useRoutes(createRoutes(routes))
}

function RouteProvider({ routes }: { routes: AppRoute[] }) {
  return (
    <BrowserRouter>
      <RouteContent routes={routes} />
    </BrowserRouter>
  )
}

export { RouteProvider }
