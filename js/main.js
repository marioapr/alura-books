async function buscaEndereco(cep) {
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCepConvertido = await consultaCep.json();
        if(consultaCepConvertido.erro){
            throw Error('CEP não existe!');
        }
        const campoLogradouro = document.getElementById('endereco');
        const campoCidade = document.getElementById('cidade');
        const campoUf = document.getElementById('estado');

        campoLogradouro.value = consultaCepConvertido.logradouro;
        campoCidade.value = consultaCepConvertido.localidade;
        campoUf.value = consultaCepConvertido.uf;
        console.log(consultaCepConvertido);
        return consultaCepConvertido;
    } catch (erro){
        mensagemErro.innerHTML = `<p class="erro__texto">CEP inválido, tente novamente!</p>`
        console.log(erro);
    }
}

const ceps = ['01001000', '01001250'];
const campoCEP = document.getElementById('cep');

campoCEP.addEventListener('focusout', ()=>buscaEndereco(campoCEP.value))