'use client'

import type { ComponentPropsType } from '.'
import { getComponentConfigByType } from '.'

export interface ComponentInfo {
  id: string
  type: string
  props: ComponentPropsType
}
export function getComponent(componentInfo: ComponentInfo) {
  const { props, type } = componentInfo

  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null)
    return null

  const { Component } = componentConfig
  return <Component {...props} />
}
