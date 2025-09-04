//@ts-nocheck
"use client"

import { createRef, useRef } from "react"

import { cn } from "../../utils/cursorImage"

interface ImageMouseTrailProps {
  items: ImageItem[]
  children?: ReactNode
  className?: string
  imgClass?: string
  distance?: number
  maxNumberOfImages?: number
  fadeAnimation?: boolean
}
function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "",
  distance = 20,
  fadeAnimation = true,
  imageSize = 200,
}: ImageMouseTrailProps) {
  const containerRef = useRef(null)
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()))
  const currentZIndexRef = useRef(1)

  let globalIndex = 0
  let last = { x: 0, y: 0 }

  const activate = (image, x, y) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    const relativeX = x - containerRect.left
    const relativeY = y - containerRect.top
    image.style.left = `${relativeX}px`
    image.style.top = `${relativeY}px`
    // console.log(refs.current[refs.current?.length - 1])

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1
    }
    image.style.zIndex = String(currentZIndexRef.current)
    currentZIndexRef.current++

    image.dataset.status = "active"
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive"
      }, 1500)
    }
    last = { x, y }
  }

  const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y)
  }
  const deactivate = (image) => {
    image.dataset.status = "inactive"
  }

  const handleOnMove = (e) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
      const lead = refs.current[globalIndex % refs.current.length].current
      const tail =
        refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]
          ?.current
      if (lead) activate(lead, e.clientX, e.clientY)
      if (tail) deactivate(tail)
      globalIndex++
    }
  }

  return (
    <section
      onMouseMove={handleOnMove}
      onTouchMove={(e) => handleOnMove(e.touches[0])}
      ref={containerRef}
      className={cn(
        "relative grid w-full place-content-center overflow-hidden",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={cn(
              "pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-lg object-cover opacity-0 transition-all duration-300 data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
              imgClass
            )}
            style={{
              maxWidth: `${imageSize}px`,
              maxHeight: `${imageSize * 1.8}px`, // Maintain aspect ratio
            }}
            data-index={index}
            data-status="inactive"
            src={item}
            alt={`image-${index}`}
            ref={refs.current[index]}
          /></div>
      ))}
      {children}
    </section>
  )
}
export default ImageCursorTrail