const express = require('express')
const express = require('sqlite3')
const app = express()
const PORT = 8080
app.use(express.json())

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


// get all user 
app.get('/user', (req, res) => {
    try {
        res.json(user)
    } catch(error) {
        res.status(500).json({"msg": "error status code 500"})
    }
})

// get a specific user
app.get('/user/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const filtered = user.find(idx => idx.id === id)

        if (!filtered) res.status(404).json({"msg": "user not found"}) // return an error if not existing
        return res.json(filtered)
    } catch (erorr) {
        res.status(500).json({"msg": "error status code 500"})
    }
})






app.listen(PORT, () => {
    console.log(`Server live at: http://localhost:${PORT}`)
})