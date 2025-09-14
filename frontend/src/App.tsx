
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/Plus'

function App() {
  return( 
    <>
    <Button variant='primary' startIcon={<PlusIcon/>} size='sm' text='Share'></Button>
    <Button variant='secoundary' size='sm' text='Add Content'></Button>
    </>
  )

}

export default App
