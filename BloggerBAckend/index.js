// require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
// const database = require('./BloggerDatabase')
// database()

// const express = require('express')
// const cors = require('cors')

// const app = express()
// const port = process.env.PORT;
// app.use(cors(({ origin: 'http://localhost:3000', credentials: true })))
// app.use(express.json({ limit: "10mb", extended: true }))
// app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))

// app.use('/api/userlogin', require('./Data/UserLogin'))
// app.use('/api/blogadd', require('./Data/BlogAdd'))
// app.use('/api/saveblog', require('./Data/BlogAdd'))
// app.listen(port, () => {
//     console.log(` App is listening at http://localhost:${port}`)
// })
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const connectToMongo = require('./BloggerDatabase');
const express = require('express');
const cors = require('cors');

const app = express();
const port =3001;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));

// Routes
app.use('/api/userlogin', require('./Data/UserLogin'));
app.use('/api/blogadd', require('./Data/BlogAdd'));
app.use('/api/saveblog', require('./Data/BlogAdd'));

// Start server
app.listen(port, () => {
  console.log(`🚀 App is listening at http://localhost:${port}`);
});
