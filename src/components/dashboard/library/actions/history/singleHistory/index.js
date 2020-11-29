import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
const SingleHistory = (props) => {
  const { files } = props;

  return (
    <>
      {files.map((file) => {
        if (typeof file === "object") {
          const { version, created_at, id, originalname } = file;
          return (
            <TableRow>
              <TableCell>{originalname}</TableCell>
              <TableCell numeric>{version}</TableCell>
              <TableCell numeric>{created_at}</TableCell>
              <TableCell numeric>{id}</TableCell>
            </TableRow>
          );
        } else {
          return (
            <TableRow>
              <TableCell>no name</TableCell>
              <TableCell numeric>no </TableCell>
              <TableCell numeric>no created_at</TableCell>
              <TableCell numeric>{file}</TableCell>
            </TableRow>
          );
        }
      })}
    </>
  );
};
export default SingleHistory;
