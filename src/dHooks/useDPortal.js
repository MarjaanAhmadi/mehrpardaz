import React from "react";
import { createPortal } from "react-dom";

import styled from "styled-components";
import t from "Theme/helper";
import OutSideCallBack, { OutsideScroll } from "utils/OutsideCallback";

const SelectWrapper2 = styled.div`
  position:fixed;
  z-index: ${(p) => p.zIndex};
  top: ${(props) => `${props.rect.top + props.rect.height}px`};
  left: ${(props) => `${props.rect.left + 1}px`};
  /* right: ${(props) => `${props.rect.right - props.rect.width}px`}; */
  width: ${(props) => `${props.rect.width}px`};
`;

function getOffsetLeft(elem) {
  let offsetLeft = 0;
  do {
    if (!isNaN(elem.offsetLeft)) {
      offsetLeft += elem.offsetLeft;
    }
  } while ((elem = elem.offsetParent));
  return offsetLeft;
}

function getOffsetTop(elem) {
  let offsetTop = 0;
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while ((elem = elem.offsetParent));
  return offsetTop;
}

function getOffsetRight(el) {
  const offsetRight =
    window.innerWidth - (el.getBoundingClientRect().left + el.offsetWidth);
  return offsetRight;
}

const SelectWrapper = styled.div`
  position: absolute;
  left: ${(p) => `${p.out.offsetX}px`};
  top: ${(p) => `${p.out.offsetY + p.out.height}px`};
  right: ${(p) => `${Number(p.out.offsetR - 2)}px`};
`;

export default React.memo((props) => {
  const {
    offsets = { offsetX: 0, offsetY: 0, width: 0, height: 0 },
    toggle,
  } = props;

  return createPortal(
    <>
      <SelectWrapper out={offsets}>
        <OutSideCallBack Listener={"click"} callback={toggle}>
          {props.children}
        </OutSideCallBack>
      </SelectWrapper>
    </>,
    document.getElementById("d_portal_wrapper")
  );
});

export function useDportal(ref) {
  const getOffSets = (el) => {
    return {
      offsetX: getOffsetLeft(el),
      offsetY: getOffsetTop(el),
      offsetR: getOffsetRight(el),
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
  };
  return { getOffSets };
}

export const getOffSets = (el) => {
  return {
    offsetX: getOffsetLeft(el),
    offsetY: getOffsetTop(el),
    offsetR: getOffsetRight(el),
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};

const ScrollPORTAL = React.memo((props) => {
  const { rect, fixed, zIndex, toggle, toggleScorll, noScroll = false } = props;

  return createPortal(
    <>
      <SelectWrapper2 fixed={fixed} rect={rect} zIndex={zIndex}>
        {/* <SelectWrapper out={offsets}> */}
        <OutSideCallBack Listener="click" callback={toggle}>
          {noScroll ? (
            <OutsideScroll Listener="scroll" callback={toggleScorll}>
              {props.children}
            </OutsideScroll>
          ) : (
            props.children
          )}
        </OutSideCallBack>
        {/* </SelectWrapper> */}
      </SelectWrapper2>
    </>,
    document.getElementById("d_select_wrapper")
  );
});

export { ScrollPORTAL };
