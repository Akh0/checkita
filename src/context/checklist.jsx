import React, { Component, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const ChecklistContext = createContext({})

class ChecklistProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      lastItemId: '0',
      items: [
        {
          id: '0',
          label: '',
          checked: false
        }
      ]
    }

    this.setTitle = (title) => {
      this.setState({ title })
    }

    this.addItem = (callback) => {
      const newItemId = parseInt(this.state.lastItemId + 1).toString()

      this.setState(
        {
          lastItemId: newItemId,
          items: [
            ...this.state.items,
            { id: newItemId, label: '', checked: false }
          ]
        },
        callback
      )
    }

    this.updateItem = (item, callback) => {
      this.setState(
        {
          items: this.state.items.map((it) => {
            if (it.id === item.id) {
              return item
            }

            return it
          })
        },
        callback
      )
    }

    this.removeItem = (item, callback) => {
      this.setState(
        { items: this.state.items.filter(({ id }) => id !== item.id) },
        callback
      )
    }

    this.reorderItems = (sourceIndex, destinationIndex, callback) => {
      const reorderedItems = [...this.state.items]
      const [removed] = reorderedItems.splice(sourceIndex, 1)
      reorderedItems.splice(destinationIndex, 0, removed)

      this.setState(
        {
          items: reorderedItems
        },
        callback
      )
    }
  }

  render() {
    const { children } = this.props

    return (
      <ChecklistContext.Provider
        value={{
          ...this.state,
          setTitle: this.setTitle,
          addItem: this.addItem,
          updateItem: this.updateItem,
          removeItem: this.removeItem,
          reorderItems: this.reorderItems
        }}
      >
        {children}
      </ChecklistContext.Provider>
    )
  }
}

ChecklistProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ChecklistProvider

export const ChecklistConsumer = ChecklistContext.Consumer
export const useChecklist = () => useContext(ChecklistContext)
