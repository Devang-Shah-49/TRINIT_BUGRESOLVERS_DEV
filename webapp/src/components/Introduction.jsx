import React from 'react'
import CarouselFadeExample from './Carousel'

export default function Introduction() {
  return (
    <div>
        <div class="">
        <div class="flex flex-col text-center w-full mt-5">
          <h2 class="text-md text-indigo-500 tracking-widest font-medium title-font">
            ABOUT
          </h2>
          <h1 class="sm:text-3xl text-xl font-medium title-font mb-2 text-gray-900">
            Ez Viz
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          This web-based tool allows users to upload dataset asynchronously. The system then displays real-time clustering based on the user configured number and type of parameters. The Interactive UI animates the entire process of clusters getting formed.
          </p>
        </div>
      </div>
      <CarouselFadeExample/>
    </div>
  )
}