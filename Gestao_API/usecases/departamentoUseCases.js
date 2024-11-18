const { pool } = require ('../config');
const Departamento = require('../entities/departamento');

const addDepartamentoDB = async (body) => {
    try {
        const { id, nome, localizacao } = body;  
        const results = await pool.query(`
            INSERT INTO departamentos (id, nome, localizacao)
            VALUES ($1, $2, $3)
            RETURNING id, nome, localizacao`,
        [id, nome, localizacao]);  

        const departamento = results.rows[0];
        return new Departamento(departamento.id, departamento.nome, departamento.localizacao);
    } catch (err) {
        throw "Erro ao inserir o departamento: " + err;
    }
}


const updateDepartamentoDB = async (body) => {
    try {
        const { id, nome, localizacao } = body;
        console.log("Tentando atualizar departamento com os dados:", { id, nome, localizacao });
        const results = await pool.query(`
            UPDATE departamentos SET nome = $2, localizacao = $3
            WHERE id = $1
            RETURNING id, nome, localizacao`,
            [id, nome, localizacao]);

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id} para ser alterado`;
        }
        console.log("Departamento atualizado com sucesso:", results.rows[0]);
        const departamento = results.rows[0];
        return new Departamento(departamento.id, departamento.nome, departamento.localizacao);
    } catch (err) {
        console.error("Erro ao alterar departamento:", err);
        throw "Erro ao alterar o departamento: " + err;
    }
};


const deleteDepartamentoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM departamentos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id} para ser removido`;
        } else {
            return "Departamento removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o departamento: " + err;
    }
}

const getDepartamentoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM departamentos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o ID: " + id;
        } else {
            const departamento = results.rows[0];
            return new Departamento(departamento.id, departamento.nome, departamento.localizacao);
        }
    } catch (err) {
        throw "Erro ao recuperar o departamento: " + err;
    }
}

const getDepartamentosDB = async () => {
    try {
        const results = await pool.query(`SELECT * FROM departamentos`);
        return results.rows.map(row => ({
            id: row.id,
            nome: row.nome,
            localizacao: row.localizacao
        }));
    } catch (err) {
        throw "Erro ao recuperar os departamentos: " + err;
    }
}

module.exports = {
    addDepartamentoDB, updateDepartamentoDB, deleteDepartamentoDB, getDepartamentoPorIdDB, getDepartamentosDB
};