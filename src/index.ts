import { Hono } from 'hono'
import { logger } from 'hono/logger'
import nodemailer from 'nodemailer'
/*
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

*/

const mailTransporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b45fa93dbaee26",
    pass: "fea914cb38ae7a"
  }
});

mailTransporter.verify((error) => {
  if (error) {
    console.log('Connection error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

function mail(MailAddress:string){
  let mailDetails = {
    to: MailAddress,
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
  return mailDetails
}

const app = new Hono()
const server = new Hono()
app.use(logger())


server.post('/', async (c, next) => {
  await next()
  console.log((await c.req.json()).email)
  mailTransporter
    .sendMail(mail((await c.req.json()).email as string),
        function (err, data) {
            if (err) {
              return c.json({ DataReceived: false })
            } else {
              return c.json({ DataReceived: true })
            }
        });
  

}
)

app.route('/api/', server)

const port = process.env.PORT

Bun.serve({
  port: port,
  development: true,
  fetch: app.fetch,
})

console.log(`runnin da server on ${port}`)  