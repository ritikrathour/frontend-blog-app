import { useEffect, useRef, useState } from "react";
const LazyImage = ({src,alt})=>{
    const imageRef = useRef(); 
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{ 
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){  
                    observer.unobserve(entry.target)
                }
            })
        });
        observer.observe(imageRef.current);

        return ()=>{
            if(imageRef.current){
                observer.unobserve(imageRef.current)
            }
        }
    },[])
    const handleLoad = ()=>{
        setIsLoaded(true)
    } 
    return (
        <>
        <img 
        ref={imageRef}
        onLoad={handleLoad}
        src={ src } 
        alt={alt}
        className={`w-full h-full transition-all ${!isLoaded ? "blur": "" }`} 
        />
        </>
    )
}
export default LazyImage;