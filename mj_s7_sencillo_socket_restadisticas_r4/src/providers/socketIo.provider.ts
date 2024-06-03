import http from "http";
import { Server } from "socket.io";
import { ServiceProvider, getEnv, Logger } from "@ant/framework";

export default class SocketIoProvider extends ServiceProvider {
  io = io;

  boot(): Promise<void> {
    return new Promise((resolve) => {
      this.io.on("connection", (socket) => {
        Logger.info("Un cliente se ha conectado");

        socket.on("disconnect", () => {
          Logger.info("Un cliente se ha desconectado");
        });
      });

      this.io.listen(Number(getEnv("APP_SOCKET_IO_PORT", "3000")));

      Logger.info(
        `Socket.IO server is running at [http://localhost:${getEnv("APP_SOCKET_IO_PORT", "3000")}]`
      );

      resolve();
    });
  }
}

export const io: Server = new Server(http.createServer(), {
  cors: { origin: "*" },
});
