import React, { useEffect, useRef, useState } from "react";
import { gsap, Power3, Elastic, Power1 } from "gsap";

import '../scss/top.scss'

export default function Top(props:{isOpen:boolean}){

    const topRef = useRef<HTMLDivElement>(null);
    const [text] = useState<Array<string>>(["H","A","P","P","Y"," ","B","I","R","T","H","D","A","Y"]);

    useEffect(()=>{
        createTexts();
    },[])

    useEffect(()=>{
        if(props.isOpen){
            topEffect();
        }
    },[props.isOpen])

    const createTexts = () =>{
        let word
        if(topRef.current){
            for(let i=0;i<text.length;i++){
                if(i==5){
                    topRef.current.appendChild(document.createElement("br"));
                }else{
                    word = document.createElement("div");
                    word.setAttribute("class","word")
                    word.style.color=`rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`
                    word.innerHTML=text[i];
                    topRef.current.appendChild(word);
                }
            }
        }
    }

    const topEffect = () => {
        if(topRef.current){
            let timeline = gsap.timeline();

            timeline.to(".tops", 1, {
                top:50,
                ease:Elastic.easeInOut
            })

            topRef.current.childNodes.forEach((char, i)=>{
                gsap.fromTo(char, {
                    scale: .8
                },
                {
                    scale: 1.1,
                    repeat: -1,
                    repeatRefresh: true,
                    yoyo: true,
                    duration: `random(1, 1.5)`,
                })
            })
        }
    }

    return (
        <div className="tops" ref={topRef}>

        </div>
    )
}