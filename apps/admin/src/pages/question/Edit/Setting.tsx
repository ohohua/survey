import UploadImage from '@/components/UploadImage'
import { useComponentStore } from '@/store'
import { Form, Input } from 'antd'

function Setting() {
  const [form] = Form.useForm()
  const { questionInfo, setQuestionInfo } = useComponentStore()

  function handleChange() {
    setQuestionInfo(form.getFieldsValue())
  }

  useEffect(() => {
    form.setFieldsValue(questionInfo)
  }, [questionInfo])

  return (
    <>
      <Form layout="vertical" onValuesChange={handleChange} initialValues={questionInfo} form={form}>
        <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="背景图" name="backgroundImage">
          {/* <Input /> */}
          <UploadImage></UploadImage>
        </Form.Item>
        <Form.Item label="页眉图" name="pageHeaderImage">
          {/* <Input /> */}
          <UploadImage></UploadImage>
        </Form.Item>
      </Form>
    </>
  )
}

export default Setting
