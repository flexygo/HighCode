declare namespace flexygo.exports {
    /**
    * Sends email using defailt mail system.
    * @method sendMail
    * @param {string|array} to - Receiver email or array with receiver emails .
    * @param {string} subject - The second param for the sum.
    * @param {string} body - The second param for the sum.
    * @param {boolean} [ishtml=true] - The second param for the sum (defaut: true).
    * @param {string|array} [cc] - Other receiver email or array with other receiver receiver emails.
    * @param {string|array} [bcc] - bcc email or array with bcc emails.
    * @param {array} [attachments] - Array with attachments. ['base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',...]
    */
    function sendMail(to: any, subject: any, body: any, ishtml?: boolean, cc?: string, bcc?: string, attachments?: any): Promise<void>;
    /**
    * Generate pdf from html string
    * @method createPDF
    * @param {string} html - HTML string to convert to pdf.
    * @param {string} filename[document.pdf] - Pdf file name
    * @param {string} [documentsize=A4] - Pdf document size [A4|A3|A2]
    * @param {boolean} [landscape=false] - Landscape or portrait
    * @param {boolean} [share=true] - If true launches share OS window, else return object with base64 encoded file.
    * @return {Promise<pdf>} - if share = false returns promise with pdf base64 object.
    */
    function createPDF(html: any, filename?: string, documentsize?: string, landscape?: boolean, share?: boolean): any;
}