module.exports = {


  name: "strapi::body",
  config: {
    formLimit: "256mb", // modify form body
    jsonLimit: "256mb", // modify JSON body
    textLimit: "256mb", // modify text body
    formidable: {
      maxFileSize: 250 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
    },
  },


  load: {
    before: ['responseTime', 'logger', 'cors', 'responses'],
    order: [],
    after: ['parser', 'router'],
  },
  settings: {
    poweredBy: {
      enabled: false,
    }
  }



};

