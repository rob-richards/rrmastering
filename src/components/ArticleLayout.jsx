import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';

import { Container } from '@/components/Container';
import { formatDate } from '@/lib/formatDate';
import { Prose } from '@/components/Prose';
import Link from 'next/link';

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArticleLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = usePathname();

  if (isRssFeed) {
    return children;
  }

  return (
    <>
      <Head>
        <title>{`${meta.title} - Rob Richards`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-3xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => null}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-0 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {meta.title}
                </h1>
              </header>
              <Prose className="mt-8">{children}</Prose>
            </article>
            <div className="prose border-t-2 pt-4">
              <h2 className="text-2xl font-bold">
                Need professional mastering for your music?
              </h2>
              If you're looking for a professional mastering engineer to help
              bring your song across the finish line, I'd love to be apart and
              make your tracks sound their absolute best!{' '}
              <Link
                className="text-sky-400"
                href="https://robrichardsmastering.com/book"
              >
                Get in touch here
              </Link>
              , and let's work together!
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
