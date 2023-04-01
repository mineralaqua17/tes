const express = require('express')
const fs = require("fs")
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.static('public'))

const _carsData = JSON.parse(fs.readFileSync("./cars.json", 'utf-8'));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/cars', (req, res) => {

    const keytype = req.query.keytype;
    const readydate = req.query.readydate;
    const takedate   = req.query.takedate;
    const capacity = Number(req.query.capacity);

    let carsData = _carsData.slice();

    if(capacity != NaN && capacity > 0)
    {     
        for(let i = 0; i < carsData.length; i++)
        {
            if(carsData[i].capacity == capacity) continue;

            carsData.splice(carsData.indexOf(carsData[i]), 1);
            i--;
        }
    }

    console.log(Date.parse(readydate));

    if(!isNaN(Date.parse(readydate)))
    {
        for(let i = 0; i < carsData.length; i++)
        {
            if(Date.parse(carsData[i].availableAt) <= Date.parse(readydate)) continue;

            carsData.splice(carsData.indexOf(carsData[i]), 1);
            i--;
        }
    }

    res.render('rental', {carsData});
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})