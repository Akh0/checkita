import React from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { useChecklist } from '../business/ChecklistProvider'
import Item from './Item'

const DndList = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? 'rgba(255, 255, 255, 0.1)' : undefined};
`

const StyledItem = styled(Item)`
  margin-bottom: 20px;

  @media screen and (max-width: 640px) {
    margin-bottom: 16px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 12px;
  }
`

const Items = () => {
  const {
    value: { items },
    updateItem,
    addItem,
    removeItem,
    reorderItems
  } = useChecklist()

  return (
    <DragDropContext
      onDragEnd={({ source, destination }) => {
        reorderItems(source.index, destination.index)
      }}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <DndList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <StyledItem
                      dragHandleProps={provided.dragHandleProps}
                      id={item.id}
                      label={item.label}
                      checked={item.checked}
                      onChange={(label, checked) => {
                        updateItem({ ...item, label, checked }, () => {
                          if (
                            label.length > 0 &&
                            _.last(items).id === item.id
                          ) {
                            addItem()
                          }
                        })
                      }}
                      onRemove={
                        items.length > 1 && index < items.length - 1
                          ? () => {
                              removeItem(item)
                            }
                          : undefined
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </DndList>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Items
