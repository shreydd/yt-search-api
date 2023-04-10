const dotenv = require('dotenv');
let express = require('express');
let app = express();
const cors = require('cors');

dotenv.config();

const port = process.env.PORT;
const http = require("http");
const server = http.Server(app);

// TODO: error handling
const getSearchSuggestions = async(query) => {
    const data = await fetch('https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='+query)
    const json = await data.json()
    console.log(json[1]);
    return json[1];
}

// server stuff
app.use(cors({
    origin: '*'
}))

app.get("/", function (req, res) {
    console.log('hit')
    res.send("Hello Express");
});

// needs error handling
app.get("/search", async (req, res) => {
    let query = req.query.q
    let suggestions = await getSearchSuggestions(query);
    console.log(suggestions)
    res.status(200).json(suggestions);
})

server.listen(port, () => {
    console.log(`listening at ${port}`);
})