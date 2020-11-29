import { Card, CardBody, Col, CardText, Button } from "reactstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { setFromArchive } from "../../../slice/libraryThunks";
import Downloader from "../../Downloader";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import filteringTime from "../../../filteringExtension/filteringTime";
import iconSelector from "../../icons/iconSelctor";
import getDateFns from "util/getDateFn";
const useStyles = makeStyles({
  cardRoot: {
    fontSize: 12,
    padding: "0 !important",
  },
  txt: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    padding: 4,
  },
  image: {
    width: 40,
    display: "flex",
    alignSelf: "center",
  },
});
const VersionCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { content, current, archive = {} } = props;
  const { src } = archive;

  function handleAddFromArchive() {
    dispatch(setFromArchive(content, current, archive));
  }

  return (
    <React.Fragment>
      <Col xs="6">
        <Card>
          <CardBody
            className={`d-flex justify-content-center flex-column ${classes.cardRoot}`}
          >
            <img
              className={classes.image}
              src={iconSelector(content.src.mimetype)}
              alt={`iconForhistory`}
            />
            <CardText className={classes.txt}>
              <div>
                Name:
                {src && src.filename
                  ? src.filename.length > 8
                    ? `${src.filename.substring(0, 8)},...`
                    : src.filename
                  : "-"}
              </div>
              <div>Version: {archive.version}</div>
              <div>
                {
                  getDateFns("diffFromToday")(archive.created_time)
                  // filteringTime(
                  //   moment(archive.created_time)
                  //     .locale("ir")
                  //     .startOf("days")
                  //     .fromNow()
                  // )
                }
              </div>
            </CardText>
            <Downloader
              fileId={archive.src && archive.src.id}
              fileName={archive.src.filename}
              fileExtension={archive.src.mimtype}
            >
              <Button color="primary"> Download </Button>
            </Downloader>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};
export default VersionCard;
