/* eslint-disable @next/next/no-img-element */
"use client";
import Pagination from "@/components/custom/generic/pagination";
import PortfolioGrid from "@/components/custom/generic/portfolio-grid";
import Skills from "@/components/custom/generic/skills";
import SectionWrapper from "@/components/custom/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("per_page") ?? "5";
  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);
  const length = 30;

  //fetch all from db:skip start, take: end

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const portfolios = [
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
    {
      image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      title: "Serene Landscape",
      tags: "Captured by John Doe",
    },
  ];

  return (
    <div className="grainy-light relative bg-slate-50">
      <section className="md:bg-profile relative h-screen">
        <SectionWrapper className="relative pb-12 pt-10 sm:pb-16 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-32 lg:pt-24 xl:gap-x-8 xl:pt-32">
          <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:order-2 lg:col-span-1 lg:mx-0 lg:mt-20">
            <img src="/profile.png" alt="intro photo" className="md:hidden" />
          </div>
          <div className="col-span-2 px-6 text-center lg:order-1 lg:px-0 lg:pt-4 lg:text-left">
            <h1 className="relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="text-deep-purple-accent-100 absolute left-0 top-0 z-0 -ml-20 -mt-8 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
                >
                  <defs>
                    <pattern
                      id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">Hello</span>
              </span>{" "}
              I&apos;am <br />
              <span className="bg-green-600 px-2 text-white">
                Hillary Sylvester
              </span>{" "}
            </h1>
            <p className="mt-8 hidden max-w-prose text-balance text-center text-lg md:text-wrap lg:block lg:pr-10 lg:text-left">
              Experienced Full-stack developer with 2 years experience in
              Laravel, NextJS, TailwindCSS and React Native
            </p>
          </div>
          <div className="pointer-event-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-50" />
        </SectionWrapper>
      </section>

      <section>
        <SectionWrapper className="pb-24 pt-10 sm:pb-16 lg:pb-32 lg:pt-24 xl:gap-x-8 xl:pt-16">
          <h2 className="section-heading mb-24 text-center text-4xl font-bold uppercase">
            About me
          </h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-0">
            <div className="flex flex-col space-y-10">
              <h3 className="hidden pt-32 text-center text-2xl font-bold md:block md:pt-8 md:text-left">
                My Story
              </h3>
              <div className="content flex flex-col gap-5 leading-relaxed text-slate-600">
                <p>
                  I&apos;m a Frontend Focused Web Developer building and
                  managing the Front-end of Websites and Web Applications that
                  leads to the success of the overall product.
                </p>
                <p>
                  Check out some of my work in the Projects section. I also like
                  sharing content related to the stuff that I have learned over
                  the years in Web Development so it can help other people of
                  the Dev Community.
                </p>
                <p>
                  Feel free to Connect or Follow me on my Linkedin and Instagram
                  where I post useful content related to Web Development and
                  Programming I&apos;m open to Job opportunities where I can
                  contribute, learn and grow. If you have a good opportunity
                  that matches my skills and experience then don&apos;t hesitate
                  to contact me.
                </p>
                <Button>Contact me</Button>
              </div>
            </div>
            <div className="skills flex flex-col space-y-10 px-10">
              <h3 className="pt-32 text-center text-2xl font-bold md:pt-8 md:text-left">
                My Skills
              </h3>
              <Skills />
            </div>
          </div>
        </SectionWrapper>
      </section>

      <section className="grainy-light">
        <div className="bg-white-400/75 backdrop-blur-lg">
          <SectionWrapper className="pb-24 pt-10 sm:pb-16 lg:pb-32 lg:pt-24 xl:gap-x-8 xl:pt-16">
            <h2 className="section-heading mb-24 text-center text-4xl font-bold uppercase">
              My Projects
            </h2>
            <div className="">
              <PortfolioGrid portfolios={portfolios} />
              <Pagination
                page={page}
                perPage={perPage}
                start={start}
                end={end}
                length={length}
              />
            </div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  );
}
