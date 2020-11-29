import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ButtonSubmit } from "components/Buttons";
import Modal, { useModal } from "hooks/useDmodal";

export default function Result(props) {
  const { value, onChange } = props;
  const { isShowing, toggle } = useModal();
  const [boxVal, setBoxVal] = useState(value || "");
  function handleEditRow(e) {
    e.persist();
    const value = e.target.value;
    setBoxVal(value);
  }
  function onFinish() {
    toggle();
    onChange(boxVal);
  }
  return (
    <>
      <button type="button" onClick={toggle} className="btn-icon">
        <i className="icon-comment"> </i>
      </button>
      <Modal
        modalTitle="Add Comment"
        size="xl"
        theme="secondary"
        className="modal"
        isShowing={isShowing}
        toggle={toggle}
      >
        <section className="modal-body">
          <Grid container className="my-3">
            <Grid item xs={12} className="form-group">
              <label className="form-label"> Comment </label>
              <textarea
                rows="4"
                value={boxVal}
                onChange={handleEditRow}
                className="form-control"
              >
                {" "}
              </textarea>
            </Grid>
          </Grid>
        </section>
        <footer className="modal-footer">
          <ButtonSubmit
            type="submit"
            mode="secondary"
            text="Insert"
            onClick={onFinish}
          />
        </footer>
      </Modal>
    </>
  );
}

// {id: 10249, receptionServiceId: 49, testCode: null, testTitle: "CD19 cells/100 cells in Unspecified specimen", oldAnswer: null, …}
// comment: null
// formula: null
// groupAnswerId: null
// id: 10249
// isNumeric: false
// normalRange: null
// oldAnswer: null
// per1: null
// per2: null
// per3: null
// readyAnswerId: null
// readyAnswers: []
// receptionServiceId: 49
// result: "okey"
// testAnswerTypeId: null
// testCode: null
// testId: 8818
// testTitle: "CD19 cells/100 cells in Unspecified specimen"
// unit: null
// __proto__: Object
