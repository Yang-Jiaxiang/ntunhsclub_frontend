import { Button } from 'antd'
import { downloadAll } from '../../../Axios'
const DownloadAll = () => {
  const ButtonStyle = {
    margin: '0px 10px 0px 10px',
  }
  return (
    <Button style={ButtonStyle} onClick={() => downloadAll()}>
      匯出CSV
    </Button>
  )
}

export default DownloadAll
