import React from "react";
import { makeStyles } from "@material-ui/styles";
import ContentCard from "./ContentCard";
import FolderIcon from "assets/images/folder.png";

const useStyles = makeStyles({
  cardRoot: {
  },
});

const FolderComponent = (props) => {
  const classes = useStyles();
  const { folder, current, handleDrawer } = props;
  return (
    <div className={classes.cardRoot}>
      <ContentCard
        type={"folder"}
        content={folder}
        current={current}
        image={FolderIcon}
        title={folder.title || "test"}
        handleDrawer={handleDrawer}
        is_published={folder.is_published}
        subTitle={""}
      />
    </div>
  );
};

export default FolderComponent;
