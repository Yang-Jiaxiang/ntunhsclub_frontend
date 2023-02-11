import React, { useState } from 'react'
import { Button, Modal, InputNumber, Form, Input, message, Space, Select, DatePicker, TimePicker } from 'antd'

import { UserAddOutlined } from '@ant-design/icons'
import { postData } from '../../../Axios/index.js'
import { ClubSqlLabel } from '../../../ClubSqlLabel.js'

const { Option } = Select

const label = ClubSqlLabel

const CreateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState({})
  const [messageApi, contextHolder] = message.useMessage()
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '成功新增',
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = (values) => {
    console.log(data)
    setIsModalOpen(false)
    postData(data)
    success()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      {contextHolder}
      <Button icon={<UserAddOutlined />} onClick={showModal}>
        新增
      </Button>
      <Modal title="新增教師" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
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
                      message: `Please input ${item.title}`,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={(e) => {
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
                      message: `Please input ${item.title}`,
                    },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} onChange={(e) => setData({ ...data, [item.key]: e._d })} />
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
                      message: `Please input ${item.title}`,
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} onChange={(e) => setData({ ...data, [item.key]: e })} />
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
                      message: `Please input ${item.title}`,
                    },
                  ]}
                >
                  <Input type={item.type} onChange={(e) => setData({ ...data, [item.key]: e.target.value })} />
                </Form.Item>
              )
            }
          })}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
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
