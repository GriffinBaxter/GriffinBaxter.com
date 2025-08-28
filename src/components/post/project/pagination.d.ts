declare module "@kaliber/pagination" {
  export function getPagination({
    padding: number,
    current: number,
    max: number,
  }): (number | null)[];
}
