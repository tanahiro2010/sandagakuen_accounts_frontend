import { RouteProvider } from './components/provider/RouteProvider'
import { routes } from './config/router'
import './index.css'

function App() {
  return <RouteProvider routes={routes} />
}

export default App
