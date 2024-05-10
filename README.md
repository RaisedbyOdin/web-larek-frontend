# Проектная работа "Веб-ларек"
https://github.com/RaisedbyOdin/web-larek-frontend.git

Данный проект - приложение на одну страницу с отображением карточек с товаром. Карточку с товаром можно просмотреть кликнув по ней, также есть возможность добавлять товар в корзину. Из корзины делается заказ, выбирается способ оплаты и указываются данные для доставки.

## Архитектура приложения

Архитектура приложения основана на паттерне MVP для строгого разделения логики. Он состоит из следующих слоев:

- Model (Данные) —  работает с данными, проводит вычисления (получение, добавление, обновление, удаление)
- View (Отображение) —  показывает пользователю интерфейс и данные из модели, а также обеспечивает взаимодействие с пользователем (нажатия кнопок, ввод данных)
- Presenter (Представление) — служит прослойкой между моделью и видом. Производит обработку слушателей. 
В данном приложении в роли Presenter будет выступать код в основном скрипте приложения (index.ts)

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовые компоненты

### Класс EventEmitter

В данном приложении за основу взят событийно-ориентированный подход. Суть данного подхода заключается в том, чтобы в любом месте приложения можно было сообщить о каком-либо событии. Данный класс используется для реализации подхода.

Для хранения событий и их подписчиков конструктор создает пустую коллекцию `this._events = new Map<EventName, Set<Subscriber>>()` 

Методы класса:

- `on<T extends object>(eventName: EventName, callback: (event: T)` — устанавливает обработчик на событие
- `off(eventName: EventName, callback: Subscriber)` — снимает обработчик с события
- `emit<T extends object>(eventName: string, data?: T)` — инициирует события с данными
- `onAll(callback: (event: EmitterEvent) => void)` — устанавливает обработчик на все события
- `offAll()` — сбрасывает обработчик на всех событиях
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - устанавливает коллбэк-триггер, генерирующий событие при вызове

### Абстрактный класс Component

Получает тип в виде дженерика: `Component<T>`. Выступает основой для остальных классов в проекте, от которого они наследуются. Реализует возможность работы с разметкой на странице: добавлять атрибуты для модификации поведения видимости элемента, переключать класс, добавлять текстовые данные, возвращать разметку готового элемента

Констрктор принимает: 
- `container: HTMLElement` — элемент разметки, в который будет вставлен компонент

Методы:

- `toggleClass(element: HTMLElement, className: string, force?: boolean)` — переключает класс
- `setText(element: HTMLElement, value: unknown)` — устанавливает текстовое содержимое элемента, проверяя наличие переданного элемента
- `setDisabled(element: HTMLElement, state: boolean)` — делает элемент недоступным для взаимодействия
- `setHidden(element: HTMLElement)` — делает элемент скрытым, принимает DOM-элемент
- `setVisible(element: HTMLElement)` — делает элемент видимым
- `setImage(element: HTMLImageElement, src: string, alt?: string)` — устанавливает теги для изображений
- `render(data?: Partial<T>)` — возвращает результат рендера

### Класс Api

Обеспечивает взаимодействие с сервером для получения готовых и отправки сформированных приложением данных

Конструктор принимает:

- `baseUrl: string` — адрес сервера
- `options: RequestInit = {}` — объект опций

Методы класса:

