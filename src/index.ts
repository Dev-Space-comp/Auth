import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { createClient } from 'redis';

const client = createClient({
  username: 'default', // use your Redis user. More info https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/
  password: 'secret', // use your password here
  socket: {
      host: 'localhost',
      port: 6379,
      tls: false
  }
});
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

const app = new Hono()
const css = new Hono()
const js = new Hono()
const server = new Hono()
app.use(logger())

app.get('/', (c) => c.text('Hello Bun!'))
app.get('/a', serveStatic({path :'/client/pages/signup.htm'}))

css.get('/signup.css', serveStatic({path : '/client/style/signup.css'}))

js.get('/signup.js', serveStatic({path: '/client/js/signup.js'}))

server.get('/', (c) => c.json({ test: true }))

app.route('/js', js)
app.route('/css', css)
app.route('/api/', server)

const port = process.env.PORT

Bun.serve( { 
    port: port, 
    development: true,
    fetch: app.fetch, 
  } )
  
console.log(`runnin da server on ${port}`)  