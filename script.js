function limparCEP(cep) {
    return cep.replace(/\D/g, '');
}

async function consultarCEP() {
    const inputCep = document.getElementById('cep').value;
    const cep = limparCEP(inputCep);
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = "Consultando...";

     if (cep === "66666666") {
        resultadoDiv.innerHTML = `
            <p><strong>CEP:</strong> 66666-666</p>
            <p><strong>Logradouro:</strong> Casa do Caralho</p>
            <p><strong>Bairro:</strong> Onde Judas perdeu as botas</p>
            <p><strong>Cidade:</strong> Xui</p>
            <p><strong>Estado:</strong> RS</p>
            <p style="color:red; font-weight: bold;">🛑 vai se foder elcio !</p>
        `;
        return;
    }
if (cep === "89282427") {
        resultadoDiv.innerHTML = `
            <p><strong>CEP:</strong> 89282427</p>
            <p style="color:red; font-weight: bold;"> <strong>Logradouro:</strong>ArcelorMittal🛑Onde o Tubo entra no Fernando </p>
            <p><strong>Bairro:</strong> Bairro Brasília  </p>
            <p><strong>Cidade:</strong> São Bento do Sul  </p>
            <p><strong>Estado:</strong> SC </p>
            <p style="color:red; font-weight: bold;">Tubos não Tuperescos 😭 </p>
        `;
        return;
    }
    if (cep.length !== 8) {
        resultadoDiv.textContent = "CEP inválido! Deve conter 8 números.";
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro na consulta");

        const data = await response.json();

        if (data.erro) {
            resultadoDiv.textContent = "CEP não encontrado.";
        } else {
            resultadoDiv.innerHTML = `
                <p><strong>CEP:</strong> ${data.cep}</p>
                <p><strong>Logradouro:</strong> ${data.logradouro || '-'}</p>
                <p><strong>Bairro:</strong> ${data.bairro || '-'}</p>
                <p><strong>Cidade:</strong> ${data.localidade || '-'}</p>
                <p><strong>Estado:</strong> ${data.uf || '-'}</p>
            `;
        }
    } catch (error) {
        resultadoDiv.textContent = "Erro ao consultar o CEP.";
        console.error(error);
    }
}

document.getElementById('btn-consultar').addEventListener('click', consultarCEP);

document.getElementById('cep').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        consultarCEP();
    }
});
