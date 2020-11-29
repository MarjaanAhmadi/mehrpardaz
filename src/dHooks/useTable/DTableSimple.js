import React, { useState } from "react";
import styled from "styled-components";
import t from "Theme/helper";
import { Pagination } from "@material-ui/lab";
import { TableContainer, FadeTr } from "./styled";
import DeleteAlertModal from "./DeleteModal";
import { SearchbarAnimation } from "components/Grid/SearchbarAnimation";

// #region hide
const ActionWrapper = styled.div`
  button {
    ${[t.Button, t.Font.Size.Md, t.Bg.Transparent, t.Border._0]}
    &.save {
      ${t.Text.Success._20.Def}
    }
    &.edit {
      ${t.Text.Primary._70}
    }
    &.bin {
      ${t.Text.Danger._40}
    }
  }
`;
//#endregion

export function useDTable() {
  const [isShowing, setShow] = useState(true);
  function toggle() {
    setShow(!isShowing);
  }
  return { isShowing, toggle, setShow };
}

export default function DTable(props) {
  const {
    onPageSelcet = (page) => {
      return null;
    },
    pagination = { cur: 1, all: null },
  } = props;

  function onClickPage(e, page) {
    onPageSelcet(page);
  }
  return (
    <>
      <GridROWS {...props} />
      {pagination.all !== 0 && (
        <div className="align-items-center justify-content-center d-flex mb-3">
          <Pagination
            {...pagination}
            count={pagination.all}
            page={pagination.cur}
            shape="rounded"
            color="primary"
            onChange={onClickPage}
          />
        </div>
      )}
    </>
  );
}

const GridROWS = (props) => {
  const {
    rows = [],
    actions = null,
    withIndex = true,
    header = { types: {}, names: [], defs: {} },
    onSearch,
  } = props;

  const [searchInputShow, setSearchShow] = useState("");
  const [searchParam, setSeracrhParam] = useState("");
  const [showVal, setShowVal] = useState(false);

  function searchHeader(e) {
    const { value } = e.target;
    setSeracrhParam(value);
  }

  const setHeaderForSearch = (name) => (e) => {
    setSearchShow(name);
  };

  const onSearchHeader = (name) => (value) => {
    // setSearchShow("");
    // setShowVal(true);
    onSearch(value);
  };

  const setSearchEmpty = (name) => (e) => {
    setSearchShow("");
    setSeracrhParam("");
    setShowVal(false);
    onSearch("");
  };

  return (
    <>
      <TableContainer>
        <table>
          <thead>
            <tr>
              {withIndex && <th> {header.defs.hashtag} </th>}
              {header.names.map((n, index) => {
                if (header.types[n.name] === "search") {
                  const show = searchInputShow === n.name || false;
                  return (
                    <th key={`${n.name}_header_${index}`}>
                      <div style={{ display: "inline" }}>
                        <SearchbarAnimation
                          label={n.title || ""}
                          callback={onSearchHeader(n.name)}
                        />
                        {showVal && (
                          <div>
                            {searchParam}
                            <i
                              className={"icon-close"}
                              onClick={setSearchEmpty(n.name)}
                            ></i>
                          </div>
                        )}
                      </div>
                    </th>
                  );
                }
                return <th key={`${n.name}_header_${index}`}>{n.title}</th>;
              })}
              {actions && <th> {header.defs.action} </th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, idx) => (
              <ROW
                idx={idx}
                item={item}
                key={`item_${idx}`}
                actions={actions}
                withIndex={withIndex}
                header={header}
              />
            ))}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
};

const ROW = React.memo((props) => {
  const { idx, item, header, actions, withIndex } = props;
  const { names } = header;
  return (
    <FadeTr>
      {withIndex && <td> {idx + 1} </td>}
      {names.map((n) => {
        return (
          <td className="pk" key={`cell_${idx}_${n.name}`}>
            {item[n.name]}
          </td>
        );
      })}
      {actions && (
        <td>
          <ActionCell actions={actions} item={item} idx={idx} />
        </td>
      )}
    </FadeTr>
  );
});

const ActionCell = React.memo((props) => {
  const { item, idx, actions = [] } = props;
  const [state, setState] = useState({
    isShowAlert: false,
  });

  const handleActClick = (fn, name) => (e) => {
    if (name === "delete") {
      setState((prev) => ({ ...prev, isShowAlert: true }));
      return "";
    }
    return fn(item, idx);
  };
  const classes = {
    edit: "btn edit",
    delete: "btn delete",
  };
  const handleDeleteItem = (fn) => (e) => {
    setState((prev) => ({ ...prev, isShowAlert: false }));
    return fn(item, idx);
  };

  function closeModal() {
    setState((prev) => ({ ...prev, isShowAlert: false }));
  }
  return (
    <ActionWrapper>
      <>
        {actions.map((act, index) => (
          <div key={`action_${idx}_${index}`} style={{ display: "inline" }}>
            {state.isShowAlert && act.name === "delete" && (
              <DeleteAlertModal
                title={"delete"}
                btnName={["no", "yes"]}
                onSubmit={handleDeleteItem(act.callback)}
                onClose={closeModal}
              />
            )}
            <button
              // key={`action_${idx}_${index}`}
              onClick={handleActClick(act.callback, act.name)}
              className={classes[act.name]}
            >
              <i className={act.icon || "icon-close"}></i>
              <span> {act.title}</span>
            </button>
          </div>
        ))}
      </>
    </ActionWrapper>
  );
});
