declare namespace flexygo {
    class api {
        maxAttempts: number;
        login(url: string, username: string, password: string, GUID: string): Promise<any>;
        b64EncodeUnicode(str: any): string;
        connect(): Promise<any>;
        getAuth(): Promise<authToken>;
        saveAuth(auth: authToken, GUID?: string): Promise<any>;
        disconnect(): Promise<authToken>;
        refreshToken(auth: authToken): Promise<authToken>;
        getToken(auth: authToken): Promise<authToken>;
        updateAuthToken(auth: authToken, apiReturn: any): Promise<authToken>;
        isExpired(auth: authToken): boolean;
        getCollection(objectName: string, filter?: string, page?: number, pageSize?: number, orderBy?: string, isDefined?: boolean): any;
        getObjectById(_objectName: string, _id: string): void;
        getObjectByFilter(_objectName: string, _filter: string): void;
        getView(objectName: string, viewName: string, filter: string, page: number, pageSize: number, orderBy?: string, attempts?: number): any;
        getViewSchema(objectName: string, viewName: string, timeout?: number): Promise<any>;
        getObjectSchema(objectName: string, timeout?: number): Promise<any>;
        getContext(): Promise<any>;
        insertObject(): void;
        updateObject(): void;
        deleteObject(): void;
        execProcess(processName: string, params: any, objectName?: string, filter?: string, timeout?: number): Promise<any>;
        getWebApiInfo(url: string, firstTry?: boolean): any;
        post(url: any, body: string, headers: any, timeout?: number): Promise<any>;
        get(url: string, body: object, headers: any, timeout?: number): Promise<any>;
        errPost(response: any): Promise<void>;
    }
}
