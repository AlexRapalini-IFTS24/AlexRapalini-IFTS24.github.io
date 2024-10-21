const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const pool = require('../db/db');



const register = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 8, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
      if (error) {
        // console.error('Error registrando usuario:', error);
        return res.status(500).send({auth: false, token: null});
      }

       // Obtener el ID del nuevo usuario desde la base de datos
        const userId = results.insertId;
        const token = jwt.sign({ id: userId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ userId, auth: true, token });
        // console.log(userId);
        // console.log(token);
      
    });
  });
};




const login = (req, res) => {
  const { username, password } = req.body;

  pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('Error logging in:', error);
      return res.status(500).send('Error logging in');
    }

    if (results.length === 0) return res.status(404).send('Ususario no encontrado');

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isValidPassword) => {
      if (err || !isValidPassword) return res.status(401).send({auth: false, token: null});

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ auth: true, token });
    });
  });
};


  



module.exports = { register, login };