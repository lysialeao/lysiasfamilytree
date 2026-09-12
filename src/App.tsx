import { useState } from 'react'

import { FamilyTree } from './components/FamilyTree/FamilyTree'
import { Landing } from './pages/Landing/Landing'

function App() {
  const [showTree, setShowTree] = useState(false)

  if (showTree) {
    return <FamilyTree />
  }

  return <Landing onStart={() => setShowTree(true)} />
}

export default App
