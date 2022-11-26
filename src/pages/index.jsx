import Image from 'next/legacy/image';
import Head from 'next/head';
import clsx from 'clsx';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import Contact from '@/components/Contact';
import artists from '@/data/artists';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';
import { Link as RsLink } from 'react-scroll';

function Hero() {
  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-start-1 col-span-5 md:col-span-3 md:col-start-2">
          <h1 className="text-4xl text-center font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl w-full">
            I make music sound amazing everywhere it's heard.
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-1 gap-4 mt-12 justify-items-center">
        <div className="col-start-1 md:col-start-3">
          <Button type="submit" className="ml-0 flex-none bg-sky-500 hover:bg-sky-600">
            <RsLink
              activeClass="active"
              className={''}
              to={'contact'}
              spy
              smooth
              offset={0}
              duration={500}
              saveHashHistory={false}
            >
              Book a Session
            </RsLink>
          </Button>
        </div>
      </div>
    </>
  )
}

function Photos() {
  return (
    <div className="mt-0 mb-16">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-0">
        {artists.map(artist => (
          <div
            key={artist.song}
            className={clsx(
              'relative aspect-[10/10] w-100 flex-none overflow-hidden bg-zinc-100 dark:bg-zinc-800'
            )}
          >
            <Image
              key={artist.song}
              src={artist.artwork}
              alt={`${artist.artist} - ${artist.song}`}
              sizes="(max-width: 600px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              layout='fill'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>
          Rob Richards Mastering - Mastering Engineer from Nashville, TN
        </title>
        <meta
          name="description"
          content="I'm Rob, a mastering engineer from Nashville, TN. I make music sound amazing everywhere it's heard. Headphones, car, laptop, surround sound. I make sure it translates so the listener can connect with your music."
        />
      </Head>
      <Container className="flex mt-16 md:mt-32 mb-24 w-full">
        <Hero />
      </Container>
      <Photos />
      <Container className="mt-0">
        <Contact />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
