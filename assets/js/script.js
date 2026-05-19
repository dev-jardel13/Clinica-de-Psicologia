// =======================
// 🔐 LOGIN E LOGOUT
// =======================

function fazerLogout() {

    localStorage.removeItem("logado");
    localStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";

}

function verificarLogin() {

    const logado = localStorage.getItem("logado");

    if (logado === "true") {

        window.location.href = "index.html";

    } else {

        window.location.href = "login.html";

    }

}


// =======================
// 🌙 TEMA
// =======================

const button = document.getElementById("theme-toggle");

if (button) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        button.textContent = "☀️";

    }

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
// 🔀 MENU LOGIN
// =======================

function irParaLogin(tipo) {

    localStorage.setItem("tipoUsuario", tipo);

    window.location.href = "login.html";

}

function toggleMenu() {

    const menu = document.getElementById("menuLogin");

    if (menu) {

        menu.style.display =
            menu.style.display === "block"
                ? "none"
                : "block";

    }

}


// =======================
// 👤 SELEÇÃO DE SEXO
// =======================

const sexoBtns = document.querySelectorAll(".sexo-btn");

const sexoInput = document.getElementById("sexoInput");

sexoBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        // remove seleção anterior
        sexoBtns.forEach(b => {

            b.classList.remove("selected");

        });

        // adiciona seleção atual
        btn.classList.add("selected");

        // salva valor
        sexoInput.value = btn.dataset.value;

        console.log(sexoInput.value);

    });

});

// =======================
// 🔑 VALIDAÇÃO DE SENHA
// =======================

const senhaInput =
    document.getElementById("senha");

const confirmarSenhaInput =
    document.getElementById("confirmarSenha");

const progressoBarra =
    document.getElementById("progresso");

const forcaTexto =
    document.getElementById("forca");

const mensagemConfirmacao =
    document.getElementById("mensagemConfirmacao");


// =======================
// 🔐 VALIDAÇÃO VISUAL
// =======================

if (
    senhaInput &&
    confirmarSenhaInput &&
    progressoBarra
) {

    senhaInput.addEventListener(
        "input",
        atualizarTudo
    );

    confirmarSenhaInput.addEventListener(
        "input",
        atualizarTudo
    );

    function atualizarTudo() {

        const senha =
            senhaInput.value;

        const confirmar =
            confirmarSenhaInput.value;

        const forca =
            calcularForca(senha);

        const nivel =
            classificarForca(forca);

        atualizarBarra(forca, nivel);

        verificarConfirmacao(
            senha,
            confirmar
        );

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

        const porcentagem =
            (pontos / 5) * 100;

        progressoBarra.style.width =
            porcentagem + "%";

        if (pontos === 0) {

            progressoBarra.style.width = "0%";

            progressoBarra.style.backgroundColor =
                "#ddd";

            forcaTexto.textContent = "";

            return;

        }

        if (nivel === "fraca") {

            progressoBarra.style.backgroundColor =
                "#e53935";

            forcaTexto.textContent =
                "Senha fraca";

        } else if (nivel === "media") {

            progressoBarra.style.backgroundColor =
                "#fb8c00";

            forcaTexto.textContent =
                "Senha média";

        } else {

            progressoBarra.style.backgroundColor =
                "#43a047";

            forcaTexto.textContent =
                "Senha forte";

        }

    }

    function verificarConfirmacao(
        senha,
        confirmar
    ) {

        if (confirmar === "") {

            mensagemConfirmacao.textContent =
                "";

            return;

        }

        if (senha === confirmar) {

            mensagemConfirmacao.textContent =
                "As senhas coincidem";

            mensagemConfirmacao.style.color =
                "#43a047";

        } else {

            mensagemConfirmacao.textContent =
                "As senhas NÃO coincidem";

            mensagemConfirmacao.style.color =
                "#e53935";

        }

    }

}


// =======================
// 📩 CADASTRO
// =======================

const formCadastro =
    document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const nome =
                document.querySelector(
                    'input[name="nome"]'
                ).value;

            const email =
                document.querySelector(
                    'input[name="email"]'
                ).value.toLowerCase();

            const telefone =
                document.querySelector(
                    'input[name="telefone"]'
                ).value;

            const cpf =
                document.querySelector(
                    'input[name="cpf"]'
                ).value;

            const dataNascimento =
                document.querySelector(
                    'input[name="data_nascimento"]'
                ).value;

            const endereco =
                document.querySelector(
                    'input[name="endereco"]'
                ).value;

            const sexo =
                sexoInput.value;

            const senha =
                senhaInput.value;

            const confirmar =
                confirmarSenhaInput.value;

            // validar sexo
            if (!sexo) {

                alert(
                    "Selecione o sexo!"
                );

                return;

            }

            // validar senha
            if (senha !== confirmar) {

                alert(
                    "As senhas não coincidem!"
                );

                return;

            }

            // pegar usuários
            let usuarios =
                JSON.parse(
                    localStorage.getItem(
                        "usuarios"
                    )
                ) || [];

            // verificar email
            const emailExiste =
                usuarios.some(
                    usuario =>
                        usuario.email === email
                );

            if (emailExiste) {

                alert(
                    "Este email já está cadastrado!"
                );

                return;

            }

            // verificar cpf
            const cpfExiste =
                usuarios.some(
                    usuario =>
                        usuario.cpf === cpf
                );

            if (cpfExiste) {

                alert(
                    "Este CPF já está cadastrado!"
                );

                return;

            }

            // criar usuário
            const novoUsuario = {

                nome,
                email,
                telefone,
                cpf,
                dataNascimento,
                endereco,
                sexo,
                senha

            };

            // salvar
            usuarios.push(novoUsuario);

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );

            alert(
                "Cadastro realizado com sucesso!"
            );

            window.location.href =
                "login.html";

        }
    );

}


// =======================
// 🔓 LOGIN
// =======================

const formLogin =
    document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const email =
                document.querySelector(
                    'input[name="email"]'
                ).value.toLowerCase();

            const senha =
                document.querySelector(
                    'input[name="senha"]'
                ).value;

            const usuarios =
                JSON.parse(
                    localStorage.getItem(
                        "usuarios"
                    )
                ) || [];

            const usuarioEncontrado =
                usuarios.find(
                    usuario =>
                        usuario.email === email &&
                        usuario.senha === senha
                );

            if (usuarioEncontrado) {

                localStorage.setItem(
                    "logado",
                    "true"
                );

                localStorage.setItem(
                    "usuarioLogado",
                    JSON.stringify(
                        usuarioEncontrado
                    )
                );

                alert(
                    "Login realizado com sucesso!"
                );

                window.location.href =
                    "index.html";

            } else {

                alert(
                    "Email ou senha incorretos!"
                );

            }

        }
    );

}