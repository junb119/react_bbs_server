const express = require('express');
const app = express();
const port = 8000;
const mysql = require('mysql');
const cors = require('cors');

var corsOptions = {
  origin: '*', // 모두 허용 : *
};

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_bbs',
});

db.connect();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/list', (req, res) => {
  const Sql =
    'SELECT id,title, user_id, DATE_FORMAT(update_date, "%Y-%m-%d") AS update_date,DATE_FORMAT(date, "%Y-%m-%d") AS date FROM board';
  db.query(Sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.get('/detail', (req, res) => {
  const id = req.query.id;
  const Sql = `SELECT title, content FROM board WHERE id=?`;
  db.query(Sql, [id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/insert', (req, res) => {
  // let title = req.body.title;
  // let content = req.body.content;
  const { title, content } = req.body;
  console.log(title, content);
  let sql = "INSERT INTO board (title,content,user_id) VALUES(?,?,'admin')";

  db.query(sql, [title, content], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/update', (req, res) => {
  // let title = req.body.title;
  // let content = req.body.content;
  const { id, title, content } = req.body;
  let sql = 'UPDATE board SET title=?,content=? WHERE id=?';

  db.query(sql, [title, content, id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/delete', (req, res) => {
  // let title = req.body.title;
  // let content = req.body.content;
  const id = req.body.boardIdList;
  console.log('d', id);
  let sql = `DELETE FROM board WHERE id in (${id})`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// db.end();
