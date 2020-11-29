import React from "react";
import t from "../../Theme/helper";
import styled, { css } from "styled-components";
import { ButtonSubmit } from "../../components/Buttons";
//
// #region hide
const DeleteModal = styled.section`
  ${t.Modal.Def}
  .modal-dialog {
    ${t.Modal.Dialog.Def}
    ${(props) => {
      switch (props.size) {
        case "sm":
          return css`
            ${t.Modal.Dialog.Size.Sm}
          `;
        case "lg":
          return css`
            ${t.Modal.Dialog.Size.Lg}
          `;
        case "xl":
          return css`
            ${t.Modal.Dialog.Size.Xl}
          `;
        default:
          return css`
            max-width: 500px;
          `;
      }
    }}
    .modal-content {
      border-bottom-width: 10px !important;
      border-bottom-style: solid !important;
      ${[t.Modal.Content.Def, t.Text.Align.Initial, t.Rounded.Lg.Def]}
      ${(props) => {
        switch (props.theme) {
          case "secondary":
            return css`
              border-bottom-color: #4d4f5c;
            `;
          case "primary":
            return css`
              border-bottom-color: #035388;
            `;
          case "danger":
            return css`
              border-bottom-color: #ff6565;
            `;
          case "side":
            return css`
              ${[t.Border.Bottom._0, t.Border.Left.Success._10, t.P.X._3]}
            `;
          default:
            return css`
              border-bottom-color: #27ab83;
            `;
        }
      }}
       .modal-header {
        ${[t.Modal.Content.Header.Def, t.Rounded.Lg.Top, t.P.X._3, t.P.Y._2]}
        ${(props) => {
          switch (props.theme) {
            case "secondary":
              return css`
                ${t.Bg.Secondary.Def}
              `;
            case "primary":
              return css`
                ${t.Bg.Primary._30.Def}
              `;
            case "danger":
              return css`
                ${t.Bg.Danger._60._2.Def}
              `;
            case "side":
              return css`
                ${t.P.X._0}
              `;
            default:
              return css`
                ${t.Bg.Success._20.Def}
              `;
          }
        }}
        .modal-title {
          ${[t.Modal.Content.Header.Title, t.Font.Size.Lg, t.Font.Bold]}
          ${(props) =>
            props.theme === "side" ? t.Text.Success._20.Def : t.Text.White}
        }
        [data-dismiss="modal"] {
          text-shadow: none !important;
          opacity: 1 !important;
          ${[
            t.Modal.Content.Header.Close,
            t.Font.Size.Md,
            t.Align.Self.Center,
            t.D.Flex,
            t.P.T._1,
            t.P._0,
            t.M._0,
          ]}
          ${(props) =>
            props.theme === "side"
              ? t.Text.Secondary._70.Opacity5
              : t.Text.White}
          [class*='close'] {
            ${t.M.X._0}
          }
        }
        [class*="warning-box"] {
          top: -30px;
          ${[t.Bg.White, t.Rounded.Circle, t.Position.Absolute, t.P._3]}
        }
      }
      .modal-body {
        max-height: 550px;
        ${[t.Modal.Content.Body, t.Overflow.Auto, t.P.Y._0]}
        ${(props) =>
          props.theme === "side"
            ? [t.P.X._0, t.P.Y._3]
            : null}
        .form-group {
          ${[t.Flex.Column, t.D.Flex]}
          &.mix {
            padding-right: 15px !important;
            padding-left: 15px !important;
            ${t.M.Y._2}
          }
          textarea {
            ${t.W.Auto}
          }
          .form-label {
            ${[t.Font.Bold, t.Text.Teal.Def, t.M.B._1]}
            span {
              ${t.Text.Danger._60._2.Def}
            }
          }
          .form-control {
            ${[
              t.Text.Teal.Def,
              t.Rounded.Lg.Def,
              t.Border.Teal.Opacity5,
              t.Shadow.None,
              t.W.Auto,
              t.H.Auto,
              t.P._2,
              t.M.B._0,
            ]}
          }
        }
      }
      .modal-footer {
        ${[
          t.Modal.Content.Footer,
          t.Justify.Content.Center,
          t.Border._0,
          t.P.Y._4,
        ]}
      }
    }
  }
`;
//#endregion

const DeleteAlertModal = function (props) {
  const { title, onSubmit, onClose, btnName } = props;
  return (
    <DeleteModal size="md" theme="danger" className="modal">
      <article className="modal-dialog">
        <div className="modal-content">
          <header className="modal-header justify-content-center">
            <div className="icon-warning-box">
              <i className="icon-warning"> </i>
            </div>
          </header>
          <section className="modal-body">
            <p
              className="fontsize-md font-bold mt-4 mb-0"
              style={{ color: "#102A43" }}
            >
              {title}
            </p>
          </section>
          <footer className="modal-footer">
            <ButtonSubmit
              mode="light"
              name="false"
              onClick={onClose}
              text={btnName[0]}
            />
            <ButtonSubmit
              mode="danger"
              name="true"
              onClick={onSubmit}
              text={btnName[1]}
            />
          </footer>
        </div>
      </article>
    </DeleteModal>
  );
};

export default DeleteAlertModal;
