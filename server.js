const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const errorHandler=require("./middleware/errorHandler");

// app.get('/api/contacts', (req, res) => {
//     res.status(200).json(
//         {
//             message :'get all contacts'
//         });
// });
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
  