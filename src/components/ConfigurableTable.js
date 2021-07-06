import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

const Settings = styled.h5`
  padding: 0.75rem 0;
  position: relative;

  span {
    cursor: pointer;
  }

  span.text-info {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0 0.3rem;
  }

  span.rotate {
    transform: rotate(-90deg);
  }

  div {
    flex-direction: row;
    position: absolute;
    top: 2.5rem;
    left: 1rem;
    padding: 10px;
  }
`

const ConfigureCollapsed = ({cols, table, show, rowCount, label}) => {
  const dispatch = useDispatch()
  const collapsed = useSelector(state => state.view.tables[table].collapsed)
  const [expanded, setExpanded] = useState(false)

  const makeBtn = (col, index) => <button
    key={index}
    className={`btn btn-outline-secondary btn-sm ${collapsed[index + 1] ? 'inactive' : 'active'}`}
    onClick={() => dispatch({type: 'COLLAPSE_TABLE_COLUMN', table, index: index + 1, collapse: !collapsed[index + 1]})}
  >
    {col.children}
  </button>

  return <Settings className="card-header">
    <span onClick={() => dispatch({type: 'SHOW_TABLE', table, show: !show})}>
      <span className={`text-info ${show ? '' : 'rotate'}`}>▼</span>
      {label}
    </span>
    {(!show || rowCount === 0) && ` (${rowCount})`}
    {show && rowCount > 0 && <button className="btn-sm btn mr-2" onClick={() => setExpanded(!expanded)}>⚙</button>}
    {expanded && <div className="card bg-light btn-group">
      {cols.slice(1).map(makeBtn)}
    </div>}
  </Settings>
}

const Th = ({children, title, sortKey, currentSort, table}) => {
  const dispatch = useDispatch()

  const sortClassName = (currentSort[0] === sortKey ? (currentSort[1] === 1 ? ' ascending' : ' descending') : '')

  return (<th
    scope="col"
    title={title}
    onClick={() => sortKey && dispatch({
      type: 'SORT_TABLE',
      table,
      sortKey,
      direction: currentSort[0] === sortKey ? -currentSort[1] : 1
    })}
    className={sortKey ? ('sortable' + sortClassName) : undefined}
  >
    {children}
  </th>)
}

export default function ConfigurableTable({cols, table, makeRow, rows, sort, label}) {
  const {collapsed, sort: currentSort, show} = useSelector(state => state.view.tables[table])

  cols[0].children = <>
    {cols[0].children}

  </>

  const filter = (_, i) => !collapsed[i]

  const sortFunction = (a, b) => (sort(a, b, currentSort[0]) * currentSort[1])

  return <div className="card">
    <ConfigureCollapsed cols={cols} table={table} show={show} rowCount={rows.length} label={label} />
    {show && rows.length > 0 && <div className="card-body">
      <table className="table table-striped table-sm">
        <tbody>
          <tr className="header">
            {cols.filter(filter).map(c => (<Th key={c.key} title={c.title} sortKey={c.key} currentSort={currentSort} table={table}>{c.children}</Th>))}
          </tr>
          {rows.sort(sortFunction).map((row, i) => <tr key={i}>{row.filter(filter).map((c, i) => i === 0 ? (<th key={i} scope="row">{c}</th>) : (<td key={i}>{c}</td>))}</tr>)}
        </tbody>
      </table>
    </div>}
  </div>
}
