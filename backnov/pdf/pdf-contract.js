const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require("pdfmake/build/vfs_fonts");
const { writeFileSync } = require('fs')
pdfMake.vfs = pdfFonts.pdfMake.vfs;
class PDFContract {
    docDefinition = {};

    setSkeleton(body) {
        this.docDefinition = body;
    }

    async getDocument() {
        return pdfMake.createPdf(this.docDefinition);
    }

    async save(path, name) {
        const dir = path + `${name.replace('.pdf', '')}.pdf`;
        try {
            const buffer = await this.getBuffer();
            writeFileSync(dir, buffer, { encoding: 'binary' });
            return {
                save: true,
                path: dir,
            };
        } catch (e) {
            return {
                save: false,
                error: e,
            };
        }
    }

    async getBuffer(options) {
        return new Promise(async (resolve) => {
            const doc = await this.getDocument();
            doc.getBuffer((result) => {
                resolve(result);
            }, options);
        });
    }

    async getDataUrl(options) {
        return new Promise(async (resolve) => {
            const doc = await this.getDocument();
            doc.getDataUrl((result) => {
                resolve(result);
            }, options);
        });
    }

    async getStream(options) {
        const doc = await this.getDocument();
        return doc.getStream(options);
    }

    async getBlob(options) {
        return new Promise(async (resolve) => {
            const doc = await this.getDocument();
            doc.getBlob((result) => {
                resolve(result);
            }, options);
        });
    }
}

module.exports = PDFContract