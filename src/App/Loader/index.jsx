import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const duration = 0.5
const size = '1.5rem'

const move = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  height: ${size};
  width: ${size};
  transform: translateX(-50%) translateY(-50%);
`

const Block = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${size};
  width: ${size};
`

const Item = styled.div`
  position: absolute;
  height: ${size};
  width: ${size};
  background: #fff;
  animation: ${move} ${duration}s linear infinite;

  &:nth-of-type(1) {
    top: -${size};
    left: -${size};
    animation-delay: 0s;
  }

  &:nth-of-type(2) {
    top: -${size};
    left: 0;
    animation-delay: ${-duration / 8}s;
  }

  &:nth-of-type(3) {
    top: -${size};
    left: ${size};
    animation-delay: ${(-2 * duration) / 8}s;
  }

  &:nth-of-type(4) {
    top: 0;
    left: ${size};
    animation-delay: ${(-3 * duration) / 8}s;
  }

  &:nth-of-type(5) {
    top: ${size};
    left: ${size};
    animation-delay: ${(-4 * duration) / 8}s;
  }

  &:nth-of-type(6) {
    top: ${size};
    left: 0;
    animation-delay: ${(-5 * duration) / 8}s;
  }

  &:nth-of-type(7) {
    top: ${size};
    left: -${size};
    animation-delay: ${(-6 * duration) / 8}s;
  }

  &:nth-of-type(8) {
    top: 0;
    left: -${size};
    animation-delay: ${(-7 * duration) / 8}s;
  }
`

const Loader = () => (
  <Wrapper>
    <Block>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Block>
  </Wrapper>
)

export default Loader
