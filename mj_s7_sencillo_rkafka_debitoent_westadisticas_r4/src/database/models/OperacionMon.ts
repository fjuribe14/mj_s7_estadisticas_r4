import moment from "moment";
import { getEnv } from "@ant/framework";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Monitor as NewMonitor } from "../../../../helpers/classes/monitor";

@Entity({ name: "tb_operacion_mon" })
export class OperacionMon extends BaseEntity {
  @PrimaryColumn()
  tx_componente!: string;

  @PrimaryColumn()
  tx_direccion!: string;

  @PrimaryColumn()
  ts_fecha!: string;

  @PrimaryColumn()
  co_lclinstrm!: string;

  @PrimaryColumn()
  co_purp!: string;

  @Column()
  ca_liquidada!: number;

  @Column("numeric", { precision: 21, scale: 5 })
  mo_liquidada!: number;

  @Column()
  ca_rechazada!: number;

  @Column("numeric", { precision: 21, scale: 5 })
  mo_rechazada!: number;

  @Column()
  ca_recibida!: number;

  @Column("numeric", { precision: 21, scale: 5 })
  mo_recibida!: number;

  constructor(private res?: any) {
    super();

    /** Componente */
    this.tx_componente = "MFIBP";

    /** Dirección */
    this.tx_direccion = getEnv("DIRECCION_OPERACION", "ENTRADA");

    /** Fecha */
    this.ts_fecha = moment().format("YYYY-MM-DD");

    /** Asignar propiedades */
    Object.assign(this, new NewMonitor(res));
  }
}
