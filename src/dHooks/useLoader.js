import React from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import styled, { css } from "styled-components";
import t from "Theme/helper";
import { SimpleLoader } from "components/Loaders";
import { MainContent } from "components/Layouts";

const Div = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(112, 112, 112, 0.1);
  z-index: 1000;
  text-align: center;
  display: grid;
  align-items: center;
`;

const LoaderBox = (props) => {
  return (
    <Div>
      <div className="spinner"> </div>
    </Div>
  );
};

const portalRoot = document.getElementById("saeedloader");

function seMeLoading(cond) {
  const el = document.createElement("div");
  el.text = "saeed";
  if (cond) {
    portalRoot.appendChild(el);
  } else {
    portalRoot.removeChild(el);
  }
}

export { seMeLoading };

// export default ({ Loading }) =>
//   Loading
//     ? createPortal(
//         <>
//           <LoaderBox />
//         </>,
//         document.body
//       )
//     : null;

const Modal = ({ isShowing, toggle, ...props }) =>
  isShowing
    ? createPortal(
        <>
          <ModalWrapper toggle={toggle} {...props} />
        </>,
        document.body
      )
    : null;

const ModalWrapper = (props) => {
  const { type, modalTitle, toggle } = props;
  switch (type) {
    default:
      return (
        <SectionM size={props.size} theme={props.theme} className="modal">
          <article className="modal-dialog">
            <div className="modal-content">
              <header className="modal-header">
                <h3 className="modal-title"> {modalTitle} </h3>
                <button
                  type="button"
                  onClick={toggle}
                  data-dismiss="modal"
                  className="close"
                >
                  <i className="icon-close"> </i>
                </button>
              </header>
              <section className="modal-body">
                {/* <EditBloodModal data={ state.bagBloodData } refresh={ refreshGrid } close={ handleCloseModal } /> */}
                {props.children}
              </section>
              <footer className="modal-footer">
                {/* <ButtonSubmit mode="reset" text={ labels.close } onClick={ "" } />
                    <ButtonSubmit text={ labels.save } onClick={ "" } /> */}
              </footer>
            </div>
          </article>
        </SectionM>
      );
  }
};

const SectionM = styled.section`
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
