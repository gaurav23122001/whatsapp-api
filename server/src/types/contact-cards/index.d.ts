import { Document, Types } from 'mongoose';
import { IAccount } from '../account';
export default interface IContactCard extends Document {
	_id: Types.ObjectId;
	user: IAccount;
	first_name: string;
	middle_name: string;
	last_name: string;
	title: string;
	organization: string;
	email_personal: string;
	email_work: string;
	links: string[];
	street: string;
	city: string;
	state: string;
	country: string;
	pincode: string;
	contact_details_phone: {
		whatsapp_id?: string;
		contact_number: string;
	};
	contact_details_work: {
		whatsapp_id?: string;
		contact_number: string;
	};
	contact_details_other: {
		whatsapp_id?: string;
		contact_number: string;
	}[];

	vCardString: string;
	qrString: string;
}
