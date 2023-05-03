require(`dotenv`).config();
const express = require(`express`);
const app = express();
const productRoutes = require(`./routes/products`);
const mongoose = require(`mongoose`);
const port = process.env.PORT || 3000;

//midleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`To adres: ${req.path}\n Was sent the request: ${req.method}`);
    next();
})

// //routes
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for reqest
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })



