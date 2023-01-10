const { readFileSync, writeFileSync } = require('fs');

const express = require('express');
const app = express();

app.get('/api', (req, res) => {
	const count = readFileSync('./count.txt', 'utf-8');
	console.log('count ', count);

	const newCount = parseInt(count) + 1;

	writeFileSync('./count.txt', newCount.toString());

	res.json({"count": newCount});
});

const port = 5000;
app.listen(port, () => console.log(`http://localhost:${port}/`));

