import type { QuestionTitleProps } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

function PropComponent(props: QuestionTitleProps) {
  const [form] = Form.useForm()
  const { title, level, isCenter } = props

  useEffect(() => {
    form.setFieldsValue({ title, level, isCenter })
  }, [title, level, isCenter])

  return (
    <>
      <Form layout="vertical" initialValues={{ title, level, isCenter }} form={form}>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="层级" name="level">
          <Select options={[
            { label: '一级', value: 1 },
            { label: '二级', value: 2 },
            { label: '三级', value: 3 },
            { label: '四级', value: 4 },
            { label: '五级', value: 5 },
          ]}
          />
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox>是否选中</Checkbox>
        </Form.Item>
      </Form>
    </>
  )
}

export default PropComponent
