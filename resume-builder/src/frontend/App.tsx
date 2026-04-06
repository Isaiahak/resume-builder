import HomePage from './HomePage'
import { PageProvider } from "./context/pageProvider";

function App() {
  return (
		<PageProvider>
			<HomePage/>	
		</PageProvider>
      )
}

export default App
