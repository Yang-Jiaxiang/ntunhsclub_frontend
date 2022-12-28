import React, { useState, useEffect } from 'react'
import {
  Button,
  Space,
  Input,
  Select,
  Modal,
  Switch,
  message,
  DatePicker,
  InputNumber
} from 'antd'
import { putData } from '../../Axios'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(weekday)
dayjs.extend(localeData)

const label = [
  {
    title: '姓名',
    dataIndex: 'Name',
    key: 'Name',
    fixed: 'left',
    type: 'text'
  },
  {
    title: '身分證',
    dataIndex: 'tID',
    key: 'tID',
    type: 'text'
  },
  {
    title: '學校老師',
    dataIndex: 'School',
    key: 'School',
    type: 'selection',
    selection: [
      { label: '1', value: '校內' },
      { label: '0', value: '校外' }
    ]
  },
  {
    title: '連絡電話',
    dataIndex: 'Phone',
    key: 'Phone',
    type: 'text'
  },
  {
    title: '信箱',
    dataIndex: 'Email',
    key: 'Email',
    type: 'email'
  },
  {
    title: '銀行帳號',
    dataIndex: 'BankAccount',
    key: 'BankAccount',
    type: 'number'
  },
  {
    title: '銀行名稱',
    dataIndex: 'BankName',
    key: 'BankName',
    type: 'text'
  },
  {
    title: '戶籍地',
    dataIndex: 'Residence',
    key: 'Residence',
    type: 'text'
  },
  {
    title: '住址',
    dataIndex: 'Dwelling',
    key: 'Dwelling',
    type: 'text'
  },
  {
    title: '付款單位',
    dataIndex: 'Unit',
    key: 'Unit',
    type: 'text'
  },
  {
    title: '總金額',
    dataIndex: 'UnitSum',
    key: 'UnitSum',
    type: 'number'
  },
  {
    title: '價錢',
    dataIndex: 'Price',
    key: 'Price',
    type: 'number'
  },
  {
    title: '代扣所得稅',
    dataIndex: 'Customs',
    key: 'Customs',
    type: 'number'
  },
  {
    title: '免稅給付',
    dataIndex: 'Ncustoms',
    key: 'Ncustoms',
    type: 'text'
  },
  {
    title: '出生',
    dataIndex: 'Birthday',
    key: 'Birthday',
    type: 'dateTime'
  },
  {
    title: '學校老師地址',
    dataIndex: 'SchoolClass',
    key: 'SchoolClass',
    type: 'text'
  },
  {
    title: '學歷',
    dataIndex: 'AcademicQualifications',
    key: 'AcademicQualifications',
    type: 'text'
  },
  {
    title: '經歷',
    dataIndex: 'Experience',
    key: 'Experience',
    type: 'text'
  },
  {
    title: '異動狀態',
    dataIndex: 'ChangeState',
    key: 'ChangeState',
    type: 'text'
  }
]

const ActionModal = props => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const [data, setData] = useState({})

  const { Option } = Select

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '更新成功'
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)

    if (isUpdate) {
      putData(data.ID, data)
      success()
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = checked => {
    setIsUpdate(checked)
  }
  return (
    <>
      {contextHolder}
      <a onClick={showModal}>顯示更多</a>
      <Modal
        title="顯示更多"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Switch onChange={onChange} />
        {label.map((item, index) => {
          return (
            <table width="100%">
              <tr>
                <td width="30%">{item.title}</td>
                <td width="70%">
                  {item.type === 'selection' ? (
                    <Select
                      placeholder="Select a option and change input text above"
                      onChange={e => {
                        setData({ ...data, [item.key]: e })
                      }}
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        width: '100%'
                      }}
                      value={item.value === '1' ? '校內' : '校外'}
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
                        width: '100%'
                      }}
                      defaultValue={dayjs(data[item.key], 'yyyy-mm-dd')}
                      onChange={e => setData({ ...data, [item.key]: e._d })}
                      />
                  ) : null}
                  {item.type === 'text' || item.type === 'email' ? (
                    <Input
                      disabled={!isUpdate}
                      value={data[item.key]}
                      style={{ marginTop: '10px', width: '100%' }}
                      onChange={e => {
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
                        width: '100%'
                      }}
                      value={data[item.key]}
                      onChange={e => setData({ ...data, [item.key]: e })}
                    />
                  ) : null}
                </td>
              </tr>
            </table>
          )
        })}
      </Modal>
    </>
  )
}
export default ActionModal
