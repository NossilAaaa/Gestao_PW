const { Router } = require('express');

const { rotasFuncionarios } = require('./rotasFuncionarios');
const { rotasDepartamentos } = require('./rotasDepartamentos');

const rotas = new Router();

rotas.use(rotasFuncionarios);
rotas.use(rotasDepartamentos);

module.exports = rotas;