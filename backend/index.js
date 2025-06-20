const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const summarizeRoutes = require('./routes/summarizeRoutes');
const replyRoutes = require('./routes/replyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Route handlers
app.use('/', summarizeRoutes);
app.use('/', replyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Mail AI backend running at http://localhost:${PORT}`);
});
