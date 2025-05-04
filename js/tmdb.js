
export const buscarFilmes = async (pagina = 1) => {
    try {
            const respostaGeneros = await fetch(
            'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR',
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmVkM2VkNzM3YThiODMzMTVmMTliZTgyMDAxMDkxYyIsIm5iZiI6MTc0NTg4MTYxNy44ODksInN1YiI6IjY4MTAwYTExYTkwYWNhZjZlZWVhZWVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pb87VoUpzgIS9bGtDrIrjqHFAz-FI5DCB_ctOWgJG80`,
                    'accept': 'application/json'
                }
            }
        );
        const dadosGeneros = await respostaGeneros.json();
        const generosMap = dadosGeneros.genres.reduce((map, genero) => {
            map[genero.id] = genero.name;
            return map;
        }, {});

        const respostaFilmes = await fetch(
            `https://api.themoviedb.org/3/discover/movie?page=${pagina}&sort_by=popularity.desc&include_adult=false&language=pt-BR&include_image_language=pt,null`,
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmVkM2VkNzM3YThiODMzMTVmMTliZTgyMDAxMDkxYyIsIm5iZiI6MTc0NTg4MTYxNy44ODksInN1YiI6IjY4MTAwYTExYTkwYWNhZjZlZWVhZWVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pb87VoUpzgIS9bGtDrIrjqHFAz-FI5DCB_ctOWgJG80`,
                    'accept': 'application/json'
                }
            }
        );
        const dadosFilmes = await respostaFilmes.json();
        
        
        const filmesLimitados = dadosFilmes.results.slice(0, 10);
        
        const filmesComGeneros = filmesLimitados.map(filme => ({
            ...filme,
            generosFormatados: filme.genre_ids && filme.genre_ids.length > 0 
                ? filme.genre_ids.map(id => generosMap[id]).filter(Boolean).join(', ')
                : 'Gênero não disponível'
        }));

        return filmesComGeneros || [];
    } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);
        return [];
    }
};

