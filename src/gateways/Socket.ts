import { Server, Socket } from "socket.io";
import { DataStore } from "../dataStore/DataStore";

export class CalculatorSocket {
  public readonly socket: any;
  public readonly dataStore: DataStore;

  private readonly config = {
    cors: {
      origin: "*",
    },
  };

  constructor(server: any, dataStore: DataStore) {
    this.socket = new Server(server, this.config);
    this.dataStore = dataStore;
  }

  public connect(): void {
    this.socket.on("connection", (socket: Socket) => {
      console.log("Socket connection established.");
      socket.on("input", (input: any) => this.onInput(input, socket));
      socket.on("connect_failed", () => this.onConnectionFailed(socket));
      socket.on("disconnect", () => this.onDisconnect(socket));
      socket.emit("refreshed_list", this.dataStore.get());
    });
  }

  public onInput(input: string, socket: Socket): void {
    this.store(input, socket);
  }

  private onDisconnect(socket: Socket): void {
    const message = "Socket disconnected";
    console.log(message);
    socket.emit("disconnected", message);
  }

  private onConnectionFailed(socket: Socket): void {
    const message = "Sorry, there seems to be an issue with the connection!";
    console.log(message);
    socket.emit("connection_failed", message);
  }

  private store(input: string, socket: Socket): void {
    try {
      let result = eval(input);
      if (!Number.isFinite(result) || Number.isNaN(result)) {
        result = 0;
      }
      const expression = input + "=" + parseFloat(result.toFixed(2));
      const refreshedList = this.dataStore.save(expression);
      this.socket.sockets.emit("refreshed_list", refreshedList);
    } catch (error) {
      const message = "Please enter a valid expression.";
      socket.emit("invalid_expression", { message });
    }
  }
}
