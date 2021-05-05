import * as cors from "cors";
import * as express from "express";
import { createServer, Server } from "http";

export class ApplicationServer {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  public start(server: Server): Server {
    const port = 3000;
    return server.listen(port, () =>
      console.log(`Server listening at port ${port}.`)
    );
  }

  public prepareServer(): Server {

    const application = this.app.use(express.json()).use(cors());

    return createServer(application);
  }
}
