const User = require('../models/User');
const { verify } = require('jsonwebtoken');


//Middleware to authenticate the user
module.exports = {
    authCookie: async (req, res, next) => {
        const { accessToken, refreshToken } = req.cookies

        if (accessToken && refreshToken) {
            const payload = jwt.verify(accessToken, JWT_SECRET, async function (err, decoded) {
                if (err) {
                    if (err.message === 'jwt expired') {
                        const refreshPayload = jwt.verify(refreshToken, JWT_SECRET, async function (err, decoded) {
                            if (err) {
                                res.cookie('accessToken', { maxAge: 0 })
                                res.cookie('refreshToken', { maxAge: 0 })
                                res.json({ error: 'Token expired' }).end()
                                return
                            }
                            if (decoded) {
                                const user = await User.findOne({ _id: decoded.id })
                                if (user) {
                                    if (user.verified_email == true) {
                                        req.user = user
                                        const newAccessToken = await user.regenerateAuthToken();
                                        res.cookie('accessToken', newAccessToken,
                                            {
                                                maxAge: 1000 * 60 * 60 * 24 * 7,
                                            });
                                        next()
                                    }

                                    else {
                                        return res.json({ "status": "failed", "message": "kindly verify your email first" })
                                    }
                                }
                                else {
                                    res.cookie('accessToken', '', { maxAge: 0 })
                                    res.cookie('refreshToken', '', { maxAge: 0 })
                                    res.json({ error: 'Invalid authentication token' }).end()
                                    return
                                }
                            }
                        })
                    }
                    else {
                        res.cookie('accessToken', '', { maxAge: 0 })
                        res.cookie('refreshToken', '', { maxAge: 0 })
                        res.json({ error: 'Invalid authentication token' }).end()
                        return
                    }
                }
                if (decoded) {
                    const user = await User.findOne({ _id: decoded.id })
                    if (user) {
                        if (user.verified_email == true) {
                            req.user = user
                            next()
                        }
                        else {
                            return res.json({ "status": "failed", "message": "kindly verify your email first" })

                        }
                        req.user = user
                        next()
                    }
                    else {
                        res.cookie('accessToken', '', { maxAge: 0 })
                        res.cookie('refreshToken', '', { maxAge: 0 })
                        res.json({ error: 'Invalid authentication token' }).end()
                        return
                    }
                }
            })
        }
        else {
            res.cookie('accessToken', '', { maxAge: 0 })
            res.cookie('refreshToken', '', { maxAge: 0 })
            res.json({ error: 'Invalid authentication token' }).end()
            return
        }

    },
    authToken: async (req, res, next) => {
        try {
            const authToken = req.params.token;
            if (authToken) {
                const token = await verify(authToken, process.env.JWT_SECRET_KEY);
                const user = await User.findOne({ _id: token.id })
                if (user === null || user === []) {
                    return res.json({ "status": "failed", "message": "kindly login first" })
                }
                else {
                    if (user.verified_email == true) {
                        req.user = user
                        next()
                    }
                    else return res.json({ "status": "failed", "message": "kindly verify your email first" })

                }

            }
        } catch (err) {
            console.log(err.message)
            if (err.message === 'jwt expired') {
                res.status(403).json({ 'status': 'failed', 'message': 'token/session expired Please login again' })
            }
            else res.status(403).json({ error: err.message });
        }
    },
    authHeader: async (req, res, next) => {
        try {
            if (req.header("Authorization")) {
                const userToken = req.header("Authorization")
                const token = await verify(userToken, process.env.JWT_SECRET_KEY);
                const user = await User.findOne({ _id: token.id })
                if (user !== [] || user !== null) {
                    if (user.verified_email == true) {
                        req.user = user
                    }
                    else return res.json({ "status": "failed", "message": "kindly verify your email first" })
                }
            }
            else return res.json({ "status": "failed", "message": "kindly login first" })
            next();
        }
        catch (err) {
            console.log(err.message);
            if (err.message === 'jwt expired') {
                res.status(403).json({ 'status': 'failed', 'message': 'token/session expired Please login again' })
            }
            else res.json({ "status": "failed", "message": "kindly login first" })
        }
    }
}

