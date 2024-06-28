const imoveis = buscarTodosImoveis()


function criarImovelHTML (imovel){
    const section = document.createElement("section")
    section.setAttribute("class", "listing")

    //Adiciona a imagem na Div
    const img = document.createElement("img")
    img.setAttribute("class", "listing-photo")
    img.setAttribute("src", imovel.url_foto)
    section.appendChild(img)

    //Adiciona o nome da Div
    const h2 = document.createElement("h2")
    h2.setAttribute("class", "listing-heading")
    h2.textContent = imovel.nome
    section.appendChild(h2)

    //Adiciona as informações
    const p = document.createElement("p")
    p.setAttribute("class", "listing-location")
    p.textContent = `${imovel.cidade}, ${imovel.estado}`
    section.appendChild(p)

    //Atribui a ancora de veja mais
    const a = document.createElement("a")
    a.textContent = "Veja mais"
    const url = `detalhes.html?imovelId=${imovel.id}`
    a.setAttribute("href", url)
    section.appendChild(a)

    const sectionResults = document.getElementById("lista-imoveis")
    sectionResults.appendChild(section)
}

function filtrar(){
    const pesquisa = document.getElementById("pesquisa").value
    listarImoveisComFiltro(pesquisa)
}

function listarImoveisComFiltro(texto) {

    limparListaImoveis()

    if (texto == "") {
        mostrarTodosOsImoveis()        
    } else {
        for (let i = 0; i < imoveis.length; i++) {
            const imovel = imoveis[i];
    
            const textoM = removerAcentos(texto.toUpperCase())
            const estadoImovelM = removerAcentos(imovel.estado.toUpperCase())
            const cidadeImovelM = removerAcentos(imovel.cidade.toUpperCase())

            if(cidadeImovelM.search(textoM) == 0 || estadoImovelM.search(textoM) == 0){
                criarImovelHTML(imovel)
            }
        }
    }
}

function mostrarTodosOsImoveis() {
    for (let i=0; i < imoveis.length; i++){
        const imovel = imoveis[i]
        criarImovelHTML(imovel)
    }
}

function limparListaImoveis() {
    const sectionResults = document.getElementById("lista-imoveis")

    while (sectionResults.lastElementChild) {
        sectionResults.removeChild(sectionResults.lastElementChild)
    }
}

mostrarTodosOsImoveis()

function filtrarComEnter(tecla) {
    if (tecla.keyCode == 13) {
        tecla.preventDefault()
        filtrar()
    }
}

function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

}