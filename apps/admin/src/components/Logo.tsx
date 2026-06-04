import logo from '@/assets/star.png'
import { HOME_PATHNAME } from '@/router'
import { Link } from 'react-router-dom'
import s from './Logo.module.scss'

function Logo() {
  return (
    <Link to={HOME_PATHNAME} className={s.logo}>
      <span className={s.mark}>
        <img src={logo} alt="Survey" />
      </span>
      <span className={s.text}>
        <span className={s.name}>Survey</span>
        <span className={s.caption}>Admin</span>
      </span>
    </Link>
  )
}

export default Logo
