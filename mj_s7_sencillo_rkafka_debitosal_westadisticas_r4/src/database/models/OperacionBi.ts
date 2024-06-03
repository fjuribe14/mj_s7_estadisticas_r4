import moment from "moment";
import { getEnv } from "@ant/framework";
import { Data } from "../../../../helpers/types/kafkaResponse";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Operacion as NewOperacion } from "../../../../helpers/classes/operacion";

@Entity({ name: "tb_operacion_bi" })
export class OperacionBi extends BaseEntity {
  @Column()
  tx_componente!: string;

  @PrimaryColumn()
  tx_direccion!: string;

  @Column()
  id_msgid_entrada!: string;

  @Column()
  fe_credttm!: string;

  @Column()
  fe_fctvintrbksttlmdt!: string;

  @Column()
  co_lclinstrm!: string;

  @Column()
  co_channel!: string;

  @PrimaryColumn()
  id_endtoendid!: string;

  @Column()
  co_ccy!: string;

  @Column()
  mo_amt!: number;

  @Column()
  co_purp!: string;

  @Column()
  tx_addtlinf?: string;

  @Column()
  co_dbtragt!: string;

  @Column()
  id_dbtracct!: string;

  @Column()
  co_schema_dbtracct!: string;

  @Column()
  nb_dbtr_nm!: string;

  @Column()
  id_dbtr!: string;

  @Column()
  co_schema_dbtr!: string;

  @Column()
  co_cdtragt!: string;

  @Column()
  id_cdtracct!: string;

  @Column()
  co_schema_cdtracct!: string;

  @Column()
  nb_cdtr_nm!: string;

  @Column()
  id_cdtr!: string;

  @Column()
  co_schema_cdtr!: string;

  @Column()
  tx_sts!: string;

  @Column()
  co_rsn!: string;

  @Column()
  tx_ip!: string;

  @Column({ type: "json" })
  js_rfrddocinf!: string;

  @Column()
  ts_fecha_timestamp_ins!: string;

  @Column()
  ts_fecha_timestamp_upd!: string;

  constructor(private res?: any) {
    super();

    /** Dirección */
    this.tx_direccion = getEnv("DIRECCION_OPERACION", "ENTRADA");

    /** Componente */
    this.tx_componente = "MFIBP";

    if (this.res?.data) {
      const { CstmrPmtStsRpt } = this.res?.data as Data;

      /** Estatus report */
      if (CstmrPmtStsRpt) {
        /** Fecha de actualización */
        this.ts_fecha_timestamp_upd = moment().toISOString();
      }
    }

    /** Payload */
    if (this.res?.payload)
      /** IP */
      this.tx_ip =
        Buffer.from(this.res.payload?.message?.headers?.origen?.data || "").toString("utf8") ||
        "172.0.0.1";

    /** Asignar propiedades */
    Object.assign(this, new NewOperacion(res));
  }
}
