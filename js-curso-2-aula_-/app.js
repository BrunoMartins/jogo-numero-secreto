let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(id, texto) {
    let campo = document.querySelector(id);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('#titulo', 'Jogo do número secreto');
    exibirTextoNaTela('#paragrafo-principal', `Escolha um número entre 1 e ${numeroLimite}`);
    
}

exibirMensagemInicial();

function verificarChute() {
    
    let chute = document.querySelector('input').value;

    if (chute > numeroLimite){
        exibirTextoNaTela('#paragrafo-principal', `Valor inválido,escolha um número entre 1 e ${numeroLimite}`); 
    }else{
        verificarTentativa();
        if (chute == numeroSecreto) {
            exibirTextoNaTela('#titulo', 'Acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
            exibirTextoNaTela('#paragrafo-principal', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('chute').setAttribute('disabled', true);
        

        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('#paragrafo-principal', 'O número secreto é menor');
            } else {
                exibirTextoNaTela('#paragrafo-principal', 'O número secreto é maior');
            }
            tentativas++;
            limparCampo();    
            }
}
    let tentativasRestantes = (tentativaLimite + 1) - tentativas;
    exibirTextoNaTela('#paragrafo-secundario', `Tentativas restantes: ${tentativasRestantes}`);
    
    
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoNaTela('#paragrafo-secundario', '');
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('selecionarDificuldade').removeAttribute('disabled');
    document.getElementById('dificuldade').removeAttribute('disabled');
    document.getElementById('chute').setAttribute('disabled', true);

}

function verificarTentativa(){
    if (tentativas == tentativaLimite){
        exibirTextoNaTela('h1','Você perdeu, número de tentativas esgotado')
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
    }
}

function selecionarDificuldade() {
    let select = document.getElementById("dificuldade");
    let dificuldade = select.value;

    if (dificuldade == 'facil') {
        tentativaLimite = 10;
    } else if (dificuldade == 'dificil') {
        tentativaLimite = 5;
    }

    exibirTextoNaTela('#paragrafo-secundario', `Tentativas restantes: ${tentativaLimite}`);
    document.getElementById('selecionarDificuldade').setAttribute('disabled', true);
    document.getElementById('dificuldade').setAttribute('disabled', true);
    document.getElementById('chute').removeAttribute('disabled');
    
}








