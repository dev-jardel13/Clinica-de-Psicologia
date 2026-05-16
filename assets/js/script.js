// =======================
// 🔐 LOGIN
// =======================
function fazerLogin() {
    localStorage.setItem("logado", "true");
    window.location.href = "agendamento.html";
}

function fazerLogout() {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
}

function verificarLogin() {
    const logado = localStorage.getItem("logado");

    if (logado === "true") {
        window.location.href = "agendamento.html";
    } else {
        window.location.href = "login.html";
    }
}

// =======================
// 🌙 TEMA
// =======================
const button = document.getElementById("theme-toggle");

if (button) {
    // aplica tema salvo
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        button.textContent = "☀️";
    }

    // clique
    button.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            button.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            button.textContent = "🌙";
        }
    });
}

// =======================
// 🔀 MENU / LOGIN
// =======================
function irParaLogin(tipo) {
    localStorage.setItem("tipoUsuario", tipo);
    window.location.href = "login.html";
}

function toggleMenu() {
    const menu = document.getElementById("menuLogin");
    if (menu) {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }
}

// =======================
// 🔑 SENHA (VALIDAÇÃO)
// =======================
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");
const progressoBarra = document.getElementById("progresso");
const forcaTexto = document.getElementById("forca");
const mensagemConfirmacao = document.getElementById("mensagemConfirmacao");

// =======================
// 🔑 VALIDAÇÃO VISUAL
// =======================
if (senhaInput && confirmarSenhaInput && progressoBarra) {

    senhaInput.addEventListener("input", atualizarTudo);
    confirmarSenhaInput.addEventListener("input", atualizarTudo);

    function atualizarTudo() {
        const senha = senhaInput.value;
        const confirmar = confirmarSenhaInput.value;

        const forca = calcularForca(senha);
        const nivel = classificarForca(forca);

        atualizarBarra(forca, nivel);
        verificarConfirmacao(senha, confirmar);
    }

    function calcularForca(senha) {
        let pontos = 0;

        if (senha.length >= 8) pontos++;
        if (/[a-z]/.test(senha)) pontos++;
        if (/[A-Z]/.test(senha)) pontos++;
        if (/[0-9]/.test(senha)) pontos++;
        if (/[^A-Za-z0-9]/.test(senha)) pontos++;

        return pontos;
    }

    function classificarForca(pontos) {
        if (pontos <= 2) return "fraca";
        if (pontos <= 4) return "media";
        return "forte";
    }

    function atualizarBarra(pontos, nivel) {
        const porcentagem = (pontos / 5) * 100;
        progressoBarra.style.width = porcentagem + "%";

        if (pontos === 0) {
            progressoBarra.style.width = "0%";
            progressoBarra.style.backgroundColor = "#ddd";
            if (forcaTexto) forcaTexto.textContent = "";
            return;
        }

        if (nivel === "fraca") {
            progressoBarra.style.backgroundColor = "#e53935";
            if (forcaTexto) forcaTexto.textContent = "Senha fraca";
        } 
        else if (nivel === "media") {
            progressoBarra.style.backgroundColor = "#fb8c00";
            if (forcaTexto) forcaTexto.textContent = "Senha média";
        } 
        else {
            progressoBarra.style.backgroundColor = "#43a047";
            if (forcaTexto) forcaTexto.textContent = "Senha forte";
        }
    }

    function verificarConfirmacao(senha, confirmar) {
        if (!mensagemConfirmacao) return;

        if (confirmar === "") {
            mensagemConfirmacao.textContent = "";
            return;
        }

        if (senha === confirmar) {
            mensagemConfirmacao.textContent = "As senhas coincidem";
            mensagemConfirmacao.style.color = "#43a047";
        } else {
            mensagemConfirmacao.textContent = "As senhas NÃO coincidem";
            mensagemConfirmacao.style.color = "#e53935";
        }
    }
}

// =======================
// 📩 VALIDAÇÃO NO ENVIO
// =======================
const form = document.querySelector("form");

if (form && senhaInput && confirmarSenhaInput) {
    form.addEventListener("submit", function (e) {
        const senha = senhaInput.value;
        const confirmar = confirmarSenhaInput.value;

        let pontos = 0;
        if (senha.length >= 8) pontos++;
        if (/[a-z]/.test(senha)) pontos++;
        if (/[A-Z]/.test(senha)) pontos++;
        if (/[0-9]/.test(senha)) pontos++;
        if (/[^A-Za-z0-9]/.test(senha)) pontos++;

        const nivel = pontos <= 2 ? "fraca" : pontos <= 4 ? "media" : "forte";
        const iguais = senha === confirmar;

        if (senha.length === 0 || nivel === "fraca" || !iguais) {
            e.preventDefault();

            if (mensagemConfirmacao) {
                mensagemConfirmacao.textContent = "Senha muito fraca";
                mensagemConfirmacao.style.color = "#e53935";
            }
        }
    });
}