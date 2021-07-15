import React from 'react'
import styled from '@emotion/styled'

import Items from '../Items'
import GlobalCss from './global-css'
import ChecklistProvider, {
  ChecklistConsumer
} from '../business/ChecklistProvider'
import TitleInput from '../TitleInput'
import Loader from './Loader'
import Actions from '../Actions'

const StyledTitleInput = styled(TitleInput)`
  display: block;
  margin: 50px auto 100px auto;
`

const App = () => {
  const { pathname } = window.location

  return (
    <ChecklistProvider checklistId={pathname.substring(1)}>
      <GlobalCss />
      <ChecklistConsumer>
        {({ loading, value }) =>
          loading ? (
            <Loader />
          ) : (
            <>
              {value.id && <Actions />}
              <StyledTitleInput placeholder="Titre de la checklist" />
              <Items />
            </>
          )
        }
      </ChecklistConsumer>
    </ChecklistProvider>
  )
}

export default App
