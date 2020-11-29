import React from "react";
import styled, { css } from "styled-components";
import t from "../../../Theme/helper";
import { Input as MaterialInput } from "@material-ui/core";

// #region styledComps
const Input = styled(MaterialInput)`
  &:before,
  &:after {
    ${t.D.None}
  }
  input {
    height: 20px;
    &:not([readonly]) {
      ${t.Bg.White}
    }
    ${(props) =>
      props.error
        ? css`
            ${[t.Text.Danger._40, t.Border.Danger._40]}
          `
        : [t.Text.Secondary.Def, t.Border.Secondary._70.Opacity5]};
    ${[t.Rounded.Lg.Def, t.W._100, t.P._2, t.M.B._0]}
  }
`;
// #endregion styledComps

export default React.memo(function FormInput(props) {
  const { value, onChange } = props;

  function onNumberChange(e) {
    e.persist();
    const { value } = e.target;
    const nVal = value.replace(/\D/g, "");

    onChange(nVal);
  }

  return (
    <Input
      {...props}
      onChange={onNumberChange}
      value={Number(value).toLocaleString()}
    />
  );
});
/* <Input
{...other}
type={type}
name={name}
value={value}
onBlur={onBlur}
onChange={handleChange}
readOnly={readOnly}
error={error}
inputProps={{ pattern: type === "pattern" ? pattern : null }}
id={id}
/> */
