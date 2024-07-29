import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableWrapper from '../TableWrapper';

const fileData = [
    {
        "name": "smss.exe",
        "device": "Mario",
        "path": "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        "status": "scheduled"
    },
    {
        "name": "netsh.exe",
        "device": "Luigi",
        "path": "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
        "status": "available"
    },
    {
        "name": "uxtheme.dll",
        "device": "Peach",
        "path": "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
        "status": "available"
    },
]

describe('TableWrapper', () => {
    beforeEach(() => {
        render(<TableWrapper fileData={fileData} />);
    })

    test('renders the selected count on load', () => {
        const linkElement = screen.getByText(/Selected 0/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders the table header', () => {
        const nameHeaderElement = screen.getByText(/Name/i);
        expect(nameHeaderElement).toBeInTheDocument();
    });

    test('renders the table rows', () => {
        const rowElements = screen.getAllByRole('row')
        // There are 6 data rows + the header row
        expect(rowElements).toHaveLength(4);
    });


    test('updates selected count when user selects a row', async () => {
        await fireEvent.click(await screen.findByTestId('row-netsh.exe'));
    
        await waitFor(async () => {
            const header = await screen.findByText(/Selected 1/i);
            expect(header).toBeDefined();
        });
 
    });

    test('updates selected count when user selects all row', async () => {
        await fireEvent.click(await screen.findByTestId('row-netsh.exe'));
        await fireEvent.click(await screen.findByTestId('row-uxtheme.dll'));
        await waitFor(async () => {
            const header = await screen.findByText(/Selected 2/i);
            expect(header).toBeDefined();
        });
    });

    test('updates selected count when user de-selects a row', async () => {
        await fireEvent.click(await screen.findByTestId('row-netsh.exe'));
        await fireEvent.click(await screen.findByTestId('row-uxtheme.dll'));
        await fireEvent.click(await screen.findByTestId('row-netsh.exe'));
        await waitFor(async () => {
            const header = await screen.findByText(/Selected 1/i);
            expect(header).toBeDefined();
        });
    });

    test('select all button selects all available rows when none are selected', async () => {
        await fireEvent.click(await screen.findByTestId('select-all'));

        await waitFor(async () => {
            const header = await screen.findByText(/Selected 2/i);
            expect(header).toBeDefined();
        });

        await waitFor(async () => {
            const rows = await screen.getAllByRole('checkbox');
            const selectedRows = rows.filter(row => row.checked);
            // 2 rows and the select all checkbox should be checked
            expect(selectedRows.length).toBe(3);
        });
    });

    test('select all bottom selects all available rows when at least 1 is already selected', async () => {
        await fireEvent.click(await screen.findByTestId('row-netsh.exe'));
        await waitFor(async () => {
            const header = await screen.findByText(/Selected 1/i);
            expect(header).toBeDefined();
        });

        await fireEvent.click(await screen.findByTestId('select-all'));
        await waitFor(async () => {
            const header = await screen.findByText(/Selected 2/i);
            expect(header).toBeDefined();
        });

        await waitFor(async () => {
            const rows = await screen.getAllByRole('checkbox');
            const selectedRows = rows.filter(row => row.checked);
            // 2 rows and the select all checkbox should be checked
            expect(selectedRows.length).toBe(3);
        });
    });

    test('select all bottom de-selects all available rows when all are already selected', async () => {
        await fireEvent.click(await screen.findByTestId('select-all'));
        await waitFor(async () => {
            const header = await screen.findByText(/Selected 2/i);
            expect(header).toBeDefined();
        });

        await fireEvent.click(await screen.findByTestId('select-all'));
        await waitFor(async () => {
            const header = await screen.findByText(/Selected 0/i);
            expect(header).toBeDefined();
        });
    });
});
