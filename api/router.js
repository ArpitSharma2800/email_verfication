const md5 = require('md5');
const {
    v4: uuidv4
} = require("uuid");
const jwt = require("jsonwebtoken");
const {
    create,
    checkuser
} = require('./service');
const {
    sendVerficationMail
} = require('./controller');

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
        let id = uuidv4()
        if (!name || !email || !pass) {
            return res
                .code(403)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({
                    success: false,
                    message: "Pass all required fields"
                });
        } else {
            const token = jwt.sign({
                username: name,
                useremail: email,
                userId: id
            }, process.env.JWT, {
                expiresIn: "10m",
            });
            data = {
                id: id,
                name: name,
                email: email,
                pass: md5(pass),
                lastLogin: null,
                verfiedEmail: false,
                jwttoken: token
            }
            sendVerficationMail(data, (err, results) => {
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
            });

        }

    },
    verificationMail: (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let lastLogin = null;
        let verfiedEmail = false;
        let jwttoken = null;
        if (!name || !email) {
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
                lastLogin: null,
                verfiedEmail: false,
                jwttoken: null
            }
            checkuser(data, (err, results) => {
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
                if (results[0] == null) {
                    return res
                        .code(403)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({
                            success: true,
                            message: "no user found",
                        });
                } else if (results[0].verfiedEmail == 1) {
                    return res
                        .code(201)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({
                            success: true,
                            message: "User already verfied",
                        });
                } else {
                    sendVerficationMail(data, (err, results) => {
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

            });
        }
    },
}