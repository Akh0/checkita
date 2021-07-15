import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Input from '../../controls/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useChecklist } from '../../business/ChecklistProvider'

const Wrapper = styled.div`
  display: flex;
`

const DragHandle = styled.div`
  flex-shrink: 0;
  width: 40px;
  font-size: 24px;
  line-height: 8px;
  letter-spacing: 2px;
  text-align: center;
  color: #ffffff;

  &::after {
    content: '.. .. .. ..';
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    font-size: 20px;
    line-height: 7px;
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

    @media screen and (max-width: 480px) {
      left: 11px;
      width: 10px;
      height: 22px;
    }
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

    @media screen and (max-width: 480px) {
      padding: 15px;
      margin-right: 6px;
    }
  }
`

const InnerLabel = styled.span`
  text-decoration: ${({ checked }) =>
    checked ? 'line-through double' : 'none'};
  font-size: 24px;
  color: #ffffff;
  padding: 6px;
`

const StyledInput = styled(Input)`
  > input {
    min-width: 340px;
    font-size: 24px;
    margin-right: 10px;
    text-decoration: ${({ checked }) =>
      checked ? 'line-through double' : 'none'};

    @media screen and (max-width: 640px) {
      min-width: 260px;
      font-size: 22px;
    }

    @media screen and (max-width: 480px) {
      min-width: 175px;
      font-size: 20px;
      margin-right: 4px;
    }
  }
`

const DeleteButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  opacity: 0.4;
  transition: opacity 100ms ease-in, transform 100ms linear;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`

const TrashIcon = styled(FontAwesomeIcon)`
  font-size: 18px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`

const Item = ({
  dragHandleProps,
  id,
  label,
  checked,
  onChange,
  onRemove,
  className
}) => {
  const { readOnly } = useChecklist()

  return (
    <Wrapper className={className}>
      {dragHandleProps && (
        <DragHandle
          {...dragHandleProps}
          tabIndex="-1"
          style={{ display: readOnly ? 'none' : 'block' }}
        />
      )}
      <Checkbox
        type="checkbox"
        checked={checked}
        onChange={() => {
          onChange(label, !checked)
        }}
        id={`item_${id}`}
      />
      <Label htmlFor={`item_${id}`}>
        {readOnly ? (
          <InnerLabel checked={checked}>{label}</InnerLabel>
        ) : (
          <StyledInput
            checked={checked}
            placeholder="Libellé"
            value={label}
            onChange={(value) => {
              onChange(value, checked)
            }}
          />
        )}
      </Label>
      {onRemove && !readOnly && (
        <DeleteButton onClick={onRemove} tabIndex="-1" title="Supprimer">
          <TrashIcon icon={faTrashAlt} />
        </DeleteButton>
      )}
    </Wrapper>
  )
}

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
