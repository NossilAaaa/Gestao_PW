class Funcionario{
    constructor(id, nome, cargo, salario, departamento_id){
        this.id=id;
        this.nome=nome;
        this.cargo=cargo;
        this.salario=salario;
        this.departamento_id=departamento_id;
    }
}

module.exports = Funcionario;