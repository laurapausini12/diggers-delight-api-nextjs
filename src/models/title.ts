export default class Title {
  title: string;
  artistName: string;
  durationInSeconds: number;
  durationInHHMMSS: string;
  url: string;
  releasedOnInTimestamp: number;
  releasedOnInLocalDateString: string;

  constructor(
    title: string,
    artistName: string,
    durationInSeconds: number,
    urlWithQueryParams: string,
    releasedOnInTimestamp: number
  ) {
    this.title = title;
    this.artistName = artistName;
    this.durationInSeconds = durationInSeconds;
    this.durationInHHMMSS = this.convertSecondsToHHMMSS(durationInSeconds);
    this.url = this.removeAllQueryParams(urlWithQueryParams);
    this.releasedOnInTimestamp = releasedOnInTimestamp;
    this.releasedOnInLocalDateString = this.formatDate(
      new Date(releasedOnInTimestamp * 1000)
    );
  }

  private convertSecondsToHHMMSS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private formatDate(date: Date): string {
    const day = this.pad(date.getDate());
    const month = this.pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, "0");
  }

  private removeAllQueryParams(url: string): string {
    const urlObj = new URL(url);
    urlObj.search = ""; // Clear all query parameters
    return urlObj.toString();
  }
}
