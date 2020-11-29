import React from "react";
import VersionCard from "./VersionCard";
import { Row } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    width: '100%'
  },
});
const VersionSection = (props) => {
  const { content, current } = props;
  const { archives } = content;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Row>
        {
          archives.length > 0 ? 
            archives.map((archive, idx) => {
              return (
                <VersionCard
                  content={content}
                  archive={archive}
                  key={archive.id}
                  current={current}
                />
              );
            })
          : false
        }
      </Row>
    </div>
  );
};
export default VersionSection;
