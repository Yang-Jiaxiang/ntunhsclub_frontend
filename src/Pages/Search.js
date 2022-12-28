import React, { useEffect, useState } from 'react'
import { BoldOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Col, Row } from 'antd'
import { getAllData } from '../Axios'
import CreateModal from '../Components/Search/CreateUser/CreateModal'
import { SearchData } from '../Axios'

const style = {
  width: '100%',
  padding: '20px 20px 20px 20px'
}

const Search = props => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState({})
  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    console.log('Finish:', values)
  }

  const buttonClick = async () => {
    const ID = form.getFieldValue('ID')
    const Name = form.getFieldValue('Name')
    var data = []
    if (ID) {
      data = props.data.filter(item => item.tID.includes(ID))
      if (Name) {
        data = data.filter(item => item.Name.includes(Name))
      }
    } else if (Name) {
      data = props.data.filter(item => item.Name.includes(Name))
    } else {
      data = await getAllData()
    }
    props.setData(data)
  }

  return (
    <div style={style}>
      <Row>
        <Col span={18}>
          <div>
            <Form
              form={form}
              name="horizontal_login"
              layout="inline"
              onFinish={onFinish}
            >
              <Form.Item name="ID">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="身分證"
                />
              </Form.Item>
              <Form.Item name="Name">
                <Input
                  prefix={<BoldOutlined className="site-form-item-icon" />}
                  placeholder="姓名"
                />
              </Form.Item>
              <Form.Item shouldUpdate>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={buttonClick}
                >
                  搜尋
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ textAlign: 'right' }}>
            <CreateModal />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Search
