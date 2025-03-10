import type { QuestionParagraphProps } from './interface'
import { Checkbox, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { QuestionParagraphDefault } from './interface'

function PropComponent(props: QuestionParagraphProps) {
  const { content, isCenter, isLock, onChange } = { ...QuestionParagraphDefault, ...props }
  const [form] = Form.useForm()

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <div>
      <Form layout="vertical" onValuesChange={handleChange} initialValues={{ content, isCenter }} form={form} autoComplete="off">
        <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入段落内容' }]}>
          <TextArea autoSize={{ minRows: 3, maxRows: 6 }} disabled={isLock} placeholder="请输入" />
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox disabled={isLock}>是否居中</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PropComponent
