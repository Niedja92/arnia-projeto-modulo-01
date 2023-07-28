const formulario = document.getElementById('formulario')
// console.log(formulario)

//2º
const buscarMentor = async (id) => {
    const resposta = await fetch(`http://localhost:3000/mentores/${id}`)
    const mentor = await resposta.json()
    return mentor
}


//1º
const buscarMentores = async () => {
    const resposta = await fetch('http://localhost:3000/mentores')
    const mentores = await resposta.json()
    return mentores
}

//1º e 2º exporta as opções de mentores da página mentores.html
const carregarSelect = async () => {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')

    const opcaoVazia = new Option()
    mentorSelect.options.add(opcaoVazia)

    mentores.forEach(mentor => {
        const opcao = new Option(mentor.nome, mentor.id)
        mentorSelect.options.add(opcao)
    });
}

//4º
const cadastrarMentoria = async (mentoria) => {
    await fetch('http://localhost:3000/mentorias', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(mentoria)
    })
    window.location = '../html/mentorias.html'
}

//3º alimenta o select com as opçoes de mentores da página mentores.html
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

    cadastrarMentoria(mentoria)
})

carregarSelect()