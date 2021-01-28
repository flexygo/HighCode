/**
 * @namespace flexygo
 */
/**
* Security Library.
*
* @class security
*/
declare namespace flexygo.security {
    function set(el: JQuery, type: string, key: string, item: string, value: string, id: string, key2: string): void;
    function getObjectKey(type: string, key: string, key2: string): string;
}
/**
* Security Roles.
*
* @class security.roles
*/
declare namespace flexygo.security.roles {
    function init(el: Element): void;
}
/**
* Security Faculties.
*
* @class security.Faculties
*/
declare namespace flexygo.security.faculties {
    function init(el: Element): void;
}
/**
* Security users.
*
* @class security.users
*/
declare namespace flexygo.security.users {
    function init(el: Element): void;
}
declare namespace flexygo.security.webapi {
    function init(el: Element): void;
}
