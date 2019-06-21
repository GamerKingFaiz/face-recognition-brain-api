const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) { // Validating for all inputs (email, name, and password) before going any further
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password); // Hashing password
    db.transaction(trx => { // Transacting SQL
        trx.insert({ // First transact call
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users') // Second transact call
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register.'))
}

module.exports = {
    handleRegister
};