import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";

const root = {
  padding: 8,
};
const thumb = {
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Tumbs(props) {
  // const [title, setTitle] = useState("");
  const { onTitleChange, title, file, freeze } = props;

  function handleChange(e) {
    const { value } = e.target;
    onTitleChange(value);
    // setTitle(value);
  }

  useEffect(() => {
    !freeze && onTitleChange(file.name);
  }, []);

  return (
    <div style={root}>
      <div style={thumb}>
        <div style={thumbInner}>
          <img alt={file.name} src={file.preview} style={img} />
        </div>
      </div>
      size:{file.size}
      {!freeze && (
        <div>
          <TextField
            readOnly
            onChange={handleChange}
            value={title.length > 16 ? `${title.substring(0, 15)},...` : title}
          />
        </div>
      )}
    </div>
  );
}

export default Tumbs;
