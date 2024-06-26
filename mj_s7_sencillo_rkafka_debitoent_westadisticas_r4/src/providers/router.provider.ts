import express from "express";
import {
  ServiceProvider,
  RouterFacade,
  routerConfig,
  Logger,
  Lang,
  logCatchedError,
  RouteContract,
  logCatchedException,
  MiddlewareContract,
  ErrorResponse,
  RouterConfig,
  getEnv
} from "@ant/framework";
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
  NextFunction,
  RequestHandler
} from "express";
import { GlobalMiddlewares } from "../http/middlewares/global.middleware";
import path from "path";
import fs from "fs";
import https from "https";

export default class RouterProvider extends ServiceProvider {
    protected router = express();
    protected middlewares: (new () => MiddlewareContract)[] = [
      ...GlobalMiddlewares,
    ];

    boot(): Promise<void> {
      return new Promise((resolve) => {
        this.router
          .use(this.instanceMiddlewares(this.middlewares))
        ;

        const config = routerConfig();

        Logger.audit(Lang.__("Routes set up started."));

        this.setRoutes(this.boostrap.routes)
          .then((count: number) => {
            Logger.audit(Lang.__("Routes set up completed [{{count}}].", {
              count: count.toString()
            }));

            const server = this.createHttpServer(config).listen(config.port, () => {
              Logger.info(Lang.__("Http server is running at [{{scheme}}://{{host}}:{{port}}]", config));
                        
              resolve();
            });

            RouterFacade.setInstance(server);
          }, (error) => {
            Logger.audit(Lang.__(error.message));
          })
          .catch(logCatchedException)
        ;
      });
    }

    public setRoutes(routeClasses:  (new() => RouteContract)[]): Promise<number> {
      return new Promise((resolve, reject) => {
        if (routeClasses.length > 0) {
          for (const routeClass of routeClasses) {
            const instance = new routeClass();
            instance.onCreated();

            const config = routerConfig();

            const routeData = {
              name: instance.constructor.name,
              scheme: config.scheme || "http",
              host: config.host || "localhost",
              port: config.port,
              endpoint: Array.isArray(instance.url) ? instance.url.join(",") : instance.url,
              method: instance.method.toUpperCase(),
            };

            Logger.audit(Lang.__("Preparing route [{{name}} => ({{method}}) {{scheme}}://{{host}}:{{port}}{{{endpoint}}}].", routeData));

            this.router[instance.method](instance.url, this.instanceMiddlewares(instance.middlewares), (req: ExpressRequest, res: ExpressResponse) => {
              Logger.debug(Lang.__("Request received in [{{name}} => ({{method}}) {{scheme}}://{{host}}:{{port}}{{{endpoint}}}].", routeData));
              Logger.trace(Lang.__("Client request: "));
              Logger.trace({
                url: req.url,
                method: req.method,
                clientIp: req.ip,
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
              });

              instance.handler(req)
                .then(handler => {
                  handler.send(res);

                  Logger.debug(Lang.__("Request handled in [{{name}} => ({{method}}) {{scheme}}://{{host}}:{{port}}{{{endpoint}}}].", routeData));
                  Logger.trace(Lang.__("Server response: "));
                  Logger.trace(handler.getData());

                  instance.onCompleted(req);
                },
                (error) => {
                  if (error instanceof ErrorResponse) {
                    error.send(res);
                  } else {
                    res.status(500).send(error);
                  }

                  Logger.error(Lang.__("Error handling a request in [{{name}} => ({{method}}) {{scheme}}://{{host}}:{{port}}{{{endpoint}}}].", routeData));
                  logCatchedError(error);

                  instance.onFailed(req, error);
                }
                ).catch((error) => {
                  if (error instanceof ErrorResponse) {
                    error.send(res);
                  } else {
                    res.status(500).send(error);
                  }

                  instance.onError(error);

                  Logger.error(Lang.__("Unhandled error on a request in [{{name}} => ({{method}}) {{scheme}}://{{host}}:{{port}}{{{endpoint}}}].", routeData));
                  logCatchedError(error);
                })
              ;
            });

            instance.onBooted();
            Logger.audit(Lang.__("Route [{{name}} => ({{method}}) {{scheme}}://{{host}}:{{port}}{{{endpoint}}}] is ready.", routeData));

          }
          resolve(routeClasses.length);
        } else {
          reject({
            message: "No routes found.",
          });
        }
      });
    }

    protected instanceMiddlewares(middlewares: (new () => MiddlewareContract)[]): RequestHandler[] {
      return middlewares.map(middleware => (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => (new middleware).handle(req, res, next));
    }

    public createHttpServer(config: RouterConfig) {
      if (config.scheme?.toLowerCase() == "https") {
        if (
          !fs.existsSync(path.join(__dirname, getEnv("SSL_KEY_DIR"))) ||
                !fs.existsSync(path.join(__dirname, getEnv("SSL_CERT_DIR")))
        ) {
          throw new Error(Lang.__("Invalid ssl cert/key path."));
        }

        const options = {
          passphrase: getEnv("SSL_PASSPHRASE"),
          key: fs.readFileSync(path.join(__dirname, getEnv("SSL_KEY_DIR")), 'utf8'),
          cert: fs.readFileSync(path.join(__dirname, getEnv("SSL_CERT_DIR")), 'utf8'),
        };

        return https.createServer(options, this.router)
      }

      return this.router;
    }

    public static getToken(req: ExpressRequest, type: "bearer" | "basic" = "bearer"): string | undefined {
      const authorizationHeader = req.headers['authorization'];
      if (!authorizationHeader) {
        return undefined;
      }
      const parts = authorizationHeader.split(' ');
      if (parts.length !== 2 || parts[0].toLowerCase() !== type) {
        return undefined;
      }
      return parts[1];
    }
}