- `get(uri: string)` — get-запрос на сервер
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` — post-запрос на сервер
- `handleResponse(response: Response)` — обработка ответа с сервера и ошибок

### Класс Model

Получает тип в виде дженерика: `Model<T>`. Класс используется для создания модельных данных

Конструктор принимает:

- `data: Partial<T>` — данные
- `events: IEvents` — объект событий

Метод класса:

- `emitChanges(event: string, payload?: object)` — сообщает об изменении данных, принимает событие и конкретные данные, связанные с изменением

## Компоненты модели данных

### Класс AppState

Класс хранит текущие данные (состояния) для отдельных элементов приложения и обрабатывает эти данные для нужд других классов. Данный класс наследует класс Model

Конструктор принимает:

- `data: Partial<T>` — данные
- `events: IEvents` — объект событий

Свойства класса:

- `сatalog: IProductItem[]` — массив, содержащий карточки для отображения
- `basket: string[]` — массив с идентификаторами заказов в корзине
- `order: IOrder` — хранит в себе заказ для отправки на сервер

Методы класса:

- `setCards: void` — используется для добавления карточки товаров
- `clearBasket(): void` — очистить корзину
- `clearOrder(): void` — очищает массив заказа
- `addBasketItem(item: IProductItem): void` — добавить переданный элемент в корзину
- `remBasketItem(item: IProductItem): void` — удалить переданный элемент из корзины
- `isItemExists(item: IProductItem): void` —  проверить наличие существующего элемента в корзине
- `validateForm(): boolean` — валидация полноты заполненных данных форм
- `getTotal(): void` — расчёт финальной стоимости корзины
- `setDeliveryData()` — данные из формы по доставке
- `setContactsData()` — данные из формы контактов

## Компоненты модели представления

### Класс Page

Компонент с главной страницы. Используется для добавления ленты карточек и вешает слушатель на элемент корзины. Изменяет количество элементов корзины в разметке. Наследует класс Component

Конструктор принимает:

- `container: HTMLElement` — контейнер для отображения карточек
- `events: IEvents` — объект событий

Методы класса:

- `setCounter(value: number): void` — добавить карточки товаров
- `setCatalog(items: HTMLElement[]): void` — очистить корзину

Свойства класса:

- `counter: HTMLElement` — элемент счетчика корзины
- `catalog: HTMLElement` — контейнер для отображения карточек
- `basket: HTMLElement` — элемент корзины

### Класс Card

Компонент отрисовки карточки товара, наследует класс Component. Добавляет поля в карточку и возвращает готовую разметку

Конструктор принимает:

- `events: IEvents` — объект событий
- `blockName: string` — название блока
- `container: HTMLElement` — контейнер для вставки карточки

Методы класса:

- `setDescription(value: string): void` — элемент описания товара
- `setImage(value: string): void` — элемент для вставки изображения
- `setTitle(value: string): void` — элемент названия товара
- `setCategory(value: string): void` — элемент категории товара
- `setPrice(value: number): void` — элемент с ценой товара
- `setCardButtonTitle(value: string): void` — элемент с названием кнопки товара

Свойства класса:

- `description: HTMLElement` — элемент описания товара
- `image: HTMLImageElement` — элемент для вставки изображения
- `title: HTMLElement` — элемент названия товара
- `category: HTMLElement` — элемент категории товара
- `price: HTMLElement` — элемент с ценой товара
- `cardButton: HTMLButtonElement` — элемент кнопки товара
- `cardButtonTitle: string` — элемент с названием кнопки товара

### Класс Basket

Компонени отображения корзины приложения. Наследует класс Component.

Конструктор принимает:

- `container: HTMLElement` — контейнер для вставки данных
- `events: IEvents` — объект событий

Свойства класса:

- `list: HTMLElement[]` — массив продуктов в корзине
- `total: HTMLElement` — элемент с финальной ценой
- `button: HTMLButtonElement` — элемент кнопки

Методы класса:

- `setItems(items: HTMLElement[]): void` — установить список элементов корзины
- `setTotal(total: number): void` — установить общую стоимость в разметку

### Класс Modal

Компонент обтображения модального окна, наследует класс Component. Используется для устанавления полученных данных и возвращения готовой разметки

Конструктор принимает:

- `container: HTMLElement` — контейнер для вставки данных
- `events: IEvents` — объект событий

Методы класса:

- `open(): void` — открвает модалку
- `close(): void` — закрывает модалку
- `render(data: IModalData): HTMLElement` — создать разметку с учетом вставленных данных
- `setContent(value: HTMLElement): void` — установить данные в модалку

Свойства класса:

- `closeButton: HTMLButtonElement` — элемент кнопки закрытия
- `content: HTMLElement` — контент модального окна

### Класс Form

Получает тип в виде дженерика: `Form<T>`. Компонент для отображения и управления формами, наследует класс Component. Предоставляет функционал для проверки форм, валидации, рендера результата

Методы класса:

- `onInputChange(): void` — валидация поля
- `isValid(): void` — принимает решение о блокировке кнопки
- `setError(: void)` — добавить ошибку
- `render(data: <T>): HTMLFormElement` — установить данные в модалку
- `placeOrder(): void` — сделать заказ

Конструктор принимает:

- `container: HTMLFormElement` — контейнер для вставки данных
- `events: IEvents` — объект событий

### Класс DeliveryForm

Компонент отображения выбора способа оплаты и формы адреса для доставки, наследует класс Form

Конструктор принимает:

- `container: HTMLElement` — контейнер для вставки данных
- `events: IEvents` — объект событий

Методы класса:

- `setPayment(value: string): void` — устанавливает выбранный способ оплаты
- `setAddress(value: string): void` — устанавливает адрес доставки

Свойства класса:

- `nextButton: HTMLButtonElement` — кнопка далее

### Класс ContactsForm

Компонент для отображения формы ввода контактов при совершении заказа. Наследует класс Form.  
При заполненных полях позволяет создать заказ.

Конструктор принимает:

- `container: HTMLFormElement` — контейнер для вставки данных
- `events: IEvents` — объект событий

Методы класса:

- `setEmail(value: string): void` — прописывает email
- `setPhone(value: string): void` — прописывает телефон

Свойства класса:

- `nextButton: HTMLButtonElement` — кнопка закрытия модального окна при успешном заказа

### Класс Success

Компонент отображения сообщения об успешном оформлении заказа. Наследует класс Component.

Свойства класса:

- `closeButton: HTMLButtonElement` — элемент кнопки закрытия модалки с успешным заказом

## Описание типов данных 

```ts
// интерфейс события
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// интерфейс промиса
export interface ILarekApi {
	getLarekList: () => Promise<IProductItem[]>;
	makeOrder: (value: IOrder) => Promise<IOrderResult>;
}

