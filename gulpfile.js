/**
 * src - задает пути, файлы, маски к ним, dest - указывает конечный путь и файл после обработки, series - позволяет вызвать несколько функций подряд, watch - позволяет отслеживать изменения файлов в реальном времени
 */
const {src, dest, series, watch} = require('gulp');
/**
 * gulp-file-include - шаблонизатор, который позволяет по префиксу вставлять другие файлы
 */
const include = require("gulp-file-include");
/**
 * htmlmin - минифицирует html
 */
const htmlmin = require("gulp-htmlmin");
/**
 * gulp-htmlmin - позволяет удалять файлы
 */
const del = require("del");
/**
 * gulp-sass - компилирует scss в css
 */
// const sass = require('gulp-sass');
/**
 * если не делали npm install --save-dev sass, то закомментировать эту строку и открыть предыдущую, если будет вызывать проблему, то проделать установку и раскомментировать обратно
 */
const sass = require('gulp-sass')(require('sass'));
/**
 * gulp-csso - минифицирует css
 */
const csso = require('gulp-csso');
/**
 * gulp-autoprefixer - адаптирует стили под старые версии браузеров и разные движки
 */
const autoprefixer = require("gulp-autoprefixer");
/**
 * gulp-concat - объединяет файлы
 */
const concat = require("gulp-concat");
/**
 * browser-sync - позволяет в реальном времени отображать изменения файлов в браузере
 */
const sync = require("browser-sync").create();

function html() {
    return src("src/**.html") // Получаем файлы с расширением html
        .pipe(include({
            prefix: '@@' // Подключаем в файлы другие файлы и определяем места включения по префиксу @@
        }))
        .pipe(htmlmin({
            collapseWhitespace: true // Удаляет пробелы в html файле
        }))
        .pipe(dest('dist')) // Указываем в какую папку поместить конечный файл
}

function scss() {
    return src('src/scss/**.scss') // Получаем все файлы из папки с расширением scss
        .pipe(sass()) // Конвертируем scss в css
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'] // Адаптируем стили под 2 последних версии браузеров
        }))
        .pipe(csso()) // Минифицируем
        .pipe(concat("style.css")) // Объединяем полученные файлы
        .pipe(dest("dist")) // Указываем в какую папку поместить конечный файл
}

function clear() {
    return del("dist") // Удаляет папку и файлы по указанному пути
}

function serve() {
    sync.init({
        server: "./dist" // Указываем папку для инициализации, откуда будет запускаться сайт
    })

    // Задаем файлы, которые будем отслеживать и функции, которые будут выполняться при событии изменения файла
    // То есть будет пересобирать файлы и синхронизировать страницу браузера
    watch('src/**.html', series(html)).on("change", sync.reload)
    watch('src/scss**.scss', series(scss)).on("change", sync.reload)
}

// exports.clear = clear
// exports.scss = scss
// exports.html = html

exports.build = series(clear, scss, html);
exports.browser_sync = series(clear, scss, html, serve);
