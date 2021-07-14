import React, { Component, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const ChecklistContext = createContext({})

class ChecklistProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      items: [
        {
          id: 0,
          label: '',
          checked: false
        }
      ]
    }

    this.setTitle = (title) => {
      this.setState({ title })
    }

    this.addItem = (callback) => {
      this.setState(
        {
          items: [
            ...this.state.items,
            { id: this.state.items.length, label: '', checked: false }
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
  }

  render() {
    const { children } = this.props

    return (
      <ChecklistContext.Provider
        value={{
          ...this.state,
          setTitle: this.setTitle,
          addItem: this.addItem,
          updateItem: this.updateItem
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
