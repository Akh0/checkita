import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Input from '../../controls/Input'
import svgTrash from './trash.svg'

const Wrapper = styled.div`
  display: flex;
`

const DragHandle = styled.div`
  width: 46px;
  font-size: 24px;
  line-height: 8px;
  letter-spacing: 2px;
  text-align: center;
  color: #ffffff;

  &::after {
    content: '.. .. .. ..';
  }
`

const Checkbox = styled.input`
  display: none;

  /* Checkmark */
  &:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: 14px;
    width: 12px;
    height: 26px;

    border-style: solid;
    border-width: 0 3px 3px 0;
    border-color: #fff;
    transform: rotate(45deg);
  }
`

const Label = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;

  &:hover {
    &::before {
      background-color: rgba(255, 255, 255, 0.02);
    }
  }

  &::before {
    content: '';
    -webkit-appearance: none;
    background-color: transparent;
    border-style: solid;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.08);

    padding: 19px;
    display: inline-block;
    position: relative;
    top: 0;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 4px;
    transition: background-color 100ms ease-in;
  }
`

const StyledInput = styled(Input)`
  font-size: 24px;
  margin-right: 10px;
`

const DeleteButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`

const DeleteImg = styled.img`
  height: 70%;
`

const Item = ({
  dragHandleProps,
  id,
  label,
  checked,
  onChange,
  onRemove,
  className
}) => (
  <Wrapper className={className}>
    {dragHandleProps && <DragHandle {...dragHandleProps} />}
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
    {onRemove && (
      <DeleteButton onClick={onRemove}>
        <DeleteImg src={svgTrash} />
      </DeleteButton>
    )}
  </Wrapper>
)

Item.propTypes = {
  dragHandleProps: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  className: PropTypes.string
}

Item.defaultProps = {
  dragHandleProps: undefined,
  onRemove: undefined,
  className: undefined
}

export default Item
