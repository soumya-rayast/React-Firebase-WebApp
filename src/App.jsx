import Create from './components/Create'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
import Read from './components/Read'
import Header from './components/Header'
import Home from './components/Home'
import "./App.css"
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/read' element={<Read/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/read/edit/:id' element={<Create/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
