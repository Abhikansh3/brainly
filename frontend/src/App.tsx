
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/Plus'

function App() {
  return( 
    <>
    <Button variant='primary' startIcon={<PlusIcon size='lg'/>} size='sm' text='Share' onClick={()=>{}}></Button>
    <Button variant='secoundary' size='sm' text='Add Content' onClick={()=>{}}></Button>
    </>
  )

}

export default App
