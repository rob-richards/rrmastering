import Head from 'next/head';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllArticles } from '@/lib/getAllArticles';
import { formatDate } from '@/lib/formatDate';

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Blog - Rob Richards</title>
        <meta
          name="description"
          content="Thoughts and Insights on Producing, Mixing, Masting, and more."
        />
      </Head>
      <SimpleLayout
        title="Writing on music production, software design, and the intersection of both."
        intro="Thoughts and Insights on Producing, Mixing, Mastering, and more."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  };
}
