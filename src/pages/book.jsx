import Image from 'next/legacy/image';
import Head from 'next/head';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import Contact from '@/components/Contact';

export default function Book() {
  return (
    <>
      <Head>
        <title>Projects - Rob Richards</title>
        <meta
          name="description"
          content="Things I've made trying to put my dent in the universe."
        />
      </Head>
      <SimpleLayout>
        <Contact />
      </SimpleLayout>
    </>
  )
}
