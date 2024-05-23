export class Time {
  public totalTime: number;
  public deltaTime: number;
  private lastFrameTime: number;

  constructor() {
    this.totalTime = 0;
    this.deltaTime = 0;
    this.lastFrameTime = performance.now();
  }

  public update() {
    const currentFrameTime = performance.now();
    this.deltaTime = (currentFrameTime - this.lastFrameTime) / 1000; // convert to seconds
    this.totalTime += this.deltaTime;
    this.lastFrameTime = currentFrameTime;
  }
}
