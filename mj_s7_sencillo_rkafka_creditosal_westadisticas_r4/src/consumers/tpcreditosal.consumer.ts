import { EachMessagePayload } from "kafkajs";
import { BaseConsumer, Logger } from "@ant/framework";
import { OperacionBi } from "../database/models/OperacionBi";
import { Data, Payload } from "../../../helpers/types/kafkaResponse";

export class TpCreditoSalConsumer extends BaseConsumer {
  topic = "tpcreditosal";

  async handler(_data: any): Promise<any> {
    // async handler(data: Data, payload: EachMessagePayload): Promise<any> {
    const { data, payload }: { data: Data; payload: EachMessagePayload } = _data.body;

    // console.log(JSON.stringify(data, null, 2));

    try {
      const operation = new OperacionBi({
        data,
        payload: payload as Payload,
        topic: this.topic,
      });

      await operation.save();

      Logger.info(`${this.topic} [${operation?.id_endtoendid}]`);
    } catch (error) {
      Logger.error(error);
    }
  }
}
