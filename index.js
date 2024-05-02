const express = require('express');
const app = express();




app.get('/', (req, res) => {
    res.send('<h1>Hello, this is part 04 of FullstakOpen Course! Now, if I make a change it could be updated only restarting de web browser.</h1>');
});



const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });

