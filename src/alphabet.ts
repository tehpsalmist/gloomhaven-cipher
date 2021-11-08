export const usage = [
  {
    letter: "E",
    percentage: "11.1607%",
    frequency: 56.88
  },
  {
    letter: "A",
    percentage: "8.4966%",
    frequency: 43.31
  },
  {
    letter: "R",
    percentage: "7.5809%",
    frequency: 38.64
  },
  {
    letter: "I",
    percentage: "7.5448%",
    frequency: 38.45
  },
  {
    letter: "O",
    percentage: "7.1635%",
    frequency: 36.51
  },
  {
    letter: "T",
    percentage: "6.9509%",
    frequency: 35.43
  },
  {
    letter: "N",
    percentage: "6.6544%",
    frequency: 33.92
  },
  {
    letter: "S",
    percentage: "5.7351%",
    frequency: 29.23
  },
  {
    letter: "L",
    percentage: "5.4893%",
    frequency: 27.98
  },
  {
    letter: "C",
    percentage: "4.5388%",
    frequency: 23.13
  },
  {
    letter: "U",
    percentage: "3.6308%",
    frequency: 18.51
  },
  {
    letter: "D",
    percentage: "3.3844%",
    frequency: 17.25
  },
  {
    letter: "P",
    percentage: "3.1671%",
    frequency: 16.14
  },
  {
    letter: "M",
    percentage: "3.0129%",
    frequency: 15.36
  },
  {
    letter: "H",
    percentage: "3.0034%",
    frequency: 15.31
  },
  {
    letter: "G",
    percentage: "2.4705%",
    frequency: 12.59
  },
  {
    letter: "B",
    percentage: "2.0720%",
    frequency: 10.56
  },
  {
    letter: "F",
    percentage: "1.8121%",
    frequency: 9.24
  },
  {
    letter: "Y",
    percentage: "1.7779%",
    frequency: 9.06
  },
  {
    letter: "W",
    percentage: "1.2899%",
    frequency: 6.57
  },
  {
    letter: "K",
    percentage: "1.1016%",
    frequency: 5.61
  },
  {
    letter: "V",
    percentage: "1.0074%",
    frequency: 5.13
  },
  {
    letter: "X",
    percentage: "0.2902%",
    frequency: 1.48
  },
  {
    letter: "Z",
    percentage: "0.2722%",
    frequency: 1.39
  },
  {
    letter: "J",
    percentage: "0.1965%",
    frequency: 1.0
  },
  {
    letter: "Q",
    percentage: "0.1962%",
    frequency: 1
  }
]

export const longMessage = [
  [1, 2, 3],
  [4, 5, 6, 2, 6, 7],
  [8, 2, 9, 10],
  [5],
  [7, 11, 12, 13, 10],
  [8, 13, 6],
  [14, 1, 15, 6, 16],
  [12, 17, 18, 16, 10],
  [13, 2],
  [19, 7, 4, 1],
  [5, 8],
  [13, 6, 8, 4, 3, 13],
  [17, 13, 14],
  [20, 1, 10, 7],
  [16, 6, 8, 10, 15],
  [8, 19, 3, 13, 4, 21]
]

export const shortMessage = [
  [9, 22, 3, 23],
  [16, 3, 13, 13, 4, 24],
  [8, 1, 11, 22],
  [5, 11],
  [25, 26],
  [1, 5, 3, 27, 3],
  [1, 4, 12]
]

export const getAlphabet = () =>
  Array(26)
    .fill(1)
    .map((n, i) => n + i)

export const generateValuesFromMessage = (message: number[][]) => {
  const values = message.flat()

  const cumulativeCounts = values.reduce((counts, n) => {
    return {
      ...counts,
      [n]: counts[n] ? counts[n] + 1 : 1
    }
  }, {})

  const alphabet = getAlphabet()

  alphabet.sort((a, b) => cumulativeCounts[b] - cumulativeCounts[a])

  return alphabet.reduce<Record<number, string>>((map, v, i) => {
    return {
      ...map,
      [v]: usage[i].letter
    }
  }, {})
}
