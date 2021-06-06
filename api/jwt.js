const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        jwt.verify(
            token,
            "789.#napolean_hill!tagr", {
                algorithm: "HS256"
            },
            (err, user) => {
                console.log(user)
                if (err) {
                    res.status(403).json({
                        error: "not Authorized"
                    });
                } else {
                    req.user = true;
                    next();
                    // if(user.role === 'admin'){
                    //     req.user = true;
                    //     next();
                    // }
                    // else{
                    //     res.status(403).send({ error: "Not Authorized For non admin" });
                    // }

                }
            }
        );
    } else {
        res.status(403).send({
            error: "Not Authorized"
        });
    }
};