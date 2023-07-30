const formulario = document.querySelector('.formulario')

const cadastrarMentor = async (mentor) => {
    await fetch('https://api-arnia-projeto-modulo-01.onrender.com/mentores', {
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