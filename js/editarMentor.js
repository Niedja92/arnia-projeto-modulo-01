const formulario = document.getElementById('formulario')
//1º criar uma variável com um valor global
let mentorId = null

//1º na função carregarDadosEditar, o primeiro passo é carregar dos dados que foram recuperados através do ID
const recuperarDadosId = () => {
    const parametros = window.location.search
    const parametrosObjeto = new URLSearchParams(parametros)
    const id = parametrosObjeto.get('id')
    return id
}

//2º buscar o mentor cadastrado através do endereço da URL passando o parâmetro, que nesse caso, será o ID. Obs.: função assíncrona.
const buscarMentor = async (id) => {
    const resultado = await fetch(`http://localhost:3000/mentores/${id}`)
    const mentor = await resultado.json()
    return mentor
}

//3º em seguida a função carregarDadosMentor deve puxar esses dados do documento html
const carregarDadosMentor = async (mentor) => {
    document.getElementById('nome').value = mentor.nome 
    document.getElementById('email').value = mentor.email
}

//1º função que irá carregar os dados da varíavel global (no início), onde os dados serão recuperados, o mentor aguardará uma resposta que ao ser carregada, retornará os dados do mentor (nome e id)
const carregarDadosEditar = async () => {
    mentorId = recuperarDadosId()
    const mentor = await buscarMentor(mentorId)
    carregarDadosMentor(mentor)
}


//5º
const editarMentor = async (id, mentor) => {
    await fetch(`http://localhost:3000/mentores/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
}
//4º DOM - escuta o evento desejado ao clicar no botão SALVAR do html
formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    const mentor = {
        nome,
        email
    }

    await editarMentor(mentorId, mentor)
    window.location = '../html/mentores.html'
})

carregarDadosEditar()