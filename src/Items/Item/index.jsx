import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Input from '../../controls/Input'

const Wrapper = styled.div``

const Checkbox = styled.input`
  display: none;

  /* Checkmark */
  &:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: -12px;
    left: 14px;
    width: 12px;
    height: 26px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`

const Label = styled.label`
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    -webkit-appearance: none;
    background-color: transparent;
    border: 2px solid #fff;
    padding: 19px;
    display: inline-block;
    position: relative;
    top: -5px;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 4px;
  }
`

const StyledInput = styled(Input)`
  font-size: 24px;
`

const Item = ({ id, label, checked, onChange, className }) => (
  <Wrapper className={className}>
    <Checkbox
      type="checkbox"
      checked={checked}
      onChange={() => {
        onChange(label, !checked)
      }}
      id={`item_${id}`}
    />
    <Label htmlFor={`item_${id}`}>
      <StyledInput
        placeholder="Libellé"
        value={label}
        onChange={(value) => {
          onChange(value, checked)
        }}
      />
    </Label>
  </Wrapper>
)

Item.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

Item.defaultProps = {
  className: undefined
}

export default Item
