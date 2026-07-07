import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanity Studio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SanityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
