const newrelic = require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../public/dist`));


app.get('/reviews/:room_id', (req, res) => {
	console.log(req.params.room_id)
	request
	.get('http://3.14.84.71:3004/reviews/' + req.params.room_id, (err, response, body) => {
		if (err || !response) {
			res.sendStatus(404);
		} else {
			res.status(200).send(body);
		}
	})
});

app.get('/reviews/:room_id', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

app.post('/reviews/:room_id', (req, res) => {
	request
	.post({
		url: `http://localhost:3004/${req.originalUrl}`,
		method: 'POST',
		json: req.body
	}, (err, response, body) => {
		if (err || !response) {
				res.sendStatus(500);
		} else if (response) {
			if (response.statusCode === 201) {
				res.status(201).send(body);
			} else {
				res.sendStatus(202);
			}
		}
	})
});

app.listen(PORT, () => {
  console.log('Proxy listening on port ' + PORT);
});