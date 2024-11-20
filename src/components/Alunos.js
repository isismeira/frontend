import React from 'react'
import {Table,Button,Form} from 'react-bootstrap'


// define uma classe Alunos, que pode ter um estado interno e renderizar interfaces
class Alunos extends React.Component{
    // inicializa  a classe
    constructor(props){
        //garante que a herança funcione corretamente
        super(props)

        // inicializando o estado...
        this.state = {
            id:0,
            //...sem nome definido
            nome: '',
            //...sem email definido
            email:'',
            //... com uma lista de alunos vazia
            alunos : []
        }
    }
    
    componentDidMount(){
        this.buscarAluno()
    }

    
    //Fazendo o GET da API
    buscarAluno = () => {
        fetch("http://localhost:3001/alunos")
        //após o fetch, converte os dados para json
        .then(resposta => resposta.json())
        //após a conversão...
        .then(dados => {
            // ...atualiza o estado de alunos, passando a resposta do fetch para eles
            this.setState({alunos:dados})
        })
        .catch(error => console.error('Erro ao buscar alunos:', error))
    }

    //Fazendo o DELETE da API
    deletarAluno = (id) => {
        // pega apenas o aluno que se deseja excluir, e passa o método delete
        fetch("http://localhost:3001/alunos/"+id, {method: 'DELETE'})
        .then(resposta => {
            // se o aluno foi excluido com sucesso...
            if(resposta.ok){
                // ...atualiza a lista de alunos 
                this.buscarAluno()
            } else {
                alert('Erro ao deletar o aluno')
            }
        })
    }

    carregarAluno = (id) => {
        fetch("http://localhost:3001/alunos/"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(aluno => {
            // ...atualiza o estado de alunos, passando a resposta do fetch para eles
            this.setState({
                id:aluno.id,
                nome:aluno.nome,
                email:aluno.email
            })
        })
        .catch(error => console.error('Erro ao carregar os alunos:', error))
    }

    atualizarAluno = (aluno) => {
        fetch("http://localhost:3001/alunos/"+aluno.id,
            { method: 'PUT' ,
            // especifica que a requisição é em JSON
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(aluno)})           
            .then(resposta => {
                //atualiza a página apos o cadastro
                if(resposta.ok){
                    this.buscarAluno()
                    this.limparFormulario()
                } else {
                    alert('Não foi possível atualizar os dados do aluno')
                }
            })
    }

        //Fazendo o POST da API
        cadastraAluno = (aluno) => {
            fetch("http://localhost:3001/alunos",
                { method: 'POST' ,
                // especifica que a requisição é em JSON
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(aluno)})           
                .then(resposta => {
                //atualiza a página apos o cadastro
                    if(resposta.ok){
                        this.buscarAluno()
                        this.limparFormulario()
                    } else {
                        alert('Não foi possível cadastrar o aluno')
                    }
                })
    }

    // sempre que há uma alteração no campo de nome, muda o valor de nome dinamicamente para cada digito escrito no campo
    atualizaNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    } 

    // idem
    atualizaEmail =   (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    } 

    // evento disparado ao enviar o formulário
    submit = (e) => {
        e.preventDefault()
        if (this.state.id === 0){
        const aluno = {
            // cria uma contante aluno com os valores atuais do estado p nome e email (definidas nas funções atualiza)
            nome: this.state.nome,
            email: this.state.email
            }
            // chama a função cadastra aluno para o aluno criado
            this.cadastraAluno(aluno)
        } else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email
            }
            this.atualizarAluno(aluno)    
        }
    }

    limparFormulario = () => {
        this.setState({
            id: 0,
            nome: '',
            email: ''
        });
    };
    

    render(){
        return(
            <>
                <Form id="modalForm" onSubmit={this.submit}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type='text' value={this.state.id} readOnly={true}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        {/* value={this.state.nome} pega o valor inserido e joga pro state */}
                        {/* onChange={this.atualizaNome} chama a funçao atualizaNome, sempre que houver uma alteração no campo de texto*/}
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type='text' placeholder='Nome do Aluno' value={this.state.nome} onChange={this.atualizaNome}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Email' value={this.state.email} onChange={this.atualizaEmail}/>
                     </Form.Group> 
                     <Button variant='success' type='submit' onClick={this.submit}>
                        Salvar
                     </Button>
                </Form>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Opções</th>
                    </tr>
                    </thead>
                    <tbody>

                        {   //renderiza a lista de alunos
                         this.state.alunos.map((aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.email}</td>
                                    <td>
                                        <Button
                                        variant="warning"
                                        onClick={() => this.carregarAluno(aluno.id)}>
                                            Atualiza 
                                        </Button>
                                        <Button
                                        variant="danger" 
                                         onClick={() => this.deletarAluno(aluno.id)}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                        )    
                    }
                </tbody>    
                </Table>
            </>
    )}
}

export default Alunos