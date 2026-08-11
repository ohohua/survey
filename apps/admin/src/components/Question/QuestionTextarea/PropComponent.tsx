import type { QuestionTextareaProps } from './interface'
import { Checkbox, Form, Input } from 'antd'
import { QuestionTextareaDefault } from './interface'

function PropComponent(props: QuestionTextareaProps) {
  const [form] = Form.useForm()
  const { title, placeholder, isRequired, isLock, onChange } = { ...QuestionTextareaDefault, ...props }

  useEffect(() => {
    form.setFieldsValue({ title, placeholder, isRequired })
  }, [title, placeholder, isRequired])

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <>
      <Form layout="vertical" onValuesChange={handleChange} initialValues={{ title, placeholder, isRequired }} form={form} autoComplete="off">
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input disabled={isLock} />
        </Form.Item>
        <Form.Item label="Placeholder" name="placeholder">
          <Input disabled={isLock} />
        </Form.Item>
        <Form.Item name="isRequired" valuePropName="checked">
          <Checkbox disabled={isLock}>必填</Checkbox>
        </Form.Item>
      </Form>
    </>
  )
}

export default PropComponent
