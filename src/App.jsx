import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'

function App() {

  return (
    <>
      <section className="navBar">
        < NavBar />
      </section>
      <section className="center">
        < Hero />
      </section>
    </>
  )
}

export default App
