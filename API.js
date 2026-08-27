import { error } from 'node:console';
import http from 'node:http'
import {url} from 'node:url'

const porta = 3000

const tarefas = [
    { id: 1, nome: "lavar louça" },
    { id: 2, nome: "comprar um RTX 5090" }
]

const server = http.createServer((requisicao, resposta) => {
    resposta.setHeader('Content-Type', 'application/json')
    const urlObj= new URL (requisição.url,`http://${requisiçao.heades.host}`)

    if (requisicao.method == 'GET' && requisicao.url == '/tarefas') {
        resposta.statusCode = 200
        resposta.end(JSON.stringify(tarefas))


    }else if(requisicao.method== "GET" && urlObj.pathname== "/tarefas/busca"){
        const nome= urlObj.searchParams.get('nome')
        tarefas.filter(nome=> urlObj.searchParams.get('nome') )
    
    }else if (requisicao.method == 'POST' && requisicao.url == '/tarefa') {
        let body = ''

        requisicao.on('data', (chunk) => {
            body += chunk.toString()
        });

        requisicao.on('end', () => {
            try {

                const novaTarefa = JSON.parse(body)
                if (!novaTarefa.nome) {
                    resposta.statusCode = 400
                    resposta.end(JSON.stringify({ error: "o campo 'nome' é obrigatório" }))
                }

                const tarefaCriada = {
                    id: tarefas.length + 1,
                    nome: novaTarefa.titulo
                }

                tarefas.push(tarefaCriada)
                resposta.statusCode = 201
                resposta.end(JSON.stringify(tarefaCriada));

            } catch (error) {
                resposta.statusCode = 400
                resposta.end(JSON.stringify({ error: 'formato JSON invalido!' }))

            }
        })


    } else {
        resposta.statusCode = 400
        resposta.end(JSON.stringify({ error: 'rota não encontada' }))
    }


});
server.listen(porta,()=>{
    console.log('servidor funcionando na porta ${porta}')
})