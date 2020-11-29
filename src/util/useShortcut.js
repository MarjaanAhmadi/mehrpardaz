import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function ShortcutWrapper(props) {
  const { callbacks, tabIndex, others } = props;

  function onKeyPressed(e) {
    callbacks[e.keyCode] && callbacks[e.keyCode](e, others);
  }

  return (
    <div tabIndex={tabIndex} onKeyDown={onKeyPressed}>
      {props.children}
    </div>
  );
}

ShortcutWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export function ListenerShortcut(props) {
  const { callbacks, tabIndex, others } = props;

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    return () => {
      document.removeEventListener("keydown", onKeyPressed);
    };
  });

  function onKeyPressed(e) {
    callbacks[e.keyCode] && callbacks[e.keyCode](e, others);
  }

  return (
    <div tabIndex={tabIndex} onKeyDown={onKeyPressed}>
      {props.children}
    </div>
  );
}
