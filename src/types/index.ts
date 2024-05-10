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

// интерфейс данных страницы приложения
export interface IPage {
	counter: HTMLElement;
	catalog: HTMLElement;
	basket: HTMLElement;
}

// интерфейс данных приложения
export interface IAppState {
	catalog: IProductItem[];
	basket: string[];
	order: IOrder;
}

// интерфейс данных единицы товара
export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

// интерфейс данных единицы товара на главной странице
export interface ICard {
	image: string; // ссылка на изображение
	title: string; // название
	category: string; // категория
	price: number; // цена
	description: string; // описание
}

// интерфейс данных в превью
export interface ICardPreview {
	description: string; // описание
}

export interface ICardBasket {
	title: string; // название
	price: number; // цена
	index: number; // индекс в списке
}

// интерфейс данных формы с адресом доставки
export interface IDeliveryForm {
	payment: string;
	address: string;
}

// интерфейс данных формы с контактами
export interface IContactsForm {
	email: string;
	phone: string;
}

// интерфейс данных заказа
export interface IOrder extends IDeliveryForm, IContactsForm {
	total: number; // сумма заказа
	items: string[]; // массив с идентификаторами товаров
}

// интерфейс корзины
export interface IBasket {
	items: HTMLElement[];
	total: number;
}

// интерфейс успешного совершения заказа
export interface ISuccess {
	total: number | null;
}

// интерфейс данных модального окна
export interface IModalData {
	content: HTMLElement;
}

// интерфейс данных ответа сервера на создание заказа
export interface IOrderResult {
	id: number;
}