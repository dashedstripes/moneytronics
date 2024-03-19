import '@/styles/globals.css'
import { AuthProvider } from '@/utils/AuthContext'
import { CartProvider } from '@/utils/CartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}