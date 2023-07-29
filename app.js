const pesquisa = document.getElementById('pesquisa')

const mostrarMentores = (tabela) => {
  const tabelaMentores = document.querySelector('tbody')
  tabelaMentores.innerHTML = ''

  tabela.forEach((mentor) => {
    const mentoresHtml = `
          <tr>
            <td>${mentor.nome}</td>
            <td>${mentor.email}</td>
            <td>
              <button class="button-icone" onclick="editarMentor(${mentor.id})"><i class="ph-bold ph-pencil-simple"></i></i></i></button>
              <button class="button-icone" onclick="excluirMentor(${mentor.id})"><i class="ph ph-trash"></i></button>
            </td>  
          </tr>             
    `
    tabelaMentores.innerHTML = tabelaMentores.innerHTML + mentoresHtml;
  });
}

const getMentores = async (textoPesquisa = null) => {
  let palavraChave = ''

  if (textoPesquisa) {
    palavraChave = `?q=${textoPesquisa}`
  }

  const apiResponse = await fetch(`http://localhost:3000/mentores${palavraChave}`)
  const tabelaMentores = await apiResponse.json()
  mostrarMentores(tabelaMentores)

}

const getMentorClass = async() => {
  try {
    const apiResponse = await fetch ('http://localhost:3000/mentores')
    const mentores = await apiResponse.json()
    console.log(mentores)
    mostrarMentores(mentores)

  } catch (error) {
    console.log(error)
  }
}

const getRota = async (rota) => {
  try {
    const apiResponse = await fetch (`http://localhost:3000/${rota}`)
    const mentorClass = await apiResponse.json()
    mostrarMentores(mentorClass)

  } catch (error) {
    console.error(error)
  }
}

const cadastrarMentor = () => {
  window.location = '../html/cadastrarMentor.html'
}

const editarMentor = (id) => {
  window.location = `../html/editarMentor.html?id=${id}`
}

const excluirMentor = async (id) => {
    await fetch(`http://localhost:3000/mentores/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })

    getMentores()
}

pesquisa.addEventListener('keyup', (e) => {
  const palavraChave = pesquisa.value
  if (palavraChave === '') {
      getMentores()
  } else if (e.key === 'Enter') {
      getMentores(palavraChave)
  } 
})

getMentores()