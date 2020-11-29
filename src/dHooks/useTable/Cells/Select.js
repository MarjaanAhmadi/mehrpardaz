import React from "react";
import styled, { css } from "styled-components";
import t from "../../../Theme/helper";
import CreatableSelect from "react-select";

// #region styledComps
const Select = styled(CreatableSelect)`
  .react-select__control {
    height: auto;
    min-height: 37px;
    ${(props) =>
      props.error
        ? css`
            ${t.Border.Danger._40}
          `
        : css`
            ${t.Border.Teal.Opacity5}
          `};
    ${(props) =>
      props.readOnly
        ? css`
            ${t.Bg.Light.Def}
          `
        : css`
            ${[t.Bg.White, t.C.Pointer]}
          `};
    ${[
      t.Align.Items.Center,
      t.Justify.Content.Between,
      t.Rounded.Lg.Def,
      t.Shadow.None,
      t.D.Flex,
    ]}
    &[class*="is-open"] {
      [class*="dropdown-indicator"] {
        svg {
          transform: rotate(180deg);
        }
      }
    }
    [class*="value-container"] {
      padding: 0 10px;
      ${t.Text.Lg}
      &[class*="has-value"] {
        [class*="value"] {
          ${(props) => (props.error ? t.Text.Danger._40 : t.Text.Teal.Def)};
        }
        [class*="single-value"] {
          ${t.M.X._0}
        }
        [class*="multi-value"] {
          margin: 0.1rem;
          ${[t.Bg.Warning.Def, t.Rounded.Pill, t.P.X._1]}
          [class*="label"], [class*="remove"] {
            ${t.P.X._0}
          }
        }
      }
    }
    [class*="indicators"] {
      [class*="clear-indicator"],
      [class*="separator"] {
        ${t.D.None}
      }
      [class*="dropdown-indicator"] {
        padding: 0 2px;
        svg {
          width: 13px;
          height: 13px;
          ${[
            t.Align.Items.Center,
            t.Text.Teal.Def,
            t.Position.Static,
            t.D.Flex,
            t.Transition,
            t.P.X._1,
            t.M.X._0,
          ]}
        }
      }
    }
  }
  .react-select__menu {
    z-index: 10 !important;
    ${[t.Rounded.Lg.Def, t.Border.Teal.Opacity5, t.Shadow.Sm, t.M.Y._2]}
    &-list {
      max-height: 200px;
      ${t.P._0}
      [class*="option"] {
        background: transparent;
        ${[t.Text.Teal.Def, t.C.Pointer, t.Transition, t.P._2]}
        &:hover, &[class*="is-focused"] {
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
`;
// #endregion styledComps

export default React.memo((props) => {
  const { withNull, options, value } = props;
  const val = value ? options.find((el) => el.id === value) : null;
  let opts = options;
  if (withNull) opts = [{ label: "empty", id: null }, ...opts];
  return <Select {...props} options={opts} value={val} />;
});
