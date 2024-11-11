import { y as WebPlugin } from './conftoken-89472368.js';
import './process-es6-cc264d03.js';
import './jquery-34624bb9.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-224de961.js';
import './index-8e5b11cb.js';
import './animation-b4670628.js';
import './helpers-7ecb2fa5.js';
import './ios.transition-e14f38db.js';
import './index-c59a2c3f.js';
import './md.transition-8bd31aee.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-6d118971.js';
import './index-cc97b114.js';
import './index-81d32235.js';
import './hardware-back-button-508e48cf.js';
import './overlays-cda44124.js';

class CapacitorSQLiteWeb extends WebPlugin {
    constructor() {
        super(...arguments);
        this.jeepSqliteElement = null;
        this.isWebStoreOpen = false;
    }
    async initWebStore() {
        await customElements.whenDefined('jeep-sqlite');
        this.jeepSqliteElement = document.querySelector('jeep-sqlite');
        this.ensureJeepSqliteIsAvailable();
        this.jeepSqliteElement.addEventListener('jeepSqliteImportProgress', (event) => {
            this.notifyListeners('sqliteImportProgressEvent', event.detail);
        });
        this.jeepSqliteElement.addEventListener('jeepSqliteExportProgress', (event) => {
            this.notifyListeners('sqliteExportProgressEvent', event.detail);
        });
        this.jeepSqliteElement.addEventListener('jeepSqliteHTTPRequestEnded', (event) => {
            this.notifyListeners('sqliteHTTPRequestEndedEvent', event.detail);
        });
        this.jeepSqliteElement.addEventListener('jeepSqlitePickDatabaseEnded', (event) => {
            this.notifyListeners('sqlitePickDatabaseEndedEvent', event.detail);
        });
        this.jeepSqliteElement.addEventListener('jeepSqliteSaveDatabaseToDisk', (event) => {
            this.notifyListeners('sqliteSaveDatabaseToDiskEvent', event.detail);
        });
        if (!this.isWebStoreOpen) {
            this.isWebStoreOpen = await this.jeepSqliteElement.isStoreOpen();
        }
        return;
    }
    async saveToStore(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.saveToStore(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getFromLocalDiskToStore(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.getFromLocalDiskToStore(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async saveToLocalDisk(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.saveToLocalDisk(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async echo(options) {
        this.ensureJeepSqliteIsAvailable();
        const echoResult = await this.jeepSqliteElement.echo(options);
        return echoResult;
    }
    async createConnection(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.createConnection(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async open(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.open(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async closeConnection(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.closeConnection(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getVersion(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const versionResult = await this.jeepSqliteElement.getVersion(options);
            return versionResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async checkConnectionsConsistency(options) {
        this.ensureJeepSqliteIsAvailable();
        try {
            const consistencyResult = await this.jeepSqliteElement.checkConnectionsConsistency(options);
            return consistencyResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async close(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.close(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async beginTransaction(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const changes = await this.jeepSqliteElement.beginTransaction(options);
            return changes;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async commitTransaction(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const changes = await this.jeepSqliteElement.commitTransaction(options);
            return changes;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async rollbackTransaction(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const changes = await this.jeepSqliteElement.rollbackTransaction(options);
            return changes;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async isTransactionActive(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const result = await this.jeepSqliteElement.isTransactionActive(options);
            return result;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getTableList(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const tableListResult = await this.jeepSqliteElement.getTableList(options);
            return tableListResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async execute(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const executeResult = await this.jeepSqliteElement.execute(options);
            return executeResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async executeSet(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const executeResult = await this.jeepSqliteElement.executeSet(options);
            return executeResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async run(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const runResult = await this.jeepSqliteElement.run(options);
            return runResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async query(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const queryResult = await this.jeepSqliteElement.query(options);
            return queryResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async isDBExists(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const dbExistsResult = await this.jeepSqliteElement.isDBExists(options);
            return dbExistsResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async isDBOpen(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const isDBOpenResult = await this.jeepSqliteElement.isDBOpen(options);
            return isDBOpenResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async isDatabase(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const isDatabaseResult = await this.jeepSqliteElement.isDatabase(options);
            return isDatabaseResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async isTableExists(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const tableExistsResult = await this.jeepSqliteElement.isTableExists(options);
            return tableExistsResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async deleteDatabase(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.deleteDatabase(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async isJsonValid(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const isJsonValidResult = await this.jeepSqliteElement.isJsonValid(options);
            return isJsonValidResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async importFromJson(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const importFromJsonResult = await this.jeepSqliteElement.importFromJson(options);
            return importFromJsonResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async exportToJson(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const exportToJsonResult = await this.jeepSqliteElement.exportToJson(options);
            return exportToJsonResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async createSyncTable(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const createSyncTableResult = await this.jeepSqliteElement.createSyncTable(options);
            return createSyncTableResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async setSyncDate(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.setSyncDate(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getSyncDate(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const getSyncDateResult = await this.jeepSqliteElement.getSyncDate(options);
            return getSyncDateResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async deleteExportedRows(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.deleteExportedRows(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async addUpgradeStatement(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.addUpgradeStatement(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async copyFromAssets(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.copyFromAssets(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getFromHTTPRequest(options) {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            await this.jeepSqliteElement.getFromHTTPRequest(options);
            return;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getDatabaseList() {
        this.ensureJeepSqliteIsAvailable();
        this.ensureWebstoreIsOpen();
        try {
            const databaseListResult = await this.jeepSqliteElement.getDatabaseList();
            return databaseListResult;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    /**
     * Checks if the `jeep-sqlite` element is present in the DOM.
     * If it's not in the DOM, this method throws an Error.
     *
     * Attention: This will always fail, if the `intWebStore()` method wasn't called before.
     */
    ensureJeepSqliteIsAvailable() {
        if (this.jeepSqliteElement === null) {
            throw new Error(`The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.`);
        }
    }
    ensureWebstoreIsOpen() {
        if (!this.isWebStoreOpen) {
            /**
             * if (!this.isWebStoreOpen)
              this.isWebStoreOpen = await this.jeepSqliteElement.isStoreOpen();
             */
            throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.');
        }
    }
    ////////////////////////////////////
    ////// UNIMPLEMENTED METHODS
    ////////////////////////////////////
    async getUrl() {
        throw this.unimplemented('Not implemented on web.');
    }
    async getMigratableDbList(options) {
        console.log('getMigratableDbList', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async addSQLiteSuffix(options) {
        console.log('addSQLiteSuffix', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async deleteOldDatabases(options) {
        console.log('deleteOldDatabases', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async moveDatabasesAndAddSuffix(options) {
        console.log('moveDatabasesAndAddSuffix', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async isSecretStored() {
        throw this.unimplemented('Not implemented on web.');
    }
    async setEncryptionSecret(options) {
        console.log('setEncryptionSecret', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async changeEncryptionSecret(options) {
        console.log('changeEncryptionSecret', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async clearEncryptionSecret() {
        console.log('clearEncryptionSecret');
        throw this.unimplemented('Not implemented on web.');
    }
    async checkEncryptionSecret(options) {
        console.log('checkEncryptionPassPhrase', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async getNCDatabasePath(options) {
        console.log('getNCDatabasePath', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async createNCConnection(options) {
        console.log('createNCConnection', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async closeNCConnection(options) {
        console.log('closeNCConnection', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async isNCDatabase(options) {
        console.log('isNCDatabase', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async isDatabaseEncrypted(options) {
        console.log('isDatabaseEncrypted', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async isInConfigEncryption() {
        throw this.unimplemented('Not implemented on web.');
    }
    async isInConfigBiometricAuth() {
        throw this.unimplemented('Not implemented on web.');
    }
    async loadExtension(options) {
        console.log('loadExtension', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async enableLoadExtension(options) {
        console.log('enableLoadExtension', options);
        throw this.unimplemented('Not implemented on web.');
    }
}

export { CapacitorSQLiteWeb };
