import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "vi_operacion_bi" })
export class ViOperacionBi extends BaseEntity {
  @PrimaryColumn()
  tx_componente!: string;

  @PrimaryColumn()
  tx_direccion!: string;

  @PrimaryColumn()
  ts_fecha!: string;

  @PrimaryColumn()
  co_lclinstrm!: string;

  // @PrimaryColumn()
  // co_purp!: string;

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
}
