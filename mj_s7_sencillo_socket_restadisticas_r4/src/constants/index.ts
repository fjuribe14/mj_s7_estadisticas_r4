/* eslint-disable indent */
import _ from "lodash";
import moment from "moment";
import { faker } from "@faker-js/faker";

export class KafkaMesage {
  topic?: string;
  private amt = 123.45;
  private channel = "TASK";

  private tpdebitolclInstrm = [
    "tpdebitoent",
    "tpdebitoentrptest",
    "tpdebitosal",
    "tpdebitosalrptest",
  ];

  private tpcrebitolclInstrm = [
    "tpcreditoent",
    "tpcrebitoentrptest",
    "tpcrebitosal",
    "tpcrebitosalrptest",
  ];

  constructor(topic?: string) {
    this.topic = topic || "tpcreditoent";
  }

  endToEndId() {
    return `0157${moment().format("YYYYMMDDHHmmss")}${_.random(10000000, 99999999)}`;
  }
  msgId() {
    return `015701${moment().format("YYYYMMDDHHmmss")}${_.random(10000000, 99999999)}`;
  }

  lclInstrm() {
    if (this.topic) {
      if (this.topic?.startsWith("tpotp")) return "050";
      if (this.tpdebitolclInstrm.includes(this.topic)) return "050";
      if (this.tpcrebitolclInstrm.includes(this.topic)) return "040";
    }

    return "040";
  }

  purp() {
    const debitoPurps = ["001", "002", "003"];
    const randomPurp = debitoPurps[Math.floor(Math.random() * debitoPurps.length)];

    if (this.topic) {
      if (this.tpdebitolclInstrm.includes(this.topic)) return randomPurp;
      if (this.tpcrebitolclInstrm.includes(this.topic)) return "220";
    }

    return "220";
  }

  sts() {
    const sts = ["RJCT", "ACCP"];
    return sts[Math.floor(Math.random() * sts.length)];
  }

