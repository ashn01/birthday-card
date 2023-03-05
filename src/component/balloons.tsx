import react, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin'

import '../scss/balloons.scss'


export default function Balloons(props:{width:number, height:number}) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(()=>{
        // register plugin
        gsap.registerPlugin(MotionPathPlugin);

        let balloonGenerator = setInterval(() => {
            if (!svgRef.current)
            {
                return;
            }
            if (!document.hidden) {
                const newBalloon = createBalloon();
                const isBehind = Math.random() > 0.5 ? true : false;
                svgRef.current.appendChild(newBalloon);
                animateBalloon(newBalloon, isBehind);
            }
        }, 400)

        return () =>{
            console.log("clear interval")
            clearInterval(balloonGenerator);
        }   
    },[])

    const getColor = () => {
        return "hsl(" + 360 * Math.random() + ',' +
            (100 + 70 * Math.random()) + '%,' +
            (70 + 0 * Math.random()) + '%)'
    }

    const createBalloon = () => {
        let balloon = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        balloon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#balloon');
        balloon.setAttribute('style', `--color:${getColor()}`);
        balloon.setAttribute('class', `balloon`);
        return balloon;
    }

    const popBalloon = (colorSettings: any, x: number, y: number, isBehind: boolean) => {
        if (!svgRef.current)
            return;

        var pop = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        pop.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#pop');
        pop.setAttribute('style', colorSettings);
        pop.setAttribute('class', `pop`);

        svgRef.current.appendChild(pop);

        gsap.set(pop, { scale: 0.5, x: x, y: y, rotation: Math.random() * 360, transformOrigin: "center" });
        gsap.to(pop, {
            duration: 0.2,
            scale: 3,
            opacity: 0,
            ease: 'power3.out',
            onComplete: () => { svgRef.current!.removeChild(pop) }
        })

        // create confetti
        for (let i = 0; i <= 10; i++) {
            let confetti = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            confetti.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#confetti_${Math.ceil(Math.random() * 2)}`);
            confetti.setAttribute('style', `--color: ${getColor()}`);
            confetti.setAttribute('class', `confetti`);

            svgRef.current.appendChild(confetti);

            let randomPos = {
                x: Math.random() * 500 - 250,
                y: Math.random() * 500 - 250
            }
            gsap.set(confetti, { x: x, y: y, rotation: Math.random() * 360, transformOrigin: "center" });
            gsap.to(confetti, {
                duration: 3,
                scale: Math.random(),
                motionPath: {
                    curviness: 2, path: [
                        {
                            x: x + randomPos.x,
                            y: y + randomPos.y,
                        },
                        {
                            x: x + randomPos.x + (Math.random() * 20 - 10),
                            y: y + randomPos.y + (Math.random() * 200),
                        }
                    ]
                },
                opacity: 0,
                rotation: Math.random() * 360 - 180,
                ease: 'power4.out',
                onComplete: () => { svgRef.current!.removeChild(confetti) }
            })

        }
    }

    const animateBalloon = (balloon: any, isBehind: boolean = false) => {
        gsap.set(balloon, {
            x: `random(100, ${props.width-100})`,
            y: props.height + 20,
            transformOrigin: "center",
            scale: isBehind ? 1 : 1.5,
            alpha: 0.95,
            rotation: (Math.random() * 180) - 90
        })

        let centerPos = {
            x: (props.width / 4) + (Math.random() * (props.width / 2)),
            y: props.height / 2
        }

        let endPos = {
            x: centerPos.x + (Math.random() * 200 - 100),
            y: Math.random() * 50
        }
        gsap.to(balloon, {
            duration: 5 + Math.random(),
            motionPath: {
                curviness: 1.5, path: [

                    {
                        x: centerPos.x,
                        y: centerPos.y
                    },
                    {
                        x: endPos.x,
                        y: endPos.y
                    }
                ]
            },
            scale: isBehind ? 0.5 : 1,
            rotation: 0,
            ease: "power1.in",
            onComplete: () => { onClick(endPos.x, endPos.y, balloon, isBehind) }
        })

        balloon.addEventListener('click', (e: any) => {
            onClick(e.clientX, e.clientY, balloon, isBehind);
        })
    }

    const onClick = (x: number, y: number, balloon: any, isBehind: boolean) => {
        if (!svgRef.current)
            return;

        gsap.killTweensOf(balloon);
        const colorSettings = balloon.getAttribute('style');
        svgRef.current.removeChild(balloon)
        popBalloon(colorSettings, x, y, isBehind);
    }

    

    return (
        <div className="balloons">
            <svg width="1" height="1" ref={svgRef} className="" id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>

                    <g id="balloon">
                        <path className="color" d="M30.32,85.27l2.6-3.67,2.18,3.67a3.09,3.09,0,0,1-2.39,1A2.63,2.63,0,0,1,30.32,85.27Z" />
                        <ellipse className="color" cx="32.92" cy="41.72" rx="32.92" ry="41.72" />
                        <ellipse cx="50.5" cy="20.4" rx="5.23" ry="13.48" transform="translate(-3 30.59) rotate(-32.78)" style={{fill:"#fff", opacity:"0.4"}} />
                    </g>
                    <g id="pop">
                        <path className="color" d="M10.4,1.06s23.25-3.73,31.65,2.8S52,21,52,21s-3.73-11-9.33-10.5-11.47,4.89-11.47,4.89,5.65-11.52,0-11.52-16.55.63-16.55.63Z" />
                        <path className="color" d="M31.21,29.08s13,4.36,15.51,0,6.85,0,6.85,0L45.79,46.51S34.84,44.57,33,36.83Z" />
                        <path className="color" d="M14.86,6.71l-4,15.14,5.3,3.83s-5.85,3.84-1.43,7.81,13,3.27,13,3.27S-.89,43.33,0,30.93,14.86,6.71,14.86,6.71Z" />
                    </g>
                    <g id="confetti_1">
                        <polygon className="color" points="0 6.23 12.76 0 17.43 6.23 9.96 16.81 0 6.23" />
                    </g>
                    <g id="confetti_2">
                        <polygon className="color" points="0 21.79 10.53 0 15.2 2.18 4.93 25.21 0 21.79" />
                    </g>
                </defs>
            </svg>
            <svg id="behind" width="1" height="1" ></svg>
        </div>
    )
}