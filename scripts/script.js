window.addEventListener("DOMContentLoaded",()=> {
    "use strict";

movies.splice(420)

// --------------- NORMALIZE ALL MOVIES --------------- //

const AllMovies = movies.map((movies) => {
    return {
        title: movies.title,
        year: movies.year,
        category: movies.categories,
        lang: movies.language,
        id: movies.imdbId,
        time: `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
        summary: movies.summary,
        link: `https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg: movies.bigThumbnail,
        minImg: movies.smallThumbnail,
        rating: movies.imdbRating
    }
})

// ----------------------- RENDER ALL MOVIES function -----------------------//

function renderAllMovies(AllMovies) {
    $('.wrapper').innerHTML = null
    AllMovies.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
        
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        ${el.title}
                                    </h3>
                                    <ul class="list-unstyled">
                                        <li><strong>Year: ${el.year} </strong></li>
                                        <li><strong>Category: ${el.category} </strong></li>
                                        <li><strong>Language: ${el.lang} </strong></li>
                                        <li><strong>Rating: ${el.rating} </strong></li>
                                        <li><strong>Runtime: ${el.time} </strong></li>
                                    </ul>

                                    <div class="social d-flex">
                                        <a href="${el.link}" target="_blank" class="btn btn-danger m-2">
                                            Trailer
                                        </a>

                                        <button class="btn btn-primary m-2" data-read="${el.id}">
                                            Read more . . .
                                        </button>

                                        <button class="btn btn-warning m-2" data-add="${el.id}">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>
        
        `);



        $('.wrapper').appendChild(card)
    })
}
renderAllMovies(AllMovies)

// ----------------- DINAMIC CATEGORIES -------------------------//

const dynamicCategory = () => {

    let category = [];

    AllMovies.forEach((e) => {
        e.category.forEach((el) => {
            if (!category.includes(el)) {
                category.push(el)
            }
        })
    })

    category.sort();
    category.unshift('All')
    category.forEach((el) => {
        const option = createElement('option', 'item-option', el);
        $('#category').appendChild(option)
    })


}

dynamicCategory()

// ----------------- FIND FILM FUNCTIONS START ----------------- //

const findFilm = (regexp, rating = 0, category) => {

    if (category === 'All') {
        return AllMovies.filter((film) => {
            return film.title.match(regexp) && film.rating >= rating;
        })
    }

    return AllMovies.filter((film) => {
        return film.title.match(regexp) && film.rating >= rating && film.category.includes(category);
    })
}

// ----------------- FIND FILM FUNCTIONS END ----------------- //


// ----------------- FIND FILM LISTENER ----------------- //

$('#submitForm').addEventListener('submit', (e) => {

    $('.wrapper').innerHTML = `<span class="loader"></span>`;

    const searchValue = $('#filmName').value;

    const filmRating = $('#filmRating').value;

    const filmCategory = $('#category').value;

    const regexp = new RegExp(searchValue, "gi");

    const searchResult = findFilm(regexp, filmRating, filmCategory);

    setTimeout(() => {
        if (searchResult.length > 0) {

            searchResultsRender(searchResult)

            $(".card-res").classList.remove('d-none');

            $('#res').innerHTML = `<strong>${searchResult.length}</strong> ta ma'lumot topildi`;

        } else {
            $(".card-res").classList.add('d-none');
            $('.wrapper').innerHTML = `<h1 class="text-center text-danger">NOT FOUND INFORMATION</h1>`;
        }
    }, 1000)

})

