import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { html, Html } from '@elysiajs/html'
import appCkat from './ckat'

const app = new Elysia({ adapter: node() })
    appCkat(app)
    app.use(html())
    .get('/', 'Elysia from Honkai Impact 3rd')
    .listen(3000, ({ hostname, port }) => {
        console.log(`🌸🌸 Elysia is running on http://localhost:${port}`)
    })

