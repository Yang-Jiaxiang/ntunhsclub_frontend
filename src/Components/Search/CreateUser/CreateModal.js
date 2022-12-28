import React, { useState } from 'react'
import {
  Button,
  Modal,
  InputNumber,
  Form,
  Input,
  message,
  Space,
  Select,
  DatePicker,
  TimePicker
} from 'antd'

import { UserAddOutlined } from '@ant-design/icons'
import { postData } from '../../../Axios/index.js'
const { Option } = Select

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

const CreateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState({})
  const [messageApi, contextHolder] = message.useMessage()
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '成功新增'
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = values => {
    console.log(data)
    setIsModalOpen(false)
    postData(data)
    success()
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      {contextHolder}
      <Button icon={<UserAddOutlined />} onClick={showModal}>
        新增
      </Button>
      <Modal
        title="新增教師"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {label.map((item, index) => {
            if (item.type === 'selection') {
              return (
                <Form.Item
                  label={item.title}
                  name={item.key}
                  rules={[
                    {
                      required: true,
                      message: `Please input ${item.title}`
                    }
                  ]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={e => {
                      setData({ ...data, [item.key]: e })
                    }}
                    allowClear
                  >
                    {item.selection.map((item2, index) => {
                      return (
                        <Option value={item2.label} key={index}>
                          {item2.value}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              )
            }
            if (item.type === 'dateTime') {
              return (
                <Form.Item
                  label={item.title}
                  name={item.key}
                  rules={[
                    {
                      required: true,
                      message: `Please input ${item.title}`
                    }
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={e => setData({ ...data, [item.key]: e._d })}
                  />
                </Form.Item>
              )
            }
            if (item.type === 'number') {
              return (
                <Form.Item
                  label={item.title}
                  name={item.key}
                  rules={[
                    {
                      required: true,
                      message: `Please input ${item.title}`
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    onChange={e => setData({ ...data, [item.key]: e })}
                  />
                </Form.Item>
              )
            }
            if (item.type === 'text' || item.type === 'email') {
              return (
                <Form.Item
                  label={item.title}
                  name={item.key}
                  rules={[
                    {
                      required: true,
                      message: `Please input ${item.title}`
                    }
                  ]}
                >
                  <Input
                    type={item.type}
                    onChange={e =>
                      setData({ ...data, [item.key]: e.target.value })
                    }
                  />
                </Form.Item>
              )
            }
          })}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default CreateModal
