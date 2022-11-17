import chalk from "chalk";

function extrailinks (arrayLinks) {
    return arrayLinks.map((objetoLInk) => Object.values(objetoLInk).join());
} 

async function checaStatus (listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try{
                const res = await fetch (url)
                return res.status;
            } catch (erro) {
                return manejaErros(erro);
            }
    })        
    )
    return arrStatus;
}

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado';
    }else {
        return 'Ocorreu algum problema';
    }
}
 
 export default async function listavalidada (listaDeLinks){
    const links = extrailinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
 }


