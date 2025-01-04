const express = require("express");
const app = express();

app.use(express.json());

app.post("/test", (req, res) => {
    console.log("Request body:", req.body);
    res.json({ received: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
