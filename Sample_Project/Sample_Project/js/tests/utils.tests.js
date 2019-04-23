describe("TestJavascript", function () {
    it("Compiler", function () {

        var json = {
            "test": "ok"
        };

        var template = "<span>{{test}}</span>";
        
        var result = flexygo.utils.parser.compile(json, template);

        expect(result).toBe("<span>ok</span>");


    });


    it("Storage", function () {

        var key = 'test';
        var value = 'value';

        localStorage.setItem(key, value);

        var result = localStorage.getItem(key);

        expect(result).toBe(value);
    });


    
});