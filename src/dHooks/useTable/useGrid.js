import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import { TableContainer } from "./styled";
import styled, { keyframes } from "styled-components";
import { fadeIn, fadeOut, slideInUp, fadeOutDown } from "react-animations";

const slideInUpAnim = keyframes`${fadeOutDown}`;

const FadeOutDiv = styled.div`
  /* overflow: ${(p) => (p.fade ? "hidden" : "auto")}; */
  /* opacity: ${(p) => (p.fade ? "0" : "1")}; */
  /* visibility: ${(p) => (p.fade ? "hidden" : "visible")}; */
  /* height: ${(p) => (p.fade ? "0" : "auto")}; */
  /* * {
    transition: all 1s;
  } */
  overflow:${(p) => (p.fade ? "hidden" : "")} ;
  overflow-y: hidden;
  > div {
    opacity: 1;
    transform: translateX(0);
    transition: all 1s ease 0s;
    ${(p) => (p.fade ? "opacity: 0; " : "")}
    ${(p) => (p.fade ? "transform: translateY(-200px);" : "")}
  }
`;

export function useGrid() {}

export default function TableBox(props) {
  const {
    header = {
      types: {},
      names: [
        { isHide: false, title: "id" },
        {
          isHide: false,
          title: "name",
        },
      ],
    },
    withIndex = true,
    withAction = false,
    withClose = false,
    onPageSelcet = (page) => null,
    pagination = { cur: 1, all: null },
  } = props;

  const [show, setShow] = useState(true);
  function toggleShow() {
    setShow(!show);
  }

  const gridHeader = withIndex
    ? [{ isHide: false, title: "#" }, ...header.names]
    : header.names;

  function onClickPage(e, page) {
    onPageSelcet(page);
  }

  return (
    <>
      {withClose && <button onClick={toggleShow}>show</button>}
      {/* <SlideDiv> */}
      <FadeOutDiv fade={!show}>
        <TableContainer>
          <table>
            <thead>
              <tr>
                {gridHeader &&
                  gridHeader.map((item, index) => {
                    let isHide = item.invisible;
                    return isHide ? null : (
                      <th key={`${item.name}_header_${index}`}>{item.title}</th>
                    );
                  })}
                {withAction && <th>actions</th>}
              </tr>
            </thead>
            {props.children}
          </table>
        </TableContainer>

        {pagination.all && (
          <div className="align-items-center justify-content-center d-flex my-2">
            <Pagination
              count={pagination.all}
              shape="rounded"
              color="primary"
              onChange={onClickPage}
              {...pagination}
            />
          </div>
        )}
      </FadeOutDiv>
      {/* </SlideDiv> */}
    </>
  );
}
