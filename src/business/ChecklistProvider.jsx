import React, { Component, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { syncList, getListRef } from './database'
import { updateUrl } from './router'

const ChecklistContext = createContext({})

class ChecklistProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: !!props.checklistId,
      value: {
        id: props.checklistId,
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
    }

    const sync = () => {
      const { id } = syncList({ ...this.state.value })

      if (!this.state.value.id) {
        this.setState({ value: { ...this.state.value, id } }, () => {
          updateUrl({ ...this.state.value })
        })
      }
    }

    this.setList = (list) => {
      this.setState({ loading: false, value: { ...list } })
    }

    this.setTitle = (title) => {
      this.setState({ value: { ...this.state.value, title } }, () => {
        sync()
      })
    }

    this.addItem = (callback) => {
      const newItemId = (parseInt(this.state.value.lastItemId) + 1).toString()

      this.setState(
        {
          value: {
            ...this.state.value,
            lastItemId: newItemId,
            items: [
              ...this.state.value.items,
              {
                id: newItemId,
                label: '',
                checked: false
              }
            ]
          }
        },
        callback
      )
    }

    this.updateItem = (item, callback) => {
      this.setState(
        {
          value: {
            ...this.state.value,
            items: this.state.value.items.map((it) => {
              if (it.id === item.id) {
                return item
              }

              return it
            })
          }
        },
        (result) => {
          sync()

          if (callback) {
            callback(result)
          }
        }
      )
    }

    this.removeItem = (item, callback) => {
      this.setState(
        {
          value: {
            ...this.state.value,
            items: this.state.value.items.filter(({ id }) => id !== item.id)
          }
        },
        (result) => {
          if (callback) {
            callback(result)
          }

          sync()
        }
      )
    }

    this.reorderItems = (sourceIndex, destinationIndex, callback) => {
      const reorderedItems = [...this.state.value.items]
      const [removed] = reorderedItems.splice(sourceIndex, 1)
      reorderedItems.splice(destinationIndex, 0, removed)

      this.setState(
        {
          value: {
            ...this.state.value,
            items: reorderedItems
          }
        },
        (result) => {
          if (callback) {
            callback(result)
          }

          sync()
        }
      )
    }
  }

  componentDidMount() {
    const { checklistId } = this.props

    if (checklistId) {
      const listRef = getListRef(checklistId)

      listRef.on(
        'value',
        (snapshot) => {
          this.setList(snapshot.val())
        },
        (errorObject) => {
          console.log('The read failed: ' + errorObject.name)
        }
      )
    }
  }

  render() {
    const { children } = this.props

    return (
      <ChecklistContext.Provider
        value={{
          ...this.state,
          setList: this.setList,
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
  checklistId: PropTypes.string,
  children: PropTypes.node.isRequired
}

ChecklistProvider.defaultProps = {
  checklistId: undefined
}

export default ChecklistProvider

export const ChecklistConsumer = ChecklistContext.Consumer
export const useChecklist = () => useContext(ChecklistContext)
