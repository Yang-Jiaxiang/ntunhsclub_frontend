import { useState, useEffect } from 'react'
import Search from './Pages/Search'
import DataGrid from './Pages/DataGrid'
import { getAllData } from './Axios'

function App() {
  const [data, setData] = useState([])

  useEffect(async () => {
    setData(await getAllData())
  }, [])

  return (
    <div className="container mt-2" style={{ width: '100%' }}>
      <Search data={data} setData={setData} />
      <DataGrid data={data} />
    </div>
  )
}

export default App
