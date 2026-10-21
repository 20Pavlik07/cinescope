// js/catalog.js

const movies = [
    {
        id: 1,
        title: "Неоновый горизонт",
        year: 2024,
        genre: "Фантастика",
        rating: "8.7",
        posterClass: "catalog-card__poster--future",
        description:
            "В недалёком будущем молодой инженер получает загадочный сигнал с орбитальной станции. Расследование приводит его к открытию, способному изменить отношения человечества с искусственным интеллектом.",
        director: "Алексей Миронов",
        age: "16+",
        duration: "2 ч 08 мин"
    },
    {
        id: 2,
        title: "Последний свидетель",
        year: 2023,
        genre: "Детектив",
        rating: "8.4",
        posterClass: "catalog-card__poster--detective",
        description:
            "Опытный следователь возвращается к делу десятилетней давности после неожиданного появления нового свидетеля. Каждая найденная улика заставляет его сомневаться в официальной версии событий.",
        director: "Ирина Волкова",
        age: "16+",
        duration: "1 ч 54 мин"
    },
    {
        id: 3,
        title: "За пределами слов",
        year: 2022,
        genre: "Драма",
        rating: "8.9",
        posterClass: "catalog-card__poster--drama",
        description:
            "Два человека встречаются спустя много лет и пытаются понять, почему одна случайная встреча изменила их жизни. Это история о выборе, памяти и возможности начать всё сначала.",
        director: "Дмитрий Соколов",
        age: "12+",
        duration: "2 ч 11 мин"
    },
    {
        id: 4,
        title: "Глубина",
        year: 2025,
        genre: "Триллер",
        rating: "8.2",
        posterClass: "catalog-card__poster--thriller",
        description:
            "Команда исследователей отправляется на дно океана, где обнаруживает неизвестный объект. Из-за потери связи экспедиция оказывается отрезана от внешнего мира.",
        director: "Максим Орлов",
        age: "16+",
        duration: "1 ч 48 мин"
    },
    {
        id: 5,
        title: "Вкус дождя",
        year: 2021,
        genre: "Романтика",
        rating: "8.1",
        posterClass: "catalog-card__poster--romance",
        description:
            "После случайной встречи в маленьком кафе двое незнакомцев начинают встречаться каждый раз, когда в городе идёт дождь. Постепенно их короткие разговоры превращаются в нечто большее.",
        director: "Анна Белова",
        age: "12+",
        duration: "1 ч 42 мин"
    },
    {
        id: 6,
        title: "Город без сна",
        year: 2024,
        genre: "Боевик",
        rating: "8.5",
        posterClass: "catalog-card__poster--action",
        description:
            "Ночной мегаполис становится ареной масштабной операции после исчезновения важного свидетеля. Бывший сотрудник специального подразделения получает несколько часов, чтобы найти его.",
        director: "Роман Крылов",
        age: "18+",
        duration: "2 ч 02 мин"
    }
];

const catalogGrid = document.querySelector("#catalog-grid");
const searchInput = document.querySelector("#movie-search");
const genreFilter = document.querySelector("#genre-filter");
const emptyMessage = document.querySelector("#catalog-empty");
const movieCounter = document.querySelector("#movie-counter");

const movieModal = document.querySelector("#movie-modal");
const modalClose = document.querySelector("#modal-close");
const modalAction = document.querySelector("#modal-action");
const modalPoster = document.querySelector("#modal-poster");
const modalPosterTitle = document.querySelector("#modal-poster-title");
const modalGenre = document.querySelector("#modal-genre");
const modalTitle = document.querySelector("#modal-title");
const modalYear = document.querySelector("#modal-year");
const modalRating = document.querySelector("#modal-rating");
const modalDescription = document.querySelector("#modal-description");
const modalDirector = document.querySelector("#modal-director");
const modalAge = document.querySelector("#modal-age");
const modalDuration = document.querySelector("#modal-duration");

let lastFocusedElement = null;

function renderMovies(movieList) {
    catalogGrid.innerHTML = "";

    movieList.forEach((movie) => {
        const article = document.createElement("article");
        article.className = "catalog-card";

        article.innerHTML = `
            <div class="catalog-card__poster ${movie.posterClass}">
                <span class="catalog-card__poster-label">CineScope</span>
                <span class="catalog-card__poster-title">${movie.title}</span>
            </div>

            <div class="catalog-card__body">
                <p class="catalog-card__genre">${movie.genre}</p>

                <h2 class="catalog-card__title">${movie.title}</h2>

                <div class="catalog-card__meta">
                    <span class="catalog-card__year">${movie.year}</span>
                    <span class="catalog-card__rating">★ ${movie.rating}</span>
                </div>

                <button
                    class="catalog-card__button"
                    type="button"
                    data-movie-id="${movie.id}"
                >
                    Подробнее
                </button>
            </div>
        `;

        catalogGrid.appendChild(article);
    });

    updateCatalogState(movieList.length);
}

function updateCatalogState(count) {
    emptyMessage.hidden = count !== 0;

    if (count === 0) {
        movieCounter.textContent = "Найдено фильмов: 0";
        return;
    }

    movieCounter.textContent = `Найдено фильмов: ${count}`;
}

function filterMovies() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedGenre = genreFilter.value;

    const filteredMovies = movies.filter((movie) => {
        const matchesSearch = movie.title
            .toLowerCase()
            .includes(searchValue);

        const matchesGenre =
            selectedGenre === "all" ||
            movie.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    renderMovies(filteredMovies);
}

function findMovieById(movieId) {
    return movies.find((movie) => movie.id === movieId);
}

function openModal(movie) {
    if (!movie) {
        return;
    }

    lastFocusedElement = document.activeElement;

    modalPoster.className = `modal__poster ${movie.posterClass.replace(
        "catalog-card__poster",
        "modal__poster"
    )}`;

    modalPosterTitle.textContent = movie.title;
    modalGenre.textContent = movie.genre;
    modalTitle.textContent = movie.title;
    modalYear.textContent = movie.year;
    modalRating.textContent = `★ ${movie.rating}`;
    modalDescription.textContent = movie.description;
    modalDirector.textContent = movie.director;
    modalAge.textContent = movie.age;
    modalDuration.textContent = movie.duration;

    movieModal.hidden = false;
    document.body.style.overflow = "hidden";

    modalClose.focus();
}

function closeModal() {
    movieModal.hidden = true;
    document.body.style.overflow = "";

    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }

    lastFocusedElement = null;
}

catalogGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-movie-id]");

    if (!button) {
        return;
    }

    const movieId = Number(button.dataset.movieId);
    const movie = findMovieById(movieId);

    openModal(movie);
});

searchInput.addEventListener("input", filterMovies);

genreFilter.addEventListener("change", filterMovies);

modalClose.addEventListener("click", closeModal);

modalAction.addEventListener("click", closeModal);

movieModal.addEventListener("click", (event) => {
    if (event.target.matches("[data-modal-close]")) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !movieModal.hidden) {
        closeModal();
    }
});

renderMovies(movies);