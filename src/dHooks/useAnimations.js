import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn, fadeOutUp, fadeInDown } from "react-animations";
import t from "Theme/helper";

// #region styledComponent
export const TableContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  ${[t.W._100, t.D.Block, t.M.B._3]}
  table {
    ${[t.Table, t.Text.Align.Center, t.Text.Primary._20.Def, t.M.B._0]}
    thead {
      ${t.Bg.Warning._50}
      &.black {
        ${[t.Text.White, t.Bg.Black]}
      }
      tr {
        th {
          ${(props) => (props.bordered ? t.Border.Secondary._70.Def : "")}
        }
      }
    }
    tbody {
      tr {
        background-color: transparent;
        &.request-status {
          &.Waiting {
            border-left: 18px solid #653cad;
          }
          &.Confirmed {
            border-left: 18px solid #4098d7;
          }
          &.Unverified {
            border-left: 18px solid #ffa000;
          }
          &.Completed {
            border-left: 18px solid #3ebd93;
          }
          &.Cancel {
            border-left: 18px solid #d64545;
          }
          &.PartCompleted {
            border-left: 18px solid #102a43;
          }
        }
        td {
          ${(props) => (props.bordered ? t.Border.Secondary._70.Def : "")}
          &.pk {
            ${[t.Font.Bold, t.Text.Success._20.Def]}
          }
          span {
            vertical-align: middle;
            &.request-status {
              ${[t.Font.Bold, t.Rounded.Pill, t.P.X._2, t.P.Y._1]}
              &.Waiting, &.WaitingReSampling {
                ${[t.Text.Purple.Def, t.Bg.Purple._50]}
              }
              &.Confirmed,
              &.WaitForAnswer {
                ${[t.Text.Primary._40, t.Bg.Primary._60._2]}
              }
              &.Unverified,
              &.WaitingSampling {
                ${[t.Text.Warning._60.Def, t.Bg.Warning._60._2]}
              }
              &.Completed,
              &.Answered {
                ${[t.Text.Success._30, t.Bg.Success._60]}
              }
              &.Cancel {
                ${[t.Text.Danger._60.Def, t.Bg.Danger._50.Def]}
              }
              &.PartCompleted {
                ${[t.Text.Teal.Def, t.Bg.Teal.Opacity2]}
              }
              &.UnAnswered {
                ${[t.Text.Secondary.Def, t.Bg.Light.Def]}
              }
            }
            &.priority-status {
              ${[t.Font.Bold, t.Rounded.Pill, t.D.Block, t.P.X._2, t.P.Y._1]}
              &.Low {
                ${[t.Text.Success._20.Def, t.Bg.Success._20.Opacity1]}
              }
              &.Medium {
                ${[t.Text.Warning._70._2, t.Bg.Warning._70.Def]}
              }
              &.High {
                ${[t.Text.Danger._60._2.Def, t.Bg.Danger._60._2.Opacity1]}
              }
              &.Emergency {
                ${[t.Text.White, t.Bg.Danger._60._2.Def]}
              }
            }
          }
          table {
            thead {
              ${t.Bg.Danger._50._2}
            }
          }
          [class*="icon"] {
            &[class*="comment"] {
              ${t.C.Pointer}
            }
          }
          .react-select {
            .react-select__control {
              min-width: 120px !important;
              height: auto;
              min-height: 30px;
              border: 1px solid rgba(112, 112, 112, 0.5) !important;
              ${t.Shadow.None}
              [class*="value-container"] {
                &[class*="has-value"] {
                  [class*="value"] {
                    ${t.Text.Secondary.Def}
                  }
                }
                [class*="placeholder"] {
                  ${t.Text.Secondary.Def}
                }
              }
            }
          }
          .form-group {
            ${[t.P.X._0, t.M.Y._0]}
          }
          .form-control {
            height: 10px;
            ${[
              t.Text.Secondary.Def,
              t.Rounded.Lg.Def,
              t.Border.Secondary._70.Opacity5,
              t.Shadow.None,
              t.P._2,
              t.M.B._0,
            ]}
          }
          .btn {
            ${[
              t.Button,
              t.Btn.Def,
              t.Btn.Custom,
              t.Font.Size.Md,
              t.Font.Bold,
              t.Rounded.Lg.Def,
              t.Transition,
              t.M.X._1,
            ]}
            &.extend {
              ${t.Text.Primary._60.Def}
            }
            &.view,
            &.edit {
              ${t.Text.Primary._70}
            }
            &.print {
              ${t.Text.Teal._10}
            }
            &.reception {
              ${t.Text.Success._10.Def}
            }
            &.delete {
              ${t.Text.Danger._40}
            }
            &-icon {
              ${[
                t.Font.Size.Md,
                t.Text.Teal.Def,
                t.Bg.Transparent,
                t.Rounded.Lg.Def,
                t.Border._0,
              ]}
            }
          }
          .history {
            ${t.Text.Primary._70}
          }
        }
      }
      > tr {
        &:nth-child(odd) {
          ${t.Bg.White}
        }
        &:nth-child(even) {
          ${t.Bg.Light.Opacity5}
        }
      }
    }
  }
