/**
 * @namespace flexygo
 */
/**
* Security Library.
*
* @class security
*/
var flexygo;
(function (flexygo) {
    var security;
    (function (security) {
        function set(el, type, key, item, value, id, key2) {
            let newval = 1;
            if (value == '1' || value == 'true') {
                newval = 0;
            }
            let params = {
                SecurityType: type,
                SecurityKey: key,
                SecurityKey2: key2,
                SecurityItem: item,
                SecurityItemValue: String(newval),
                SecurityId: id
            };
            flexygo.ajax.syncPost('~/api/Security', 'SetSecurity', params, (response) => {
                el.attr('data-value', String(newval === 1));
                el.find('i:first').removeClass();
                el.find('i:first').css('cursor', 'pointer');
                if (newval == 1) {
                    el.find('i:first').addClass('flx-icon icon-bool-v');
                }
                else {
                    el.find('i:first').addClass('flx-icon icon-bool-x');
                }
            });
        }
        security.set = set;
        function getObjectKey(type, key, key2) {
            let params = {
                SecurityType: type,
                SecurityKey: key,
                SecurityKey2: key2
            };
            let ret = null;
            flexygo.ajax.syncPost('~/api/Security', 'getObjectKey', params, (response) => {
                ret = response;
            });
            return ret;
        }
        security.getObjectKey = getObjectKey;
    })(security = flexygo.security || (flexygo.security = {}));
})(flexygo || (flexygo = {}));
/**
* Security Roles.
*
* @class security.roles
*/
(function (flexygo) {
    var security;
    (function (security) {
        var roles;
        (function (roles) {
            function init(el) {
                let id = $(el).find('flx-list').attr('id');
                let divlist = $("#" + id + ">div>div");
                divlist.each((i, e) => {
                    let dataField = $(e).attr('data-field');
                    let dataKey = $(e).attr('data-key');
                    let dataField2 = $(e).attr('data-field2');
                    let dataKey2 = $(e).attr('data-key2');
                    let dataRole = $(e).attr('data-security-id');
                    let dataSecurity = $(e).attr('data-security');
                    let def = '\'' + dataField + '\':\'' + dataKey + '\',\'RoleId\':\'' + dataRole + '\'';
                    if (dataField2) {
                        def = def + ',\'' + dataField2 + '\':\'' + dataKey2 + '\'';
                    }
                    //first columns take to edit mode
                    $(e).children(':first').each((j, f) => {
                        $(f).css('cursor', 'pointer');
                        $(f).off();
                        $(f).on('click', (ev) => {
                            let objectwhere = flexygo.security.getObjectKey(dataSecurity, dataKey, dataKey2); //, function (response) {
                            flexygo.nav.openPage('edit', dataSecurity, objectwhere + " and RoleId='" + dataRole + "'", '{' + def + '}', 'popup', true);
                        });
                    });
                    // element columns handle click on icon
                    $(e).children('[data-element]').each((j, f) => {
                        $(f).find('i:first').css('cursor', 'pointer');
                        $(f).off();
                        $(f).on("click", (ev) => {
                            flexygo.security.set($(ev.currentTarget), dataSecurity, dataKey, $(ev.currentTarget).attr("data-element"), $(ev.currentTarget).attr("data-value"), dataRole, dataKey2);
                        });
                    });
                });
            }
            roles.init = init;
        })(roles = security.roles || (security.roles = {}));
    })(security = flexygo.security || (flexygo.security = {}));
})(flexygo || (flexygo = {}));
/**
* Security Faculties.
*
* @class security.Faculties
*/
(function (flexygo) {
    var security;
    (function (security) {
        var faculties;
        (function (faculties) {
            function init(el) {
                let id = $(el).find('flx-list').attr('id');
                let divlist = $("#" + id + ">div>div");
                divlist.each((i, e) => {
                    let dataField = $(e).attr('data-field');
                    let dataKey = $(e).attr('data-key');
                    let dataField2 = $(e).attr('data-field2');
                    let dataKey2 = $(e).attr('data-key2');
                    let dataFaculty = $(e).attr('data-security-id');
                    let dataSecurity = $(e).attr('data-security');
                    let def = '\'' + dataField + '\':\'' + dataKey + '\',\'FacultyId\':\'' + dataFaculty + '\'';
                    if (dataField2) {
                        def = def + ',\'' + dataField2 + '\':\'' + dataKey2 + '\'';
                    }
                    //first columns take to edit mode
                    $(e).children(':first').each((j, f) => {
                        $(f).css('cursor', 'pointer');
                        $(f).off();
                        $(f).on('click', (ev) => {
                            let objectwhere = flexygo.security.getObjectKey(dataSecurity, dataKey, dataKey2); //, function (response) {
                            flexygo.nav.openPage('edit', dataSecurity, objectwhere + " and FacultyId='" + dataFaculty + "'", '{' + def + '}', 'popup', true);
                        });
                    });
                    // element columns handle click on icon
                    $(e).children('[data-element]').each((j, f) => {
                        $(f).find('i:first').css('cursor', 'pointer');
                        $(f).off();
                        $(f).on("click", (ev) => {
                            flexygo.security.set($(ev.currentTarget), dataSecurity, dataKey, $(ev.currentTarget).attr("data-element"), $(ev.currentTarget).attr("data-value"), dataFaculty, dataKey2);
                        });
                    });
                });
            }
            faculties.init = init;
        })(faculties = security.faculties || (security.faculties = {}));
    })(security = flexygo.security || (flexygo.security = {}));
})(flexygo || (flexygo = {}));
/**
* Security users.
*
* @class security.users
*/
(function (flexygo) {
    var security;
    (function (security) {
        var users;
        (function (users) {
            function init(el) {
                let id = $(el).find('flx-list').attr('id');
                let divlist = $("#" + id + ">div>div");
                divlist.each((i, e) => {
                    let dataField = $(e).attr('data-field');
                    let dataKey = $(e).attr('data-key');
                    let dataField2 = $(e).attr('data-field2');
                    let dataKey2 = $(e).attr('data-key2');
                    let dataUser = $(e).attr('data-security-id');
                    let dataSecurity = $(e).attr('data-security');
                    let objectwhere = '';
                    let def = '\'' + dataField + '\':\'' + dataKey + '\',\'UserId\':\'' + dataUser + '\'';
                    if (dataField2) {
                        def = def + ',\'' + dataField2 + '\':\'' + dataKey2 + '\'';
                    }
                    //first columns take to edit mode
                    $(e).children(':first').each((j, f) => {
                        $(f).css('cursor', 'pointer');
                        $(f).off();
                        $(f).on('click', (ev) => {
                            let objectwhere = flexygo.security.getObjectKey(dataSecurity, dataKey, dataKey2); //, function (response) {
                            flexygo.nav.openPage('edit', dataSecurity, objectwhere + " and UserId='" + dataUser + "'", '{' + def + '}', 'popup', true);
                        });
                    });
                    // element columns handle click on icon
                    $(e).children('[data-element]').each((j, f) => {
                        $(f).find('i:first').css('cursor', 'pointer');
                        $(f).off();
                        $(f).on("click", (ev) => {
                            flexygo.security.set($(ev.currentTarget), dataSecurity, dataKey, $(ev.currentTarget).attr("data-element"), $(ev.currentTarget).attr("data-value"), dataUser, dataKey2);
                        });
                    });
                });
            }
            users.init = init;
        })(users = security.users || (security.users = {}));
    })(security = flexygo.security || (flexygo.security = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var security;
    (function (security) {
        var webapi;
        (function (webapi) {
            function init(el) {
                let divlist = $(el).find('flx-list [data-security]');
                divlist.each((i, e) => {
                    // element columns handle click on icon
                    $(e).children('[data-element]').each((j, f) => {
                        $(f).find('i:first').css('cursor', 'pointer');
                        $(f).off();
                        $(f).on("click", (ev) => {
                            let parentDiv = $(f).closest('[data-security]');
                            let currentDiv = $(ev.currentTarget);
                            let dataSecurity = parentDiv.attr('data-security');
                            let dataKey = parentDiv.attr('data-key');
                            let dataKeyField = parentDiv.attr('data-key-field');
                            let dataKey2 = parentDiv.attr('data-key2');
                            let dataKey2Field = parentDiv.attr('data-key2-field');
                            // create object where
                            let objectwhere = '';
                            objectwhere += dataKeyField + "='" + dataKey + "'";
                            if (dataKey2Field) {
                                objectwhere += " and " + dataKey2Field + "='" + dataKey2 + "'";
                            }
                            let dataElement = currentDiv.attr('data-element');
                            let obj = new flexygo.obj.Entity(dataSecurity, objectwhere);
                            obj.read();
                            obj.data[dataKeyField].Value = dataKey;
                            if (dataKey2Field) {
                                obj.data[dataKey2Field].Value = dataKey2;
                            }
                            if (obj.data[dataElement].Value) {
                                obj.data[dataElement].Value = false;
                            }
                            else {
                                obj.data[dataElement].Value = true;
                            }
                            if (obj.update()) {
                                currentDiv.find('i').attr('class', 'flx-icon icon-bool-' + ((obj.data[dataElement].Value) ? 'v' : 'x'));
                            }
                        });
                    });
                });
            }
            webapi.init = init;
        })(webapi = security.webapi || (security.webapi = {}));
    })(security = flexygo.security || (flexygo.security = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=security.js.map