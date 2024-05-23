import { dir } from "console";
import { Time } from "./Time";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private Time: Time;
  public fps = 60;

  private ball = {
    x: 50,
    y: 50,
    radius: 10,
    speed: 500,
    direction: 45,
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.Time = new Time();
  }

  public update() {
    this.Time.update();

    const dx =
      Math.cos(this.ball.direction) * this.ball.speed * this.Time.deltaTime;
    const dy =
      Math.sin(this.ball.direction) * this.ball.speed * this.Time.deltaTime;

    this.ball.x += dx;
    this.ball.y += dy;

    if (this.ball.x < 0 || this.ball.x > this.canvas.width) {
      this.ball.direction = Math.PI - this.ball.direction;
    }

    if (this.ball.y < 0 || this.ball.y > this.canvas.height) {
      this.ball.direction = -this.ball.direction;
    }
  }

  public draw() {
    if (!this.context) {
      return;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.beginPath();
    this.context.arc(
      this.ball.x,
      this.ball.y,
      this.ball.radius,
      0,
      Math.PI * 2
    );
    this.context.fillStyle = "red";
    this.context.fill();
    this.context.closePath();
  }
}