`;
// #endregion styledComponent

const fadeAnimation = keyframes`${fadeIn}`;
const fadeOutupAnim = keyframes`${fadeOutUp}`;
const fadeInDownAnim = keyframes`${fadeInDown}`;
export const FadeTr = styled.tr`
  animation: 1s ${fadeAnimation};

  ${(props) => (props.fade ? "opacity: 0;" : "")}
  /* visibility: ${(props) => (props.inAm ? "hidden" : "visible")}; */
  /* transition: all 1s  ;
  *{
    transition: all 1s  ;
  } */
`;
export const FadeOutDiv = styled.div`
  overflow: ${(props) => (props.fade ? "hidden" : "")};
  overflow-y: hidden;
  > div {
    opacity: 1;
    transform: translateX(0);
    transition: all 1s ease 0s;
    ${(props) => (props.fade ? "opacity: 0;" : "")}
    ${(props) => (props.fade ? "transform: translateY(-200px);" : "")}
  }
`;

export const FaderOutBox = styled.div`
  transition: all 1s ease-in-out;
  /* transition-timing-function: linear; */
  overflow: hidden;
  max-height: ${(p) => (p.fade ? `${p.size}px` : "20px")};
`;
export const FadeUp = styled.div`
  /* animation: 1s ${(p) => (p.fade ? fadeInDownAnim : fadeOutupAnim)}; */
  
`;

export function FaderCollapse(props) {
  function onHover() {
    if (props.noHover) return "";
    if (!props.fade) {
      window.scrollBy({
        top: -800,
        left: 0,
        behavior: "smooth",
      });
    }
    props.setFade(true);
  }
  return (
    <div className="mb-3">
      <header className="mb-3">
        <span
          onClick={props.toggle}
          onMouseEnter={onHover}
          className="font-bold"
          style={{ color: "#035388", cursor: "pointer" }}
        >
          {props.title}
          <i className="icon-down-arrow font-weight-bold mb-1"> </i>
        </span>
      </header>
      <FaderOutBox fade={props.fade} size={props.size || 500}>
        {props.children}
        {/* <FadeUp fade={props.fade}></FadeUp> */}
      </FaderOutBox>
    </div>
  );
}
export function useAnimation(init = true) {
  const [fade, setFade] = React.useState(init);

  function toggle() {
    setFade(!fade);
  }
  return [fade, toggle, setFade];
}
// export const FadeOutDiv = styled.div`
//   /* overflow: ${(props) => (props.fade ? "hidden" : "")}; */
//   overflow: hidden;
//   opacity: 1;
//   /* transition: all 1s ease 0s; */
//   transition: max-height 0.15s ease-out;
//   max-height:
//   > div {

//     /* transform: translateX(0); */
//     ${(props) => (props.fade ? "opacity: 0;" : "")}
//     ${(props) => (props.fade ? "transform: translateY(-200px);" : "")}
//   }
// `;
