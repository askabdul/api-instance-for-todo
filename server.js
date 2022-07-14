const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let tasks = [];

app.get('/todos', (req, res) => {
    res.status(200).json(tasks);
});


// app.get('/todos-delay', (req, res) => {
//     setTimeout(() => {
//         res.status(200).json(tasks);
//     },6000)
// });



app.post('/todos', (req, res) => {
    const { text } = req.body;

    if (text) {
        const newTodo = {
            id: uuidv4(),
            text,
            isCompleted: false
        }

        tasks.push(newTodo);
        res.status(200).json(newTodo);
    } else {
        res.status(400).json({ msg: 'Req must have a text in it' })
    }
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;

    tasks = tasks.map(task => {
        return task.id === id ? { ...task, isCompleted: !task.isCompleted } : { ...task }
    });

    const findMatch = tasks.find(task => task.id === id);

    res.status(200).json(findMatch);

});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    
    const findMatch = tasks.find(task => task.id === id);

    tasks = tasks.filter(task => task.id !== id);
    

    res.status(200).json(findMatch)
})


app.listen(8080, () => console.log('server started'));