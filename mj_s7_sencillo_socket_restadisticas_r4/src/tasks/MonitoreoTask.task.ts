import { io } from "../providers/socketIo.provider";
import { ViSolOtp } from "../database/models/ViSolOtp";
import { BaseTask } from "@ant/framework/lib/src/scheduler";
import { ViOperacion } from "../database/models/ViOperacion";

export class MonitoreoTask extends BaseTask {
  name = "mon_task";
  cronExpression = "*/3 * * * * *";

  async handler(): Promise<void> {
    const order: any = {
      co_lclinstrm: "ASC",
      tx_componente: "ASC",
    };
    const solotp = await ViSolOtp.find({ order });

    const operacion = await ViOperacion.find({ order });

    io.emit("monitoreo", { solotp, operacion });
  }
}
