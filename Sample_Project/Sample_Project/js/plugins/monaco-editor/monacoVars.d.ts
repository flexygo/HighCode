/**
 * @namespace monacoVars
 */
declare namespace monacoVars {
    const keywords: {
        sql: string[];
        operators: string[];
        builtinFunctions: string[];
        builtinVariables: string[];
    };
    const regex: {
        explicitConnSchemaRegex: RegExp;
        explicitConnRegex: RegExp;
        selectColumnSuggestion: RegExp;
        updateColumnSuggestion: RegExp;
        whereinSelectColumnSuggestion: RegExp;
        whereinUpdateColumnSuggestion: RegExp;
        whereinDeleteColumnSuggestion: RegExp;
        joinOnColumnSuggestion: RegExp;
        groupAndOrderColumnSuggestion: RegExp;
        BeginAggregationColumnSuggestion: RegExp;
        EndAggregationColumnSuggestion: RegExp;
        tableSuggestionRegex: RegExp;
    };
    const regexCorrection: {
        tableSuggestionRegex: RegExp;
        explicitConnSchemaRegex: RegExp;
        explicitConnRegex: RegExp;
        selectColumnSuggestion: RegExp;
        BeginAggregationColumnSuggestion: RegExp;
        updateColumnSuggestion: RegExp;
        whereinUpdateColumnSuggestion: RegExp;
        whereinSelectColumnSuggestion: RegExp;
        joinOnColumnSuggestion: RegExp;
        whereinDeleteColumnSuggestion: RegExp;
        groupAndOrderColumnSuggestion: RegExp;
        EndAggregationColumnSuggestion: RegExp;
    };
}
