import firebase from 'firebase/app'

const syncList = (list) => {
  const database = firebase.database()

  const id = list.id || database.ref().child('lists').push().key

  const updates = {
    [`/lists/${id}`]: {
      ...list,
      id
    }
  }

  return { id, promise: firebase.database().ref().update(updates) }
}

const getListRef = (id) => {
  const database = firebase.database()

  return database.ref(`/lists/${id}`)
}

export { syncList, getListRef }
