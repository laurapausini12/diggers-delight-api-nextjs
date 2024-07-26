import InterError from "./interError";

export default class NoInterFoundError extends InterError {
  constructor() {
    super("No inters available");
    this.name = "NoInterFoundError";
  }
}
