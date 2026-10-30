// ---------- Configuração ----------
const MIN = 1;
const MAX = 100;
const MAX_TENTATIVAS = 10;

// ---------- Estado do jogo ----------
let numeroSecreto;
let tentativasRestantes;
let jogoAcabou;

// ---------- Elementos da página ----------
const inputPalpite = document.getElementById('palpite');
const btnChutar = document.getElementById('btn-chutar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const paragrafoMensagem = document.getElementById('mensagem');
const paragrafoTentativas = document.getElementById('tentativas');

// ---------- Funções ----------
function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function exibirMensagem(texto, tipo = '') {
  paragrafoMensagem.textContent = texto;
  paragrafoMensagem.className = 'mensagem ' + tipo;
}

function exibirTentativas() {
  paragrafoTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

function encerrarJogo() {
  jogoAcabou = true;
  inputPalpite.disabled = true;
  btnChutar.disabled = true;
  btnReiniciar.hidden = false;
  btnReiniciar.focus();
}

function iniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativasRestantes = MAX_TENTATIVAS;
  jogoAcabou = false;

  inputPalpite.disabled = false;
  inputPalpite.value = '';
  btnChutar.disabled = false;
  btnReiniciar.hidden = true;

  exibirMensagem('');
  exibirTentativas();
  inputPalpite.focus();
}

function chutar() {
  if (jogoAcabou) return;

  const palpite = parseInt(inputPalpite.value, 10);

  // Validação: não consome tentativa se o valor for inválido
  if (isNaN(palpite) || palpite < MIN || palpite > MAX) {
    exibirMensagem(`Digite um número entre ${MIN} e ${MAX}.`, 'erro');
    inputPalpite.select();
    return;
  }

  tentativasRestantes--;

  if (palpite === numeroSecreto) {
    exibirMensagem(`Acertou! O número era ${numeroSecreto}. 🎉`, 'acerto');
    exibirTentativas();
    encerrarJogo();
    return;
  }

  if (tentativasRestantes === 0) {
    exibirMensagem(`Fim de jogo! O número secreto era ${numeroSecreto}.`, 'erro');
    exibirTentativas();
    encerrarJogo();
    return;
  }

  if (palpite < numeroSecreto) {
    exibirMensagem(`${palpite} é menor que o número secreto. Tente um maior!`, 'dica');
  } else {
    exibirMensagem(`${palpite} é maior que o número secreto. Tente um menor!`, 'dica');
  }

  exibirTentativas();
  inputPalpite.value = '';
  inputPalpite.focus();
}

// ---------- Eventos ----------
btnChutar.addEventListener('click', chutar);
btnReiniciar.addEventListener('click', iniciarJogo);
inputPalpite.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') chutar();
});

// ---------- Início ----------
iniciarJogo();
