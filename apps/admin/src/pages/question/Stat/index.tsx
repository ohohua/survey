import { Splitter } from 'antd'
import s from './index.module.scss'
import StatHeader from './StatHeader'
import StatQuestion from './StatQuestion'

function Stat() {
  return (
    <div className={s.container}>
      <StatHeader />

      <Splitter className={s.content}>
        <Splitter.Panel collapsible defaultSize="30%" min="20%" max="50%">
          <div className={s.left}>
            <StatQuestion />
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div className={s.center}>m</div>
        </Splitter.Panel>
      </Splitter>
    </div>
  )
}
export default Stat
