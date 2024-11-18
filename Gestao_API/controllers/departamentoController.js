const { addDepartamentoDB, updateDepartamentoDB, deleteDepartamentoDB, getDepartamentoPorIdDB, getDepartamentosDB } = require('../usecases/departamentoUseCases');

const addDepartamento = async (req, res) => {
    try {
        const departamento = await addDepartamentoDB(req.body);  
        return res.status(201).json({
            message: 'Departamento adicionado com sucesso',
            departamento
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao adicionar o departamento',
            error: error.message || error
        });
    }
};

const updateDepartamento = async (req, res) => {
    try {
        const departamento = await updateDepartamentoDB(req.body);  
        return res.status(200).json({
            message: 'Departamento atualizado com sucesso',
            departamento
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao atualizar o departamento',
            error: error.message || error
        });
    }
};

const deleteDepartamento = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await deleteDepartamentoDB(id);  
        return res.status(200).json({
            message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao remover o departamento',
            error: error.message || error
        });
    }
};

const getDepartamentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await getDepartamentoPorIdDB(id);  
        return res.status(200).json({
            departamento
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao recuperar o departamento',
            error: error.message || error
        });
    }
};

const getDepartamentos = async (req, res) => {
    try {
        const departamentos = await getDepartamentosDB();  
        return res.status(200).json({
            departamentos
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao recuperar os departamentos',
            error: error.message || error
        });
    }
};

module.exports = {
    addDepartamento,
    updateDepartamento,
    deleteDepartamento,
    getDepartamentoPorId,
    getDepartamentos
};
