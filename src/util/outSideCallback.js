import React, { useRef, useEffect } from "react";

export default function OutsideCallback(props) {
  const { callback, Listener = "mousedown" } = props;
  const wrapperRef = useRef(null);
  OutSideClickHandler(wrapperRef, Listener, callback);
  return <div ref={wrapperRef}>{props.children}</div>;
}

function OutSideClickHandler(ref, Listener, callback) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback && callback();
    }
  }

  useEffect(() => {
    document.addEventListener(Listener, handleClickOutside);
    return () => {
      document.removeEventListener(Listener, handleClickOutside);
    };
  });
}

export function OutsideScroll(props) {
  const { callback, Listener } = props;
  const wrapperRef = useRef(null);
  OutsideScrollHandler(wrapperRef, Listener, callback);
  return <div ref={wrapperRef}>{props.children}</div>;
}

function OutsideScrollHandler(ref, Listener, callback) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback && callback();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleClickOutside, true);
    return () => {
      window.removeEventListener("scroll", handleClickOutside);
    };
  });
}
