import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'

const appServer = new Elysia({adapter: node()})
    .get('/', 'Elysia from Honkai Impact 3rd')
    .listen(3000, ({hostname, port}) => {
        console.log('🌸🌸 Elysia is running on http://${hostname}:${port}')
    })

appServer.

