const formulario = document.getElementById('formulario')

const cadastrarMentor = async (mentor) => {
    await fetch('http://localhost:3000/mentores', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    window.location = '../html/mentores.html'
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    const mentor = {
        nome,
        email
    }

    cadastrarMentor(mentor)
})