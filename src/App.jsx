import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Workflow from './components/Workflow'
import Navbar from './components/Navbar'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Workflow />
        </main>
      </div>
    </DndProvider>
  )
}

export default App 