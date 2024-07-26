export default class InterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InterError";
  }
}
