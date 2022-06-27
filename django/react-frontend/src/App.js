import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <h1>Bootstrap Button</h1>
      {/* example from https://react-bootstrap.netlify.app/components/buttons/#rb-docs-content */}
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button> <Button variant="link">Link</Button>
    </div>
  );
}

export default App;