function searchResultsRender(data = []) {
    $('.wrapper').innerHTML = ""
    data.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
        
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        ${el.title}
                                    </h3>
                                    <ul class="list-unstyled">
                                        <li><strong>Year: ${el.year} </strong></li>
                                        <li><strong>Category: ${el.category} </strong></li>
                                        <li><strong>Language: ${el.lang} </strong></li>
                                        <li><strong>Rating: ${el.rating} </strong></li>
                                        <li><strong>Runtime: ${el.time} </strong></li>
                                    </ul>

                                    <div class="social d-flex">
                                        <a href="${el.link}" target="_blank" class="btn btn-danger m-2">
                                            Trailer
                                        </a>

                                        <button class="btn btn-primary m-2" data-read="${el.id}">
                                            Read more . . .
                                        </button>

                                        <button class="btn btn-warning m-2" data-add="${el.id}">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>
        
        `);



        $('.wrapper').appendChild(card)
    })
}

// ----------------------- SHOW MODAL START ---------------------

$('.wrapper').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        const idMovie = e.target.getAttribute('data-read')
        showModal(idMovie)
        $(".modal-window").classList.remove("modal-hide");
    }
})

function showModal(ID) {
    const filmItem = AllMovies.filter((e) => {
        return e.id == ID;
    })

    filmItem.forEach((e) => {

        const row = createElement('div', "row p-3", `
    
    <div class="col-md-4">
        <img src="${e.minImg}" alt="picture" class="img-fluid">
    </div>
    <div class="col-md-6">
        <h4 class="text-primary">
            ${e.title}
        </h4>
        <ul class="list-group">
            <li class="list-group-item">Rating: ${e.rating}</li>
            <li class="list-group-item">Year: ${e.year}</li>
            <li class="list-group-item">Runtime: ${e.time}</li>
            <li class="list-group-item">Category: ${e.category}</li>
        </ul>
    </div>
    <div class="col-md-12 mt-1">
        <h4 class="text-danger">
            ${e.title}
        </h4>
        <p class="text-muted">
            ${e.summary}
        </p>
    </div>
    
    `);
        $('.modal-content').appendChild(row);

    })
}

$('#close').addEventListener("click", () => {
    $(".modal-window").classList.add("modal-hide");
    $('.modal-content').innerHTML = "";
})

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-window')) {
        $('#close').classList.toggle("animate");
    }
})

// ----------------------- SHOW MODAL END --------------------- //

// ----------------------- BOOKMARK START -------------------------- //

$('.wrapper').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-warning')) {
        const idMovie = e.target.getAttribute('data-add');
        addBookmark(idMovie)
    }
});



function addBookmark(ID) {
    const bookmark = JSON.parse(localStorage.getItem("bookmark"));

    const filmItem = AllMovies.filter((e) => {
        return e.id == ID;
    });

    if (!bookmark.includes(filmItem[0])) {
        bookmark.push(filmItem[0])
    } else {
        alert("avval qo`shilgan")
    }

    localStorage.setItem('bookmark', JSON.stringify(bookmark))
    renderBookmark(bookmark)

}

function renderBookmark(bookmarks) {
    $(".bookmark").innerHTML = null

    bookmarks.forEach(e => {
        let book = createElement("div", "border border-2 rounded", `
    
    <img src="${e.minImg}" alt="picture" class="bookmark-img img-fluid rounded">
                            <div class="bookmark-body">
                                <p class="bookmark-body-title">
                                    <strong>${e.title}</strong>
                                </p>
                                <p class="bookmark-body-year">
                                    ${e.year}
                                </p>
                                <button id="${e.id}" class="btn btn-danger w-100">
                                    delete
                                </button>
                            </div>
    
    `)
    $(".bookmark").appendChild(book)
    })
}

$(".bookmark").addEventListener("click", e => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmark"))
    bookmarks = bookmarks.filter(el => el.id !== e.target.id)
    localStorage.setItem('bookmark', JSON.stringify(bookmarks))
    renderBookmark(bookmarks)
})

let bookmarks = JSON.parse(localStorage.getItem("bookmark"));

renderBookmark(bookmarks)

// ----------------------- BOOKMARK START END -------------------------- //

// ---------------------- PAGINATION -------------------------------- //


let page = 1

$('.page-btns').addEventListener("click", (e) => {
    page = e.target.textContent*1
    renderAllMovies(AllMovies.slice((page-1)*10, page*10))
    renderBtn(movies)
})

function renderBtn(movies) {
    $('.page-btns').innerHTML = null
    for(let i = 1; i <= Math.ceil(movies.length/10); i++) {
        const btn = createElement('button', "btn btn-primary", `
        
        <button class="btn btn-primary">${i}</button>
        
        `);
        if(i == page) {
            btn.classList.add("btn-success")
        } else {
            btn.classList.remove("btn-success")
        }
        $('.page-btns').appendChild(btn);
    }
}

renderBtn(movies)

})