export type CstmrDrctDbtInitn = {
  GrpHdr: GrpHdr;
  PmtInf: PmtInf[];
};

export interface CstmrCdtTrfInitn {
  GrpHdr?: GrpHdr;
  PmtInf?: PmtInf[];
}

export type AuthstnReq = {
  GrpHdr?: GrpHdr;
  Initn?: Initn[];
};

export interface CstmrPmtStsRpt {
  GrpHdr?: GrpHdr;
  OrgnlGrpInfAndSts?: OrgnlGrpInfAndSts;
  OrgnlPmtInfAndSts?: OrgnlPmtInfAndSt[];
}

export interface OrgnlGrpInfAndSts {
  OrgnlMsgId?: string;
  OrgnlCreDtTm?: Date;
  OrgnlNbOfTxs?: number;
  OrgnlCtrlSum?: OrgnlCtrlSum;
  IntrBkSttlmDt?: Date;
  GrpSts?: string;
}

export interface OrgnlCtrlSum {
  Ccy?: string;
  Amt?: number;
}

export interface OrgnlPmtInfAndSt {
  OrgnlRegId?: number;
  OrgnlEndToEndId?: string;
  AccptncDtTm?: Date;
  ClrSysRef?: string;
  OrgnlTxId?: string;
  TxSts?: string;
  Rsn?: string;
  Amount?: OrgnlCtrlSum;
  Purp?: string;
  DbtrAgt?: string;
  CdtrAgt?: string;
  DbtrAcct?: TrAcct;
  CdtrAcct?: TrAcct;
  RmtInf?: string;
}

export interface TrAcct {
  Tp?: string;
  Id?: string;
}

export interface GrpHdr {
  MsgId?: string;
  CreDtTm?: string;
  InitgPty?: InitgPty;
  InitnSrc?: InitnSrc;
  NbOfTxs?: number;
  CtrlSum?: CtrlSum;
  IntrBkSttlmDt?: string;
  LclInstrm?: string;
  Channel?: string;
}

export type InitgPty = {
  Id?: string;
  Nm?: string;
};

export type InitnSrc = {
  Nm?: string;
  Prvdr?: string;
  Vrsn?: string;
};

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

export type Initn = {
  MndtRltdInf?: MndtRltdInf;
  Amount?: Amount;
  DbtrAgt?: string;
  DbtrAcct?: TrAcct;
  Dbtr?: Cdtr;
  CdtrAgt?: string;
  Cdtr?: Cdtr;
  CdtrAcct?: TrAcct;
};

export type MndtRltdInf = {
  LclInstrm?: string;
  MndtId?: string;
};

export type Amount = {
  Ccy?: string;
  Amt?: number;
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

// {
//     "CstmrPmtStsRpt": {
//       "GrpHdr": { "MsgId": "0157012021073011253200222015", "CreDtTm": "2021-07-30T11:25:33.351" },
//       "OrgnlGrpInfAndSts": {
//         "OrgnlMsgId": "0116012021073011253058553026",
//         "OrgnlCreDtTm": "2021-07-30T11:25:30.423",
//         "OrgnlNbOfTxs": 1,
//         "OrgnlCtrlSum": { "Ccy": "VES", "Amt": 1480239038.54091 },
//         "IntrBkSttlmDt": "2021-07-30",
//         "GrpSts": "RJCT"
//       },
//       "OrgnlPmtInfAndSts": [
//         {
//           "OrgnlRegId": 1,
//           "OrgnlEndToEndId": "01712022110219353390111379",
//           "AccptncDtTm": "2021-07-30T11:25:30.423",
//           "ClrSysRef": "VES011601162021073011253085717999",
//           "OrgnlTxId": "011601162021073011253032394204",
//           "TxSts": "RJCT",
//           "Rsn": "AC01",
//           "Amount": { "Ccy": "VES", "Amt": 1480239038.54091 },
//           "Purp": "",
//           "DbtrAgt": "0116",
//           "CdtrAgt": "0174",
//           "DbtrAcct": { "Tp": "CNTA", "Id": "1561231315132132" },
//           "CdtrAcct": { "Tp": "CNTA", "Id": "01741561231315132128" },
//           "RmtInf": "BTC - Mensaje de prueba"
//         }
//       ]
//     }
//   }

// {
//   "AuthstnReq": {
//     "GrpHdr": {
//       "MsgId": "0114012021070708190000000000",
//       "CreDtTm": "2021-07-07T08:19:00",
//       "InitgPty": {
//         "Id": "123456",
//         "Nm": "ABCD"
//       },
//       "InitnSrc": {
//         "Nm": "1234",
//         "Prvdr": "ABCD",
//         "Vrsn": "1.0"
//       }
//     },
//     "Initn": [
//       {
//         "MndtRltdInf": {
//           "LclInstrm": "050",
//           "MndtId": "01142020062418222012345671"
//         },
//         "Amount": {
//           "Ccy": "VES",
//           "Amt": 40
//         },
//         "DbtrAgt": "0001",
//         "DbtrAcct": {
//           "Tp": "CNTA",
//           "Id": "01141631566123456789"
//         },
//         "Dbtr": {
//           "Id": "J404579427",
//           "SchmeNm": "SRIF"
//         },
//         "CdtrAgt": "0102",
//         "Cdtr": {
//           "Id": " V15555666",
//           "SchmeNm": "SCID"
//         },
//         "CdtrAcct": {
//           "Tp": "CNTA",
//           "Id": "09990234871234567890"
//         }
//       }
//     ]
//   }
// }
