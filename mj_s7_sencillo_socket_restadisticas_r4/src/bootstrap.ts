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
import TasksProvider from "./providers/tasks.provider";
import KafkaProvider from "./providers/kafka.provider";
import RouterProvider from "./providers/router.provider";
import DatabaseProvider from "./providers/database.provider";
import SocketIoProvider from "./providers/socketIo.provider";

/** Routes */
import { HomeRoute } from "./http/routes/home.route";

/** Tasks */
import { MonTask } from "./tasks/mon.task";
import { KafkaTask } from "./tasks/kafka.task";

export class Boostrap implements BoostrapInterface {
  /**
   * The declared application's service providers.
   */
  public providers: (new (boostrap: BoostrapInterface) => ServiceProviderContract)[] = [
    LogProvider,
    TasksProvider,
    KafkaProvider,
    RouterProvider,
    DatabaseProvider,
    SocketIoProvider,
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
  public consumers: (new () => ConsumerContract)[] = [];

  /**
   * The declared application's tasks.
   */
  public tasks: (new () => TaskContract)[] = [KafkaTask, MonTask];

  /**
   * The declared application's event listeners.
   */
  listeners: (new () => ListenerContract)[] = [];
}
