const { Router } = require('express');

const {addDepartamento,
    updateDepartamento,
    deleteDepartamento,
    getDepartamentoPorId,
    getDepartamentos} = require('../controllers/departamentoController')

    const rotasDepartamentos = new Router();

rotasDepartamentos.route('/departamentos')
   .get(getDepartamentos)
   .post(addDepartamento);         


rotasDepartamentos.route('/departamentos/:id')
   .get(getDepartamentoPorId)      
   .put(updateDepartamento)        
   .delete(deleteDepartamento);    

module.exports = { rotasDepartamentos };