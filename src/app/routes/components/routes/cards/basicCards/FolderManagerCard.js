import React, { useState, useEffect } from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { Divider, Input } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EditInput from "app/routes/dashboard/routes/library/components/UIs/EditInput.";
import CardMenu from "components/dashboard/Common/CardMenu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  more: {
    position: "absolute",
    right: 16,
  },
  image: {
    display: "flex",
    width: 60,
    alignSelf: "center",
    margin: "8px 8px 0",
  },
  divider: {
    marginBottom: 22,
  },
  title: {
    color: "#364a63",
    textAlign: "center",
  },
  icon: {
    marginLeft: 4,
    color: "#364a63",
  },
  unpublish: {
    backgroundColor: "#d5d5d5"
  },
});
const FolderManagerCard = ({ image, title, subTitle, handleDrawer }) => {
  const is_publish = true; //get from file is_publiash attribute
  const classes = useStyles();
  const [inputStatus, setInputStatus] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const HandleInputStatus = () => {
    setInputStatus(!inputStatus);
  };
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onOptionMenuSelect = () => {
    handleDrawer(true);
  };

  useEffect(() => {
    setName(title);
  }, []);

  return (
    <Card className={`shadow ${is_publish ? "border-0" : classes.unpublish}`}>
      <IconButton className={classes.more} onClick={onOptionMenuSelect}>
        <i className="zmdi zmdi-eye" />
      </IconButton>
      <CardImg
        className={classes.image}
        top
        src={image}
        width="50px"
        alt="Card image cap"
      />
      <CardBody>
        <div className="d-flex justify-content-center">
          {!inputStatus ? (
            <h3 className={`card-title ${classes.title}`}>{name}</h3>
          ) : (
            <EditInput onChange={handleChange} value={name} />
          )}
          <EditIcon
            size="small"
            onClick={HandleInputStatus}
            className={classes.icon}
          />
        </div>

        <Divider className={classes.divider} />
        <CardSubtitle>{subTitle}</CardSubtitle>
      </CardBody>
    </Card>
  );
};
export default FolderManagerCard;
