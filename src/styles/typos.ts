export const typoStyleMap = {
  display: `
    font-size: 32px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0px;
  `,
  head1: `
    font-size: 24px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  title1: `
    font-size: 22px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  title2: `
    font-size: 20px;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: 0px;
  `,
  title3: `
  font-size: 18px;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: 0px;
`,
  body1_b: `
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  body1_sb: `
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  body1_m: `
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  body2_sb: `
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -1px;
  `,
  body2_m: `
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  body2_b: `
    font-size: 14px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  body2_eb: `
    font-size: 14px;
    font-weight: 800;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  body3_r: `
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0px;
  `,
  caption1_m: `
    font-size: 12px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 1px;
  `,
  caption2_r: `
    font-size: 10px;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0px;
  `,
  caption3_b: `
    font-size: 10px;
    font-weight: 700;
    line-height: 160%;
    letter-spacing: 0px;
  `,
} as const;

export type TypoKey = keyof typeof typoStyleMap;
