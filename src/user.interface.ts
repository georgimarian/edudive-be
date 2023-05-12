export enum Role {
	'STUDENT',
	'TEACHER',
	'ADMIN',
}

export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	role: any;
}
