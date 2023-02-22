import React, { useState, useEffect } from 'react'
import { Button, Space, Input, Select, Modal, Switch, message, DatePicker, InputNumber } from 'antd'
import { putData, deleteData } from '../../Axios'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import { ClubSqlLabel } from '../../ClubSqlLabel'
import { DeleteOutlined } from '@ant-design/icons'

dayjs.extend(weekday)
dayjs.extend(localeData)

const label = ClubSqlLabel

const ActionModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [deleteClick, setDeleteClick] = useState(false)
  const [data, setData] = useState({})

  const { Option } = Select

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '更新成功',
    })
    props.setOnChange(props.onChange + 1)
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    deleteClick && deleteData(data.ID)
    if (isUpdate) {
      putData(data.ID, data)
      success()
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = (checked) => {
    setIsUpdate(checked)
  }
  return (
    <>
      {contextHolder}
      <a onClick={showModal}>顯示更多</a>
      <Modal title="顯示更多" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Switch onChange={onChange} />

        <table width="100%">
          {label.map((item, index) => {
            return (
              <tr>
                <td width="30%">{item.title}</td>
                <td width="70%">
                  {item.type === 'selection' ? (
                    <Select
                      placeholder="Select a option and change input text above"
                      onChange={(e) => {
                        setData({ ...data, [item.key]: parseInt(e) })
                      }}
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        width: '100%',
                      }}
                      value={data[item.key] === 1 ? item.selection[0].value : item.selection[1].value}
                      allowClear
                      disabled={!isUpdate}
                    >
                      {item.selection.map((item2, index) => {
                        return (
                          <Option value={item2.label} key={index}>
                            {item2.value}
                          </Option>
                        )
                      })}
                    </Select>
                  ) : null}
                  {item.type === 'dateTime' ? (
                    <DatePicker
                      disabled={!isUpdate}
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        width: '100%',
                      }}
                      defaultValue={dayjs(data[item.key], 'yyyy-mm-dd')}
                      onChange={(e) => setData({ ...data, [item.key]: e._d })}
                    />
                  ) : null}
                  {item.type === 'text' || item.type === 'email' ? (
                    <Input
                      disabled={!isUpdate}
                      value={data[item.key]}
                      style={{ marginTop: '10px', width: '100%' }}
                      onChange={(e) => {
                        setData({ ...data, [item.key]: e.target.value })
                      }}
                    />
                  ) : null}
                  {item.type === 'number' ? (
                    <InputNumber
                      disabled={!isUpdate}
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        width: '100%',
                      }}
                      value={data[item.key]}
                      onChange={(e) => setData({ ...data, [item.key]: e })}
                    />
                  ) : null}
                </td>
              </tr>
            )
          })}
          <tr td width="100%">
            <td width="30%">刪除使用者</td>
            <td width="70%" style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                disabled={!isUpdate}
                onClick={() => setDeleteClick(true)}
              />
            </td>
          </tr>
        </table>
      </Modal>
    </>
  )
}
export default ActionModal
