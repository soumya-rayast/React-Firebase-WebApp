import Create from './components/Create'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
import Read from './components/Read'
import Header from './components/Header'
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Read/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/edit/:id' element={<Create isEdit={true}/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
