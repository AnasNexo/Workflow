import { useDrag } from 'react-dnd'
import {
  PhotoIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  HashtagIcon
} from '@heroicons/react/24/outline'

const items = [
  { type: 'image', icon: PhotoIcon, label: 'Image' },
  { type: 'video', icon: VideoCameraIcon, label: 'Video' },
  { type: 'podcast', icon: MicrophoneIcon, label: 'Podcast' },
  { type: 'article', icon: DocumentTextIcon, label: 'Article' },
  { type: 'keyword', icon: HashtagIcon, label: 'Topical Keyword' }
]

function DraggableItem({ type, icon: Icon, label }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'flowNode',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      className={`flex items-center p-3 mb-2 rounded-lg cursor-move hover:bg-gray-100 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="h-5 w-5 mr-2 text-gray-600" />
      <span className="text-gray-700">{label}</span>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <DraggableItem key={item.type} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar 