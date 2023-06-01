const express = require('express');
const userArr = require('./InitialData');
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let newId = userArr.length + 1;

//get /api/student
app.get('/api/student', (req, res) => {
    try {
        //fetch all the records
        res.json({
            status: "Success",
            userArr
        });
    } catch (error) {
        res.status(400).json({
            status: "Failure",
            message: error.message
        })
    }
})

//get /api/student/:id
app.get('/api/student/:id', (req, res) => {
    try {
        //fetch the ids
        const index = userArr.findIndex((obj => obj.id == req.params.id));
        if (index == -1) {
            return res.status(400).json({
                status: "Failure",
                message: "There is no student with the given ID"
            })
        }
        res.json({
            status: "Success",
            data: userArr[index]
        });
    } catch (error) {
        res.status(400).json({
            status: "Failure",
            message: error.message
        })
    }
})

//post /api/student
app.post('/api/student', (req, res) => {
    try {
        //push the records into the array
        if (!req.body.name || !req.body.currentClass || !req.body.division) {
            return res.status(400).json({
                status: "Failed",
                message: "Student details are missing"
            })
        }
        userArr.push({
            id: newId,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        });
        newId++;

        res.json({
            status: "Success",
            id: newId
        });
    } catch (error) {
        res.status(400).json({
            status: "Failure",
            message: error.message
        })
    }
})

//put /api/student/:id
app.put('/api/student/:id', (req, res) => {
    try {
        //fetch the ids
        const index = userArr.findIndex((obj => obj.id == req.params.id));
        if (index == -1) {
            return res.status(400).json({
                status: "Failure",
                message: "There is no student with the given ID"
            })
        }
        if (req.body.name) {
            userArr[index].name = req.body.name;
        }
        if (req.body.currentClass) {
            userArr[index].currentClass = req.body.currentClass;
        }
        if (req.body.division) {
            userArr[index].division = req.body.division;
        }
        res.json({
            status: "Success",
            data: userArr[index]
        });
    } catch (error) {
        res.status(400).json({
            status: "Failure",
            message: error.message
        })
    }
})

//delete /api/student/:id
app.delete('/api/student/:id', (req, res) => {
    try {
        //fetch the ids
        const index = userArr.findIndex((obj => obj.id == req.params.id));
        if (index == -1) {
            return res.status(400).json({
                status: "Failure",
                message: "There is no student with the given ID"
            })
        }
        userArr.splice(index, 1);
        res.json({
            status: "Success",
            message: "Record Deleted"
        });
    } catch (error) {
        res.status(400).json({
            status: "Failure",
            message: error.message
        })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   