const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bookmarks');

const Bookmark = db.define('Bookmark', {
    name: {
        type: STRING,
        allowNull: false
    },
    url: {
        type: STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    category: {
        type: STRING,
        allowNull: false
    }
})

const syncAndSeed = async() => {
    try {
        await db.sync({ force: true })
    }
    catch(ex) {
        console.log(ex)
    }
}

module.exports = {
    db,
    syncAndSeed,
    models: {
        Bookmark
    }
}