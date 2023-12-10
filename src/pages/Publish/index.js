import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link } from 'react-router-dom'
  import './index.scss'
  import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { getChannelAPI ,createAriticleAPI } from '@/apis/article'
  const { Option } = Select
  
const Publish = () => {
  //获取频道列表
  const [channelList, setChannelList] = useState([])
  
  useEffect(() => { 
   const fetchchannels = async () => { 
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    fetchchannels()
  
  }, [])
  
  const onFinish = async (formValue) => {
    console.log(formValue)
    const { channel_id, content, title } = formValue
    const params = {
      channel_id,
      content,
      title,
      type: 1,
      cover: {
        type: 1,
        images: []
      }
    }
   await createAriticleAPI(params)
    message.success('发布文章成功')
   
  }
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '发布文章' },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                       
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelList.map(item =>  <Option value={item.id} key={item.id}>{ item.name} </Option>
                )}  
              </Select>
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                         <ReactQuill
                            className='publish-quill'
                            theme='snow'
                            placeholder='请输入文章内容'
                        ></ReactQuill>
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish