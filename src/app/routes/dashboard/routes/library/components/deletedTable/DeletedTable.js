import React from "react";
import { useDispatch } from "react-redux";
import DeletedTableCell from "./DeletedTableCell";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const DeletedTable = (props) => {
  const { items, handleDrawer } = props;

  const { current, deleted } = items;
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Deleted Items</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.root}>
          <div className="dashboard animated slideInUpTiny animation-duration-3">
            <div className="row">
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
                        {deleted.map((item) => {
                          return (
                            <DeletedTableCell
                              data={item}
                              handleDrawer={handleDrawer}
                              current={current}
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
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
export default DeletedTable;
