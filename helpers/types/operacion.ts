export type CstmrDrctDbtInitn = {
  GrpHdr: GrpHdr;
  PmtInf: PmtInf[];
};

export interface CstmrCdtTrfInitn {
  GrpHdr?: GrpHdr;
  PmtInf?: PmtInf[];
}

export interface GrpHdr {
  MsgId?: string;
  CreDtTm?: string;
  NbOfTxs?: number;
  CtrlSum?: CtrlSum;
  IntrBkSttlmDt?: string;
  LclInstrm?: string;
  Channel?: string;
}

export interface CtrlSum {
  Ccy?: string;
  Amt?: number;
}

export interface PmtInf {
  RegId?: number;
  EndToEndId?: string;
  ClrSysRef?: string;
  TxId?: string;
  Amount?: CtrlSum;
  Purp?: string;
  AddtlInf: string;
  DbtrAgt?: string;
  CdtrAgt?: string;
  Dbtr?: Cdtr;
  DbtrAcct?: TrAcct;
  Cdtr?: Cdtr;
  CdtrAcct?: TrAcct;
  RmtInf?: string;
  RfrdDocInf: RfrdDocInf[];
}

export interface Cdtr {
  Nm?: string;
  Id?: string;
  SchmeNm?: string;
}

export interface TrAcct {
  Tp?: string;
  Id?: string;
}

export type RfrdDocInf = {
  CdOrPrtry: string;
  Nb: string;
  RltdDt: Date;
  RjctDt?: Date;
  DuePyblAmt?: CtrlSum;
};

// {
//     "CstmrCdtTrfInitn": {
//       "GrpHdr": {
//         "MsgId": "0157012024052713101189968838",
//         "CreDtTm": "2024-05-27T13:10:11.708",
//         "NbOfTxs": 1,
//         "CtrlSum": {
//           "Ccy": "VES",
//           "Amt": 17167.46
//         },
//         "IntrBkSttlmDt": "2024-05-27",
//         "LclInstrm": "040",
//         "Channel": "0003"
//       },
//       "PmtInf": [
//         {
//           "RegId": 1,
//           "EndToEndId": "01572024052713101149509374",
//           "ClrSysRef": "VES015701572024052713101136324147",
//           "TxId": "015701572024052713101195736784",
//           "Amount": {
//             "Ccy": "VES",
//             "Amt": 17167.46
//           },
//           "Purp": "",
//           "DbtrAgt": "0157",
//           "CdtrAgt": "0001",
//           "Dbtr": {
//             "Nm": "Justin F. Ibarra",
//             "Id": "V19516502",
//             "SchmeNm": "SCID"
//           },
//           "DbtrAcct": {
//             "Tp": "CNTA",
//             "Id": "8718351413875461"
//           },
//           "Cdtr": {
//             "Nm": "Walter M. Taylor",
//             "Id": " V34894613",
//             "SchmeNm": "SCID"
//           },
//           "CdtrAcct": {
//             "Tp": "CNTA",
//             "Id": "00011561231315132133"
//           },
//           "RmtInf": "BTC - Mensaje de prueba"
//         }
//       ]
//     }
//   }

// {
// 	"CstmrDrctDbtInitn":{
// 		"GrpHdr":{
// 			"MsgId":"0157012024060310524109448298",
// 			"CreDtTm":"2024-06-03T10:52:41.653",
// 			"NbOfTxs":1,
// 			"CtrlSum":{
// 				"Ccy":"VES",
// 				"Amt":3146.30
// 			},
// 			"IntrBkSttlmDt":"2024-06-03",
// 			"LclInstrm":"050",
// 			"Channel":"0003"
// 		},
// 		"PmtInf":[
// 			{
// 				"RegId":1,
// 				"EndToEndId":"01572024060310524120695724",
// 				"ClrSysRef":"VES015701572024060310524155714483",
// 				"TxId":"015701572024060310524187185268",
// 				"Amount":{
// 					"Ccy":"VES",
// 					"Amt":3146.30
// 				},
// 				"Purp":"002",
// 				"AddtlInf":"31104155",
// 				"DbtrAgt":"0157",
// 				"CdtrAgt":"0169",
// 				"Dbtr":{
// 					"Nm":"Richie E. Fields",
// 					"Id":"V11545546",
// 					"SchmeNm":"SCID"
// 				},
// 				"DbtrAcct":{
// 					"Tp":"CNTA",
// 					"Id":"6484456123123184"
// 				},
// 				"Cdtr":{
// 					"Nm":"Evelyn R. Anglin",
// 					"Id":" V22549786",
// 					"SchmeNm":"SCID"
// 				},
// 				"CdtrAcct":{
// 					"Tp":"CNTA",
// 					"Id":"01691561231315132123"
// 				},
// 				"RmtInf":"BTC - Mensaje de prueba",
// 				"RfrdDocInf": [
// 					{
// 						"CdOrPrtry": "CINV",
// 						"Nb": "92214782",
// 						"RltdDt": "2024-06-03",
// 						"RjctDt": "2024-06-03",
// 						"DuePyblAmt": {"Ccy": "VES", "Amt": 187.25}
// 					},
// 					{
// 						"CdOrPrtry": "CMCN",
// 						"Nb": "32823430",
// 						"RltdDt": "2024-06-03"
// 					}
// 				]
// 			}
// 		]
// 	}
// }
