const listaAmigos = [];
const sorteados = [];

const ulLista = document.getElementById("listaAmigos");
const ulResultado = document.getElementById("resultado");
const inputNome = document.getElementById("amigo");

function adicionarAmigo() {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

// Verifica se o nome já existe na lista (case-insensitive)
    const nomeExiste = listaAmigos.some(n => n.toLowerCase() === nome.toLowerCase());
    if (nomeExiste) {
        alert("Este nome já existe na lista.");
        inputNome.value = "";
        inputNome.focus();
        return;
    }

    listaAmigos.push(nome);
    atualizarLista();
    inputNome.value = "";
    inputNome.focus();
}

function atualizarLista() {
    ulLista.innerHTML = "";
    listaAmigos.forEach((nome, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${nome}`;
        ulLista.appendChild(li);
    });
}

function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("Todos os nomes já foram sorteados!");
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * listaAmigos.length);
    const nomeSorteado = listaAmigos.splice(indiceSorteado, 1)[0]; // Remove o nome da lista
    sorteados.push(nomeSorteado); // Adiciona ao histórico

    // Exibe o nome sorteado
    ulResultado.innerHTML = `<li><strong>🎉 Amigo Secreto: ${nomeSorteado} 🎉</strong></li>`;

    atualizarLista();

    // Verifica se todos foram sorteados
    if (listaAmigos.length === 0) {
        const liFinal = document.createElement("li");
        liFinal.innerHTML = `<em>✅ Todos os nomes foram sorteados!</em>`;
        ulResultado.appendChild(liFinal);

        // Reinicia o jogo após 5 segundos
        setTimeout(reiniciarJogo, 5000);
    }
}

function reiniciarJogo() {
    // Limpa listas
    listaAmigos.length = 0;
    sorteados.length = 0;

    ulLista.innerHTML = "";
    ulResultado.innerHTML = "";
    
    inputNome.focus();
}

