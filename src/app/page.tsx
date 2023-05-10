import { Holiday } from '@/types'
import { headers } from 'next/headers'
export const getNextHoliday = async () => {
	const country = headers().get('x-vercel-ip-country')

	const actualDate = new Date()
	const API_URL = process.env.API_URL ?? ''
	const RAPID_API_HOST = process.env.RAPID_API_HOST ?? ''
	const RAPID_API_KEY = process.env.RAPID_API_KEY ?? ''
	const res = await fetch(`${API_URL}/${actualDate.getFullYear()}/AR`, {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': RAPID_API_KEY,
			'X-RapidAPI-Host': RAPID_API_HOST,
		},
	})

	const holidaysResp: Holiday[] = await res.json()

	const nextHoliday = holidaysResp.find(
		(h) =>
			new Date(h.date).getMonth() === actualDate.getMonth() &&
			new Date(h.date).getDay() > actualDate.getDay()
	)

	return { nextHoliday, country }
}
export default async function Home() {
	const holiday = await getNextHoliday()
	console.log(holiday.country)
	return (
		<main className="container flex flex-col items-center justify-center h-screen max-w-4xl mx-auto space-y-3">
			<h2>El próximo feriado es: {holiday?.nextHoliday?.localName}</h2>
		</main>
	)
}
