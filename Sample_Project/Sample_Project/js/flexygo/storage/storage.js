/**
* Library to manage selection buttons in local storage
*
* @class flexygo.storage.local
*/
var flexygo;
(function (flexygo) {
    var selection;
    (function (selection) {
        function getArray(object) {
            let selArr = flexygo.storage.local.get('selection-' + object.toLowerCase());
            if (selArr == null) {
                selArr = new Array();
            }
            return selArr;
        }
        selection.getArray = getArray;
        function setArray(object, selArr) {
            flexygo.storage.local.add('selection-' + object.toLowerCase(), selArr);
            return true;
        }
        selection.setArray = setArray;
        function add(object, value) {
            let selArr = flexygo.selection.getArray(object);
            for (var i = 0; i < selArr.length; i++) {
                if (selArr[i] === value) {
                    return false;
                }
            }
            selArr.push(value);
            return flexygo.selection.setArray(object, selArr);
        }
        selection.add = add;
        function appendArray(object, selArr) {
            let newArr = flexygo.selection.getArray(object).concat(selArr);
            //remove duplicates
            for (var i = 0; i < newArr.length; ++i) {
                for (var j = i + 1; j < newArr.length; ++j) {
                    if (newArr[i] === newArr[j])
                        newArr.splice(j--, 1);
                }
            }
            return flexygo.selection.setArray(object, selArr);
        }
        selection.appendArray = appendArray;
        function remove(object, value) {
            let selArr = flexygo.selection.getArray(object);
            for (var i = 0; i < selArr.length; i++) {
                if (selArr[i] === value) {
                    selArr.splice(i, 1);
                    return flexygo.selection.setArray(object, selArr);
                }
            }
            return false;
        }
        selection.remove = remove;
        function clear(object) {
            flexygo.storage.local.remove('selection-' + object.toLowerCase());
        }
        selection.clear = clear;
        function contains(object, value) {
            let selArr = flexygo.selection.getArray(object);
            for (var i = 0; i < selArr.length; i++) {
                if (selArr[i] === value) {
                    return true;
                }
            }
            return false;
        }
        selection.contains = contains;
        function toggle(object, value) {
            let selArr = flexygo.selection.getArray(object);
            for (var i = 0; i < selArr.length; i++) {
                if (selArr[i] === value) {
                    selArr.splice(i, 1);
                    flexygo.selection.setArray(object, selArr);
                    return false;
                }
            }
            selArr.push(value);
            flexygo.selection.setArray(object, selArr);
            return true;
        }
        selection.toggle = toggle;
        function getFilterString(object) {
            let whereString;
            let obj = new flexygo.obj.Entity(object);
            let dataCnf = obj.getConfig();
            if (dataCnf.UniqueIdentifier) {
                let itmArr = flexygo.selection.getArray(object);
                if (itmArr.length == 0) {
                    return '(1=0)';
                }
                whereString = dataCnf.TableName + '.' + dataCnf.UniqueIdentifier;
                whereString += " in ('" + itmArr.join("','") + "')";
                return whereString;
            }
            else {
                flexygo.msg.error('flxmodule.uniqueBagError');
                return '(1=0)';
            }
        }
        selection.getFilterString = getFilterString;
    })(selection = flexygo.selection || (flexygo.selection = {}));
})(flexygo || (flexygo = {}));
/**
* Library to call local storage functions.
*
* @class flexygo.storage.local
*/
(function (flexygo) {
    var storage;
    (function (storage) {
        var local;
        (function (local) {
            var _Timer = 30000;
            /**
             * Method to add an element to local Storage.
             * @method add
             * @param {string} key - Element key.
             * @param {string} value - element value.
             */
            function add(key, value) {
                value = JSON.stringify(value);
                localStorage.setItem(flexygo.profiles.projectName + '-' + key, value);
                if (local._saveTimer == null) {
                    local._saveTimer = setTimeout(() => {
                        flexygo.storage.local.save();
                    }, _Timer);
                }
            }
            local.add = add;
            /**
         * Method to remove an element from Session Storage.
         * @method remove
         * @param {string} key - Element key.
         * @param {string} value - element value.
         */
            function remove(key) {
                localStorage.removeItem(flexygo.profiles.projectName + '-' + key);
                if (local._saveTimer == null) {
                    local._saveTimer = setTimeout(() => {
                        flexygo.storage.local.save();
                    }, _Timer);
                }
            }
            local.remove = remove;
            /**
             * Method to get an element from Session Storage.
             * @method get
             * @param {string} key - Element key.
             * @param {string} value - element value.
             * @return {object} - Object from local storage.
             */
            function get(key) {
                var value = localStorage.getItem(flexygo.profiles.projectName + '-' + key);
                if (value == null || value == '') {
                    return null;
                }
                else {
                    return JSON.parse(value);
                }
            }
            local.get = get;
            /**
             * Method to clear all elements from Session Storage.
             * @method clear
             */
            function clear() {
                for (var i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    if (key.startsWith(flexygo.profiles.projectName + '-')) {
                        localStorage.removeItem(key);
                    }
                }
            }
            local.clear = clear;
            /**
             * Method to load local Storage from DataBase.
             * @method load
             */
            function load() {
                flexygo.ajax.post('~/api/Storage', 'Load', null, function (response) {
                    flexygo.storage.local.clear();
                    for (var p in response) {
                        localStorage.setItem(flexygo.profiles.projectName + '-' + response[p].Key, response[p].Value);
                    }
                });
            }
            local.load = load;
            /**
             * Method to save local Storage to DataBase.
             * @method save
             * @param {string} key - The url of the service.
             * @param {string} value - POST or GET.
             * @return {Boolean} - If was saved correctly.
             */
            function save() {
                local._saveTimer = null;
                var ret = false;
                var properties = new Array();
                for (var i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    if (key.startsWith(flexygo.profiles.projectName + '-')) {
                        properties.push({ key: key.replace(flexygo.profiles.projectName + '-', ''), value: localStorage.getItem(key) });
                    }
                }
                flexygo.ajax.post('~/api/Storage', 'Save', { 'Properties': properties }, (response) => {
                    return response;
                });
            }
            local.save = save;
        })(local = storage.local || (storage.local = {}));
    })(storage = flexygo.storage || (flexygo.storage = {}));
})(flexygo || (flexygo = {}));
/**
* Library to call local storage session functions.
*
* @class flexygo.storage.session
* @constructor
*/
(function (flexygo) {
    var storage;
    (function (storage) {
        var session;
        (function (session) {
            /**
             * Method to add an element to Session Storage.
             * @method add
             * @param {string} key - Element key.
             * @param {string} value - element value.
             */
            function add(key, value) {
                sessionStorage.setItem(flexygo.profiles.projectName + '-' + key, value);
            }
            session.add = add;
            /**
             * Method to remove an element from Session Storage.
             * @method remove
             * @param {string} key - Element key.
             * @param {string} value - element value.
             */
            function remove(key) {
                sessionStorage.removeItem(flexygo.profiles.projectName + '-' + key);
            }
            session.remove = remove;
            /**
             * Method to clear Session Storage.
             * @method clear
             */
            function clear() {
                for (var i = 0; i < sessionStorage.length; i++) {
                    let key = sessionStorage.key(i);
                    if (key.startsWith(flexygo.profiles.projectName + '-')) {
                        sessionStorage.removeItem(key);
                    }
                }
            }
            session.clear = clear;
            /**
             * Method to remove a series of elements from Session Storage.
             * Used on Applicaiton Init.
             * @method reset
             * @param {string} key - Element key.
             * @param {string} value - element value.
             */
            function reset() {
                sessionStorage.removeItem(flexygo.profiles.projectName + '-' + 'DevelopMode');
            }
            session.reset = reset;
            /**
             * Method to get an element from Session Storage.
             * @method get
             * @param {string} key - Element key.
             * @param {string} value - element value.
             * @return {object} - Object from session storage.
             */
            function get(key) {
                var value = sessionStorage.getItem(flexygo.profiles.projectName + '-' + key);
                if (value == null || value == '') {
                    return null;
                }
                else {
                    return value;
                }
            }
            session.get = get;
        })(session = storage.session || (storage.session = {}));
    })(storage = flexygo.storage || (flexygo.storage = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=storage.js.map