import React from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import styled, { css } from "styled-components";
import t from "../Theme/helper";
import OutSideCallBack, { OutsideScroll } from "utils/OutsideCallback";
import { Input as MaterialInput, Grid } from "@material-ui/core";
// import { Input as MaterialInput, Grid } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { useToggle } from "hooks";

// #region styledComps
const Input = styled(MaterialInput)`
  ${t.W._100}
  &:before, &:after {
    ${t.D.None}
  }
  + .tree-value {
    z-index: 1;
    ${[
      t.Text.Lg,
      t.Text.Align.Justify,
      t.Text.Teal.Def,
      t.Bg.White,
      t.C.Pointer,
      t.W._75,
      t.Position.Absolute,
      t.M.X._2,
    ]}
    ~ i[class*='close'] {
      right: 15px;
      ${t.Font.Size.Xs}
    }
    ~ i[class*="arrow"] {
      right: 0;
      ${t.Font.Size.Md}
    }
    ~ i[class*="close"],
    ~ i[class*="arrow"] {
      ${[
        t.Align.Items.Center,
        t.Justify.Self.End,
        t.Text.Teal.Def,
        t.Rounded.Lg.Def,
        t.C.Pointer,
        t.H._100,
        t.Position.Absolute,
        t.D.Flex,
        t.Transition,
        t.P.X._2,
        t.M.X._0,
      ]}
    }
  }
  input {
    ${[t.Bg.White, t.Rounded.Lg.Def, t.C.Pointer, t.W._100, t.P._2, t.M.B._0]}
    ${(props) =>
      props.mix
        ? css`
            height: 20px;
            ${t.Border.Teal.Opacity5}
          `
        : css`
            height: 22px;
            ${[t.Border._0, t.Shadow.Sm]}
          `}
  }
`;
const SelectWrapper = styled.div`
  position: absolute;
  top: ${(props) => `${props.out.offsetY + props.out.height}px`};
  right: ${(props) => `${Number(props.out.offsetR + 2)}px`};
  left: ${(props) => `${props.out.offsetX + 1}px`};
`;
const DropDownTreeBox = styled.div`
  z-index: 100;
  top: 100%;
  /* right: 0;
  left: 0; */
  ${[
    t.Font.Size.Md,
    t.Bg.White,
    t.Rounded.Lg.Def,
    t.Border._0,
    t.Shadow.Sm,
    t.Position.Absolute,
    t.W._100,
    t.P.X._2,
    t.P.Y._0,
    t.M.Y._2,
  ]}
  .icon-search {
    ${[
      t.Font.Size.Md,
      t.Align.Items.Center,
      t.Justify.Self.End,
      t.Text.Teal.Def,
      t.Bg.White,
      t.Rounded.Lg.Def,
      t.H._75,
      t.Position.Absolute,
      t.D.Flex,
      t.P.X._2,
      t.M.X._0,
    ]}
  }
  input {
    height: 35px;
    border: 0;
    border-bottom: 1px solid #86939f !important;
    ${[t.Text.Teal.Def, t.Shadow.None, t.P._2, t.M.B._0]}
  }
  ul {
    max-height: 400px;
    overflow: auto;
    ${t.ListGroup.Def}
    li {
      ${[t.ListGroup.Item, t.Bg.Transparent, t.Border._0, t.P.X._0, t.P.Y._1]}
      div {
        ${[
          t.Align.Items.Center,
          t.Rounded.Lg.Def,
          t.C.Pointer,
          t.D.Flex,
          t.Transition,
          t.P._1,
        ]}
        &:hover {
          ${[t.Text.Success._10.Def, t.Bg.Success._10.Opacity1]}
        }
        [class*="icon-plus"] {
          font-size: 0.55rem !important;
          padding: 0.15rem 0.3rem;
          margin: 0 0.3rem 0 0;
          ${[t.Text.Teal.Def, t.Bg.White, t.Rounded.Lg.Def, t.Shadow.Sm]}
          &.open {
            padding: 0.15rem 0.35rem;
            &:before {
              content: "\\e814";
            }
          }
        }
        span {
          ${t.W.Auto}
        }
      }
      ul {
        padding-left: 1.25rem;
        margin-left: 0.5rem;
      }
    }
  }
  > ul {
    /* overflow: hidden; */
    ${[t.Text.Teal._10, t.M.Y._1]}
    > li {
      > div {
        span {
          ${t.Font.Bold}
        }
      }
    }
  }
`;
const BoxLabel = styled.label`
  ${[t.Font.Size.Md, t.Font.Bold, t.Text.Teal.Def, t.M.B._1]}
`;

