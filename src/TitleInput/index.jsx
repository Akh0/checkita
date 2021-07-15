import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { useChecklist } from '../business/ChecklistProvider'
import Input from '../controls/Input'

const StyledInput = styled(Input)`
  > input {
    font-size: 38px;
    text-align: center;

    @media screen and (max-width: 640px) {
      font-size: 34px;
    }

    @media screen and (max-width: 480px) {
      font-size: 30px;
    }
  }
`

const TitleInput = ({ className }) => {
  const {
    value: { title },
    setTitle
  } = useChecklist()

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
