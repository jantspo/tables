import './App.css';
import './styles/buttons.scss'
import TableWrapper from './components/TableWrapper';
import fileData from './data.json';

function App() {

  return (
    <div className="App">
      <TableWrapper fileData={fileData} />
    </div>
  );
}

export default App;