// тип ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// тип категории товара
export type CatalogItemStatus = {
	category: 'софт-скил' | 'хард-скил' | 'другое' | 'кнопка' | 'дополнительное';
};

// страница приложения
export interface IPage {
	counter: HTMLElement; 
	catalog: HTMLElement; 
	basket: HTMLElement; 
}

// данные приложения
export interface IAppState {
	catalog: IProductItem[];
	basket: string[];
	order: IOrder;
}

// данные единицы товара
export interface IProductItem {
	id: string;
	description: string;
	image: string; 
	title: string; 
	category: string;
	price: number | null;
}

// данные единицы товара на главной странице
export interface ICard {
	image: string;
	title: string;
	category: string;
	price: number | null;
	description: string;
	index?: number;
}

// успешное совершения заказа
export interface ISuccess {
	total: number | null;
}

//данные модального окна
export interface IModalData {
	content: HTMLElement;
}

// данные ответа сервера
export interface IOrderResult {
	total: number;
}

// данные в превью
export interface ICardPreview {
	description: string;
}

export interface ICardBasket {
	title: string; 
	price: number | null; 
	index: number; 
}

// форма с адресом доставки
export interface IDeliveryForm {
	payment: string; 
	address: string;
}

// форма с контактами
export interface IContactsForm {
	email: string;
	phone: string; 
}

// заказ
export interface IOrder extends IDeliveryForm, IContactsForm {
	total: number;
	items: string[]; 
}

// корзина
export interface IBasket {
	items: HTMLElement[]; 
	total: number; 
}
