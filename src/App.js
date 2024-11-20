import './App.css';
import Home from './components/Home'
import Alunos from './components/Alunos'
import Professores from './components/Professores'
import Turmas from './components/Turmas'
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <h1>WortWelt: Escola de Alemão</h1>
      {/*Rotas para cada página da aplicação*/}
      <BrowserRouter> 
      <Nav variant="tabs">
        <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
        <Nav.Link as={Link} to="/alunos">Alunos</Nav.Link>
        <Nav.Link as={Link} to="/professores">Professores</Nav.Link>
        <Nav.Link as={Link} to="/turmas">Turmas</Nav.Link>
      </Nav>
      
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/alunos" element={<Alunos/>}></Route>
        <Route path="/professores" element={<Professores/>}></Route>
        <Route path="/turmas" element={<Turmas/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
