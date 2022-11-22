import Image from 'next/legacy/image'
import Head from 'next/head'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import Form from '@/components/Form'
import image1 from '@/images/clients/ellrose.jpeg'
import image2 from '@/images/clients/darien-noel-wedding-rings.jpeg'
import image3 from '@/images/clients/cloudly-too-good.jpeg'
import image4 from '@/images/clients/cb-worship.jpeg'
import image5 from '@/images/clients/zach-sines-empty-cups.jpeg'
import image7 from '@/images/clients/minus-expenses-flavor-of-the-week.jpeg'
import image8 from '@/images/clients/meredith-boyce-lesson-learned.jpeg'
import image9 from '@/images/clients/darien-noel-laidback-fisherman-2.jpeg'
import image10 from '@/images/clients/zach-sines-alone.jpeg'
import image11 from '@/images/clients/zach-sines-empty-cups-acoustic.jpeg'
import image12 from '@/images/clients/darien-noel-laidback-fisherman.jpeg'
import image13 from '@/images/clients/untitled-worship-shouldnt-have.jpeg'
import image14 from '@/images/clients/frisbee-club-carwash-kiss.jpeg'
import image15 from '@/images/clients/jonathan-murray.jpeg'
import image16 from '@/images/clients/yugo-tragic.jpeg'
import image17 from '@/images/clients/lance.jpeg'
import image18 from '@/images/clients/untitled-live.jpeg'
import image19 from '@/images/clients/maddison-lopez-cotton-candy.jpeg'
import image20 from '@/images/clients/the-empire.jpeg'
import image21 from '@/images/clients/meredith-boyce.jpeg'
import image22 from '@/images/clients/bayceiline-unaxious.PNG'
import image23 from '@/images/clients/meredith-boyce.jpeg'
import image24 from '@/images/clients/meredith-boyce.jpeg'
import image25 from '@/images/clients/meredith-boyce.jpeg'
import image26 from '@/images/clients/meredith-boyce.jpeg'
import image27 from '@/images/clients/meredith-boyce.jpeg'
import image28 from '@/images/clients/meredith-boyce.jpeg'
import image29 from '@/images/clients/meredith-boyce.jpeg'
import image30 from '@/images/clients/meredith-boyce.jpeg'
import artists from '@/data/artists'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'

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
      <div className="grid md:grid-cols-5 grid-cols-3 gap-4 mt-12 justify-items-center">
        <div className="col-start-2 md:col-start-3">
          <Button type="submit" className="ml-0 flex-none bg-indigo-600 hover:bg-indigo-700">
            Book a Session
          </Button>
        </div>
      </div>
    </>
  )
}

function Photos() {
  return (
    <div className="mt-0">
      {console.log('artists', artists)}
      <div className="flex justify-center gap-0 overflow-hidden">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[10/10] w-44 flex-none overflow-hidden bg-zinc-100 dark:bg-zinc-800 sm:w-72'
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-0 overflow-hidden">
        {[image7, image8, image9, image10, image11].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[10/10] w-44 flex-none overflow-hidden bg-zinc-100 dark:bg-zinc-800 sm:w-72'
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-0 overflow-hidden">
        {[image12, image13, image14, image15, image16].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[10/10] w-44 flex-none overflow-hidden bg-zinc-100 dark:bg-zinc-800 sm:w-72'
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-0 overflow-hidden">
        {[image17, image18, image19, image20, image21].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[10/10] w-44 flex-none overflow-hidden bg-zinc-100 dark:bg-zinc-800 sm:w-72'
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
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
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
        />
      </Head>
      <Container className="flex mt-16 md:mt-32 mb-24 w-full">
        <Hero />
      </Container>
      <Photos />
      <Container className="mt-0">
        <Form />
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
