const { getFuncionariosDB, addFuncionarioDB, updateFuncionarioDB, deleteFuncionarioDB, getFuncionarioPorIdDB } = require('../usecases/funcionarioUseCases')

const getFuncionarios = async (request, response) => {
    await getFuncionariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias: ' + err
        }));
}

const getFuncionarioPorId = async (request, response) => {
    try {
        const data = await getFuncionarioPorIdDB(parseInt(request.params.id));
        response.status(200).json(data);
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
};

const adicionarFuncionario = async (request, response) => {
    console.log('[INFO] Iniciando adição de novo funcionário...');
  
    try {
        const data = await addFuncionarioDB(request.body);
        console.log('[SUCCESS] Funcionário adicionado com sucesso:', data);
        response.status(201).json(data);
    } catch (err) {
        console.error('[ERROR] Erro ao adicionar funcionário:', err);
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
};


const atualizarFuncionario = async (request, response) => {
    console.log(`[INFO] Iniciando atualização do funcionário com ID: ${request.body.id}...`);
    try {
        const data = await updateFuncionarioDB(request.body);
        console.log('[SUCCESS] Funcionário atualizado com sucesso:', data);
        response.status(200).json(data);
    } catch (err) {
        console.error(`[ERROR] Erro ao atualizar o funcionário com ID ${request.body.id}:`, err);
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
};


const deletarFuncionario = async (request, response) => {
    console.log(`[INFO] Iniciando exclusão do funcionário com ID: ${request.params.id}...`);
    try {
        const message = await deleteFuncionarioDB(parseInt(request.params.id));
        console.log('[SUCCESS] Funcionário deletado com sucesso:', message);
        response.status(200).json({ message });
    } catch (err) {
        console.error(`[ERROR] Erro ao deletar o funcionário com ID ${request.params.id}:`, err);
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
};

module.exports = {
    getFuncionarios,
    adicionarFuncionario,
    atualizarFuncionario,
    deletarFuncionario,
    getFuncionarioPorId
};
