import { Holiday } from '@/types'
import { headers } from 'next/headers'

async function getNextHoliday() {
	const country = headers().get('x-vercel-ip-country')?.toUpperCase() ?? 'AR'
	const city = headers().get('x-vercel-ip-city') ?? 'Buenos Aires'
	const userLocation = `${city} (${country})`

	const actualDate = new Date()
	const API_URL = process.env.API_URL ?? ''
	const RAPID_API_HOST = process.env.RAPID_API_HOST ?? ''
	const RAPID_API_KEY = process.env.RAPID_API_KEY ?? ''
	const res = await fetch(`${API_URL}/${actualDate.getFullYear()}/${country}`, {
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

	return { nextHoliday, userLocation }
}
export default async function Home() {
	const result = await getNextHoliday()

	return (
		<>
			<main className="container flex flex-col items-center justify-center h-screen max-w-4xl mx-auto space-y-3 text-xl antialiased text-center xl:text-3xl">
				<h2 className="xl:text-4xl text-2xl text-[#0284c7]">
					El próximo feriado en {result.userLocation} es:
				</h2>
				<p>{result.nextHoliday?.localName}</p>
				<time className="text-lg text-gray-400" dateTime={result.nextHoliday?.date.toString()}>
					{result.nextHoliday?.date.toString()}
				</time>
			</main>

			<footer className="p-5 text-center text-[#4a4a4a]">
				<p>©️ Noxy, 2023.</p>
			</footer>
		</>
	)
}
