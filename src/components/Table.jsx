import TableRow from "./TableRow";

function Table({ rowData, selectRow }) {
    return (<table>
        <thead>
            <tr className='table-row'>
                <th className='table-header'></th>
                <th className='table-header'>Name</th>
                <th className='table-header'>Device</th>
                <th className='table-header'>Path</th>
                <th className='table-header'>Status</th>
            </tr>
        </thead>
        <tbody>
            {
                rowData.map(row => <TableRow key={row.name} {...row} selectRow={selectRow} />)
            }
        </tbody>
    </table>);
}

export default Table;