import {
  RouteContract,
  WorkerContract,
  ConsumerContract,
  BoostrapInterface,
  ServiceProviderContract,
} from "@ant/framework";
import { TaskContract } from "@ant/framework/lib/src/scheduler";
import { ListenerContract } from "@ant/framework/lib/src/events";

/** Providers */
import LogProvider from "./providers/log.provider";
import KafkaProvider from "./providers/kafka.provider";
import RouterProvider from "./providers/router.provider";
import DatabaseProvider from "./providers/database.provider";

/** Routes */
import { HomeRoute } from "./http/routes/home.route";

/** Consumers */
import * as Consumers from "./consumers/index.consumer";

export class Boostrap implements BoostrapInterface {
  /**
   * The declared application's service providers.
   */
  public providers: (new (boostrap: BoostrapInterface) => ServiceProviderContract)[] = [
    LogProvider,
    KafkaProvider,
    RouterProvider,
    DatabaseProvider,
  ];

  /**
   * The declared application's routes.
   */
  public routes: (new () => RouteContract)[] = [HomeRoute];

  /**
   * The declared application's workers.
   */
  public workers: (new () => WorkerContract)[] = [];

  /**
   * The declared application's workers.
   */
  public consumers: (new () => ConsumerContract)[] = Object.values(Consumers);

  /**
   * The declared application's tasks.
   */
  public tasks: (new () => TaskContract)[] = [];

  /**
   * The declared application's event listeners.
   */
  listeners: (new () => ListenerContract)[] = [];
}
