import { Data } from "../types";

export class SolOtp {
  id_sol_otp!: number;
  tx_componente!: string;
  tx_direccion!: string;
  id_msgid!: string;
  fe_credttm!: string;
  id_initgpty!: string;
  nb_initgpty!: string;
  tx_initnsrc_nm!: string;
  tx_initnsrc_prvdr!: string;
  tx_initnsrc_vrsn!: string;
  co_lclinstrm!: string;
  id_mndtid!: string;
  co_ccy!: string;
  mo_amt!: number;
  co_dbtragt!: string;
  co_schema_dbtracct!: string;
  id_dbtracct!: string;
  id_dbtr!: string;
  co_schema_dbtr!: string;
  co_cdtragt!: string;
  co_schema_cdtracct!: string;
  id_cdtracct!: string;
  id_cdtr!: string;
  co_schema_cdtr!: string;
  tx_ip!: string;
  ts_fecha_timestamp_ins!: string;
  ts_fecha_timestamp_upd!: string;

  constructor(private res?: any) {
    /** Dirección */
    this.tx_direccion = `${this.res?.topic}`.endsWith("ent") ? "ENTRADA" : "SALIDA";

    if (this.res?.data) {
      const { AuthstnReq } = this.res?.data as Data;

      this.id_msgid = AuthstnReq?.GrpHdr?.MsgId || "";
      this.fe_credttm = AuthstnReq?.GrpHdr?.CreDtTm || "";
      this.id_initgpty = AuthstnReq?.GrpHdr?.InitgPty?.Id || "";
      this.nb_initgpty = AuthstnReq?.GrpHdr?.InitgPty?.Nm || "";
      this.tx_initnsrc_nm = AuthstnReq?.GrpHdr?.InitnSrc?.Nm || "";
      this.tx_initnsrc_prvdr = AuthstnReq?.GrpHdr?.InitnSrc?.Prvdr || "";
      this.tx_initnsrc_vrsn = AuthstnReq?.GrpHdr?.InitnSrc?.Vrsn || "";
      this.co_lclinstrm = AuthstnReq?.Initn?.[0].MndtRltdInf?.LclInstrm || "";
      this.id_mndtid = AuthstnReq?.Initn?.[0].MndtRltdInf?.MndtId || "";
      this.co_ccy = AuthstnReq?.Initn?.[0].Amount?.Ccy || "";
      this.mo_amt = AuthstnReq?.Initn?.[0].Amount?.Amt || 0;

      /** Deudor */
      this.co_dbtragt = AuthstnReq?.Initn?.[0].DbtrAgt || "";
      this.co_schema_dbtracct = AuthstnReq?.Initn?.[0].DbtrAcct?.Tp || "";
      this.id_dbtracct = AuthstnReq?.Initn?.[0].DbtrAcct?.Id || "";
      this.id_dbtr = AuthstnReq?.Initn?.[0].Dbtr?.Id || "";
      this.co_schema_dbtr = AuthstnReq?.Initn?.[0].Dbtr?.SchmeNm || "";

      /** Acreedor */
      this.co_cdtragt = AuthstnReq?.Initn?.[0].CdtrAgt || "";
      this.co_schema_cdtracct = AuthstnReq?.Initn?.[0].CdtrAcct?.Tp || "";
      this.id_cdtracct = AuthstnReq?.Initn?.[0].CdtrAcct?.Id || "";
      this.id_cdtr = AuthstnReq?.Initn?.[0].Cdtr?.Id || "";
      this.co_schema_cdtr = AuthstnReq?.Initn?.[0].Cdtr?.SchmeNm || "";
    }
  }
}
