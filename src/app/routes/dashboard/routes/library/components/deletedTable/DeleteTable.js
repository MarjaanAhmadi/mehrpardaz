import React from "react";
import DeletedTable from "./DeletedTable";

export default function DeleteTable(props) {
  const { items, handleDrawer } = props;
  return <DeletedTable items={items} handleDrawer={handleDrawer} />;
}
