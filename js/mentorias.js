const pesquisa = document.getElementById('pesquisa')

const mostrarTabelaMentoria = (mentorias) => {
    const tabelaMentoria = document.querySelector('#tbody')
    tabelaMentoria.innerHTML = ''

    mentorias.forEach((mentoria) => {
        let status = 'Inativo'
        if (mentoria.status) {
            status = 'Ativo'
        }        

        const mentoriaHtml = 
        `
        <tr> 
            <td>${mentoria.tituloDaMentoria}</td>
            <td>${mentoria.mentor.nome}</td>            
            <td>${status}</td>
            <div>
                <td>
                    <button class="button-icone" onclick="editarMentoria(${mentoria.id})"><i class="ph-bold ph-pencil-simple"></i></button>
                    <button class="button-icone" onclick="excluirMentoria(${mentoria.id})"><i class="ph ph-trash"></i></button>
                </td>
            </div>
        </tr>
        `
        tabelaMentoria.innerHTML = tabelaMentoria.innerHTML + mentoriaHtml;
    });
}

const getMentorias = async (textoPesquisa) => {
    let palavraChave = ''

    if (textoPesquisa) {
        palavraChave = `?q=${textoPesquisa}`
    }

    try {
        const apiResponse = await fetch(`https://api-arnia-projeto-modulo-01.onrender.com/mentorias${palavraChave}`)
        const mentorias = await apiResponse.json()
        console.log(mentorias)
        mostrarTabelaMentoria(mentorias)
    } catch (error){
        console.error(error)
    }
}

const getRota = async (rota) => {
    try {
        const apiResponse = await fetch(`https://api-arnia-projeto-modulo-01.onrender.com/${rota}`)
        const mentoriaClass = await apiResponse.json()
        console.log(mentoriaClass)
        mostrarTabelaMentoria(mentoriaClass)
    } catch (error) {
        console.error(error)
    }
}

const cadastrarMentoria = () => {
    window.location = 'html/cadastrarMentoria.html'
}

const editarMentoria = (id) => {
    window.location = `editarMentoria.html?id=${id}`
}

const excluirMentoria = async (id) => {
    try {
        await fetch(`https://api-arnia-projeto-modulo-01.onrender.com/mentorias/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }        
    })

        getMentorias()
    } catch(error) {
        console.error(error)
    }      
}

pesquisa.addEventListener('keyup', (e) => {
    const palavraChave = pesquisa.value
    if (palavraChave === ''){
        getMentorias()
    } else if (e.key === 'Enter') {
        getMentorias(palavraChave)
    }
})


getMentorias()