import './globals.css'

export const metadata = {
  title: 'Felipe Viana',
  description: 'Created by Felipe Vina  ',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
