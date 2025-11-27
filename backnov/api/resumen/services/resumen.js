const {CreateResumenPDF} = require('../../../pdf/createResumen');
const {readFileSync} = require('fs');
const {ok} = require('assert');
module.exports = {
  async getResumenPDF(userId) {
    const {
      datos_personales,
      configuracion_pago,
      solicitudes
    } = await strapi.query('user', 'users-permissions').findOne({id: userId});
    const fullName = `${datos_personales.nombres ?? ''} ${datos_personales.apellidos ?? ''}`;
    const isActive = datos_personales.status ? 'Activo' : 'Inactivo';

    // code by Saeed
    const totalPaymentAmount = Number(datos_personales?.valor_del_contrato ?? 0)
      + Number(datos_personales?.valor_adendum ?? 0)
      + Number(datos_personales?.valor_cheque ?? 0)
      + Number(datos_personales?.acta_de_adelanto ?? 0)
      + Number(datos_personales?.acta_de_finiquito ?? 0)
      + Number(datos_personales?.acta_compromiso_pago ?? 0)
      + Number(datos_personales?.contrato_privado_gestion_intermediacion ?? 0)
      + Number(datos_personales?.pagare ?? 0)
      + Number(datos_personales?.valor_letra_de_cambio ?? 0)
      + Number(datos_personales?.bono_eficiencia_cumplimiento ?? 0)
      + Number(datos_personales?.convenio_compensacion ?? 0)
      + Number(datos_personales?.certificado_garantia_depositos ?? 0)
      + Number(datos_personales?.anticipo ?? 0)
      + Number(datos_personales?.acta_confidencialidad ?? 0)
      + Number(datos_personales?.valor_servicios_profesionales ?? 0);
    const accountBalance = datos_personales?.bonos_por_pagar ?? 0;
    const depositAmount = (totalPaymentAmount - accountBalance) ?? 0;
    // Code by Saeed
    const pdf = new CreateResumenPDF();
    pdf.setCustomerName(fullName);
    pdf.setCustomerStatus(isActive);
    pdf.setCustomerState(datos_personales?.estado ?? 'Ingresado');
    pdf.setCustomerId(datos_personales?.cedula_ruc.toString() ?? '');
    pdf.setAmmountForPayment(totalPaymentAmount.toFixed(2)); // code by saeed
    pdf.setDepositMade(depositAmount.toFixed(2)); // code by saeed
    pdf.setBalance(accountBalance.toFixed(2)); // code by saeed
    pdf.setCustomerEmail(datos_personales?.correo ?? '');
    pdf.setPassportNumber(datos_personales?.pasaporte ?? '');
    pdf.setAccountNumber(datos_personales?.cedula_ruc.toString() ?? '');
    pdf.setBirthDate(datos_personales?.fecha_nacimiento ?? '');
    pdf.setCountry(datos_personales?.pais ?? '');
    pdf.setRetirement(datos_personales?.jubilacion ? 'Si' : 'No');
    pdf.setOrganizationRole(datos_personales?.desempeno_organizacion ?? '');
    pdf.setDisability(datos_personales?.discapacidad ? 'Si' : 'No');
    pdf.setPhoneNumber(datos_personales?.celular.toString() ?? '');
    pdf.setCivilCharge(datos_personales?.cargo_civil ?? '');
    pdf.setCoordinatorName(datos_personales?.coordinador ?? '');
    pdf.setAnticipeGroup(datos_personales?.grupo_anticipo ?? '');
    pdf.setJoinDateOrganization(datos_personales?.fecha_de_ingreso_a_la_organizacion ?? '');
    pdf.setTypeService(datos_personales?.tipo_de_servicio ?? '');
    const ivaPanama = configuracion_pago?.retencion_iva_panama ?? 0;
    const ivaEcuador = configuracion_pago?.retencion_iva_ecuador ?? 0;
    const reforestation = configuracion_pago?.retencion_reforestacion ?? 0;
    const lifeInsurance = configuracion_pago?.retencion_seguro_vida ?? 0;
    const taxRent = configuracion_pago?.retencion_impuesto_renta ?? 0;
    const anualTravel = configuracion_pago?.descuento_viajes_anuales ?? 0;
    const retentionSport = configuracion_pago?.retencion_deporte ?? 0;
    const retentionSource = configuracion_pago?.retencion_fuente ?? 0;
    const taxAnticipe = configuracion_pago?.impuesto_anticipado ?? 0;
    pdf.setRetentionIVAPanama(`${ivaPanama.toFixed(2)}%` ?? '');
    pdf.setRetentionIVAEcuador(`${ivaEcuador.toFixed(2)}%` ?? '');
    pdf.setRetentionReforestation(`${reforestation.toFixed(2)}%` ?? '');
    pdf.setRetentionLifeInsurance(`${lifeInsurance.toFixed(2)}%` ?? '');
    pdf.setRetentionISR(`${taxRent.toFixed(2)}%` ?? '');
    pdf.setRetentionAnualTravel(`${anualTravel.toFixed(2)}%` ?? '');
    pdf.setRetentionSport(`${retentionSport.toFixed(2)}%` ?? '');
    pdf.setRetentionSource(`${retentionSource.toFixed(2)}%` ?? '');
    pdf.setTaxAnticipate(`${taxAnticipe.toFixed(2)}%` ?? '');
    const aggrementCompensation = datos_personales?.convenio_compensacion ?? 0;
    const promisoryNote = datos_personales?.pagare ?? 0;
    const paymentCommitmentCertificate = datos_personales?.acta_compromiso_pago ?? 0;
    const checkValue = datos_personales?.valor_cheque ?? 0;
    const privateContract = datos_personales?.contrato_privado_gestion_intermediacion ?? 0;
    const contractValue = datos_personales?.valor_del_contrato ?? 0;
    const anticipe = datos_personales?.anticipo ?? 0;
    const terminationAct = datos_personales?.acta_de_finiquito ?? 0;
    const confidentiality = datos_personales?.acta_confidencialidad ?? 0;
    const profetionalServices = datos_personales?.valor_servicios_profesionales ?? 0;
    const bonoForPay = datos_personales?.bonos_por_pagar ?? 0;
    const declaration = datos_personales?.declaracion_jurada ?? '';
    pdf.setAggrementCompensation(`$${aggrementCompensation.toFixed(2)}`)
    pdf.setPromisoryNote(`$${promisoryNote.toFixed(2)}`)
    pdf.setPaymentCommitment(`$${paymentCommitmentCertificate.toFixed(2)}`)
    pdf.setCheckAmmount(`$${checkValue.toFixed(2)}`)
    pdf.setPrivateContractManagement(`$${privateContract.toFixed(2)}`)
    pdf.setContractValue(`$${contractValue.toFixed(2)}`)
    pdf.setAnticipe(`$${anticipe.toFixed(2)}`)
    pdf.setTerminationCertificate(`$${terminationAct.toFixed(2)}`)
    pdf.setConfidentialityCertificate(`$${confidentiality.toFixed(2)}`)
    pdf.setProfetionalServices(`$${profetionalServices.toFixed(2)}`)
    pdf.setPaymentBonus(`$${bonoForPay.toFixed(2)}`)
    pdf.setDeclaration(declaration)

    const bank1 = datos_personales?.banco_cooperativa ?? '';
    const accountType1 = datos_personales?.tipo_cuenta ?? '';
    const accountNumber1 = datos_personales?.numero_cuenta ?? '';
    const bank2 = datos_personales?.banco_cooperativa2 ?? '';
    const accountType2 = datos_personales?.tipo_cuenta2 ?? '';
    const accountNumber2 = datos_personales?.numero_cuenta2 ?? '';
    const bank3 = datos_personales?.banco_cooperativa3 ?? '';
    const accountType3 = datos_personales?.tipo_cuenta3 ?? '';
    const accountNumber3 = datos_personales?.numero_cuenta3 ?? '';
    pdf.setBank1(bank1);
    pdf.setAccountType1(accountType1);
    pdf.setAccountNumber1(accountNumber1);
    pdf.setBank2(bank2);
    pdf.setAccountType2(accountType2);
    pdf.setAccountNumber2(accountNumber2);
    pdf.setBank3(bank3);
    pdf.setAccountType3(accountType3);
    pdf.setAccountNumber3(accountNumber3);

    const beneficiary1 = datos_personales?.beneficiario1 ?? '';
    const beneficiaryId1 = datos_personales?.cedula_beneficiario1?.toString() ?? '';
    const beneficiary2 = datos_personales?.beneficiario2 ?? '';
    const beneficiaryId2 = datos_personales?.cedula_beneficiario2?.toString() ?? '';
    const beneficiary3 = datos_personales?.beneficiario3 ?? '';
    const beneficiaryId3 = datos_personales?.cedula_beneficiario3?.toString() ?? '';
    pdf.setBeneficiary1(beneficiary1);
    pdf.setBeneficiaryId1(beneficiaryId1);
    pdf.setBeneficiary2(beneficiary2);
    pdf.setBeneficiaryId2(beneficiaryId2);
    pdf.setBeneficiary3(beneficiary3);
    pdf.setBeneficiaryId3(beneficiaryId3);

    const typeRequest = solicitudes[0]?.tipo_solicitud ?? '';
    const caseNumberRequest = solicitudes[0]?.numero_caso ?? '';
    const typeProjectRequest = solicitudes[0]?.tipo_proyecto ?? '';

    pdf.setTypeRequest(typeRequest);
    pdf.setCaseNumberRequest(caseNumberRequest);
    pdf.setTypeProjectRequest(typeProjectRequest);

    const document = await pdf.save('./public/files/', `resumen-${userId}`);
    return document
  },
  async sendMail(userId, document) {
    const {datos_personales} = await strapi.query('user', 'users-permissions').findOne({id: userId});
    let {correo, nombres} = datos_personales;
    if(!correo.length) correo = "angelo.lunav@gmail.com";
    const attachment = readFileSync(document.path).toString('base64')
    const mail = await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
      {
        to: correo,
//            text: `Hola ${nombres}, te enviamos tu resumen de cuenta`,
        attachments: [
          {
            filename: `resumen-${userId}.pdf`,
            content: attachment,
          }
        ]
      },
      {
        templateId: 1,
        sourceCodeToTemplateId: 1,
        subject: 'Resumen de cuenta',
      },
      {
        USER: {
          firstname: nombres
        },
        CONTENT: {
          message: "Te enviamos el resumen de tu cuenta"
        }
      }
    )
    return mail;
  }
}
