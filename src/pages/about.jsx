import Image from 'next/legacy/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-sky-500 dark:text-zinc-200 dark:hover:text-sky-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-sky-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Spencer Sharp</title>
        <meta
          name="description"
          content="I'm Spencer Sharp. I live in New York City, where I design the future."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="#" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="#" icon={InstagramIcon} className="mt-4">
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="mailto:rob@robrichardsmastering.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                rob@robrichardsmastering.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
