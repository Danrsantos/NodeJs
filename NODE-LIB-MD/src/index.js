import fs from 'fs';

import chalk from 'chalk';

function trataErro (erro){
    throw new Error(chalk.red(erro.code, 'Arquivo não encontrado'));
}

// trabalhando com codigo assincrono "promises com then"

// function pegaArquivo(caminhoDoArquivo){
//     const enconding = 'utf-8';
//     fs.promises
//     .readFile(caminhoDoArquivo, enconding)
//     .then((texto) => console.log(chalk.blue(texto)))
//     .catch(trataErro);
// }

// assync / await

async function pegaArquivo(caminhoDoArquivo){
    try{
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, enconding)
        return extraiLinks(texto);
    } catch(erro){
        trataErro(erro);
    }

}

function extraiLinks (texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}

export default pegaArquivo;

// pegaArquivo('./texto.md');

