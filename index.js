import express from 'express'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname )
const app = express();
app.use(express.static(resolve(__dirname + '/dist')));
app.get('*', (req, res) => {
    const html = readFileSync(__dirname + '/dist/index.html', 'utf-8')
    res.send(html)
})
const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});