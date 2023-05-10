import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Descubrí el feriado más cercano para ahuyentar la pala.',
	description:
		'En Noxy - feriados, podés ver el feriado más cercano en tu país, para correr lo más rapido posible de la pala y disfrutar de la vida.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-[#0f0f0f] text-[#fdfdfd]`}>
				{children}
			</body>
		</html>
	)
}
