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
	order: IOrder | null;
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

// интерфейс данных заказа
export interface IOrder extends IDeliveryForm, IContactsForm {
	total: number; // сумма заказа
	items: string[]; // массив с идентификаторами товаров
}

// интерфейс данных формы с адресом доставки
export interface IDeliveryForm {
	payment: string;
	adress: string;
}

// интерфейс данных формы с контактами
export interface IContactsForm {
	email: string;
	phone: string;
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