const SelectWrapper2 = styled.div`
  position:fixed;
  z-index: ${(p) => p.zIndex};
  top: ${(props) => `${props.rect.top + props.rect.height}px`};
  left: ${(props) => `${props.rect.left + 1}px`};
  /* right: ${(props) => `${props.rect.right - props.rect.width}px`}; */
  width: ${(props) => `${props.rect.width}px`};
`;
// #endregion styledComps

// #region methods
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
const getOffSets = (el) => {
  return {
    offsetX: getOffsetLeft(el),
    offsetY: getOffsetTop(el),
    offsetR: getOffsetRight(el),
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};
const isSearched = (searchTerm) => {
  return function (item) {
    return item.label.toLowerCase().includes(searchTerm.toLowerCase());
  };
};
// #endregion styledComps
export default function DSelect(props) {
  const { onChange, name, value, options, readOnly, ...other } = props;
  const [open, toggleOpen, setOpen] = useToggle(false);
  const me = React.useRef(null);
  const [items, setItems] = useState(options);
  const [item, setItem] = useState(
    items.find((it) => Number(it.id) === Number(value)) || {
      id: 0,
      label: "Choose ...",
    }
  );
  function handleEmpty() {
    setItems(options);
    setItem({ id: 0, label: "Choose ..." });
    setOpen(false);
    // onChange({ ...item, name: null });
    onChange(name, 0);
  }
  const [cur, setCur] = useState(null);
  function onOpen() {
    setCur(me.current);
    setItems(options);
    toggleOpen();
    // setOpen(true);
  }

  function search(e) {
    console.log(e.target.value.length);
    if (e.target.value.length > 2) {
      // onSearch(e);
      // !showAll && setShowAll(true);
    }
    if (!e.target.value) {
      // setShowAll(false);
      // onSearch(null);
    }
  }
  const onOPtionClick = (item) => () => {
    setItem(item);
    toggleOpen();
    onChange({ ...item, name: props.name || null });
  };
  return (
    <FormControl id={65646464654654} ref={me} style={{ width: "100%" }}>
      <div className={"align-items-center d-flex" + (open ? " open" : "")}>
        <Input name={name} autoComplete="off" onClick={onOpen} />
        <span className="tree-value" onClick={onOpen}>
          {" "}
          {item.label}{" "}
        </span>
        <i className="icon-close" onClick={handleEmpty}>
          {" "}
        </i>
        <i className="icon-down-arrow" onClick={onOpen}>
          {" "}
        </i>
      </div>
      {open && (
        <PORTAL offsets={getOffSets(cur)} toggle={toggleOpen}>
          <DropDownTreeBox>
            <ul>
              {items.map((item) => {
                const { id, label } = item;
                return (
                  <li key={`childTree_${id}`} onClick={onOPtionClick(item)}>
                    <div>
                      <span id={id} key={id}>
                        {label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </DropDownTreeBox>
        </PORTAL>
      )}
    </FormControl>
  );
}
const PORTAL = React.memo((props) => {
  const {
    offsets = { offsetX: 0, offsetY: 0, width: 0, height: 0 },
    toggle,
  } = props;
  return createPortal(
    <>
      <SelectWrapper out={offsets}>
        <OutSideCallBack Listener="click" callback={toggle}>
          {props.children}
        </OutSideCallBack>
      </SelectWrapper>
    </>,
    document.getElementById("d_select_wrapper")
  );
});

export function DSelectBox(props) {
  const {
    onChange,
    label,
    name,
    value,
    options,
    readOnly,
    size,
    ...other
  } = props;

  const [open, toggleOpen, setOpen] = useToggle(false);
  const me = React.useRef(null);
  const [items, setItems] = useState(options);
  const [item, setItem] = useState(
    items.find((it) => Number(it.id) === Number(value)) || {
      id: 0,
      label: "Choose ...",
    }
  );

  function handleEmpty() {
    setItems(options);
    setItem({ id: 0, label: "Choose ..." });
    // toggleOpen();
    onChange(name, 0);
    setOpen(false);
  }

  const [cur, setCur] = useState(null);
  function onOpen() {
    setCur(me.current);
    setItems(options);
    toggleOpen();
    // setOpen(true);
  }

  function search(e) {
    console.log(e.target.value.length);
    if (e.target.value.length > 2) {
      // onSearch(e);
      // !showAll && setShowAll(true);
    }
    if (!e.target.value) {
      // setShowAll(false);
      // onSearch(null);
    }
  }

  const onOPtionClick = (item) => () => {
    setItem(item);
    toggleOpen();
    onChange(name, item.id);
  };

  const labelId = `${name}-labelId`;
  const intSize = size ? Number(size) : 3;
  const classNameBox = `form-group position-relative ${
    props.mix ? "mix px-0 mb-0" : "my-2"
  }${props.pr ? " pr-3" : ""} ${props.px ? " px-3" : ""}`;
  return (
    <Grid item xs={intSize} className={classNameBox}>
      <BoxLabel htmlFor={labelId}> {label} </BoxLabel>
      <FormControl id={65646464654654} ref={me} style={{ width: "100%" }}>
        <div className={"align-items-center d-flex" + (open ? " open" : "")}>
          <Input name={name} autoComplete="off" onClick={onOpen} />
          <span className="tree-value" onClick={onOpen}>
            {item.label || item.title}
          </span>
          <i className="icon-close" onClick={handleEmpty}></i>
          <i className="icon-down-arrow" onClick={onOpen}>
            {" "}
          </i>
        </div>
        {open && (
          <PORTAL offsets={getOffSets(cur)} toggle={toggleOpen}>
            <DropDownTreeBox>
              <ul>
                {items.map((item) => {
                  const { id, label } = item;
                  return (
                    <li key={`childTree_${id}`} onClick={onOPtionClick(item)}>
                      <div>
                        <span id={id} key={id}>
                          {label || item.title}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </DropDownTreeBox>
          </PORTAL>
        )}
      </FormControl>
    </Grid>
  );
}

export function DScrollSelect(props) {
  const {
    onChange,
    name,
    value,
    options,
    readOnly,
    style,
    zIndex,
    noScroll,
    fixed,
    ...other
  } = props;

  const me = React.useRef(null);
  const [open, toggleOpen, setOpen] = useToggle(false);
  const [items, setItems] = useState(options);
  const [item, setItem] = useState(
    items.find((it) => Number(it.id) === Number(value)) || {
      id: 0,
      label: "Choose ...",
    }
  );
  function handleEmpty() {
    setItems(options);
    setItem({ id: 0, label: "Choose ..." });
    setOpen(false);
    // onChange({ ...item, name: null });
    onChange(name, 0);
  }

  function onOpen() {
    setItems(options);
    setRect(me.current.getBoundingClientRect());
    toggleOpen();
  }

  const onOPtionClick = (item) => () => {
    setItem(item);
    toggleOpen();
    onChange({ ...item, name: props.name || null });
  };
  // React.useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, [input]);
  function toggleScorll() {
    setOpen(false);
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [rect, setRect] = useState({});

  function handleScroll() {
    // setOpen(false);
    // console.log(me.current, "cur");
    // console.log(me.current.getBoundingClientRect(), "cur rect");
    me.current && setRect(me.current.getBoundingClientRect());
  }

  return (
    <FormControl id={65646464654654} ref={me} style={{ width: "100%" }}>
      <div className={"align-items-center d-flex" + (open ? " open" : "")}>
        <Input name={name} autoComplete="off" onClick={onOpen} />
        <span className="tree-value" onClick={onOpen}>
          {item.label}
        </span>
        <i className="icon-close" onClick={handleEmpty}></i>
        <i className="icon-down-arrow" onClick={onOpen}></i>
      </div>
      {open && (
        <ScrollPORTAL
          toggle={toggleOpen}
          toggleScorll={toggleScorll}
          zIndex={zIndex}
          rect={rect}
          noScroll={noScroll}
          fixed={fixed}
        >
          <DropDownTreeBox style={style}>
            <ul>
              {items.map((item) => {
                const { id, label } = item;
                return (
                  <li
                    key={`childTree_${Math.random()}_${id}`}
                    onClick={onOPtionClick(item)}
                  >
                    <div>
                      <span id={id} key={id}>
                        {label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </DropDownTreeBox>
        </ScrollPORTAL>
      )}
    </FormControl>
  );
}

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
