import { KafkaFacade } from "../providers/kafka.provider";
import { KafkaMesage } from "../constants";
import { BaseTask } from "@ant/framework/lib/src/scheduler";
import { Logger } from "@ant/framework";
export class KafkaTask extends BaseTask {
  name = "kasfka_task";
  cronExpression = "*/5 * * * * *";

  topics = [
    "tpcreditoent",
    "tpcreditoentrptest",
    "tpcreditosal",
    "tpcreditosalrptest",
    "tpdebitoent",
    "tpdebitoentrptest",
    "tpdebitosal",
    "tpdebitosalrptest",
    "tpotpent",
    "tpotpsal",
    /** TODO : Revisar estos topics */
    // "tpinterent",
    // "tpintersal",
    // "tpinterentrptest",
    // "tpintersalrptest",
    // "tpintraent",
    // "tpintrasal",
    // "tpintraentrptest",
    // "tpintrasalrptest",
  ];

  async handler(): Promise<void> {
    if (this.topics.length > 0) {
      await Promise.all(
        this.topics.map((topic: string) => {
          Logger.info(`Producing message to topic [${topic}]`);
          KafkaFacade.stream(topic, new KafkaMesage(topic).request());
          KafkaFacade.stream(topic, new KafkaMesage(topic).request());
          KafkaFacade.stream(topic, new KafkaMesage(topic).request());
          KafkaFacade.stream(topic, new KafkaMesage(topic).request());
        })
      );
    }
  }
}
