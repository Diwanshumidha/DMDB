import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Movie_Details from "./pages/Movie_Details"
import Header from "./components/Header"
import 'react-loading-skeleton/dist/skeleton.css'
import Footer from "./components/Footer"
import Category from "./pages/Category"
import Person from "./pages/Person"

const App = () => {
  return (
    <div>

    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/movie/:id" element={<Movie_Details/>}/>
      <Route path="/category/:category" element={<Category/>}/>
      <Route path="/person/:personid" element={<Person/>}/>

      
    </Routes>
    <Footer/>
    </div>
  
  )
}

export default App