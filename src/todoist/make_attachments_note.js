function makeAttachmentsNote(attachments) {
  if (!attachments || !attachments.length) return '';

  let result = '__Attachments__\n';

  attachments.forEach(element => {
    result = result + `- ${element.title} (${element.url})\n`;
  });

  return result;
}

module.exports = { makeAttachmentsNote };
