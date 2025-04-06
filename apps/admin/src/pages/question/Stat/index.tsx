import type { ComponentPropsType } from '@/components/Question'
import type { ComponentInfo } from '@/store'
import { loadQuestionInfo } from '@/api'
import { useRequest } from 'ahooks'
import { Splitter } from 'antd'
import { useParams } from 'react-router-dom'
import s from './index.module.scss'
import StatAnswer from './StatAnswer'
import StatHeader from './StatHeader'
import StatQuestion from './StatQuestion'

function Stat() {
  const { id = '' } = useParams()
  const [list, setList] = useState<ComponentInfo[]>([])
  const [selectId, setSelectId] = useState<string | undefined>(undefined)
  const { data, loading } = useRequest(() => loadQuestionInfo(id))

  useEffect(() => {
    const components = data?.data?.componentList?.map((item) => {
      return {
        ...item,
        props: JSON.parse(item.props as string || '{}') as ComponentPropsType,
      }
    })
    setList(components || [])
  }, [data])

  return (
    <div className={s.container}>
      <StatHeader />

      <Splitter className={s.content}>
        <Splitter.Panel collapsible defaultSize="30%" min="20%" max="50%">
          <StatQuestion list={list} selectId={selectId} loading={loading} changeId={setSelectId} />
        </Splitter.Panel>
        <Splitter.Panel>
          <StatAnswer list={list} selectId={selectId} loading={loading} />
        </Splitter.Panel>
      </Splitter>
    </div>
  )
}
export default Stat
