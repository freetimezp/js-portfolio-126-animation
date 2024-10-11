/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      gsap.to(cardLeft, {
        x: leftXValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `
                translateX(${progress * leftXValues[index]}px)
                translateY(${progress * yValues[index]}px)
                rotate(${progress * leftRotationValues[index]}deg)`;
            cardRight.style.transform = `
                translateX(${progress * rightXValues[index]}px)
                translateY(${progress * yValues[index]}px)
                rotate(${progress * rightRotationValues[index]}deg)`;
          }
        }
      });
    });

    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(".line p", {
      y: 1,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to("button", {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];

    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <img src={`/image-0${2 * i - 1}.jpg`} alt="item" />
          </div>
          <div className="card card-right">
            <img src={`/image-0${2 * i}.jpg`} alt="item" />
          </div>
        </div>
      )
    }

    return rows;
  };

  return (
    <>
      <ReactLenis root>
        <section className="hero">
          <div className="img">
            <img src="/heart.webp" alt="heart" className="logo-heart" />
          </div>
        </section>

        <section className="main">
          <div className="main-content">
            <div className="logo">
              <img src="/heart.webp" alt="heart" className="logo-heart" />
            </div>

            <div className="copy">
              <div className="line">
                <p>Coding with clutter.</p>
              </div>
              <div className="line">
                <p>Learn endless web design.</p>
              </div>
              <div className="line">
                <p>Fast plan to take mastery level.</p>
              </div>
            </div>

            <div className="btn">
              <button>Get PRO</button>
            </div>
          </div>

          {generateRows()}
        </section>

        <section className="footer">
          <Link href="https://google.com">Link in Description</Link>
        </section>
      </ReactLenis>
    </>
  );
}
