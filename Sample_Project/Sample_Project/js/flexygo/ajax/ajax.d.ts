/**
* Class for post and syncpost
* @class flexygo.ajax
*/
declare namespace flexygo.ajax {
    /**
     * Method to call AJAX functions.
     * @method post
     * @param {string} url - The url of the service.
     * @param {string} method - POST or GET.
     * @param {string} params - Params sent to service.
     * @param {string} successFunction - Callback function to successfully state.
     * @param {string} errorFunction - Callback function to error state.
     * @param {string} completeFunction - function to run when ajax call has finished with or without error.
     * @param {string} beforeFunction - function to run before ajax call.
     */
    function post(url: string, method: string, params: object, successFunction?: any, errorFunction?: any, completeFunction?: any, beforeFunction?: any): void;
    /**
     * Method to call AJAX sync functions.
     * @method syncPost
     * @param {string} url - The url of the service.
     * @param {string} method - POST or GET.
     * @param {string} params - Params sent to service.
     * @param {string} successFunction - Callback function to successfully state.
     * @param {string} errorFunction - Callback function to error state.
     * @param {string} completeFunction - function to run when ajax call has finished with or without error.
     * @param {string} beforeFunction - function to run before ajax call.
     */
    function syncPost(url: string, method: string, params: object, successFunction?: any, errorFunction?: any, completeFunction?: any, beforeFunction?: any): void;
}
