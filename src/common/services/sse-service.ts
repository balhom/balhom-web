import { SSE, SSEvent } from "sse.js";

class SseService {
  private sse?: SSE;

  private errorRetries: number = 0;

  public constructor(
    private baseUrl: string,
    private getHeaders: () => Promise<Record<string, string>>
  ) {}

  public async listen<T>(
    endpoint: string,
    eventName: string,
    hanlder: (event: T) => void
  ): Promise<void> {
    this.sse?.close();

    this.sse = new SSE(this.baseUrl + endpoint, {
      headers: await this.getHeaders(),
      method: "GET",
      withCredentials: true,
    });

    this.sse.addEventListener(eventName, (event: SSEvent) => {
      try {
        console.log("SSE Data: ", event.data);

        const data = JSON.parse(event.data);

        hanlder(data);

        this.errorRetries = 0;
      } catch (err) {
        console.log("SSE Error: ", err);
      }
    });

    this.sse.onerror = (error) => {
      console.log("SSE Error: ", error);

      this.errorRetries += 1;

      if (this.errorRetries > 5) {
        this.listen(endpoint, eventName, hanlder);
      } else {
        this.sse?.close();
      }
    };

    this.sse.onopen = () => {
      console.log("SSE connected");
    };

    //this.sse.stream();
  }

  public disconnect(): void {
    this.sse?.close();
  }
}

export default SseService;
