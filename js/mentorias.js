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
                    <button type="submit" onclick="editarMentoria(${mentoria.id})"><i class="fa-solid fa-pencil"></i></button>
                    <button type="submit" onclick="excluirMentoria(${mentoria.id})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </div>
        </tr>
        `
        tabelaMentoria.innerHTML = tabelaMentoria.innerHTML + mentoriaHtml;
    });
}

const getMentorias = async () => {
    try {
        const apiResponse = await fetch('http://localhost:3000/mentorias')
        const mentorias = await apiResponse.json()
        console.log(mentorias)
        mostrarTabelaMentoria(mentorias)
    } catch (error){
        console.error(error)
    }
}

const getRota = async (rota) => {
    try {
        const apiResponse = await fetch(`http://localhost:3000/${rota}`)
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
        await fetch(`http://localhost:3000/mentorias/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })

        getMentorias()
    } catch (error) {
        console.error(error)
    }
    
}

getMentorias()