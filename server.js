const { db, syncAndSeed, models: { Bookmark } } = require('./db');
const { frontPage, bookmarkPage, submitted } = require('./page')
const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get('/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'styles.css')));

app.post('/', async(req, res, next) => {
    try {
        const values = req.body
        Bookmark.create({
            name: values.name,
            url: values.url,
            category: values.category
        })
        res.send(submitted())
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/', async(req, res) => {
    try {
        const bookmarks = await Bookmark.findAll();
        res.send(frontPage(bookmarks))
    }
    catch(ex) {
        console.log(ex)
    }
});

app.get('/:category', async(req, res, next) => {
    try {
        const bookmarksMain = await Bookmark.findAll();
        const category = req.params.category
        const bookmarks = await Bookmark.findAll({
            where: {
                category: category
            }
        });

        res.send(bookmarkPage(bookmarksMain, bookmarks, category))
    }
    catch(ex) {
        next(ex)
    }
})

const init = async() => {
    await db.authenticate();
    await syncAndSeed();
    const port = (process.env.port || 3000)
    app.listen(port, () => console.log(`listening on port ${port}`));
};

init();