// This is used in order to prevent duplicate bookmark categories from appearing on the front page
var wasUsed = {}

const frontPage = (bookmarks) => {
    // Re-initializing wasUsed
    wasUsed = {}
    return (
        `
        <html>
            <head>
                <link rel='stylesheet' href='/styles.css' />
            </head>
            <body>
                <h1> Bookmarker (${ bookmarks.length }) </h1>
                <form action='/' method='POST' id='new_bookmark'>
                    <input class='input' name='name' placeHolder='enter site name' />
                    <input class='input' name='url' placeHolder='enter site url' />
                    <input class='input' name='category' placeHolder='enter category' />
                    <button id='submit' type='submit' form='new_bookmark'> Save </button>
                </form>
                <ul>
                    ${ bookmarks.map( bookmark => {
                        // This if statement ensures no duplicate categories
                        if (!(bookmark.category in wasUsed)) {
                            wasUsed[bookmark.category] = true
                            return(`
                            <li>
                                <a href='/${ bookmark.category }'>
                                ${ bookmark.category }
                                </a>
                            </li>`
                            )
                        }
                    }).join('')}
                </ul>
            </body>
        </html> 
        `
    )
}

const bookmarkPage = (bookmarksMain, bookmarks, category) => {
    return (
        `
        <html>
            <head>
                <link rel='stylesheet' href='/styles.css' />
            </head>
            <body>
                <h1> Bookmarker (${ bookmarksMain.length }) </h1>
                <form action='/'>
                    <button type='submit'> < BACK </button>
                </form>
                <h2> ${ category } (${ bookmarks.length }) </h2>
                <ul>
                    ${ bookmarks.map( bookmark => `
                    <li>
                        <a href=${ bookmark.url }>
                            ${ bookmark.name }
                        </a>
                    </li>
                    `).join('')}
                </ul>
            </body>
        </html>
        `
    )
}

const submitted = () => {
    return (
        `
        <html>
            <head>
                <link rel='stylesheet' href='/styles.css' />
            </head>
            <body>
                <h1> Success! Your bookmark was submitted! </h1>
                <form action='/'>
                    <button type='submit'> < BACK </button>
                </form>
            </body>
        </html>
        `
    )
}


module.exports = { 
    frontPage,
    bookmarkPage,
    submitted
}
