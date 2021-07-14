const updateUrl = (list) => {
  history.replaceState({}, 'id', list.id)
}

export { updateUrl }
