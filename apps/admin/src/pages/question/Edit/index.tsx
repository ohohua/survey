import { useLoadQuestionData } from '@/hooks/useLoadQuestionInfo'
import { useComponentStore } from '@/store'
import { FileOutlined, OrderedListOutlined, ProductOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import EditCanvas from './EditCanvas'
import EditHeader from './EditHeader'
import s from './index.module.scss'
import Lib from './Lib'
import Prop from './Prop'
import Setting from './Setting'

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

enum TAB_KEYS {
  STATS = 'stats',
  SETTING = 'setting',
}
const tabSettingItems = [
  {
    key: TAB_KEYS.STATS,
    label: '属性',
    children: <Prop />,
    icon: <FileOutlined />,
  },
  {
    key: TAB_KEYS.SETTING,
    label: '页面设置',
    children: <Setting />,
    icon: <SettingOutlined />,
  },
]

function Edit() {
  useLoadQuestionData()
  const { selectId, setSelectId } = useComponentStore()
  const [rightKey, setRightKey] = useState(TAB_KEYS.STATS)

  function handleClickOutside() {
    setSelectId('')
  }

  useEffect(() => {
    setRightKey(selectId ? TAB_KEYS.STATS : TAB_KEYS.SETTING)
  }, [selectId])

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
            activeKey={rightKey}
            centered
            items={tabSettingItems}
          />
        </div>
      </div>
    </>
  )
}
export default Edit
