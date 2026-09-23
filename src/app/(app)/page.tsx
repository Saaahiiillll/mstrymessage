"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import messages from "@/messages.json"

const Home = () => {
  return (
    <>
      <main className='flex-grow flex flex-col item-center
    justify-center px-4 md:px-24 py-10'>
        <section className='text-center mb-5 md:mb-10'>
          <h1 className='text-3xl md:text-5xl font-bold'>
            Dive into the World of Anonymous Conversations
          </h1>
          <p className='mt-3 md:mt-4 text-base md:text-lg'>Explore Mystry
            Message - Where your identity remains a secret.</p>
        </section>
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="mx-auto w-full  sm:max-w-xl">
          <CarouselContent>
            {
              messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>{message.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex h-40 items-center justify-center p-5">
                        <span className="text-xl font-semibold">{message.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center p-6 md:p-10">
        © 2026 Mystery Message. All rights reserved.
      </footer>
    </>
  )
}

export default Home