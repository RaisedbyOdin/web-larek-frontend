// интерфейс события
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// интерфейс промиса
export interface ILarekApi {
	getLarekList: () => Promise<IProductItem[]>;
	makeOrder: (value: IOrder) => Promise<ISuccess>;
}

// тип ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// тип категории товара
export type CatalogItemStatus = {
	category: 'софт-скил' | 'хард-скил' | 'другое' | 'кнопка' | 'дополнительное';
};

// описание продукта
export interface ICard {
	image: string; 
	title: string; 
	category: string; 
	price: number; 
	description: string; 
}

// превью
export interface ICardPreview {
	description: string;
}

export interface ICardBasket {
	title: string;
	price: number;
	index: number;
}

// интерфейс данных формы с адресом доставки
export interface IDeliveryForm {
	payment: string;
	address: string;
}

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

// описание продукта
export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

// контакты
export interface IContactsForm {
	email: string;
	phone: string;
}

// данные по заказу
export interface IOrder extends IDeliveryForm, IContactsForm {
	total: number;
	items: string[];
}

// корзина
export interface IBasket {
	items: HTMLElement[];
	total: number;
}

// заказ совершен успешно
export interface ISuccess {
	total: number | null;
}

// модальное окно
export interface IModalData {
	content: HTMLElement;
}

// оформление заказа
export interface ISuccess {
	total: number;
}