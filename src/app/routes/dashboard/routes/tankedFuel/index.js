import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import TankedFuelTable from "components/dashboard/tankedFuel/TankedFuelTable";
import IntlMessages from "util/IntlMessages";
import { List } from "DataManager/DataManager";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateOrEdit from "components/dashboard/tankedFuel/actions/CreateOrEdit";
import Button from "@material-ui/core/Button";
import DetailsComp from "components/dashboard/tankedFuel/actions/DetailsComp";
import LatestNotifications from "components/dashboard/Common/LatestNotifications";
import Downloader from '../library/components/Downloader';
const TankedFuels = ({ match }) => {
  const file = {
    "path":[],
    "is_folder":false,
    "users":[],
    "archives":[],
    "is_deleted":false,
    "is_published":false,
    "title":"file test",
    "type":"library",
    "created_by":
    {"role":"user",
    "is_deleted":false,
    "username":"h.abkar",
    "email":"hamed.abkar@gmail.com",
    "created_by":"5eef3b5feac5462215810ef5",
    "created_time":"2020-09-05T18:54:50.099Z",
    "updated_time":"2020-09-06T10:06:18.087Z",
    "id":"5f53defadf46e24ce3e41f2b"},
    "created_time":"2020-10-24T19:11:15.194Z",
    "updated_time":"2020-10-24T19:11:15.194Z",
    "id":"5f947c530bd56a27ad1671d9"
}
  return(
    <Downloader fileId={file.id} fileName={file.filename} fileExtension={file.extension}>
                    <img
                      src={require("assets/images/file.png")}
                      title="folder"
                      alt="folder"
                    />
                    <span>{file.filename}</span>
                  </Downloader>
  )
};
export default TankedFuels;
