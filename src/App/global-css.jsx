import React from 'react'
import { Global, css } from '@emotion/react'

const GlobalCss = () => (
  <Global
    styles={css`
      html,
      body {
        margin: 30px;
        padding: 0;

        * {
          box-sizing: border-box;
        }
      }

      html {
        min-height: calc(100vh - 60px);
      }

      body {
        background-image: linear-gradient(220deg, #5240cb, #3c2e92);
        min-height: calc(100% - 60px);
      }
    `}
  />
)

export default GlobalCss
