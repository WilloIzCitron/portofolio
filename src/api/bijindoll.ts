import { randomInt } from 'crypto'
import { Elysia, file } from 'elysia'
import fs from 'fs'
import path from 'path'
import { rateLimit } from 'elysia-rate-limit'
import { fileURLToPath } from 'url'

var imageIndex = 0;
const imageDirectory = path.join(import.meta.dirname, '../../public/dolls')
const imageCount = fs.readdirSync(imageDirectory).filter(file => file.startsWith('doll')).length

function bijinDollAPI(app: Elysia) {
    app.use(rateLimit({errorResponse: new Response("rate-limited", {
        status: 429,
        headers: new Headers({
          'Content-Type': 'text/json'
        })
        }),
        generator: (req, server) => (server == null ) ? server?.requestIP(req)?.address ?? "" : ""
        }))
    app.onError(({code, error}) => {
        if (code === 429) {
            return { error: 'Uh oh, your\'e been rate limited!' }
        }
    });
    app.get('/bijindoll', () => {
        imageIndex = randomInt(1, imageCount + 1)
        return file(`public/dolls/doll (${imageIndex}).` + (imageIndex > 917 ? 'png' : 'jpg'))
    })
}

export default bijinDollAPI