  data() {
    const TxSts = this.sts();

    if (this.topic?.endsWith("rptest")) {
      return {
        CstmrPmtStsRpt: {
          GrpHdr: { MsgId: this.msgId(), CreDtTm: "2024-05-27T11:25:33.351" },
          OrgnlGrpInfAndSts: {
            OrgnlMsgId: "0116012021073011253058553026",
            OrgnlCreDtTm: "2024-05-27T11:25:30.423",
            OrgnlNbOfTxs: 1,
            OrgnlCtrlSum: { Ccy: "VES", Amt: this.amt },
            IntrBkSttlmDt: "2024-05-27",
            GrpSts: TxSts,
          },
          OrgnlPmtInfAndSts: [
            {
              OrgnlRegId: 1,
              OrgnlEndToEndId: "01712022110219353390111379",
              AccptncDtTm: "2024-05-27T11:25:30.423",
              ClrSysRef: "VES011601162021073011253085717999",
              OrgnlTxId: "011601162021073011253032394204",
              TxSts: TxSts,
              Rsn: TxSts === "RJCT" ? "VE01" : "",
              Amount: { Ccy: "VES", Amt: this.amt },
              Purp: this.purp(),
              DbtrAgt: "0116",
              CdtrAgt: "0174",
              DbtrAcct: { Tp: "CNTA", Id: "1561231315132132" },
              CdtrAcct: { Tp: "CNTA", Id: "01741561231315132128" },
              RmtInf: "BTC - Mensaje de prueba",
            },
          ],
        },
      };
    }

    if (this.topic === "tpdebitoent") {
      return {
        CstmrDrctDbtInitn: {
          GrpHdr: {
            MsgId: this.msgId(),
            CreDtTm: "2024-05-27T18:07:09.198",
            NbOfTxs: 1,
            CtrlSum: { Ccy: "VES", Amt: this.amt },
            IntrBkSttlmDt: "2024-05-27",
            LclInstrm: this.lclInstrm(),
            Channel: this.channel,
          },
          PmtInf: [
            {
              RegId: 1,
              EndToEndId: this.endToEndId(),
              ClrSysRef: "VES015701572024052718070949865470",
              TxId: "015701572024052718070984990676",
              Amount: { Ccy: "VES", Amt: this.amt },
              Purp: this.purp(),
              DbtrAgt: "0157",
              CdtrAgt: "0001",
              Dbtr: { Nm: faker.person.fullName(), Id: "V37789462", SchmeNm: "SCID" },
              DbtrAcct: { Tp: "CNTA", Id: "1561231315132124" },
              Cdtr: { Nm: faker.person.fullName(), Id: " V01961099", SchmeNm: "SCID" },
              CdtrAcct: { Tp: "CNTA", Id: "00012831484649473131" },
              RmtInf: "BTC - Mensaje de prueba",
              AddtlInf: _.random(100000, 999999),
              RfrdDocInf: [
                {
                  CdOrPrtry: "CINV",
                  Nb: "92214782",
                  RltdDt: "2024-06-03",
                  RjctDt: "2024-06-03",
                  DuePyblAmt: { Ccy: "VES", Amt: this.amt },
                },
                {
                  CdOrPrtry: "CMCN",
                  Nb: "32823430",
                  RltdDt: "2024-06-03",
                },
              ],
            },
          ],
        },
      };
    }

    if (this.topic?.startsWith("tpotp")) {
      return {
        AuthstnReq: {
          GrpHdr: {
            MsgId: this.msgId(),
            CreDtTm: "2021-07-07T08:19:00",
            InitgPty: {
              Id: "123456",
              Nm: "ABCD",
            },
            InitnSrc: {
              Nm: "1234",
              Prvdr: "ABCD",
              Vrsn: "1.0",
            },
          },
          Initn: [
            {
              MndtRltdInf: {
                LclInstrm: this.lclInstrm(),
                MndtId: "01142020062418222012345671",
              },
              Amount: {
                Ccy: "VES",
                Amt: this.amt,
              },
              DbtrAgt: "0001",
              DbtrAcct: {
                Tp: "CNTA",
                Id: "01141631566123456789",
              },
              Dbtr: {
                Id: "J404579427",
                SchmeNm: "SRIF",
              },
              CdtrAgt: "0102",
              Cdtr: {
                Id: "V15555666",
                SchmeNm: "SCID",
              },
              CdtrAcct: {
                Tp: "CNTA",
                Id: "09990234871234567890",
              },
            },
          ],
        },
      };
    }

    return {
      CstmrCdtTrfInitn: {
        GrpHdr: {
          MsgId: this.msgId(),
          CreDtTm: "2024-05-27T18:07:09.198",
          NbOfTxs: 1,
          CtrlSum: { Ccy: "VES", Amt: this.amt },
          IntrBkSttlmDt: "2024-05-27",
          LclInstrm: this.lclInstrm(),
          Channel: this.channel,
        },
        PmtInf: [
          {
            RegId: 1,
            EndToEndId: this.endToEndId(),
            ClrSysRef: "VES015701572024052718070949865470",
            TxId: "015701572024052718070984990676",
            Amount: { Ccy: "VES", Amt: this.amt },
            Purp: this.purp(),
            DbtrAgt: "0157",
            CdtrAgt: "0001",
            Dbtr: { Nm: faker.person.fullName(), Id: "V37789462", SchmeNm: "SCID" },
            DbtrAcct: { Tp: "CNTA", Id: "1561231315132124" },
            Cdtr: { Nm: faker.person.fullName(), Id: " V01961099", SchmeNm: "SCID" },
            CdtrAcct: { Tp: "CNTA", Id: "00012831484649473131" },
            RmtInf: "BTC - Mensaje de prueba",
          },
        ],
      },
    };
  }

  request() {
    return {
      data: this.data(),
      payload: {
        topic: this.topic,
        partition: 9,
        message: {
          magicByte: 2,
          attributes: 0,
          timestamp: "1716846559725",
          offset: "79",
          key: null,
          value: {
            type: "Buffer",
            data: [],
          },
          headers: {
            origen: {
              type: "Buffer",
              data: [49, 50, 55, 46, 48, 46, 48, 46, 49, 58, 53, 50, 51, 50, 54],
            },
            "fecha-inicio-recepcion": {
              type: "Buffer",
              data: [],
            },
          },
          isControlRecord: false,
          batchContext: {
            firstOffset: "79",
            firstTimestamp: "1716847629465",
            partitionLeaderEpoch: 0,
            inTransaction: false,
            isControlBatch: false,
            lastOffsetDelta: 0,
            producerId: "-1",
            producerEpoch: -1,
            firstSequence: -1,
            maxTimestamp: "1716846559725",
            timestampType: 1,
            magicByte: 2,
          },
        },
      },
    };
  }
}
