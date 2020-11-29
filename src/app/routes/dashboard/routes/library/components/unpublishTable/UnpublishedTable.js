import React from "react";
import UnpublishedTableCell from "./UnpublishedTableCell";
import { Button } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import ConfirmToast from "components/ConfirmToast";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { publishAll, publishByIds } from "../../slice/libraryThunks";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  publishBtn: {
    position: "absolute",
    top: 16,
    zIndex: "1000",
    right: 26,
  },
});

const UnpublishedTable = (props) => {
  const { items } = props;
  const dispatch = useDispatch();

  // const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  function publish() {
    toast(
      <ConfirmToast
        confirm={confirm}
        message="Are you sure to publish these items?"
      />
    );
  }

  function confirm() {
    // console.log(checked);
    dispatch(publishByIds(checked));
  }

  function publishingAll() {
    toast(
      <ConfirmToast
        confirm={confirmAll}
        message="Are you sure to publish these items?"
      />
    );
  }

  function confirmAll() {
    // console.log(checked);
    dispatch(publishAll());
  }

  const condition = items.length > 0;
  if (!condition) return <div></div>;
  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <Button
        startIcon={<PublishIcon />}
        // className={`mr-1 ${classes.publishBtn}`}
        variant="contained"
        color="primary"
        onClick={publish}
      >
        Publish
      </Button>

      <Button
        startIcon={<PublishIcon />}
        className={`ml-1`}
        outline
        color="primary"
        onClick={publishingAll}
      >
        Publish All
      </Button>

      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card">
            <div className="table-responsive-material">
              <table className="default-table table-unbordered table table-sm table-hover">
                <thead className="th-border-b">
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Extension</th>
                    <th>Owner</th>
                    <th>Version</th>
                    <th>Modified</th>
                    <th></th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    return (
                      <UnpublishedTableCell
                        checked={checked}
                        handleToggle={(value) => {
                          handleToggle(value);
                        }}
                        key={item.id}
                        data={item}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnpublishedTable;
