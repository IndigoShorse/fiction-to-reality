# План миграции Static → Astro

Цель: убрать все импорты из `Static/` и оставить исходники фронтенда только в `Frontend/src`.

## Текущее состояние

- [x] Общий `ResearchLayout` для Lab и Library.
- [x] Конфиг страниц с версиями в `Frontend/src/config/pages.ts`.
- [x] `LabIntro` и статическая разметка рабочей области в `Frontend/src/components/Lab`.
- [x] Lab больше не получает стили, данные и клиентский скрипт из `Static/lab`.
- [x] Главная страница перенесена на Astro-компоненты, локальные стили и client-script.

## 1. Общие стили

- [x] Создать `Frontend/src/styles/tokens.css` с цветовыми и типографическими токенами.
- [x] Перенести общие стили layout и хедера в `Frontend/src/styles/research-layout.css`.
- [x] Подключить общие стили в `ResearchLayout.astro`.

Критерий: общие CSS-правила не читаются из HTML в `Static`.

## 2. Стили Lab

- [x] Создать `Frontend/src/styles/lab.css`.
- [x] Перенести в него CSS из `Static/lab/index.html`.
- [ ] Разделить правила по будущим компонентам по мере их выделения.
- [x] Удалить `getStyle(source)` и импорт `Static/lab/index.html?raw` из `pages/lab/index.astro`.

Критерий: внешний вид `/lab/` сохраняется, а страница не получает CSS из `Static`.

## 3. Данные Lab

- [ ] Создать `Frontend/src/data/lab/types.ts`.
- [x] Перенести тезисы в `Frontend/src/data/lab/root.ts`.
- [x] Перенести справочники в `Frontend/src/data/lab/mage.ts` и `phys.ts`.
- [x] Экспортировать данные вместо глобальных `ROOT`, `MAGE` и `PHYS`.

Критерий: `pages/lab/index.astro` не импортирует `data-*.js?raw` из `Static`.

## 4. Интерактивность Lab

- [x] Перенести legacy inline JS в `Frontend/src/scripts/lab-page.ts`.
- [x] Подключить скрипт как Astro-клиентский модуль.
- [x] Сохранить вкладки, подсветку ссылок, тултип, диалоги, авторизацию и `localStorage`-предложения.
- [x] Удалить `getInlineScript(source)` и последний inline script из страницы Lab.

Критерий: все сценарии Lab работают без скриптов из `Static`.

## 5. Компоненты Lab

- [ ] Вынести `LabTabs.astro`.
- [ ] Вынести `LabWorkspace.astro`.
- [x] Вынести `RootDocument.astro`.
- [ ] Вынести универсальный `ReferenceColumn.astro`.
- [ ] Вынести `LabTooltip.astro`.
- [ ] Вынести `ReferenceDialog.astro`, `AuthDialog.astro` и `SuggestionDialog.astro`.
- [x] Перевести рендер тезисов и справочников с ручного DOM-кода на Astro-разметку.

Критерий: `LabContent.astro` становится композицией компонентов, а не одним большим шаблоном.

## 6. Рефакторинг клиентской логики Lab

Цель: убрать переходный `initLabPage` и оставить клиентский код рядом с
компонентом, которому принадлежит соответствующая разметка.

- [ ] Разделить `LabContent` на `LabTabs`, `LabWorkspace` и `LabTooltip`.
- [ ] Перенести переключение колонок в `LabTabs`.
- [ ] Оставить hover и выбор ссылки внутри `MageReferenceColumn` и `PhysReferenceColumn`.
- [ ] Оставить выбор refs и создание запроса на предложение внутри `RootDocument`.
- [ ] Создать `Overlay.astro` как общий каркас backdrop, Escape, close-кнопки,
  `aria-modal` и управления фокусом.
- [ ] Перевести `ReferenceOverlay` на статический рендер справочных карточек из
  `src/data/lab` и выбор через `data-active-ref`; убрать `innerHTML`.
- [ ] Оставить в `AuthOverlay` и `SuggestionOverlay` только сбор и валидацию
  полей формы; отправлять `auth:submit` и `suggestion:submit` как события.
- [ ] Создать небольшой Lab-координатор для событий
  `reference:selected`, `suggestion:requested` и `auth:required`.
- [ ] Удалить `src/scripts/lab-page.ts` после переноса всех обработчиков.

Критерий: `LabContent` не содержит скрипта; каждый компонент владеет своей
разметкой и локальными событиями, а глобальная координация не рендерит DOM и
не содержит бизнес-логики форм.

## 7. Главная страница

- [x] Перенести разметку `Static/index.html` в Astro-компоненты и `pages/index.astro`.
- [x] Перенести её стили в `Frontend/src/styles` или локальные стили компонентов.
- [x] Перенести её inline JS в компонент `WelcomeOverlay`.
- [x] Удалить использование `getBody`, `getStyle` и `getInlineScript` на главной.

Критерий: главная страница не импортирует `Static/index.html?raw`.

## 8. Финальная очистка

- [x] Проверить: `rg "Static/|Static\\\\" Frontend/src` не возвращает импортов.
- [x] Удалить `Static/`.
- [x] Удалить `Frontend/src/lib/legacy.ts`, если он больше не используется.
- [ ] Выполнить `npm run build` и вручную проверить `/`, `/lab/`, `/lib/`.

Критерий: фронтенд собирается и работает без папки `Static`.
