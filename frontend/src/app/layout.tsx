import { Metadata } from 'next';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles.scss';
import ToastProvider from '../providers/toastProvider';
import NavBarLayout from './layout/NavBarLayout';
import { TokenProvider } from '../contexts/TokenContext';

export const metadata: Metadata = {
  title: 'Authenticator',
  description: 'Website created with Next.js',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <div className="app-container">
            <TokenProvider>
              <NavBarLayout>{children}</NavBarLayout>
            </TokenProvider>

            <ToastProvider />
          </div>
        </div>
      </body>
    </html>
  );
}
