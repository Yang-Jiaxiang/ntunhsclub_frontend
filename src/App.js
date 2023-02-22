import { useState, useEffect } from 'react'
import Search from './Pages/Search'
import DataGrid from './Pages/DataGrid'
import { getAllData } from './Axios'

function App() {
  const [data, setData] = useState([])
  const [onChange, setOnChange] = useState(0)
  useEffect(async () => {
    setData(await getAllData())
  }, [])

  useEffect(async () => {
    setData(await getAllData())
  }, [onChange])

  return (
    <div className="container mt-2" style={{ width: '100%' }}>
      <Search data={data} setData={setData} />
      <DataGrid data={data} onChange={onChange} setOnChange={setOnChange} />
    </div>
  )
}

export default App
