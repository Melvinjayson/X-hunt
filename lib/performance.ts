"use client"

import type React from "react"

import { useCallback, useMemo, useRef } from "react"

// Debounce hook for search and input optimization
export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay)
    }) as T,
    [callback, delay],
  )
}

// Throttle hook for scroll and resize events
export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const lastRun = useRef(Date.now())

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    }) as T,
    [callback, delay],
  )
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(elementRef: React.RefObject<Element>, options?: IntersectionObserverInit) {
  const isIntersecting = useRef(false)

  useMemo(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting.current = entry.isIntersecting
    }, options)

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [elementRef, options])

  return isIntersecting.current
}

// Image optimization utility
export function getOptimizedImageUrl(src: string, width: number, height: number, quality = 75): string {
  if (src.startsWith("/placeholder.svg")) {
    return `${src}&width=${width}&height=${height}`
  }

  // For production, you would integrate with your image optimization service
  return src
}

// Performance monitoring utilities
export const performanceMonitor = {
  // Mark performance milestones
  mark: (name: string) => {
    if (typeof window !== "undefined" && "performance" in window) {
      performance.mark(name)
    }
  },

  // Measure performance between marks
  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== "undefined" && "performance" in window) {
      performance.measure(name, startMark, endMark)
      const measure = performance.getEntriesByName(name)[0]
      console.log(`${name}: ${measure.duration}ms`)
    }
  },

  // Log Core Web Vitals
  logWebVitals: () => {
    if (typeof window !== "undefined") {
      // Log FCP, LCP, FID, CLS metrics
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`${entry.name}: ${entry.startTime}ms`)
        })
      }).observe({ entryTypes: ["paint", "largest-contentful-paint"] })
    }
  },
}
