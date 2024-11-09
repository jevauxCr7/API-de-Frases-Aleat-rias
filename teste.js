async function buscarFrases() {
    const frasesContainer = document.getElementById("frasesContainer");
    frasesContainer.innerHTML = "Carregando frases...";

    try {
        const requisicoes = Array.from({ length: 5 }, () =>
            fetch("https://api.quotable.io/random").then(res => res.json())
        );

        const respostas = await Promise.all(requisicoes);

        frasesContainer.innerHTML = ""; // Limpar o conteúdo anterior
        respostas.forEach(frase => {
            const fraseDiv = document.createElement("div");
            fraseDiv.classList.add("quote");
            fraseDiv.innerHTML = `
                <p>"${frase.content}"</p>
                <p><em>- ${frase.author}</em></p>
            `;
            frasesContainer.appendChild(fraseDiv);
        });
    } catch (error) {
        frasesContainer.innerHTML = "Erro ao carregar frases. Tente novamente.";
        console.error("Erro:", error);
    }
}
