// src/server.js
import express from "express";
import cors from "cors";
import axios from "axios";

// Import Router
import userRoutes from './routes/user.js';
import placeRoutes from "./routes/place.js";
import planRoutes from "./routes/plan.js";
import reviewRoutes from "./routes/review.js";
import bookmarkRoutes from "./routes/bookmark.js";
import qnaRoutes from "./routes/qna.js";

import request from "request";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends : true }))

// Routes
app.use("/api/user", userRoutes);
app.use("/api/place", placeRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/bookmark", bookmarkRoutes);
app.use("/api/qna", qnaRoutes);

// ML
app.post('/recommend', async (req,res) => {
  try {
    const useData = req.body.input;
    const response = await axios.post('http://localhost:5001/predict', {
      input : [1, 2, 3, 4]
    });
    const recommendations = response.data;
    res.json(recommendations);
  } catch (error) {
    res.status(500).send(error.message);
  }
  });
// curl -X POST http://localhost:5001/predict -H "Content-Type: application/json" -d '{"input": [1, 2, 3, 4]}'
// Error

// Naver Blog Review
app.get('/search/blog', function (req, res) {
  var client_id = '1S88fZ3UHFauFkOyNiZx';
  var client_secret = 'vf87ed8_rw';
  // console.log(encodeURI(req.query.query));

  if (!req.query.query) {
      return res.status(400).send({ error: 'Query parameter is required' });
  }

  var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // json 결과
  var options = {
      url: api_url,
      headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
    };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

// 

app.get('*', (req,res) => {
    res.status(404).render('404');
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));