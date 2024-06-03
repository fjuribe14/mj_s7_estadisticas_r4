import { EachMessagePayload } from "kafkajs";
import { BaseConsumer, Logger } from "@ant/framework";
import { OperacionBi } from "../database/models/OperacionBi";
import { Operacion } from "../../../helpers/classes/operacion";
import { Data, Payload } from "../../../helpers/types/kafkaResponse";

export class TpDebitoSalRptestConsumer extends BaseConsumer {
  topic = "tpdebitosalrptest";

  async handler(_data: any): Promise<any> {
    // async handler(data: Data, payload: EachMessagePayload): Promise<any> {

    const { data, payload }: { data: Data; payload: EachMessagePayload } = _data.body;

    // console.log(JSON.stringify(data, null, 2));

    const existOperation = new Operacion({
      data,
      payload: payload as Payload,
      topic: this.topic,
    });

    try {
      const operation = await OperacionBi.findOne({
        where: {
          // TODO: Cambiar esto para que busque por id_endtoendid y no por tx_sts
          // id_endtoendid: existOperation.id_endtoendid,
          tx_sts: "AC00",
          tx_direccion: existOperation.tx_direccion,
        },
      });

      if (operation) {
        operation.tx_sts = existOperation.tx_sts;
        operation.co_rsn = existOperation.co_rsn;
        operation.ts_fecha_timestamp_upd = existOperation.ts_fecha_timestamp_upd;

        await operation.save();

        Logger.info(`${this.topic} [${operation?.id_endtoendid}]`);
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}
