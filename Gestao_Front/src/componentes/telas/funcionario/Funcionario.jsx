import { useState, useEffect } from "react";
import FuncionarioContext from "./FuncionarioContext"; 
import {
    getFuncionarioAPI, getFuncionarioPorCodigoAPI, cadastraFuncionarioAPI,
    deleteFuncionarioPorCodigoAPI
} from "../../../servicos/FuncionarioServico";
import Tabela from "./Tabela";
import '../Home.css'
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";

function Funcionario() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [funcionario, setFuncionario] = useState({
        id: 0,
        nome: "",
        cargo: "",
        salario: 0.00,
        departamento_id: 0
    });
    const [carregando, setCarregando] = useState(false);

    const novoFuncionario = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setFuncionario({
            id: 0,
            nome: "",
            cargo: "",
            salario: 0.00,
            departamento_id: 0
        })
        setExibirForm(true);
    }

    const editarFuncionario = async id => {
        setFuncionario(await getFuncionarioPorCodigoAPI(id)); // Atualizado para pegar funcionário por id
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraFuncionarioAPI(funcionario, metodo); // Alterado para método de funcionário
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setFuncionario(retornoAPI.funcionario);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log("Erro: " + err);
        }
        recuperaFuncionarios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFuncionario({ ...funcionario, [name]: value });
    }

    const recuperaFuncionarios = async () => {
        setCarregando(true);
        setListaFuncionarios(await getFuncionarioAPI()); // Atualizado para pegar lista de funcionários
        setCarregando(false);
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este funcionário?')) {
            let retornoAPI = await deleteFuncionarioPorCodigoAPI(id); // Alterado para deletar por ID
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            recuperaFuncionarios();
        }
    }

    useEffect(() => {
        recuperaFuncionarios();
    }, []);

    return (
        <div className="funcionario">
            <FuncionarioContext.Provider value={{
                alerta, listaFuncionarios, remover, funcionario, editarFuncionario,
                novoFuncionario, acaoCadastrar, handleChange, exibirForm, setExibirForm
            }}>
                <div className="tabela">
                    <Carregando carregando={carregando}>
                        <Tabela />
                    </Carregando>
                </div>
                <Formulario />
            </FuncionarioContext.Provider>
        </div>
    );
}

export default Funcionario;
