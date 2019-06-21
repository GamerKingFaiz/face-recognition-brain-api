const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) { // Validating for all inputs (email and password) before going any further
        return res.status(400).json('Incorrect form submission');
    }
    db.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            const passwordIsValid = bcrypt.compareSync(password, data[0].hash); // Comparing password to hash in DB
            if (passwordIsValid) {
                return db.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('Wrong email or password')
            }
        })
        .catch(err => res.status(400).json('Wrong email or password'))
}

module.exports = {
    handleSignin
}