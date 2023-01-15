const { readFileSync, writeFileSync } = require('fs');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);

app.get('/api', (req, res) => {
	const data = readFileSync('../workout-data.json', 'utf-8');

	const dataJson = JSON.parse(data);

	res.send(dataJson);
});

app.post('/api/:id', (req, res) => {
	const {id} = req.params;

	const newExercise = {
		id: id,
		exerciseName: req.body.exerciseName,
		set1: req.body.set1,
		set2: req.body.set2,
		set3: req.body.set3,
		set4: req.body.set4,
		set5: req.body.set5
	};

	const data = readFileSync('../workout-data.json', 'utf-8');

	const dataJson = JSON.parse(data);
	dataJson.push(newExercise)

	writeFileSync('../workout-data.json', JSON.stringify(dataJson));
});

app.delete('/api/:id', (req, res) => {
	const {id} = req.params;

	const data = readFileSync('../workout-data.json', 'utf-8');

	const dataJson = JSON.parse(data);
	
	const newData = [...dataJson];

	const index = dataJson.findIndex((exercise) => exercise.id === id);

	newData.splice(index, 1);

	writeFileSync('../workout-data.json', JSON.stringify(newData));
});

const port = 5000;
app.listen(port, () => console.log(`http://localhost:${port}/`));

