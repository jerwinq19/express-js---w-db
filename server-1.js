const express = require('express')
const sqlite = require('sqlite3').verbose()
const cors = require('cors')
const app = express()
const PORT = 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const user = [
    { id: 1, name: "Jerwin", age: 19 },
    { id: 2, name: "Alicia", age: 22 },
    { id: 3, name: "Miguel", age: 25 },
    { id: 4, name: "Sophia", age: 21 },
    { id: 5, name: "Liam", age: 23 },
    { id: 6, name: "Noah", age: 20 },
    { id: 7, name: "Emma", age: 24 },
    { id: 8, name: "Olivia", age: 22 },
    { id: 9, name: "Ethan", age: 27 },
    { id: 10, name: "Ava", age: 26 },
    { id: 11, name: "Lucas", age: 28 },
    { id: 12, name: "Isabella", age: 23 },
    { id: 13, name: "Mason", age: 30 },
    { id: 14, name: "Charlotte", age: 19 },
    { id: 15, name: "Elijah", age: 31 }
];

const db = new sqlite.Database('./users.db', (err) => {
    if (err) return console.log(err.message)
    console.log("Connected to sqlite database!")
})


db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
)`)


// get all user 
app.get('/user', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({"msg": "status error code 500"})
        res.json(rows)
    })
})

// get a specific user
app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({"msg": "error fetching data."})
        if (!row) return res.status(404).json({"msg": "user not found in the database."})
        res.json(row)
    })
})

// add a user
app.post('/add-user', (req, res) => {
    const { name , age } = req.body
    db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age], (err,row) => {
        if (err) return res.status(500).send("Error saving Data")
    })
})

// delete a user
app.delete('/user/:id', (req, res) => {
    const id = req.params.id

    db.run(`DELETE FROM users WHERE id = ?`, id, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ msg: 'Failed to delete user' })
        }

        if (this.changes === 0) {
            return res.status(404).json({ msg: 'User not found' })
        }

        res.status(200).json({ msg: 'User deleted successfully' })
    })
})


app.listen(PORT, () => {
    console.log(`Server live at: http://localhost:${PORT}`)
})