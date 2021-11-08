import React, { SVGProps } from "react"

export interface DrawLetterProps extends SVGProps<SVGSVGElement> {
  lineSegments: number[][]
  dots: number[]
}

const coords = {
  1: "15,15",
  2: "50,15",
  3: "85,15",
  4: "15,60",
  5: "50,60",
  6: "85,60",
  7: "15,105",
  8: "50,105",
  9: "85,105"
}

export const DrawLetter = ({
  lineSegments,
  dots,
  ...props
}: DrawLetterProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0,0,100,120"
      preserveAspectRatio="xMidYMid meet"
      height="100%"
      width="100%"
    >
      {lineSegments.map((seg) => (
        <path
          strokeWidth="8px"
          fill="none"
          stroke="currentColor"
          d={`M ${seg.map((d) => coords[d]).join(" L ")}`}
        />
      ))}
      {dots.map((dot) => {
        if (dot < 1 || 9 < dot) return null

        const [x, y] = coords[dot].split(",")

        return <circle fill="currentColor" cx={x} cy={y} r="12" />
      })}
    </svg>
  )
}
