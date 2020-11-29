import React from "react";
import UnpublishedTable from "./UnpublishedTable";
import { useSelector } from "react-redux";
import { selUnpublished } from "../../slice/librarySlice";

export default function UnpublshTable(props) {
  const unPublishedContents = useSelector(selUnpublished);
  return <UnpublishedTable items={unPublishedContents} />;
}
