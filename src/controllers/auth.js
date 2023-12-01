const authService = require('../services/auth');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const { codehttp, ...rest } = await authService.login(email, password);
        return res.status(codehttp).json(rest);
    }

    async register(req, res) {
        const { name, email, password } = req.body;
        const { codehttp, ...rest } = await authService.register(name, email, password);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    AuthController,
};