'use client';

import React, { Suspense } from 'react'
import { GeneratorTabs } from '@/components/generator-tabs'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from "@/components/ui/button"
import { siGithub } from 'simple-icons'
import { GuideDrawer } from '@/components/guide/guide-drawer'
import Link from 'next/link'
import Image from 'next/image'
import { MatrixHeaderWrapper } from '@/components/matrix-header-wrapper'
import { PrivacyNotice } from '@/components/privacy-notice'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center py-8 flex-grow">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Suspense fallback={<h1 className="text-4xl font-bold">🔐</h1>}>
                <MatrixHeaderWrapper />
              </Suspense>
            </Link>
            <div className="flex items-center gap-2">
              <GuideDrawer />
              <Link 
                href="https://github.com/olbboy/passgenz" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" className="w-9 h-9">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                  >
                    <path d={siGithub.path} />
                  </svg>
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
          <PrivacyNotice />
          <GeneratorTabs />
        </div>
      </div>
      <Footer />
    </main>
  )
}
