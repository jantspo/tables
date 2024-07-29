import { useState, useEffect } from 'react';
import Table from './Table';

export default function TableWrapper({ fileData }) {
    // By default the table data does not contain a selected value so before setting the data to state
    // we are adding the selected value, defaulted to false, to each row
    const [ rowData, setRowData ] = useState(fileData.map(file => {
        return {
            ...file,
            selected: false,
        };
    }));
    const [ selectedAllPossible, setSelectedAllPossible ] = useState(false);

    // Could just filter the selected rows to update the count directly, but this is just easy count tracking to avoid
    // looping over all rows on every render
    const [ selectedCount, setSelectedCount ] = useState(0);

    // updates select all checkbox status when rowData is updated
    useEffect(() => {
        setSelectedCount(rowData.filter(row => row.status === 'available' && row.selected).length);
        const allSelected = rowData.filter(row => row.status === 'available').every(row => row.selected);
        setSelectedAllPossible(allSelected);
    }, [rowData]);


    /**
     * Checks and selects or deselects all rows
     */
    const selectAll = () => {
        if (rowData || rowData.length) {
            let updatedRowData;
            if (selectedAllPossible) {
                updatedRowData = rowData.map(row => {
                    row.selected = false
                    return row;
                });
            } else {
                updatedRowData = rowData.map(row => {
                    if (row.status === 'available') {
                        row.selected = true
                    }
                    return row;
                });
            }
            setRowData(updatedRowData);
        }
    }

    /**
     * Handles updated a single row being selected
     * 
     * @param {String} name 
     */
    const selectRow = (name) => {
        const rowIndex = rowData.findIndex(row => row.name === name);
        if (rowIndex !== -1) {
            const row = rowData[rowIndex];
            row.selected = !row.selected;
            const newRowData = [ ...rowData ];
            newRowData[rowIndex] = row;
            setRowData(newRowData);
        }
    }

    /**
     *  Filters and alerts which rows were selected for download
     */
    const downloadRows = () => {
        const files = rowData.filter(row => row.selected).map(row => {
            return `${row.path} - ${row.device}`;
        });
        alert(files);
    }

    return (
        <div>
            <div className="section-header">
                <input type="checkbox" 
                    id='select-all'
                    data-testid='select-all'
                    onChange={selectAll}
                    checked={ selectedAllPossible } />
                <h2>Selected { selectedCount }</h2>
                <button onClick={downloadRows} >
                    Download Selected
                </button>
            </div>
            <Table rowData={rowData} selectRow={selectRow} />
        </div>
    )
}