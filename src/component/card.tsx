import { gsap, Power3 } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import '../scss/card.scss'


export default function Card(props:{setOpen:()=>void}) {

    const [testToggle, setTestToggle] = useState<boolean>(true)
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener("mousemove", e=>mousemove(e));

        gsap.fromTo(".card-container", {
            top: "-20%",
            left: "-21%",
        }, {
            top: "50%",
            left: "51%",
            delay: .5,
            ease: Power3.easeInOut
        })
        mouseEvent();
        cardEffect();
        return () => {
            console.log("remove resize event")
            window.removeEventListener("mousemove", mousemove);
        }
    }, [])

    // mouse event global values
    let x = 0;
    let y = 0;
    let ax = 0;
    let ay = 0;

    const mousemove = (event:MouseEvent) =>{
        x = event.clientX - window.innerWidth / 2
        y = event.clientY - window.innerHeight / 2
    }

    const mouseEvent = () =>{
        ax += (x-ax) * .05;
        ay += (y-ay) * .05;
        
        if(cardRef.current){
            cardRef.current.style.transform = `
                translate3d(-50%, -50%, 0) 
                rotateX(${ay/20}deg) 
                rotateY(${(-ax/20)}deg)
            `; 
            window.requestAnimationFrame(mouseEvent)
        }
    }

    const onClickCard = () => {
        if (testToggle) {
            props.setOpen();
            gsap.to(".front", {
                rotateX: "-10deg",
                ease: Power3.easeOut
            })
            gsap.to(".bottom", {
                transform: "translate3d(0px, -5px, 30px) rotateX(15deg)"
            })
        } else {
            gsap.to(".front", {
                transform: "rotateX(-179deg) translate(0px, 0px)"
            })
            gsap.to(".bottom", {
                transform: "rotateX(0deg) translateZ(0px)"
            })
        }

        setTestToggle(current => !current);
    }

    const cardEffect = () =>{
        gsap.fromTo(".balloon-card", {
            translateY: 30
        }, {
            translateY: -30,
            repeat: -1,
            duration: 3,
            ease:Power3.easeInOut,
            yoyo: true
        })
    }

    return (
        <div className="card-container" onClick={onClickCard} ref={cardRef}>
            <div className="front">
                <div className="prev"></div>
                <div className="next"></div>
                <div className="balloon-card"></div>
                <div className="cake-card"></div>
                <div className="gift-card"></div>
            </div>
            <div className="bottom">
                <div className="message">
                    <h1>To. Jiyun</h1>
                    <p>생일 축하해! 올해도 좋은 일만 가득하길 바랄께<br/> 올해는 모두 원하는 일 잘됐으면 좋겠다</p>
                    <h3>from. Youngmin</h3>
                </div>
            </div>
        </div>
    )
}