import React from "react";
import { createPortal } from "react-dom";

export default function UploaderBox(props) {
  return (
    <>
      <Modal isShowing={true}>
        <h1>saeed</h1>
      </Modal>
    </>
  );
}

const ModalWrapper = (props) => {
  const { type } = props;

  switch (type) {
    default:
      return (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            zIndex: 200000,
            width: "400px",
            height: "50px",
            backgroundColor: "gray",
          }}
        >
          <h1>saeed</h1>
        </div>
      );
  }
};

const modalRoot = document.getElementById("d_portal_wrapper");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
export const Modal = ({ isShowing, toggle, ...props }) => {
  const el = document.createElement("div");

  React.useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return isShowing
    ? createPortal(
        <>
          <ModalWrapper toggle={toggle} {...props} />
        </>,
        el
      )
    : null;
};

export const useDUploader = (props) => {
  function caller(params) {}

  return caller;
};
