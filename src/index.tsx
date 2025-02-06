import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { html, Html } from '@elysiajs/html'
import { rateLimit } from 'elysia-rate-limit'
import appCkat from './sites/ckat'
import bijinDollAPI from './api/bijindoll'

const app = new Elysia({ adapter: node() })
    app.use(html())
    appCkat(app)
    app.listen(3000, ({ hostname, port }) => {
        console.log(`🌸🌸 Elysia Web Server is running on http://localhost:${port}`)
    })

const api = new Elysia({ adapter: node() })
    api.use(rateLimit({errorResponse: new Response("rate-limited", {
    status: 429,
    headers: new Headers({
      'Content-Type': 'text/json'
    })
    }),
    generator: (req, server) => (server == null ) ? server?.requestIP(req)?.address ?? "" : ""
    }))
    api.get('/', () => {
        return { 
            list: '/bijindoll', 
            credits: 'Made by WilloIzCitron with ElysiaJS' 
        }
    })
    bijinDollAPI(api)
    api.listen(3001, ({ hostname, port }) => {
        console.log(`🌸🌸 Elysia API Server is running on http://localhost:${port}`)
    })
