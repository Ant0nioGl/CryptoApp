import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'


function App() {  
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/api")
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log("Error fetching data:", err));
  }, [])

  return (
    <>
      <Navbar />
      <a> Message: {data === null ? "" : data.message}</a>
    </>
  )
}

export default App
