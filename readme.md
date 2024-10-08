# Заметки gulp

## Что есть

HTML:

 - Шаблонизация кода
 - Минификация

CSS:

 - Формирование css из scss
 - Адаптирование под несколько браузеров и старые версии
 - Минификация
 - Конкатенация нескольких файлов
 - Синхронизация с браузером при изменении HTML/CSS кода

## Инструкции

Устанавливаем node.js

Устанавливаем gulp глобально: 
```
npm install --global gulp-cli
```

Инициализируем npm:
```
npm i
```

Если node.js версии 12 или выше, а gulp меньше 4, то устанавливаем gulp 4 версии:
```
node -v
gulp --v
npm i -D gulp@4.0.0
```

Если проблема с gulp-sass:
```
npm install --save-dev sass
```

Если проблема с новой версией del (7.0.0):
```
npm i -D del@6.1.1
```

Быстрый запуск основных команд: gulp_build.bat (собирает файлы), gulp_sync.bat (собирает файлы и синхронизируется с браузером), также запуск и сборка из консоли:
```
gulp build
gulp browser_sync
```
