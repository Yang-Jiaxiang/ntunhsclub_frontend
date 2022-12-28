import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd'
import ActionModal from '../Components/DataGrid/ActionModal'

const style = {
  width: '100%',
  padding: '20px 10px 20px 10px'
}

const DataGrid = props => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name',
      width: 100,
      fixed: 'left'
    },
    {
      title: '身分證',
      dataIndex: 'tID',
      width: 100,
      key: 'tID'
    },
    {
      title: '學校老師',
      dataIndex: 'School',
      key: 'School',
      render: text => (
        <>
          {text == '1' ? (
            <Tag color="red">是</Tag>
          ) : (
            <Tag color="green">否</Tag>
          )}
        </>
      )
    },
    {
      title: '連絡電話',
      dataIndex: 'Phone',
      key: 'Phone'
    },
    {
      title: '信箱',
      dataIndex: 'Email',
      key: 'Email'
    },
    {
      title: '更多',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ActionModal data={record}/>
        </Space>
      )
    }
  ]
  return (
    <div style={style}>
      <Table
        dataSource={props.data}
        columns={columns}
        style={{ width: '100%' }}
      />
    </div>
  )
}
export default DataGrid
