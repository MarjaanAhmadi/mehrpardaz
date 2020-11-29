import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ButtonSubmit } from "components/Buttons";
import Modal, { useModal } from "hooks/useDmodal";

export default function CommentModal(props) {
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
