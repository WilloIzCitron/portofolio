import { randomInt } from 'crypto'
import { Elysia, file } from 'elysia'
import fs from 'fs'
import path from 'path'

var imageIndex = 0;
const imageDirectory = path.join(__dirname, '..\\..\\public\\dolls')
const imageCount = fs.readdirSync(imageDirectory).filter(file => file.startsWith('doll')).length

function bijinDollAPI(app: Elysia) {
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