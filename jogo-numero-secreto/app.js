let listaDeNumerosSorteados = [];
let listaDeChutes = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;



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

    if (chute > numeroLimite || chute < 0){
        exibirTextoNaTela('#paragrafo-principal', `Valor inválido,escolha um número entre 1 e ${numeroLimite}`); 
    }else{
        tentativas++;
        verificarTentativa();
        listaDeChutes.push(chute)
        exibirChutesNaTela();
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
            
            limparCampo();    
            }
}
    let tentativasRestantes = tentativaLimite - tentativas;
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
    tentativas = 0;
    listaDeChutes = [];
    exibirTextoNaTela('#paragrafo-secundario', '');
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('selecionarDificuldade').removeAttribute('disabled');
    document.getElementById('dificuldade').removeAttribute('disabled');
    document.getElementById('chute').setAttribute('disabled', true);
    let campoChutes = document.getElementById('paragrafo-chute');
    campoChutes.innerHTML = '';
    

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

function exibirChutesNaTela() {
    let textoChutes = "Valores chutados: " + listaDeChutes.join(', ');
    let campoChutes = document.getElementById('paragrafo-chute')
    campoChutes.innerHTML = textoChutes;
}











