/* eslint-disable @next/next/no-img-element */
import SectionWrapper from "@/components/custom/layout/section-wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grainy-light bg-slate-50">
      <section className="bg-profile h-screen">
        <SectionWrapper className="relative pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
          <div className="col-span-2 px-6 text-center lg:px-0 lg:pt-4 lg:text-left">
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
          <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20"></div>
        </SectionWrapper>
      </section>
      <section className="bg-sky-500">
        <SectionWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
          Hello
        </SectionWrapper>
      </section>
    </div>
  );
}
