import { buscarFilmes } from './tmdb.js';


window.addEventListener("DOMContentLoaded", async () => {
    const titulo = document.querySelector('p');
    titulo.textContent = `${formatarDataAtual()}`;
    
    const filmes = await buscarFilmes();
    mostrarFilmes(filmes);
});

function mostrarFilmes(filmes) {
    const container = document.getElementById("filmes-container");
    container.innerHTML = '';

    if (!filmes || filmes.length === 0) {
        container.innerHTML = '<p>Nenhum filme encontrado</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'filmes-grid';

    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.className = 'filme-card';

        card.innerHTML = `
    <img src="${filme.poster_path 
        ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
        : 'https://via.placeholder.com/200x300?text=Sem+Poster'}" 
        alt="${filme.title}"
        loading="lazy">
    <h3>${filme.title}</h3>
    <p>Lançamento:</p> 
   <p>${filme.release_date ? new Date(filme.release_date).toLocaleDateString('pt-BR') : 'Sem data'}</p>
    <p>⭐ ${filme.vote_average.toFixed(1)}</p>
    <p class="genero">${filme.generosFormatados}</p>
`;
        
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function formatarDataAtual() {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();
    
    return `${dia} ${mes} de ${ano}`;
}


