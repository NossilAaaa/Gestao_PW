import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import FuncionarioContext from "./FuncionarioContext"; // Contexto alterado para FuncionarioContext

function Tabela() {

    const { alerta, listaFuncionarios, remover, 
        novoFuncionario, editarFuncionario } = useContext(FuncionarioContext); // Alterado para 'listaFuncionarios' e 'novoFuncionario'

    return (
        <div style={{ padding: '50px', width : '2000px' }} >
            <h1 style={{color : 'white', textAlign : "center"}}>Painel de Controle: Funcionários</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={()=>  novoFuncionario()}>
                Cadastrar Novo Funcionário 
            </Button><br/><br/>
            {listaFuncionarios.length === 0 &&
                <h1>Nenhum registro encontrado</h1>}
            {listaFuncionarios.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Salário</th>
                            <th>Departamento</th> {/* Ajuste para exibir departamento_id */}
                        </tr>
                    </thead>
                    <tbody>
                        {listaFuncionarios.map((funcionario) => (
                            <tr key={funcionario.id}>
                                <td align="center">
                                    <Button variant="info" 
                                    onClick={ () => editarFuncionario(funcionario.id)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger"
                                        onClick={() => remover(funcionario.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{funcionario.id}</td>  {/* Alterado para 'id' */}
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.cargo}</td>  {/* Alterado para 'cargo' */}
                                <td>{funcionario.salario}</td>  {/* Alterado para 'salario' */}
                                <td>{funcionario.departamento_id}</td>  {/* Alterado para 'departamento_id' */}
                            </tr>
                        ))}

                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;
