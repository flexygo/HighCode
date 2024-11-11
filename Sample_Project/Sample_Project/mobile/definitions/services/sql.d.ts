declare namespace flexygo {
    class sql {
        private _db;
        private _dbs;
        db(): Promise<any>;
        getDBs(): flexygoDB[];
        getActiveDb(): any;
        getActiveDbName(): Promise<any>;
        init(GUID: string): Promise<void>;
        initCapDb(GUID: any): Promise<void>;
        addActiveDb(db: any, GUID: string): void;
        setActiveDB(GUID: string): Promise<void>;
        deactivateDb(): void;
        createSave: any;
        execSQL(sentence: any, params?: any[], saveToStore?: boolean, saveToStoreTimeout?: number, waitForSave?: boolean): Promise<any>;
        sqlBatch(arr: any, saveToStore?: boolean, saveToStoreTimeout?: number, waitForSave?: boolean): Promise<any>;
        getRow(table: any, index: any): any;
        getRows(table: any): any;
        getTable(sentence: any, params?: any[]): Promise<any>;
        getValue(sentence: any, params?: any[]): Promise<any>;
        getCount(tablename: any, where: any, params?: any[]): Promise<number>;
        getTableColumns(tableName: string): Promise<any>;
        getQueryColumns(query: any): Promise<any[]>;
        private getColumnName;
        /**
        * PC SQL Execution (should not be called directly, execSQL/batchSQL/getTable/... should be the ones called so the app knows if it should use a PC call or a phone one)
        * @method excecPCSQL
        * @param {string} sentence - The SQL Sentence
        * @param {Array} params - The array of parameters that will replace ? on the SQL Sentence
        * @param {boolean} saveToStore - Determines if the result will be saved on the navigator store (this is necessary when doing an insert so the result shows)
        * @param {Array} arr - The SQL Sentences array used when executing an SQL Batch
        * @param {string} saveToStoreTimeout - The timeout that will be used to save items to the store (is set to 300000 by default so it does not slows the app, but it could be set to 0 if a reload is gonna be done just after an insert)
        * @param {boolean} waitForSave - This param is usefull .then/await calls so if  you want to reload you wait until the data has been properly saved
        */
        private execPCSQL;
        setSaveToStoreTimeout(GUID: any, saveToStoreTimeout: any): Promise<void>;
        dropDatabase(GUID: any): Promise<any>;
        saveToStore(GUID?: any): Promise<void>;
        getInsertScript(tableName: string, fields: Array<string>): string;
        getUpdateScript(tableName: string, fields: Array<string>, primaryKey: string): string;
        getChangedScript(tableName: string): string;
        getFinishSyncScript(tableName: string): string;
        getTableInsertScript(tableName: string, fields: Array<fieldConfig>, tb: any): string[];
        getMoveDeletedScript(newTablename: string, oldTablename: string, keyFields: Array<string>): string;
        getMoveUpdatedScript(newTablename: string, oldTablename: string, keyFields: Array<string>, newFields: Array<fieldConfig>, oldFields: Array<fieldConfig>): string;
        getMoveInsertedScript(newTablename: string, oldTablename: string, keyFields: Array<string>, newFields: Array<fieldConfig>, oldFields: Array<fieldConfig>): string;
        getDropScript(tableName: string): string;
        getRenameScript(oldTablename: string, newTablename: string): string;
        getCreateScript(tableName: string, fields: Array<any>, primaryKey: Array<string>): string;
        formatSQLField(config: Array<fieldConfig>, field: string, value: any): any;
        parseSQLValue(value: any, type: string): any;
        private replaceAll;
        private getSQLType;
        private fieldContains;
        addWhere(sentence: string, filter: string, isOr?: boolean): string;
        private theresSubWhere;
        private getSubquery;
        _addWhere(sql: string, where: string, isOr: boolean): string;
        addPager(sentence: string, page: number, elements: number, pageModifier?: number): string;
        addOrderBy(sentence: string, orderby: string): string;
        selectTableInBlocks(sql: string, blockSize?: number): Promise<{
            rows: any[];
        }>;
    }
}