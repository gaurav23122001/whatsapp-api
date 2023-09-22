export const SERVER_URL = 'http://localhost:8282/';
export const NAVIGATION = {
	WELCOME: '/welcome',
	HOME: '/home',
	CHECKOUT: '/checkout',
};

export enum CHROME_ACTION {
	PRIVACY_UPDATED = 'PRIVACY_UPDATED',
}

export enum PRIVACY_TYPE {
	RECENT = 'RECENT',
	NAME = 'NAME',
	PHOTO = 'PHOTO',
	CONVERSATION = 'CONVERSATION',
}

export enum EXPORTS_TYPE {
	ALL = 'ALL',
	SAVED = 'SAVED',
	UNSAVED = 'UNSAVED',
	GROUP = 'GROUP',
	LABEL = 'LABEL',
}

export enum SOCKET_EVENT {
	INITIALIZE = 'initialize',
	INITIALIZED = 'initialized',
	QR_GENERATED = 'qr-generated',
	WHATSAPP_AUTHENTICATED = 'whatsapp-authenticated',
	WHATSAPP_READY = 'whatsapp-ready',
	WHATSAPP_CLOSED = 'whatsapp-closed',
}
