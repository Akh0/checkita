import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { useChecklist } from '../context/checklist'
import Input from '../controls/Input'

const StyledInput = styled(Input)`
  font-size: 36px;
  text-align: center;
`

const TitleInput = ({ className }) => {
  const { title, setTitle } = useChecklist()

  return (
    <StyledInput
      placeholder="Titre de la checklist"
      onChange={setTitle}
      value={title}
      className={className}
    />
  )
}

TitleInput.propTypes = {
  className: PropTypes.string
}

TitleInput.defaultProps = {
  className: undefined
}

export default TitleInput
