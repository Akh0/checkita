import React from 'react'
import { Global, css } from '@emotion/react'

const GlobalCss = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

      html,
      body {
        margin: 30px;
        padding: 0;

        @media screen and (max-width: 640px) {
          margin: 20px;
        }

        @media screen and (max-width: 480px) {
          margin: 10px;
        }

        * {
          box-sizing: border-box;
          font-family: 'Varela Round', sans-serif;
        }
      }

      html {
        min-height: calc(100vh - 60px);

        @media screen and (max-width: 640px) {
          min-height: calc(100vh - 40px);
        }

        @media screen and (max-width: 480px) {
          min-height: calc(100vh - 20px);
        }
      }

      body {
        background-image: linear-gradient(220deg, #5240cb, #3c2e92);
      }

      @media print {
        html,
        body {
          margin: 0;
        }
      }
    `}
  />
)

export default GlobalCss
