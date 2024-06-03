import moment from "moment";
import { io } from "../providers/socketIo.provider";
import { BaseTask } from "@ant/framework/lib/src/scheduler";
// import { OperacionMon } from "../database/models/OperacionMon";

export class MonTask extends BaseTask {
  name = "mon_task";
  cronExpression = "*/3 * * * * *";

  public ca_liquidada = 0;
  public mo_liquidada = 0;
  public ca_rechazada = 0;
  public mo_rechazada = 0;
  public ca_recibida = 0;
  public mo_recibida = 0;

  async handler(): Promise<void> {
    // await OperacionMon.findOne({
    //   where: { ts_fecha: moment().format("YYYY-MM-DD") },
    // })
    //   .then((data) => {
    //     if (data) {
    //       if (Number.isNaN(data.ca_liquidada)) data.ca_liquidada = 0;
    //       if (Number.isNaN(data.ca_rechazada)) data.ca_rechazada = 0;
    //       if (Number.isNaN(data.mo_liquidada)) data.mo_liquidada = 0;
    //       if (Number.isNaN(data.mo_rechazada)) data.mo_rechazada = 0;

    //       io.emit("OperacionMon", data);
    //     }
    //   })
    //   .catch(() => {
    io.emit("OperacionMon", {
      tx_componente: "MFIBP",
      tx_direccion: "ENTRADA",
      ts_fecha: moment().format("YYYY-MM-DD"),
      co_lclinstrm: "040",
      co_purp: "220",
      ca_liquidada: ++this.ca_liquidada,
      mo_liquidada: ++this.mo_liquidada + 0.5,
      ca_rechazada: ++this.ca_rechazada,
      mo_rechazada: ++this.mo_rechazada + 0.5,
      ca_recibida: ++this.ca_recibida,
      mo_recibida: ++this.mo_recibida + 0.5,
    });
    // });
  }
}
