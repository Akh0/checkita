import React from 'react'
import styled from '@emotion/styled'

import Input from '../controls/Input'
import Items from '../Items'
import GlobalCss from './global-css'
import ChecklistProvider from '../context/checklist'
import TitleInput from '../TitleInput'

const StyledTitleInput = styled(TitleInput)`
  display: block;
  margin: 50px auto 100px auto;
`

const App = () => {
  return (
    <ChecklistProvider>
      <GlobalCss />
      <header>
        <StyledTitleInput placeholder="Titre de la checklist" />
      </header>
      <Items />
    </ChecklistProvider>
  )
}

export default App
