import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "vi_sol_otp" })
export class ViSolOtp extends BaseEntity {
  @PrimaryColumn()
  tx_componente!: string;

  @PrimaryColumn()
  tx_direccion!: string;

  @PrimaryColumn()
  ts_fecha!: string;

  @PrimaryColumn()
  co_lclinstrm!: string;

  @Column()
  ca_recibida!: number;

  @Column("numeric", { precision: 21, scale: 5 })
  mo_recibida!: number;
}
