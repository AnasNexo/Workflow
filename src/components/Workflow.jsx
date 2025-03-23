import { useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from 'reactflow'
import 'reactflow/dist/style.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Sidebar from './Sidebar'
import { useDrop } from 'react-dnd'

function Workflow() {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const [, drop] = useDrop({
    accept: 'flowNode',
    drop: (item, monitor) => {
      const position = monitor.getClientOffset()
      const newNode = {
        id: `${item.type}-${Date.now()}`,
        type: 'default',
        position: {
          x: position.x - 250,
          y: position.y - 100
        },
        data: { label: item.type.charAt(0).toUpperCase() + item.type.slice(1) }
      }
      setNodes((nds) => [...nds, newNode])
    }
  })

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } flex-shrink-0`}
      >
        {isSidebarOpen && <Sidebar />}
      </div>
      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed z-10 bg-white rounded-r-lg p-2 shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'left-64' : 'left-0'
        }`}
        style={{ top: '5rem' }}
      >
        {isSidebarOpen ? (
          <ChevronLeftIcon className="h-5 w-5" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" />
        )}
      </button>

      <div ref={drop} className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
          onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          fitView
          className="bg-gray-50"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default Workflow 