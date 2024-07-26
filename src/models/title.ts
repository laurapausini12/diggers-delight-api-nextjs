export default class Title {
  title: string;
  artistName: string;
  durationInHHMMSS: string;
  url: string;
  releasedOnLocalDateString: string;

  constructor(
    title: string,
    artistName: string,
    durationInSeconds: number,
    urlWithQueryParams: string,
    releasedOnInTimestamp: number
  ) {
    this.title = title;
    this.artistName = artistName;
    this.durationInHHMMSS = this.convertSecondsToHHMMSS(durationInSeconds);
    this.url = this.removeAllQueryParams(urlWithQueryParams);
    this.releasedOnLocalDateString = new Date(
      releasedOnInTimestamp
    ).toLocaleDateString();
  }

  private pad(num: number): string {
    return num.toString().padStart(2, "0");
  }

  private convertSecondsToHHMMSS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private removeAllQueryParams(url: string): string {
    const urlObj = new URL(url);
    urlObj.search = ""; // Clear all query parameters
    return urlObj.toString();
  }
}
