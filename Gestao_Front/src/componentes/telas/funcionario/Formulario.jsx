import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';
import FuncionarioContext from './FuncionarioContext';
import CampoTextArea from '../../comuns/CampoTextArea';

function Formulario() {
    const { funcionario, handleChange, acaoCadastrar, alerta,
        exibirForm, setExibirForm, listaDepartamentos } = useContext(FuncionarioContext);

    return (
        <Dialogo id="modalEdicao" titulo="Funcionário"
            idform="formulario" acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={4}>
                <CampoEntrada value={funcionario.id}
                    id="txtId" name="id" label="ID"
                    tipo="number" onchange={handleChange}
                    readonly={true} maxCaracteres={5} />
            </Col>
            <Col xs={12} md={8}>
                <CampoEntrada value={funcionario.nome}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    msginvalido="Informe o nome"
                    requerido={true} readonly={false} maxCaracteres={40} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={funcionario.cargo}
                    id="txtCargo" name="cargo" label="Cargo"
                    tipo="text" onchange={handleChange}
                    msginvalido="Informe o cargo"
                    requerido={true} readonly={false} maxCaracteres={30} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={funcionario.salario}
                    id="txtSalario" name="salario" label="Salário"
                    tipo="number" onchange={handleChange}
                    msginvalido="Informe o salário"
                    requerido={true} readonly={false} maxCaracteres={10} />
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect
                    value={funcionario.departamento_id}
                    id="selectDepartamento"
                    name="departamento_id"
                    label="Departamento"
                    onChange={handleChange}
                    msgvalido="Departamento escolhido"
                    msginvalido="Informe o departamento"
                >
                    {listaDepartamentos.length > 0 ? (
                        listaDepartamentos.map((departamento) => (
                            <option key={departamento.id} value={departamento.id}>
                                {departamento.nome}
                            </option>
                        ))
                    ) : (
                        <option disabled>Carregando departamentos...</option>
                    )}
                </CampoSelect>
            </Col>
            <Col xs={12} md={12}>
                <CampoTextArea value={funcionario.descricao}
                    id="txtDescricao" name="descricao" label="Descrição"
                    tipo="text" onchange={handleChange}
                    msgvalido="" msginvalido=""
                    requerido={false} readonly={false} maxCaracteres={40} />
            </Col>
        </Dialogo>
    );
}

export default Formulario;
