import { Data } from "../types/kafkaResponse";

export class Operacion {
  public tx_componente!: string;
  public tx_direccion!: string;
  public id_msgid_entrada!: string;
  public fe_credttm!: string;
  public fe_fctvintrbksttlmdt!: string;
  public co_lclinstrm!: string;
  public co_channel!: string;
  public id_endtoendid!: string;
  public co_ccy!: string;
  public mo_amt!: number;
  public co_purp!: string;
  public tx_addtlinf?: string;
  public co_dbtragt!: string;
  public id_dbtracct!: string;
  public co_schema_dbtracct!: string;
  public nb_dbtr_nm!: string;
  public id_dbtr!: string;
  public co_schema_dbtr!: string;
  public co_cdtragt!: string;
  public id_cdtracct!: string;
  public co_schema_cdtracct!: string;
  public nb_cdtr_nm!: string;
  public id_cdtr!: string;
  public co_schema_cdtr!: string;
  public tx_sts!: string;
  public co_rsn!: string;
  public tx_ip!: string;
  public js_rfrddocinf!: string;
  public ts_fecha_timestamp_ins!: string;
  public ts_fecha_timestamp_upd!: string;

  constructor(private res?: any) {
    // console.log(`class Operacion`, JSON.stringify(this.res, null, 2));

    if (this.res?.data) {
      const { CstmrCdtTrfInitn, CstmrDrctDbtInitn, CstmrPmtStsRpt } = this.res?.data as Data;

      /** Componente */
      this.tx_componente = "MFIBP";

      /** Crédito */
      if (CstmrCdtTrfInitn) {
        /** Estatus */
        this.tx_sts = "AC00";

        /** GrpHdr */
        this.fe_credttm = CstmrCdtTrfInitn?.GrpHdr?.CreDtTm || "";
        this.co_channel = CstmrCdtTrfInitn?.GrpHdr?.Channel || "";
        this.id_msgid_entrada = CstmrCdtTrfInitn?.GrpHdr?.MsgId || "";
        this.co_lclinstrm = CstmrCdtTrfInitn?.GrpHdr?.LclInstrm || "";
        this.fe_fctvintrbksttlmdt = CstmrCdtTrfInitn?.GrpHdr?.IntrBkSttlmDt || "";

        /** PmtInf */
        this.mo_amt = CstmrCdtTrfInitn?.PmtInf?.[0]?.Amount?.Amt || 0;
        this.co_purp = CstmrCdtTrfInitn?.PmtInf?.[0]?.Purp || "";
        this.co_ccy = CstmrCdtTrfInitn?.PmtInf?.[0]?.Amount?.Ccy || "";
        this.id_endtoendid = CstmrCdtTrfInitn?.PmtInf?.[0]?.EndToEndId || "";

        /** Acreedor */
        this.id_cdtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Cdtr?.Id || "";
        this.co_cdtragt = CstmrCdtTrfInitn?.PmtInf?.[0]?.CdtrAgt || "";
        this.nb_cdtr_nm = CstmrCdtTrfInitn?.PmtInf?.[0]?.Cdtr?.Nm || "";
        this.id_cdtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.CdtrAcct?.Id || "";
        this.co_schema_cdtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Cdtr?.SchmeNm || "";
        this.co_schema_cdtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.CdtrAcct?.Tp || "";

        /** Deudor */
        this.id_dbtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Dbtr?.Id || "";
        this.co_dbtragt = CstmrCdtTrfInitn?.PmtInf?.[0]?.DbtrAgt || "";
        this.nb_dbtr_nm = CstmrCdtTrfInitn?.PmtInf?.[0]?.Dbtr?.Nm || "";
        this.id_dbtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.DbtrAcct?.Id || "";
        this.co_schema_dbtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Dbtr?.SchmeNm || "";
        this.co_schema_dbtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.DbtrAcct?.Tp || "";
      }

      /** Débito */
      if (CstmrDrctDbtInitn) {
        /** Estatus */
        this.tx_sts = "AC00";

        /** GrpHdr */
        this.fe_credttm = CstmrDrctDbtInitn?.GrpHdr?.CreDtTm || "";
        this.co_channel = CstmrDrctDbtInitn?.GrpHdr?.Channel || "";
        this.id_msgid_entrada = CstmrDrctDbtInitn?.GrpHdr?.MsgId || "";
        this.co_lclinstrm = CstmrDrctDbtInitn?.GrpHdr?.LclInstrm || "";
        this.fe_fctvintrbksttlmdt = CstmrDrctDbtInitn?.GrpHdr?.IntrBkSttlmDt || "";

        /** PmtInf */
        this.mo_amt = CstmrDrctDbtInitn?.PmtInf?.[0]?.Amount?.Amt || 0;
        this.co_purp = CstmrDrctDbtInitn?.PmtInf?.[0]?.Purp || "";
        this.co_ccy = CstmrDrctDbtInitn?.PmtInf?.[0]?.Amount?.Ccy || "";
        this.id_endtoendid = CstmrDrctDbtInitn?.PmtInf?.[0]?.EndToEndId || "";

        /** Acreedor */
        this.id_cdtr = CstmrDrctDbtInitn?.PmtInf?.[0]?.Cdtr?.Id || "";
        this.co_cdtragt = CstmrDrctDbtInitn?.PmtInf?.[0]?.CdtrAgt || "";
        this.nb_cdtr_nm = CstmrDrctDbtInitn?.PmtInf?.[0]?.Cdtr?.Nm || "";
        this.id_cdtracct = CstmrDrctDbtInitn?.PmtInf?.[0]?.CdtrAcct?.Id || "";
        this.co_schema_cdtr = CstmrDrctDbtInitn?.PmtInf?.[0]?.Cdtr?.SchmeNm || "";
        this.co_schema_cdtracct = CstmrDrctDbtInitn?.PmtInf?.[0]?.CdtrAcct?.Tp || "";

        /** Deudor */
        this.id_dbtr = CstmrDrctDbtInitn?.PmtInf?.[0]?.Dbtr?.Id || "";
        this.co_dbtragt = CstmrDrctDbtInitn?.PmtInf?.[0]?.DbtrAgt || "";
        this.nb_dbtr_nm = CstmrDrctDbtInitn?.PmtInf?.[0]?.Dbtr?.Nm || "";
        this.id_dbtracct = CstmrDrctDbtInitn?.PmtInf?.[0]?.DbtrAcct?.Id || "";
        this.co_schema_dbtr = CstmrDrctDbtInitn?.PmtInf?.[0]?.Dbtr?.SchmeNm || "";
        this.co_schema_dbtracct = CstmrDrctDbtInitn?.PmtInf?.[0]?.DbtrAcct?.Tp || "";

        /** OTP */
        this.tx_addtlinf = CstmrDrctDbtInitn?.PmtInf?.[0]?.AddtlInf || "";

        /** Documento */
        this.js_rfrddocinf = JSON.stringify(CstmrDrctDbtInitn?.PmtInf?.[0]?.RfrdDocInf || []);
      }

      /** Estatus report */
      if (CstmrPmtStsRpt) {
        this.co_rsn = CstmrPmtStsRpt.OrgnlPmtInfAndSts?.[0].Rsn || "";
        this.tx_sts = CstmrPmtStsRpt.OrgnlPmtInfAndSts?.[0].TxSts || "";
        this.id_endtoendid = CstmrPmtStsRpt.OrgnlPmtInfAndSts?.[0].OrgnlEndToEndId || "";
      }
    }
  }
}
