import { useLoadQuestionData } from '@/hooks/useLoadQuestionInfo'
import { useComponentStore } from '@/store'
import { FileOutlined, OrderedListOutlined, ProductOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import EditCanvas from './EditCanvas'
import EditHeader from './EditHeader'
import s from './index.module.scss'
import Lib from './Lib'
import Prop from './Prop'

const tabItems = [
  {
    key: 'lib',
    label: '组件库',
    children: <Lib />,
    icon: <ProductOutlined />,
  },
  {
    key: 'layer',
    label: '图层',
    children: <></>,
    icon: <OrderedListOutlined />,
  },
]

const tabSettingItems = [{
  key: 'stats',
  label: '属性',
  children: <Prop />,
  icon: <FileOutlined />,
}, {
  key: 'setting',
  label: '页面设置',
  children: <></>,
  icon: <SettingOutlined />,
}]
function Edit() {
  useLoadQuestionData()
  const { setSelectId } = useComponentStore()

  function handleClickOutside() {
    setSelectId('')
  }

  return (
    <>
      <EditHeader></EditHeader>
      <div className={s.container}>
        <aside className={s.left}>
          <Tabs
            defaultActiveKey="lib"
            centered
            items={tabItems}
          />
        </aside>
        <div className={s.center} onClick={handleClickOutside}>
          <div className={s.canvas}>
            <EditCanvas></EditCanvas>
          </div>
        </div>
        <div className={s.right}>
          <Tabs
            defaultActiveKey="stats"
            centered
            items={tabSettingItems}
          />
        </div>
      </div>
    </>
  )
}
export default Edit
