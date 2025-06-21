form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        nome: nameInp.value, 
        email: emailInp.value,
        mensagem: menssageInp.value
    };

    try {
        const resposta = await fetch('http://localhost:3000/enviar', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json()
        alert(resultado.mensagem);

    }catch(erro) {
        alert('Erro ao enviar os dados');
         console.error(erro);
    }
});
