require("dotenv").config();

const fastify = require('fastify')({
    logger: true
});

const {
    createUser,
    serverCheck,
    verificationMail
} = require("./api/router");



// fastify.register(require('cors'), (instance) => {
//     (req, cb) => {
//         let corsOptions;
//         if (/localhost/.test(origin)) {
//             corsOptions = {
//                 origin: false
//             }
//         } else {
//             corsOptions = {
//                 origin: true
//             }
//         }
//         callback(null, corsOptions)
//     }
// })

fastify.get("/check", serverCheck);
fastify.post('/create', createUser);
fastify.post('/verfication', verificationMail);

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        console.log("startd");
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();