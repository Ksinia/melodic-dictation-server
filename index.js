const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const signupRouter = require("./user/router");
const { router: loginRouter } = require("./auth/router");
const melodyRouter = require("./melody/router");
const dictationRouter = require("./dictation/router");

const app = express();
const port = process.env.PORT || 4000;

const bodyParserMiddleware = bodyParser.json();
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(bodyParserMiddleware);

app.use(signupRouter);
app.use(loginRouter);
app.use(melodyRouter);
app.use(dictationRouter);

app.use("/music", express.static("music"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
