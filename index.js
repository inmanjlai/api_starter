const express = require('express');
const sqlite = require('sqlite3').verbose();

const app = express();
const db = new sqlite.Database('express.db', (err) => {
	if (err) return console.log(err.message);
	console.log('Connected to database');
});

app.get('/:table', (req, res) => {

	db.serialize(() => {
		db.all(`SELECT * FROM ${req.params.table};`, (err, rows) => {
			if (err) return console.log(err.message);
			let users = rows;
			res.send(rows);
		});
	});

});

app.get('/:table/:id', (req, res) => {
	db.serialize(() => {
		db.all(`SELECT * FROM ${req.params.table} WHERE id = ${req.params.id}`, (err, rows) => {
			res.send(rows);
		}); 
	})
});

app.listen('8080', () => { console.log('Server is listening at http://localhost:8080/'); });
