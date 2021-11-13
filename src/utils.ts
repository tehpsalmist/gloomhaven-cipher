export function leftpad(num: number, padding: number = 2): string {
  return `${"0".repeat(padding - String(num).length)}${num}`
}

export function invertObject(
  obj: Record<string, number>
): Record<number, string> {
  return Object.keys(obj).reduce<Record<number, string>>(
    (map, k) => ({ ...map, [obj[k]]: k }),
    {}
  )
}
