import type { ChangeEvent } from 'react'
import { SEARCH_KEYWORD } from '@/constant'
import { Input } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const { Search } = Input
function ListSearch() {
  const [keyword, setKeyword] = useState<string>('')
  const nav = useNavigate()
  const { pathname, search } = useLocation() // or useSearchParams()

  useEffect(() => {
    // search = '?keyword=123'
    const params = new URLSearchParams(search)
    const keyword = params.get(SEARCH_KEYWORD)
    setKeyword(keyword || '')
  }, [search])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  const onSearch = (value: string) => {
    nav({ pathname, search: value ? `${SEARCH_KEYWORD}=${value.trim()}` : '' })
  }
  return (
    <>
      <Search placeholder="搜索问卷" style={{ width: '260px' }} allowClear value={keyword} onChange={onChange} onSearch={onSearch}></Search>
    </>
  )
}

export default ListSearch
