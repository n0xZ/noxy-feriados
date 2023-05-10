export interface Holiday {
	date: Date
	localName: string
	name: string
	countryCode: CountryCode
	fixed: boolean
	global: boolean
	counties: null
	launchYear: number | null
	type: Type
}

export enum CountryCode {
	Ar = 'AR',
}

export enum Type {
	Public = 'Public',
}
