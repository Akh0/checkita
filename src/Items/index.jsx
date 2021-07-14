import React from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import { useChecklist } from '../context/checklist'
import Item from './Item'

const StyledItem = styled(Item)`
  margin: 0 0 20px 10px;
`

const Items = () => {
  const { items, updateItem, addItem } = useChecklist()

  return (
    <>
      {items.map((item) => (
        <StyledItem
          id={item.id}
          label={item.label}
          checked={item.checked}
          onChange={(label, checked) => {
            updateItem({ ...item, label, checked }, () => {
              if (label.length > 0 && _.last(items).id === item.id) {
                addItem()
              }
            })
          }}
          key={item.id}
        />
      ))}
    </>
  )
}

export default Items
