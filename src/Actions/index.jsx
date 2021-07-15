import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLink,
  faTrashAlt,
  faPrint,
  faClone,
  faLock,
  faLockOpen
} from '@fortawesome/free-solid-svg-icons'

import { useChecklist } from '../business/ChecklistProvider'

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.06);

  @media screen and (max-width: 640px) {
    top: 40px;
    right: 40px;
  }

  @media screen and (max-width: 480px) {
    top: 20px;
    right: 50%;
    transform: translateX(50%);
    padding: 14px;
    width: calc(100% - 40px);
    text-align: center;
  }
`

const Button = styled.button`
  border: 0;
  background: none;
  outline: none;
  font-size: 24px;
  margin-right: 20px;
  color: #ffffff;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 100ms ease-in, transform 100ms linear;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }

  /* Trash button */
  &:last-child {
    margin-right: 0;
    margin-left: 10px;
  }

  @media screen and (max-width: 640px) {
  }

  @media screen and (max-width: 480px) {
    font-size: 22px;
    margin-right: 14px;
  }
`

const Icon = styled(FontAwesomeIcon)``

const Actions = ({ className }) => {
  const { readOnly, setReadOnly, cloneList, removeList } = useChecklist()

  return (
    <Wrapper className={className}>
      <Button
        type="button"
        title={readOnly ? 'Passer en mode édition' : 'Passer en lecture seule'}
        onClick={() => {
          setReadOnly(!readOnly)
        }}
      >
        <Icon icon={readOnly ? faLock : faLockOpen} />
      </Button>
      <Button
        type="button"
        title="Copier l'URL dans le presse-papier"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
        }}
      >
        <Icon icon={faLink} />
      </Button>
      <Button
        type="button"
        title="Imprimer la checklist"
        onClick={() => {
          window.print()
        }}
      >
        <Icon icon={faPrint} />
      </Button>
      <Button
        type="button"
        title="Dupliquer la checklist"
        onClick={() => {
          cloneList()
        }}
      >
        <Icon icon={faClone} />
      </Button>
      <Button
        type="button"
        title="Supprimer la checklist"
        onClick={() => {
          removeList()
        }}
      >
        <Icon icon={faTrashAlt} />
      </Button>
    </Wrapper>
  )
}

Actions.propTypes = {
  className: PropTypes.string
}

Actions.defaultProps = {
  className: undefined
}

export default Actions
