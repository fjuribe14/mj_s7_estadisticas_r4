import { Data } from "../types/kafkaResponse";

export class Monitor {
  public tx_componente!: string;
  public tx_direccion!: string;
  public ts_fecha!: string;
  public co_lclinstrm!: string;
  public co_purp!: string;
  public ca_liquidada!: number;
  public mo_liquidada!: number;
  public ca_rechazada!: number;
  public mo_rechazada!: number;
  public ca_recibida!: number;
  public mo_recibida!: number;

  constructor(private res?: any) {
    if (res?.data) {
      const { CstmrCdtTrfInitn, CstmrDrctDbtInitn, CstmrPmtStsRpt } = this.res?.data as Data;

      /** Crédito */
      if (CstmrCdtTrfInitn) {
        this.co_lclinstrm = CstmrCdtTrfInitn?.GrpHdr?.LclInstrm || "";
        this.co_purp = CstmrCdtTrfInitn?.PmtInf?.[0]?.Purp || "";
      }

      /** Débito */
      if (CstmrDrctDbtInitn) {
        this.co_lclinstrm = CstmrDrctDbtInitn?.GrpHdr?.LclInstrm || "";
        this.co_purp = CstmrDrctDbtInitn?.PmtInf?.[0]?.Purp || "";
      }

      /** Estatus */
      if (CstmrPmtStsRpt) {
        switch (CstmrPmtStsRpt.OrgnlGrpInfAndSts?.GrpSts) {
          case "RJCT":
            this.ca_liquidada = 0;
            this.mo_liquidada = 0;
            this.ca_rechazada = 1;
            this.mo_rechazada = CstmrPmtStsRpt?.OrgnlGrpInfAndSts?.OrgnlCtrlSum?.Amt || 0;
            break;

          default:
            this.ca_rechazada = 0;
            this.mo_rechazada = 0;
            this.ca_liquidada = 1;
            this.mo_liquidada = CstmrPmtStsRpt?.OrgnlGrpInfAndSts?.OrgnlCtrlSum?.Amt || 0;
            break;
        }
      }
    }
  }
}
