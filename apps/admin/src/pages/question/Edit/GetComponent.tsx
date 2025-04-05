import type { ComponentInfo } from '@/store'
import { getComponentConfigByType } from '@/components/Question'

export function getComponent(componentInfo: ComponentInfo) {
  const { props, type } = componentInfo

  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null)
    return null

  const { Component } = componentConfig
  return <Component {...props} />
}
