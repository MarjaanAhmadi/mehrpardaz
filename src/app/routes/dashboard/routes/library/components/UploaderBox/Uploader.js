// These two containers are siblings in the DOM
import React, { useState } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("d_portal_wrapper");

// Let's create a Modal component that is an abstraction around
// the portal API.
// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.el = document.createElement("div");
//   }

//   componentDidMount() {
//     modalRoot.appendChild(this.el);
//   }

//   componentWillUnmount() {
//     // Remove the element from the DOM when we unmount
//     modalRoot.removeChild(this.el);
//   }

//   render() {
//     // Use a portal to render the children into the element
//     return ReactDOM.createPortal(
//       // Any valid React child: JSX, strings, arrays, etc.
//       this.props.children,
//       // A DOM element
//       this.el
//     );
//   }
// }

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el
    );
  }
}

function App() {
  const modal = true ? (
    <Modal>
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
    </Modal>
  ) : null;

  return <>{modal}</>;
}

export function useDUploader() {
  const [number, setNumber] = useState(1);
  function setUpload() {
    console.log(number);
    setNumber((prev) => prev + 1);
    return <App size={number} />;
  }

  return setUpload;
}

export default App;
