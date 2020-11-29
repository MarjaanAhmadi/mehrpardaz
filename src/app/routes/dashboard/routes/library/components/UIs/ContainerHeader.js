import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import ToggleButtonComponent from "./ToggleButtonComponent";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import {
  searchContent,
  selNavs,
} from "app/routes/dashboard/routes/library/slice/librarySlice";
import { changeCurFolderByContent } from "app/routes/dashboard/routes/library/slice/libraryThunks";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "util/index";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  item: {
    fontSize: 18,
  },
}));

// const getDisplayString = (sub) => {
//   const arr = sub.split("-");
//   if (arr.length > 1) {
//     return (
//       arr[0].charAt(0).toUpperCase() +
//       arr[0].slice(1) +
//       " " +
//       arr[1].charAt(0).toUpperCase() +
//       arr[1].slice(1)
//     );
//   } else {
//     return sub.charAt(0).toUpperCase() + sub.slice(1);
//   }
// };
// const getUrlString = (path, sub, index) => {
//   if (index === 0) {
//     return "#/";
//   } else {
//     return "#/" + path.split(sub)[0] + sub;
//   }
// };

const ContainerHeader = (props) => {
  const classes = useStyles();
  const navs = useSelector(selNavs);
  const dispatch = useDispatch();
  const l = navs.length;
  const [sorter, setSorter] = useState({
    val: "created_time",
    asc: true,
    type: "sort",
  });

  const [search, setSearch] = useState("");

  const { openModal } = props;

  const handleNav = (content, idx) => () => {
    dispatch(changeCurFolderByContent(content, idx));
  };

  const handleChange = (input) => (e) => {
    setSearch("");
    const { value } = e.target;
    const newSorter = { ...sorter, [input]: value };
    setSorter(newSorter);
    dispatch(searchContent(newSorter));
  };

  function onSearch(payload) {
    dispatch(searchContent(payload));
  }

  const debouncedSearch = useDebounce(onSearch, 500);

  // const debouncedSearch = debounce_(false, 500, onSearch)();

  function handleSearch(e) {
    const { value } = e.target;
    setSearch(value);
    if (!value) dispatch(searchContent({ val: null, type: "all" }));
    if (value.length < 3) return "";
    return debouncedSearch({ ...sorter, type: "search", search: value });
  }

  const handleModal = (type) => () => openModal(type);
  // const path = match.path.substr(1);
  // const subPath = path.split("/");
  return (
    <div className="page-heading  d-sm-flex flex-row justify-content-sm-between">
      <div className=" d-sm-flex flex-column justify-content-sm-between ">
        <h2 className="title mb-3 mb-sm-0">File Manager</h2>

        <Breadcrumb className="mb-0" tag="nav">
          {navs.map((nav, idx) => {
            const active = idx + 1 < l;
            return (
              <BreadcrumbItem
                active={active}
                tag={"a"}
                key={`${nav.id}_bread`}
                onClick={active ? handleNav(nav, idx) : null}
                className={classes.item}
              >
                {nav.title}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div>
          <Button
            onClick={handleModal("folder")}
            className="mr-1"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create
          </Button>
          <Button
            onClick={handleModal("file")}
            className="mr-1"
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </div>
        <div className="d-sm-flex flex-row justify-content-sm-between">
          <FormControl className={`${classes.formControl} mr-3`}>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sorter.val}
              onChange={handleChange("val")}
            >
              <MenuItem value={"title"}>Title</MenuItem>
              <MenuItem value={"created_time"}>Date</MenuItem>
              {/* <MenuItem value={30}>File</MenuItem>
              <MenuItem value={40}>Folder</MenuItem> */}
            </Select>
          </FormControl>
          {/* <FormControl className={`${classes.formControl} mr-3`}>
            <InputLabel id="demo-simple-select-label">Sort by Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sorter.asc}
              onChange={handleChange("asc")}
            >
              <MenuItem value={true}>All</MenuItem>
              <MenuItem value={false}>Deleted</MenuItem>
              <MenuItem value={false}>Deactive</MenuItem>
            </Select>
          </FormControl>
           */}
          <FormControl className={`${classes.formControl} mr-3`}>
            <InputLabel id="demo-simple-select-label">
              Sort by Alphabet
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sorter.asc}
              onChange={handleChange("asc")}
            >
              <MenuItem value={true}>Ascending</MenuItem>
              <MenuItem value={false}>Descending</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            className={`${classes.formControl} mr-3`}
            noValidate
            autoComplete="off"
          >
            <TextField label="Search" value={search} onChange={handleSearch} />
          </FormControl>

          <div className="d-flex align-self-end mr-1">
            <ToggleButtonComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerHeader;
