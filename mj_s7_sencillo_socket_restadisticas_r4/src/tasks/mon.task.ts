import { io } from "../providers/socketIo.provider";
import { BaseTask } from "@ant/framework/lib/src/scheduler";
import { ViOperacionBi } from "../database/models/ViOperacionBi";

export class MonTask extends BaseTask {
  name = "mon_task";
  cronExpression = "*/3 * * * * *";

  async handler(): Promise<void> {
    await ViOperacionBi.find({
      order: {
        // tx_direccion: "ASC",
        co_lclinstrm: "ASC",
        tx_componente: "ASC",
      },
    }).then((data) => io.emit("OperacionMon", data));
  }
}
