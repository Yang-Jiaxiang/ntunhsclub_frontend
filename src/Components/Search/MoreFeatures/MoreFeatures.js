import React, { useState, useRef } from 'react'
import {
  DownOutlined,
  DownloadOutlined,
  CloudUploadOutlined
} from '@ant-design/icons'
import { Button, Dropdown, message, Space, Tooltip } from 'antd'
import { downloadExampleCsv, upLoadCsv } from '../../../Axios'

const handleButtonClick = e => {
  message.info('Click on left button.')
  console.log('click left button', e)
}

const MoreFeatures = () => {
  const inputFile = useRef(null)

  /**
   * 下載範例檔案
   * @param {*} e 該事件的參數
   * @returns void
   */
  const handleMenuClick = e => {
    switch (e.key) {
      case '1':
        message.info('上傳資料檔案')
        inputFile.current.click()
        break
      case '2':
        downloadExampleCsv()
        message.info('請稍後，檔案下載中...')
        break
      default:
        break
    }
  }

  const items = [
    {
      label: '上傳資料檔案',
      key: '1',
      icon: <CloudUploadOutlined />,
      danger: true
    },
    {
      label: '下載範例檔案',
      key: '2',
      icon: <DownloadOutlined />
    }
  ]

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  const handleFileSelect = event => {
    upLoadCsv(event.target.files[0])
  }

  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept=".csv"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <Dropdown menu={menuProps}>
        <Button style={{ marginLeft: '10px' }}>
          <Space>
            更多
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  )
}

export default MoreFeatures
