const PDFContract = require('../pdf/pdf-contract');
const { ResumenSkeleton } = require('./skeletons/resumen');
class CreateResumenPDF extends PDFContract {

    constructor() {
        super();
        this.setSkeleton(ResumenSkeleton);
    }

    setCustomerName(name) {
        this.docDefinition.content[0].columns[0].stack[0].text = name;
    }

    setCustomerStatus(status) {
        this.docDefinition.content[0].columns[0].stack[1].text = status;
    }

    setCustomerEmail(email) {
        this.docDefinition.content[0].columns[0].stack[2].stack[0].columns[1].text = email;
    }

    setCustomerId(id) {
        this.docDefinition.content[0].columns[0].stack[2].stack[1].columns[1].text = id;
    }

    setCustomerState(state) {
        this.docDefinition.content[0].columns[0].stack[2].stack[2].columns[1].text = state;
    }

    setAmmountForPayment(ammount) {
        this.docDefinition.content[0].columns[1].stack[0].stack[0].columns[1].text = ammount;
    }

    setDepositMade(deposit) {
        this.docDefinition.content[0].columns[1].stack[0].stack[1].columns[1].text = deposit;
    }

    setBalance(balance) {
        this.docDefinition.content[0].columns[1].stack[0].stack[2].columns[1].text = balance;
    }

    setAccountNumber(accountNumber) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[0].columns[1].text = accountNumber;
    }

    setPassportNumber(passportNumber) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[1].columns[1].text = passportNumber;
    }

    setBirthDate(birthDate) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[2].columns[1].text = birthDate;
    }

    setCountry(country) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[3].columns[1].text = country;
    }

    setRetirement(retirement) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[4].columns[1].text = retirement;
    }

    // setEmergencyContact(emergencyContact) {
    //     this.docDefinition.content[2].columns[0].table.body[1][0].stack[5].columns[1].text = emergencyContact;
    // }

    setCivilCharge(civilCharge) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[5].columns[1].text = civilCharge;
    }

    setDisability(disability) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[6].columns[1].text = disability;
    }

    setPhoneNumber(phoneNumber) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[7].columns[1].text = phoneNumber;
    }

    setOrganizationRole(role) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[8].columns[1].text = role;
    }

    setTypeService(service) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[9].columns[1].text = service;
    }

    setJoinDateOrganization(date) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[10].columns[1].text = date;
    }

    setCoordinatorName(name) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[11].columns[1].text = name;
    }

    setAnticipeGroup(group) {
        this.docDefinition.content[2].columns[0].table.body[1][0].stack[12].columns[1].text = group;
    }

    setRetentionIVAPanama(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[0].columns[1].text = retention;
    }

    setRetentionIVAEcuador(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[1].columns[1].text = retention;
    }

    setRetentionReforestation(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[2].columns[1].text = retention;
    }

    setRetentionLifeInsurance(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[3].columns[1].text = retention;
    }

    setRetentionISR(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[4].columns[1].text = retention;
    }

    setRetentionAnualTravel(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[5].columns[1].text = retention;
    }

    setRetentionSport(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[6].columns[1].text = retention;
    }

    setRetentionSource(retention) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[7].columns[1].text = retention;
    }

    setTaxAnticipate(tax) {
        this.docDefinition.content[2].columns[1].table.body[1][0].stack[8].columns[1].text = tax;
    }

    setAggrementCompensation(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[0].columns[1].text = ammount;
    }

    setPromisoryNote(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[1].columns[1].text = ammount;
    }

    setPaymentCommitment(payment) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[2].columns[1].text = payment;
    }

    setCheckAmmount(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[3].columns[1].text = ammount;
    }

    setPrivateContractManagement(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[4].columns[1].text = ammount;
    }

    setContractValue(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[5].columns[1].text = ammount;
    }

    setAnticipe(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[6].columns[1].text = ammount;
    }

    setTerminationCertificate(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[7].columns[1].text = ammount;
    }

    setConfidentialityCertificate(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[8].columns[1].text = ammount;
    }

    setProfetionalServices(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[9].columns[1].text = ammount;
    }

    setPaymentBonus(ammount) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[10].columns[1].text = ammount;
    }

    setDeclaration(declaration) {
        this.docDefinition.content[3].columns[0].table.body[1][0].stack[11].columns[1].text = declaration;
    }

    setBeneficiary1(beneficiary) {
        this.docDefinition.content[3].columns[1].table.body[1][0].stack[0].columns[1].text = beneficiary;
    }

    setBeneficiaryId1(id) {
        this.docDefinition.content[3].columns[1].table.body[1][0].stack[1].columns[1].text = id;
    }

    setBeneficiary2(beneficiary) {
        this.docDefinition.content[3].columns[1].table.body[1][0].stack[2].columns[1].text = beneficiary;
    }

    setBeneficiaryId2(id) {
        this.docDefinition.content[3].columns[1].table.body[1][0].stack[3].columns[1].text = id;
    }

    setBeneficiary3(beneficiary) {
        this.docDefinition.content[3].columns[1].table.body[1][0].stack[4].columns[1].text = beneficiary;
    }

    setBeneficiaryId3(id) {
        this.docDefinition.content[3].columns[1].table.body[1][0].stack[5].columns[1].text = id;
    }

    setBank1(bank) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[0].columns[1].text = bank;
    }

    setAccountType1(type) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[1].columns[1].text = type;
    }

    setAccountNumber1(number) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[2].columns[1].text = number;
    }

    setBank2(bank) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[3].columns[1].text = bank;
    }

    setAccountType2(type) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[4].columns[1].text = type;
    }

    setAccountNumber2(number) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[5].columns[1].text = number;
    }

    setBank3(bank) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[6].columns[1].text = bank;
    }

    setAccountType3(type) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[7].columns[1].text = type;
    }

    setAccountNumber3(number) {
        this.docDefinition.content[4].columns[0].table.body[1][0].stack[8].columns[1].text = number;
    }

    setTypeRequest(type) {
        this.docDefinition.content[4].columns[1].table.body[1][0].stack[0].columns[1].text = type;
    }

    setCaseNumberRequest(caseNumber) {
        this.docDefinition.content[4].columns[1].table.body[1][0].stack[1].columns[1].text = caseNumber;
    }

    setTypeProjectRequest(type) {
        this.docDefinition.content[4].columns[1].table.body[1][0].stack[2].columns[1].text = type;
    }

}

module.exports = {
    CreateResumenPDF
}