import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledInput = styled.input`
  color: #ffffff;

  background: none;
  outline: none;
  padding: 6px;
  border-radius: 4px;
  border: 0;
  outline: 1px solid transparent;
  transition: outline-color 100ms ease-in, background-color 100ms ease-in;

  &::placeholder {
    opacity: 0.4;
  }

  &:hover {
    outline: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.02);
  }

  &:focus {
    outline: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.04);
  }
`

const Input = ({ onChange, ...props }) => (
  <StyledInput
    type="text"
    onChange={(e) => {
      onChange(e.target.value)
    }}
    {...props}
  />
)

Input.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Input
