import { EachMessagePayload } from "kafkajs";
import { SolOtp } from "../database/models/SolOtp";
import { BaseConsumer, Logger } from "@ant/framework";
import { Data, Payload } from "../../../helpers/types";

export class TpOtpEntConsumer extends BaseConsumer {
  topic = "tpotpent";

  async handler(_data: any): Promise<any> {
    // async handler(data: Data, payload: EachMessagePayload): Promise<any> {
    const { data, payload }: { data: Data; payload: EachMessagePayload } = _data.body;

    // console.log(JSON.stringify(data, null, 2));

    try {
      const solicitud = new SolOtp({
        data,
        payload: payload as Payload,
        topic: this.topic,
      });

      // console.log(solicitud);
      await solicitud.save();

      Logger.info(`${this.topic} [${solicitud?.id_msgid}]`);
    } catch (error) {
      Logger.error(error);
    }
  }
}
