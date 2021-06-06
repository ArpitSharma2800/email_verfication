const md5 = require('md5');
const {
    v4: uuidv4
} = require("uuid");
const {
    create
} = require('./service');

module.exports = {
    serverCheck: (req, res) => {
        return res
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({
                success: true,
                message: "Server running .."
            });
    },
    createUser: (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let pass = req.body.password;
        let lastLogin = null;
        let verfiedEmail = false;
        let jwttoken = null;
        if (!name || !email || !pass) {
            return res
                .code(500)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({
                    success: false,
                    message: "Pass all required fields"
                });
        } else {
            data = {
                id: uuidv4(),
                name: name,
                email: email,
                pass: md5(pass),
                lastLogin: null,
                verfiedEmail: false,
                jwttoken: null
            }
            create(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return res
                        .code(500)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({
                            success: false,
                            message: err,
                        });
                }
                return res
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({
                        success: true,
                        message: "SUCCESS MESSAGE",
                    });
            });
        }

    }
}