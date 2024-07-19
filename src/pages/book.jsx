import Image from 'next/legacy/image';
import Head from 'next/head';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import Contact from '@/components/Contact';

export default function Book() {
  return (
    <>
      <Head>
        <title>Book a Session | Rob Richards Mastering</title>
        <meta
          name="description"
          content="Book a mastering session with Rob Richards!"
        />
      </Head>
      <SimpleLayout>
        <Contact />
      </SimpleLayout>
    </>
  );
}
