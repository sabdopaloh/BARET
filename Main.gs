
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var email = e.parameter.email;
  var password = e.parameter.password;
  var nama = e.parameter.nama;
  var tanggal = e.parameter.tanggal;

  if (nama && email && tanggal && password) {
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][3] === email) {
        return ContentService.createTextOutput("email_terdaftar").setMimeType(ContentService.MimeType.TEXT);
      }
    }
    sheet.appendRow([nama, password, tanggal, email, ""]);
    return ContentService.createTextOutput("pendaftaran_berhasil").setMimeType(ContentService.MimeType.TEXT);
  } else if (email && password) {
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][3] === email && data[i][1] === password) {
        return ContentService.createTextOutput("login_berhasil").setMimeType(ContentService.MimeType.TEXT);
      }
    }
    return ContentService.createTextOutput("login_gagal").setMimeType(ContentService.MimeType.TEXT);
  }
  return ContentService.createTextOutput("parameter_tidak_valid").setMimeType(ContentService.MimeType.TEXT);
}
