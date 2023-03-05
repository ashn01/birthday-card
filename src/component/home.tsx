import React, { useEffect, useRef, useState } from "react";
import { gsap, Power3, Elastic, Power1 } from "gsap";
import Card from "./card";
import Balloons from "./balloons";
import Top from "./top";

import '../scss/home.scss'

export default function Home() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    const balloonsRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    // initial settings
    useEffect(() => {
        window.addEventListener("resize", resize);

        gsap.fromTo(".card-container", {
            top: "-20%",
            left: "-21%",
        }, {
            top: "50%",
            left: "51%",
            delay: .5,
            ease: Power3.easeInOut
        })

        return () => {
            console.log("remove resize event")
            window.removeEventListener("resize", resize);
        }
    }, [])

    useEffect(() => {
        if (isOpen) {
            console.log("Opened!");
            console.log(isOpen);
            // topEffect();
            createParticles();
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            // balloonEffect();
        }
    }, [width, height])

    // window event
    const resize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    // gsap effect
    // const balloonEffect = () => {
    //     if (balloonsRef.current) {
    //         balloonsRef.current.childNodes.forEach((balloon, i) => {
    //             let timeline = gsap.timeline();
    //             timeline.fromTo(balloon, {
    //                 y: window.innerHeight + 200,
    //                 x: `random(200,${window.innerWidth - 200})`,
    //                 repeatRefresh: true,
    //             }, {
    //                 y: -200,
    //                 repeat: -1,
    //                 duration: `random(8, 12)`,
    //                 delay: `random(0, 8)`,
    //                 repeatRefresh: true,
    //             }).fromTo(balloon, {
    //                 x: () => "+=" + Math.sin(0) * 200,
    //                 rotationZ: -10,
    //             }, {
    //                 x: () => "+=" + Math.sin(180) * 200,
    //                 rotationZ: 10,
    //                 yoyo: true,
    //                 repeat: -1,
    //                 duration: `random(3, 5)`,
    //                 delay: 0,
    //                 repeatRefresh: true,
    //                 ease: Power1.easeInOut
    //             }, 1.5)
    //         })
    //     }
    // }

    const createParticles = () =>{
        let particle
        if(particlesRef.current){
            for(let i=0;i<30;i++){
                particle = document.createElement("div");
                particle.setAttribute("class", `particle${i%3+1}`);
                particlesRef.current.appendChild(particle);
            }
            particlesRef.current.childNodes.forEach((particle, i)=>{
                let timeline = gsap.timeline();
                timeline.fromTo(particle, {
                    y: -50,
                    x: `random(10,${window.innerWidth - 10})`,
                }, {
                    y: height+10,
                    repeat: -1,
                    duration: `random(10, 16)`,
                    delay: `random(0, 3)`,
                    ease:"none",
                }).to(particle, 1, {
                    rotationX: 180,
                    rotationZ: 180,
                    delay: i*.1,
                    repeat: -1,
                    ease:"none",
                }, 0)
            })

        }
    }

    return (
        <div className="home">
            <Top isOpen={isOpen}/>
            <Card setOpen={() => setIsOpen(true)} />
            <Balloons width={width} height={height} />
            <div className="particles" ref={particlesRef}>
            </div>
        </div>
    )
}