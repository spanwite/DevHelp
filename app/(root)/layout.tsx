import { Header, Logo, ThemeSwitcher } from '@/components/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <Logo />
        <input type='text' placeholder='Global search...' />
        <ThemeSwitcher />
      </Header>
      <main>{children}</main>
    </>
  );
}
