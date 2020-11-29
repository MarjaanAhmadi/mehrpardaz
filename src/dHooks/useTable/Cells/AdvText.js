import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Modal, { useModal } from "hooks/useDmodal";
import { ButtonAdd, ButtonSubmit } from "../../../components/Buttons";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLoadingDispatch } from "Contexts/LoadingContext";
import useMasterApi from "hooks/useMasterApi";

const AdvText = React.memo((props) => {
  const { setLoading } = useLoadingDispatch();
  const MasterApi = useMasterApi();
  const { richLongAnswer, callback, link, result } = props;
  const { isShowing, toggle } = useModal();
  const [state, setState] = useState({
    richLongAnswer: richLongAnswer,
    advanceText: false,
  });
  async function handleOnInit(editor) {
    if (!link) return "";
    if (result)
      return setState((prev) => ({ ...prev, richLongAnswer: result }));
    setLoading(true);
    const res = await MasterApi("GET", link);
    if (res.data) setState((prev) => ({ ...prev, richLongAnswer: res.data }));
    setLoading(false);
  }
  function handleOnChangeEditor(event, editor) {
    const richLongAnswer = editor.getData();
    setState((prev) => ({ ...prev, richLongAnswer: richLongAnswer }));
  }
  function handleSave() {
    callback(state.richLongAnswer);
    toggle();
  }
  return (
    <article className="tab-pane">
      <ButtonAdd
        mode="primary"
        icon="icon-write"
        text="Add Editor"
        onClick={toggle}
      />
      <Modal
        modalTitle="Advance Text"
        size="lg"
        className="modal"
        isShowing={isShowing}
        toggle={toggle}
      >
        <section className="modal-body">
          <Grid container className="my-3">
            <Grid item xs={12} className="form-group">
              <CKEditor
                editor={ClassicEditor}
                data={state.richLongAnswer}
                onInit={handleOnInit}
                onChange={handleOnChangeEditor}
              />
            </Grid>
          </Grid>
        </section>
        <footer className="modal-footer">
          <ButtonSubmit mode="reset" text="close" onClick={toggle} />
          <ButtonSubmit text="save" onClick={handleSave} />
        </footer>
      </Modal>
    </article>
  );
});

export default AdvText;
