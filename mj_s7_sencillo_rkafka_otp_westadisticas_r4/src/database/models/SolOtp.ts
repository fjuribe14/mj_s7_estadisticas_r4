import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { SolOtp as NewSolOtp } from "../../../../helpers/classes/solOtp";

@Entity({
  name: "tb_sol_otp",
})
export class SolOtp extends BaseEntity {
  @PrimaryColumn()
  id_sol_otp!: number;

  @PrimaryColumn()
  tx_componente!: string;

  @PrimaryColumn()
  tx_direccion!: string;

  @Column()
  id_msgid!: string;

  @Column()
  fe_credttm!: string;

  @Column()
  id_initgpty!: string;

  @Column()
  nb_initgpty!: string;

  @Column()
  tx_initnsrc_nm!: string;

  @Column()
  tx_initnsrc_prvdr!: string;

  @Column()
  tx_initnsrc_vrsn!: string;

  @Column()
  co_lclinstrm!: string;

  @Column()
  id_mndtid!: string;

  @Column()
  co_ccy!: string;

  @Column()
  mo_amt!: number;

  @Column()
  co_dbtragt!: string;

  @Column()
  co_schema_dbtracct!: string;

  @Column()
  id_dbtracct!: string;

  @Column()
  id_dbtr!: string;

  @Column()
  co_schema_dbtr!: string;

  @Column()
  co_cdtragt!: string;

  @Column()
  co_schema_cdtracct!: string;

  @Column()
  id_cdtracct!: string;

  @Column()
  id_cdtr!: string;

  @Column()
  co_schema_cdtr!: string;

  @Column()
  tx_ip!: string;

  @Column()
  ts_fecha_timestamp_ins!: string;

  @Column()
  ts_fecha_timestamp_upd!: string;

  constructor(private res?: any) {
    super();

    /** Componente */
    this.tx_componente = "MFIBP";

    if (this.res?.payload) {
      const { message } = this.res.payload;
      const buffer = message?.headers?.origen?.data;

      /** Ip */
      this.tx_ip = Buffer.from(buffer || "").toString("utf8") || "localhost";
    }

    /** Asignar propiedades */
    Object.assign(this, new NewSolOtp(res));
  }
}
