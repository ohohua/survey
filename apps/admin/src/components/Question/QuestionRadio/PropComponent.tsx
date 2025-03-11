import type { OptionsType, QuestionRadioProps } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { nanoid } from 'nanoid'
import { QuestionRadioDefault } from './interface'

function PropComponent(props: QuestionRadioProps) {
  const [form] = Form.useForm()
  const { title, options = [], vertical, isLock, onChange } = { ...QuestionRadioDefault, ...props }

  useEffect(() => {
    form.setFieldsValue({ title })
  }, [title])

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <>
      <Form layout="vertical" onValuesChange={handleChange} initialValues={{ title, options, vertical }} form={form} autoComplete="off">
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input disabled={isLock} />
        </Form.Item>
        <Form.Item label="选项">
          <Form.List name="options">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name }, index) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项值' },
                        ({ getFieldsValue }) => {
                          const { options } = getFieldsValue()
                          return {
                            validator(_, label) {
                              const nums = options.reduce((total: number, cur: OptionsType) => total += cur.label === label ? 1 : 0, 0)
                              return nums > 1 ? Promise.reject(new Error('选项值不能重复')) : Promise.resolve()
                            },
                          }
                        },

                      ]}
                    >
                      <Input placeholder="请输入" disabled={isLock} />
                    </Form.Item>
                    {index > 1 && !isLock ? (<MinusCircleOutlined onClick={() => remove(key)} />) : null}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({ label: ``, value: nanoid(5) })}
                    style={{ width: '90%' }}
                    icon={<PlusOutlined />}
                    disabled={isLock}
                  >
                    添加选项
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="默认选中" name="value">
          <Select options={options} disabled={isLock} placeholder="请选择" />
        </Form.Item>
        <Form.Item label="排列方式" name="vertical" valuePropName="checked">
          <Checkbox disabled={isLock}>竖向排列</Checkbox>
        </Form.Item>
      </Form>
    </>
  )
}

export default PropComponent
