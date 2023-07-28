const formulario = document.getElementById('formulario')
let mentoriaId = null

const getIdUrl = () => {
    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)
    const id = params.get('id')
    return id
}

const buscarMentoria = async (id) => {
    const resposta = await fetch(`http://localhost:3000/mentorias/${id}`)
    const mentoria = await resposta.json()
    return mentoria
}

const buscarMentor = async (id) => {
    const resposta = await fetch(`http://localhost:3000/mentores/${id}`)
    const mentor = await resposta.json()
    return mentor
}

const buscarMentores = async () => {
    const resposta = await fetch('http://localhost:3000/mentores')
    const mentores = await resposta.json()
    return mentores
}

const carregarSelect = async () => {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')

    const opcaoVazia = new Option()
    mentorSelect.options.add(opcaoVazia)

    mentores.forEach(mentor => {
        const opcao = new Option(mentor.nome, mentor.id)
        mentorSelect.options.add(opcao)
    })
}

const carregarDadosFormulario = async (mentoria) => {
    document.getElementById('tituloDaMentoria').value = mentoria.tituloDaMentoria
    document.getElementById('mentor').value = mentoria.mentor.id
}

const editarMentoria = async (id, mentoria) => {
    await fetch(`http://localhost:3000/mentorias/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentoria)
    })
}

const carregarDados = async () => {
    mentoriaId = getIdUrl()
    const mentoria = await buscarMentoria(mentoriaId)
    await carregarSelect(mentoria)
    carregarDadosFormulario(mentoria)
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const tituloDaMentoria = formulario.elements['tituloDaMentoria'].value
    const mentor = formulario.elements['mentor'].value
    const status = formulario.elements['status'].value

    const mentorObjeto = await buscarMentor(mentor)

    const mentoria = {
        tituloDaMentoria,
        mentor: {
            nome: mentorObjeto.nome,
            id: mentorObjeto.id
        },
        status,
    }

    editarMentoria(mentoriaId, mentoria)
    window.location = '../html/mentorias.html'
    
})

carregarDados()