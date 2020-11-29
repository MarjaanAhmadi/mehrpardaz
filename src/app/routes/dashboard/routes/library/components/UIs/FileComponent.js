import React from "react";
import { makeStyles } from "@material-ui/styles";
import ContentCard from "./ContentCard";
import FileIcon from "assets/images/file.png";

const useStyles = makeStyles({
  cardRoot: {},
});

const FileComponent = (props) => {
  const classes = useStyles();
  const { file, current, handleDrawer } = props;
  return (
    <div className={classes.cardRoot}>
      <ContentCard
        type={"file"}
        content={file}
        current={current}
        image={FileIcon}
        title={file.title || "test"}
        handleDrawer={handleDrawer}
        is_published={file.is_published}
        subTitle={""}
      />
    </div>
  );
};

export default FileComponent;
