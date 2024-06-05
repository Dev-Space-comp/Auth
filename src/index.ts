import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

const app = new Hono()
const css = new Hono()
const js = new Hono()


app.get('/', (c) => c.text('Hello Bun!'))
app.get('/a', serveStatic({path :'/client/pages/signup.htm'}))

css.get('/signup.css', serveStatic({path : '/client/style/signup.css'}))

js.get('/signup.js', serveStatic({path: '/client/js/signup.js'}))

app.route('/js', js)
app.route('/css', css)

const port = process.env.PORT

Bun.serve( { 
    port: port, 
    development: true,
    fetch: app.fetch, 
  } )
  
console.log(`runnin da server on ${port}`)  