import './globals.css';

export const metadata = {
  title: 'Tamohar Foundation - Empowering Communities, Transforming Lives',
  description: 'Tamohar Foundation is an NGO dedicated to creating lasting change through education, healthcare, environment conservation, women empowerment, child welfare, and rural development.',
  keywords: 'NGO, charity, education, healthcare, environment, women empowerment, child welfare, rural development, India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
