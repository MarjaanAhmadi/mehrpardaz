import React, { useState } from "react";
import dContext from "./useDContext";
import * as Cells from "./useTable/Cells";
import styled from "styled-components";
import t from "../Theme/helper";
import { Pagination } from "@material-ui/lab";
import { TableContainer, FadeTr } from "./useTable/styled";
// import createDateString from "utils/createDateString";
import DSelect from "./useDSelect";

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

const Reducer = (state, action) => {
  const { newItem, rows } = state;
  const { idx } = action;
  let newRow = {};
  let ROWS = [];
  switch (action.type) {
    case "ADDNEWROW":
      ROWS = [...rows, newItem];
      return { ...state, addButton: false, rows: ROWS };
    case "RESET":
      return { ...state, addButton: true, rows: action.initRows };
    case "REMOVE":
      return { ...state };
    case "TOGGLE":
      return { ...state };
    // case "RESET":
    //   return { ...state };
    case "edit":
      return { ...state };
    case "CHANGEFILED":
      newRow = { ...rows[idx], [action.name]: action.value };
      ROWS = [...rows];
      ROWS[Number(idx)] = newRow;
      return { ...state, rows: ROWS };
    case "READYANSWERSELECT":
      newRow = {
        ...rows[idx],
        [action.name]: action.value.label,
        readyAnswerId: action.value.id,
      };
      ROWS = [...rows];
      ROWS[Number(idx)] = newRow;
      return { ...state, rows: ROWS };
    case "CID":
      newRow = { ...rows[idx], id: action.value };
      ROWS = rows.map((row, index) => {
        if (Number(index) === Number(idx)) return newRow;
        return row;
      });
      return { ...state, rows: ROWS };
    default:
      return { ...state };
  }
};
const { DProvider, useDContext, useDispatch } = dContext({ reducer: Reducer });
export default function DTable(props) {
  const {
    header = { types: {}, names: [] },
    rows = [],
    newRow = null,
    withIndex = true,
    Footer,
  } = props;
  const {
    onPageSelcet = (page) => {
      return null;
    },
    pagination = { cur: 1, all: null },
  } = props;
  // const { isShowing = true } = props;
  const newItem = newRow
    ? newRow
    : header.names.reduce((acc, key) => {
        // const date = createDateString(new Date());
        const date = new Date();
        const value = header.types[key.name] === "date" ? date : "";
        return { ...acc, [key.name]: value };
      }, {});

  const initVal = { rowsInit: rows, rows: rows, newItem, addButton: true };
  function onClickPage(e, page) {
    onPageSelcet(page);
  }
  return (
    <DProvider initVal={initVal}>
      {/* <FadeOutDiv fade={!isShowing}> */}
      <GridROWS
        initRows={rows}
        Footer={Footer}
        withIndex={withIndex}
        {...props}
      />
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
      {/* </FadeOutDiv> */}
    </DProvider>
  );
}
const GridROWS = (props) => {
  const dispatch = useDispatch();
  const { rows, addButton } = useDContext();
  const { initRows = [], actions, withIndex, header, Footer = null } = props;

  React.useEffect(() => {
    dispatch({ type: "RESET", initRows });
  }, [initRows]);

  function addNewRow() {
    dispatch({ type: "ADDNEWROW" });
  }
  // sending CallBacks and conditons to FooterProps
  // can be used for other parts to envolve
  const callBacks = { add: addNewRow, rows: rows };
  const conditions = { add: addButton };
  return (
    <>
      <TableContainer>
        <table>
          <thead>
            <tr>
              {withIndex && <th> # </th>}
              {header.names.map((n, index) => (
                <th key={`${n.name}_header_${index}`}> {n.title} </th>
              ))}
              {actions && <th> Actions </th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, idx) => {
              if (item.readOnly) {
                return (
                  <ReadOnlyRow
                    idx={idx}
                    item={item}
                    key={`item_${idx}`}
                    actions={actions}
                    withIndex={withIndex}
                    header={header}
                  />
                );
              }
              return (
                <ROW
                  idx={idx}
                  item={item}
                  key={`item_${idx}`}
                  actions={actions}
                  withIndex={withIndex}
                  header={header}
                />
              );
            })}
          </tbody>
        </table>
      </TableContainer>
      {Footer && <Footer callBacks={callBacks} conditions={conditions} />}
    </>
  );
};
const ROW = React.memo((props) => {
  const { idx, item, header, actions, withIndex } = props;
  const { names, types, ...other } = header;
  return (
    <FadeTr>
      {withIndex && <td> {idx + 1} </td>}
      {names.map((n) => {
        const type = types[n.name];
        if (type === "result")
          return (
            <td key={`cell_${idx}_${n.name}`}>
              <ResultBox item={item} idx={idx} value={item[n.name]} />
            </td>
          );
        return (
          <td key={`cell_${idx}_${n.name}`}>
            <CELL
              idx={idx}
              name={n.name}
              value={item[n.name]}
              item={item}
              cellType={type}
              {...other}
            />
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
const ResultBox = (props) => {
  const { item, idx, value } = props;
  const { testAnswerTypeId, readyAnswers } = item;
  const dispatch = useDispatch();
  let type = "def";
  switch (testAnswerTypeId) {
    case 1:
      type = "num";
      break;
    case 2:
      type = "ready";
      break;
    case 3:
      type = "long";
      break;
    case 4:
      type = "adv";
      break;
    default:
      break;
  }
  const dispatcherVal = (val) =>
    dispatch({ type: "CHANGEFILED", idx, name: "result", value: val });
  function handleChangeField(e) {
    const { value, validity } = e.target;
    if (!validity.valid) return "";
    dispatcherVal(type === "num" ? Number(value) : value);
  }
  function handleSelect(opt) {
    dispatch({ type: "READYANSWERSELECT", idx, name: "result", value: opt });
  }
  function handleRich(rich) {
    dispatcherVal(rich);
  }

  switch (type) {
    case "num":
      return (
        <Cells.Input
          value={Number(value) || 0}
          onChange={handleChangeField}
          pattern="[0-9]*"
        />
      );
    case "ready":
      const options =
        readyAnswers.map((r) => ({ id: r.id, label: r.title })) || [];
      return (
        <DSelect
          value={item.readyAnswerId}
          options={options}
          onChange={handleSelect}
          withNull
        />
      );
    case "adv":
      return (
        <Cells.AdvText
          link={`/Test/${item.testId}/RichAnswer`}
          callback={handleRich}
          result={value}
        />
      );
    default:
      return (
        <Cells.Input value={value || undefined} onChange={handleChangeField} />
      );
  }
};

const CELL = React.memo((props) => {
  const { cellType = "default", item, name, value, idx, ...other } = props;

  const dispatch = useDispatch();
  const dispatcherVal = (val) =>
    dispatch({ type: "CHANGEFILED", idx, name, value: val });

  function handleChangeWithEvent(e) {
    const { value } = e.target;
    dispatcherVal(value);
  }
  function handleChangeWithVal(value) {
    dispatcherVal(value);
  }

  function handleChangeDate(value) {
    // const date = createDateString(value);
    // console.log(date);
    console.log(value);

    dispatcherVal(value);
  }
  function handleSelect(opt) {
    dispatcherVal(opt.id);
  }

  switch (cellType) {
    case "undef":
      return value;
    case "read":
      return value;
    case "num":
      return (
        <Cells.Number
          value={value}
          onChange={handleChangeWithVal}
          // pattern="[0-9]*"
        />
      );
    case "text":
      return (
        <Cells.Input
          value={value || undefined}
          onChange={handleChangeWithEvent}
        />
      );
    case "date":
      return (
        <Cells.Date value={value || new Date()} onChange={handleChangeDate} />
      );
    case "select":
      const { selects } = other;
      const options = selects[name] || [];
      return (
        <Cells.SelectBox
          value={value}
          options={options}
          withNull
          onChange={handleSelect}
        />
      );
    case "dselect":
      return (
        <DSelect
          value={value}
          options={other.selects[name] || []}
          onChange={handleSelect}
        />
      );
    case "comment":
      return <Cells.Comment value={value} onChange={handleChangeWithVal} />;
    default:
      return value;
  }
});

const ActionCell = React.memo((props) => {
  const { item, idx, actions = [] } = props;
  const handleActClick = (fn) => () => fn(item, idx);
  return (
    <ActionWrapper>
      {actions.map((act, index) => (
        <act.Comp
          key={`action_${idx}_${index}`}
          onClick={handleActClick(act.callback)}
          new={item.id ? 0 : 1}
        />
      ))}
    </ActionWrapper>
  );
});

const ReadOnlyRow = React.memo((props) => {
  const { idx, item, header, withIndex } = props;
  const { names, types, ...other } = header;
  return (
    <FadeTr>
      {withIndex && <td> {idx + 1} </td>}
      {names.map((n) => {
        const type = types[n.name];
        if (type === "result")
          return (
            <td key={`cell_${idx}_${n.name}`}>
              <ResultBox item={item} idx={idx} value={item[n.name]} />
            </td>
          );
        return (
          <td key={`cell_${idx}_${n.name}`}>
            <ReadOnlyCell
              idx={idx}
              name={n.name}
              value={item[n.name]}
              item={item}
              cellType={type}
              {...other}
            />
          </td>
        );
      })}
      {/* {actions && (
        <td>
          <ActionCell actions={actions} item={item} idx={idx} />
        </td>
      )} */}
    </FadeTr>
  );
});

const ReadOnlyCell = React.memo((props) => {
  const { cellType = "default", item, name, value, idx, ...other } = props;

  switch (cellType) {
    case "dselect":
      const { selects } = other;
      const options = selects[name] || [];
      const opt = options.find((opt) => opt.id === (value || 0));
      return opt.title;

    default:
      return value;
  }
});
