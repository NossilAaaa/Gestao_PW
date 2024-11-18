export const getFuncionarioAPI = async () => {
    const response = await 
        fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios`,
            {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            }
        );
    const data = await response.json();
    return data;
}

export const getFuncionarioPorCodigoAPI = async id => {
    const response = await 
        fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios/${id}`,
            {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            }
        );
    const data = await response.json();
    return data;
}

export const deleteFuncionarioPorCodigoAPI = async id => {
    const response = await 
        fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios/${id}`,
            {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            }
        );
    const data = await response.json();
    return data;
}

export const cadastraFuncionarioAPI = async (objeto, metodo) => {
    const response = await 
        fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios/`,
            {
                method : metodo,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(objeto)
            }
        );
    const data = await response.json();
    return data;
}