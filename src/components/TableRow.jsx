import '../styles/tables.scss';

export default function TableRow({
    name,
    device,
    path,
    status,
    selected,
    selectRow
}) {
    const handleChange = () => {
        if (status === 'available') {
            selectRow(name);
        }
    }

    return (<tr className={`table-row ${selected ? 'selected' : ''}`} >
        <td className='table-data'>
            <input type="checkbox"
                data-testid={`row-${name}`}
                disabled={ status !== 'available' }
                checked={ selected }
                onChange={handleChange}
            />
        </td>
        <td className='table-data'>
            { name }
        </td>
        <td className='table-data'>
            { device }
        </td>
        <td className='table-data'>
            { path }
        </td>
        <td className='table-data status'>
            <div className={status} /> 
            { status }
        </td>
    </tr>);
}