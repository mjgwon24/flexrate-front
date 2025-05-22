import { css } from '@emotion/react';

import { primitiveColor } from '../colors';

export const desktopGlobalStyleCss = css`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: ${primitiveColor.background.wt};
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  .apexcharts-tooltip {
    margin: 5px !important;
  }
`;
