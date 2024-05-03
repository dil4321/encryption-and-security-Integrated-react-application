import logo from './logo.svg';
import './App.css';
import FormComponent from './components/FormComponent';

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Input Form</h1>
            <FormComponent />
    </div>
  );
}

export default App;
