import { useState, useEffect } from 'react'
import { fetchData } from './services/api'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData()
        setMessage(data.message)
      } catch (error) {
        console.error('Error fetching data:', error)
        setMessage('Error connecting to server')
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <div className="App">
      <h1>React + TypeScript + Deno</h1>
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>Message from Deno: {message}</p>
        )}
      </div>
    </div>
  )
}

export default App 