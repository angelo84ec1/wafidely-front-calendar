const ResumenSkeleton = {
    pageSize: 'A4',
    pageMargins: [20, 25, 20, 25],
    content: [
        {
            columns: [
                {
                    stack: [
                        {
                            text: "",
                            bold: true
                        },
                        {
                            text: "",
                            bold: true,
                            color: "#22C55E"
                        },
                        {
                            stack: [
                                {
                                    columns: [
                                        {
                                            text: "Correo:",
                                            bold: true,
                                            width: 45
                                        },
                                        {
                                            text: "",
                                            alignment: 'left',
                                            width: "*",
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: "Identificacion:",
                                            bold: true,
                                            width: 80
                                        },
                                        {
                                            text: "",
                                            alignment: 'left',
                                            width: "*",
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: "Estado:",
                                            bold: true,
                                            width: 45
                                        },
                                        {
                                            text: "",
                                            alignment: 'left',
                                            width: "*",
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    stack: [
                        {
                            stack: [
                                {
                                    columns: [
                                        {
                                            text: "Compromisos de Pago:",
                                            bold: true,
                                            alignment: 'right',
                                            width: "*"
                                        },
                                        {
                                            text: "",
                                            alignment: 'right',
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: "Depositos realizados & Adelanto:",
                                            bold: true,
                                            alignment: 'right',
                                            width: "*"
                                        },
                                        {
                                            text: "",
                                            alignment: 'right',
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: "Saldo:",
                                            bold: true,
                                            alignment: 'right',
                                            width: "*"
                                        },
                                        {
                                            text: "",
                                            alignment: 'right',
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
            ]
        },
        '\n\n',
        {
            columns: [
                {
                    table: {
                        widths: [250, 'auto', 'auto'],
                        layout: "noBorders",
                        body: [
                            [
                                {
                                    text: "Datos personales",
                                    bold: true,
                                    border: [false, false, false, false],
                                    fillColor: "#E5E7EB"
                                }
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    fillColor: "#FFF",
                                    stack: [
                                        {
                                            columns: [
                                                {
                                                    text: "Numero de cedula:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Numero de pasaporte:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Fecha de nacimiento:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Pais:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Jubilado:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        // {
                                        //     columns: [
                                        //         {
                                        //             text: "Caso emergencia llamar:",
                                        //             bold: true,
                                        //             alignment: 'left',
                                        //             width: "auto"
                                        //         },
                                        //         {
                                        //             text: "",
                                        //             alignment: 'left',
                                        //         }
                                        //     ]
                                        // },
                                        {
                                            columns: [
                                                {
                                                    text: "Carga civil:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Discapacidad:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Telefono:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Desempeño en la organizacion:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Tipo de servicio:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Fecha de ingreso organizacion:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Coordinador:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Grupo anticipo:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: [250, 'auto', 'auto'],
                        layout: "noBorders",
                        body: [
                            [
                                {
                                    text: "Retenciones",
                                    bold: true,
                                    border: [false, false, false, false],
                                    fillColor: "#E5E7EB"
                                }
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    fillColor: "#FFF",
                                    stack: [
                                        {
                                            columns: [
                                                {
                                                    text: "Retención IVA Panamá:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Retención IVA Ecuador:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Retención reforestación:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Retención seguro de vida:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Retención impuesto a la renta:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Retención viajes anuales:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Retención al deporte:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Retención a la fuente:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Impuesto anticipado:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        ]
                    }
                }
            ]
        },
        {
            columns: [
                {
                    table: {
                        widths: [250, 'auto', 'auto'],
                        layout: "noBorders",
                        body: [
                            [
                                {
                                    text: "Compromisos de pagos",
                                    bold: true,
                                    border: [false, false, false, false],
                                    fillColor: "#E5E7EB"
                                }
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    fillColor: "#FFF",
                                    stack: [
                                        {
                                            columns: [
                                                {
                                                    text: "Valor convenio compensación:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Valor pagaré:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Valor acta compromiso de pago:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Valor cheque:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Valor de contrato privado de gestión:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Valor del contrato:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Anticipo:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Valor acta de finiquito:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Acta de confidencialidad:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Valor servicios profesionales:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Bonos por pagar:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Declaración jurada:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: [250, 'auto', 'auto'],
                        layout: "noBorders",
                        body: [
                            [
                                {
                                    text: "Beneficiarios",
                                    bold: true,
                                    border: [false, false, false, false],
                                    fillColor: "#E5E7EB"
                                }
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    fillColor: "#FFF",
                                    stack: [
                                        {
                                            columns: [
                                                {
                                                    text: "Beneficiario 1:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Cedula beneficiario 1:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Beneficiario 2:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Cedula beneficiario 2:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Beneficiario 3:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Cedula beneficiario 3:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        ]
                    }
                }
            ]
        },
        {
            columns: [
                {
                    table: {
                        widths: [250, 'auto', 'auto'],
                        layout: "noBorders",
                        body: [
                            [
                                {
                                    text: "Bancos",
                                    bold: true,
                                    border: [false, false, false, false],
                                    fillColor: "#E5E7EB"
                                }
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    fillColor: "#FFF",
                                    stack: [
                                        {
                                            columns: [
                                                {
                                                    text: "Banco 1:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Tipo de cuenta:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Numero de cuenta:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Banco 2:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Tipo de cuenta:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Numero de cuenta:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Banco 3:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Tipo de cuenta:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Numero de cuenta:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: [250, 'auto', 'auto'],
                        layout: "noBorders",
                        body: [
                            [
                                {
                                    text: "Solicitud",
                                    bold: true,
                                    border: [false, false, false, false],
                                    fillColor: "#E5E7EB"
                                }
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    fillColor: "#FFF",
                                    stack: [
                                        {
                                            columns: [
                                                {
                                                    text: "Tipo de solicitud:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Número de caso de solicitud:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: "Tipo de proyecto:",
                                                    bold: true,
                                                    alignment: 'left',
                                                    width: "auto"
                                                },
                                                {
                                                    text: "",
                                                    alignment: 'left',
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        ]
                    }
                }
            ]
        },
    ],
}

module.exports = {
    ResumenSkeleton
}