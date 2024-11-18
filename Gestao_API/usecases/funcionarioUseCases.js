const { pool } = require('../config');
const Funcionario = require('../entities/funcionario');

const addFuncionarioDB = async (body) => {
    console.log("body db: " +JSON.stringify(body));
    try {
        const { id, nome, cargo, salario, departamento_id } = body;  
        console.log('id: ' + id)
        const results = await pool.query(`INSERT INTO funcionarios (id, nome, cargo, salario, departamento_id)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING id, nome, cargo, salario, departamento_id`,
        [id, nome, cargo, salario, departamento_id]);  

        const funcionario = results.rows[0];
        return new Funcionario(funcionario.id, funcionario.nome, funcionario.cargo, funcionario.salario, funcionario.departamento_id);
    } catch (err) {
        throw "Erro ao inserir o funcionário: " + err;
    }
}


const updateFuncionarioDB = async (body) => {
    try {
        const { id, nome, cargo, salario, departamento_id } = body;
        const results = await pool.query(`
            UPDATE funcionarios SET nome = $2, cargo = $3, salario = $4, departamento_id = $5
            WHERE id = $1
            RETURNING id, nome, cargo, salario, departamento_id`,
        [id, nome, cargo, salario, departamento_id]);

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id} para ser alterado`;
        }
        const funcionario = results.rows[0];
        return new Funcionario(funcionario.id, funcionario.nome, funcionario.cargo, funcionario.salario, funcionario.departamento_id);
    } catch (err) {
        throw "Erro ao alterar o funcionário: " + err;
    }
}

const deleteFuncionarioDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM funcionarios WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id} para ser removido`;
        } else {
            return "Funcionário removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o funcionário: " + err;
    }
}

const getFuncionarioPorIdDB = async (id) => {
    try {
        const results = await pool.query(`
            SELECT funcionarios.id, funcionarios.nome, funcionarios.cargo, funcionarios.salario, departamentos.nome AS nome_departamento
            FROM funcionarios
            JOIN departamentos ON funcionarios.departamento_id = departamentos.id
            WHERE funcionarios.id = $1`,
        [id]);

        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o ID: " + id;
        } else {
            const funcionario = results.rows[0];
            return {
                id: funcionario.id,
                nome: funcionario.nome,
                cargo: funcionario.cargo,
                salario: funcionario.salario,
                nome_departamento: funcionario.nome_departamento
            };
        }
    } catch (err) {
        throw "Erro ao recuperar o funcionário: " + err;
    }
}

const getFuncionariosDB = async () => {
    try {
        const results = await pool.query(`
            SELECT funcionarios.id, funcionarios.nome, funcionarios.cargo, funcionarios.salario, departamentos.nome AS nome_departamento
            FROM funcionarios
            JOIN departamentos ON funcionarios.departamento_id = departamentos.id`);

        return results.rows.map(row => ({
            id: row.id,
            nome: row.nome,
            cargo: row.cargo,
            salario: row.salario,
            nome_departamento: row.nome_departamento
        }));
    } catch (err) {
        throw "Erro ao recuperar os funcionários: " + err;
    }
}

module.exports = {
    addFuncionarioDB, updateFuncionarioDB, deleteFuncionarioDB, getFuncionarioPorIdDB, getFuncionariosDB
}
