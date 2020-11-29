import React from "react";
import styled, { css } from "styled-components";
import t from "../../../Theme/helper";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// #region styledComps
const InputDate = styled(KeyboardDateTimePicker)`
  [class*="MuiInputBase-root"] {
    ${t.Rounded.Lg.Def}
    ${(props) =>
      props.error
        ? css`
            ${t.Border.Danger._40}
          `
        : css`
            ${t.Border.Teal.Opacity5}
          `};
    ${(props) =>
      props.disabled
        ? css`
            ${t.Bg.Light.Def}
          `
        : t.Bg.White};
    &:before,
    &:after {
      ${t.D.None}
    }
    input {
      height: 20px;
      ${(props) =>
        props.error
          ? css`
              ${t.Text.Danger._40}
            `
          : css`
              ${t.Text.Teal.Def}
            `};
      ${[t.Rounded.Lg.Def, t.W._100, t.P._2, t.M.B._0]}
    }
    button {
      &:hover,
      &:focus {
        background-color: transparent;
      }
      span {
        &[class*="Icon"] {
          right: 1px;
          ${[
            t.Font.Size.Lg,
            t.Align.Items.Center,
            t.Text.Teal.Def,
            t.Rounded.Lg.Def,
            t.Position.Absolute,
            t.D.Flex,
            t.P.X._2,
            t.M.X._0,
          ]}
          ${(props) =>
            props.disabled
              ? css`
                  ${t.Bg.Light.Def}
                `
              : css`
                  ${t.Bg.White}
                `};
        }
        &[class*="Ripple"] {
          ${t.D.None}
        }
      }
    }
  }
`;
// #endregion styledComps

export default React.memo((props) => {
  // format="yyyy/MM/dd"
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputDate {...props} keyboardIcon="" format="yyyy/MM/dd hh:mm a" />
    </MuiPickersUtilsProvider>
  );
});
/* <InputDate
{...other}
onBlur={handleBlur}
onChange={handleChange}
variant="inline"
error={error}
format="yyyy/MM/dd"
keyboardIcon=""
helperText=""
disabled={readOnly}
autoOk
/> */
