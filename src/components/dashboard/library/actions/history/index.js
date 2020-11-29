import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Button,
} from "@material-ui/core";
import SingleHistory from "../history/singleHistory";
import { Put, Retrieve, Patch, List } from "DataManager/DataManager";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { setFileSrc } from "app/routes/dashboard/routes/library/apis";

const History = (props) => {
  const { detailId, curFolder } = props;
  const [uploadForm, setUploadForm] = useState({
    title: "",
    is_folder: false,
    parent: "",
    src: "",
    archives: [],
    originalname: "",
    srcFile: {},
  });

  const fileAndArchives = [uploadForm.srcFile, ...uploadForm.archives];

  const getFileOrFolder = async () => {
    try {
      const response = await Retrieve("library", props.editedId);

      setUploadForm({
        ...uploadForm,
        title: response.title,
        parent: response.parent.id,
        src: response.src,
        is_folder: response.is_folder,
        version: response.version || "1.0.0",
        srcFile: response,
      });
    } catch (error) {}
  };

  useEffect(() => {
    getFileOrFolder();
  }, []);

  async function changeVersion() {
    await setFileSrc(detailId, uploadForm.src, uploadForm.version);
    await getFileOrFolder();
  }

  return (
    <>
      <Grid className="mt-4" container>
        <Grid item xs={4} sm={4}>
          <FormControl className="w-100 mb-2">
            <InputLabel>change file</InputLabel>
            <Select
              value={uploadForm.src}
              onChange={(event) => {
                setUploadForm((prev) => ({ ...prev, src: event.target.value }));
              }}
              input={<Input id="ageSimple1" />}
            >
              {fileAndArchives.length > 0
                ? fileAndArchives.map((file, idx) => {
                    return (
                      <MenuItem key={idx} value={file.id}>
                        {file.originalname ? file.originalname : file.id}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl>
            <InputLabel>vesrion</InputLabel>
            <Input
              type="text"
              value={uploadForm.version}
              onChange={(event) => {
                setUploadForm({
                  ...uploadForm,
                  version: event.target.value,
                });
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Button
            onClick={changeVersion}
            variant="contained"
            color="primary"
            className="jr-btn text-white"
          >
            submit
          </Button>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Name</TableCell>
            <TableCell numeric> Version</TableCell>
            <TableCell numeric> Created at</TableCell>
            <TableCell numeric> id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <SingleHistory files={fileAndArchives} />
        </TableBody>
      </Table>
    </>
  );
};

export default History;
