const bcrypt = require("bcrypt");
const saltRounds = 10;
class cryptService {
    cryptify(password) //convert normal pass to hashed pass.
    {
        return bcrypt.hash(password, saltRounds)
    }

    async verify ( decoded_pass, encoded_pass) //return true/false
    {
        return bcrypt.compare(decoded_pass, encoded_pass);
    }
}

module.exports= cryptService;