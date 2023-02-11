import React from "react";

export default function CarouselFadeExample() {
  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-44 py-10 mx-auto flex flex-wrap">
          <div class="flex flex-wrap md:-m-2 -m-1">
            <div class="flex flex-wrap w-1/2">
              <div class="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block"
                  src="https://csmastersuh.github.io/data_analysis_with_python_spring_2020/_images/clustering_11_0.png"
                />
              </div>
              <div class="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block"
                  src="https://media.tenor.com/i1rNMdaKd7MAAAAS/gaussian-mixture-models-em-method-math.gif"
                  />
              </div>
              <div class="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  class="w-full h-full object-cover object-center block"
                  src="https://www.imperva.com/blog/wp-content/uploads/sites/9/2017/07/k-means-clustering-on-spherical-data-1v2.png"
                />
              </div>
            </div>
            <div class="flex flex-wrap w-1/2">
              <div class="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  class="w-full h-full object-cover object-center block"
                  src="https://tse4.mm.bing.net/th?id=OIP.bFrkQCW86rs4vajCu8EHXgHaFr&pid=Api&P=0"
                />
              </div>
              <div class="md:p-2 p-1 ">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block"
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20210314172951/clustering.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
