import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Checkbox } from 'antd'
import ActionModal from '../Components/DataGrid/ActionModal'
import { ClubSqlLabel } from '../ClubSqlLabel'

const style = {
  width: '100%',
  padding: '20px 10px 20px 10px',
}

const DataGrid = (props) => {
  const columns = ClubSqlLabel.slice(0, 7)
  columns.push(
    {
      title: '異動狀態',
      key: 'state',
      render: (_, record) => (record.ChangeState === 1 ? <Checkbox disabled /> : <Checkbox indeterminate disabled />),
    },
    {
      title: '更多',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ActionModal data={record} onChange={props.onChange} setOnChange={props.setOnChange} />
        </Space>
      ),
    }
  )
  return (
    <div style={style}>
      <Table dataSource={props.data} columns={columns} style={{ width: '100%' }} />
    </div>
  )
}
export default DataGrid
