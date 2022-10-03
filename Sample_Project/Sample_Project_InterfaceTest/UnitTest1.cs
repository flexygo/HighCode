namespace Sample_Project_InterfaceTest
{
    [TestClass]
    public class UnitTest1
    {
        IConfiguration config;

        public UnitTest1()
        {
            string path = "..\\..\\..\\";
            string fullPath = System.IO.Path.GetFullPath(path, System.IO.Directory.GetCurrentDirectory());
            config = new ConfigurationBuilder().SetBasePath(fullPath).AddJsonFile("appsettings.json", true, true).AddJsonFile("appsettings.local.json", true, true).Build();


            var exitCode = Microsoft.Playwright.Program.Main(new[] { "install" });
            if (exitCode != 0)
            {
                throw new Exception($"Playwright exited with code {exitCode}");
            }
        }


        [TestMethod]
        public async Task SaveObject()
        {
            try
            {

                var context = await Util.GetBrowserAsync(config["browser"].ToString());
                await Util.StartTracing(context);

                List<string> jsErrors = new List<string>();

                try
                {

                    // Open new page
                    var Page = await context.NewPageAsync();
                    Util.GetJavascriptErrors(Page, context, jsErrors);

                    //Go to login
                    await Util.GoToLogin(Page, config["url"].ToString(), config["user"].ToString(), config["pass"].ToString());

                    //Set developer mode
                    await Util.SetDeveloperMode(Page);

                    //Code your test here or record it using command
                    // ./bin/Debug/net6.0/playwright.ps1 codegen http://localhost/Sample_Project
                    //If Fail Set-ExecutionPolicy Unrestricted

                    //INIT CODE RECORD
                    // Click span:has-text("LowCode") >> nth=0
                    await Page.Locator("span:has-text(\"LowCode\")").First.ClickAsync();
                    // Click span:has-text("Examples") >> nth=0
                    await Page.Locator("span:has-text(\"Examples\")").First.ClickAsync();
                    // Click span:has-text("Nuevo") >> nth=0
                    await Page.Locator("span:has-text(\"Nuevo\")").First.ClickAsync();
                    // Click li:nth-child(6) > ul > li:nth-child(2) > ul > li > ul > li:nth-child(3) > span >> nth=0
                    await Page.Locator("li:nth-child(6) > ul > li:nth-child(2) > ul > li > ul > li:nth-child(3) > span").First.ClickAsync();
                    await Page.WaitForURLAsync("http://localhost/Sample_Project/Index#eyJ0YXJnZXRpZCI6ImN1cnJlbnQiLCJuYXZpZ2F0ZUZ1biI6Im9wZW5wYWdlIiwib2JqZWN0bmFtZSI6IkNvbnRhY3RvIiwib2JqZWN0d2hlcmUiOiIiLCJkZWZhdWx0cyI6Im51bGwiLCJwYWdldHlwZWlkIjoiZWRpdCIsImZpbHRlcnNWYWx1ZXMiOm51bGwsInByZXNldHNWYWx1ZXMiOm51bGwsInBhZ2VuYW1lIjoic3lzcGFnZS1lZGl0LWRlZmF1bHQifQ==");
                    // Click input[name="Name"]
                    await Page.Locator("input[name=\"Name\"]").ClickAsync();
                    // Fill input[name="Name"]
                    await Page.Locator("input[name=\"Name\"]").FillAsync("asd");
                    // Click text=Client: FlexyGO (1) Imagination (2) Ahora Freeware (4) LETRA PEQUEÑA SL (5) RESO >> button >> nth=0
                    await Page.Locator("text=Client: FlexyGO (1) Imagination (2) Ahora Freeware (4) LETRA PEQUEÑA SL (5) RESO >> button").First.ClickAsync();
                    // Click li:has-text("FlexyGO (1)")
                    await Page.Locator("li:has-text(\"FlexyGO (1)\")").ClickAsync();

                    // Click button:nth-child(2) >> nth=0
                    await Page.Locator("button:nth-child(2)").First.ClickAsync();
                    //END CODE RECORD


                    //CHECK Notify message
                    Util.notify notify = await Util.GetNotifyContentAsync(Page);
                    if(notify == null)
                    {
                        throw new Exception("Error saving object");
                    }
                    else
                    {
                        if (notify.title.ToString().ToLower() != "success")
                        {
                            throw new Exception("Error saving object",new Exception(notify.title,new Exception(notify.message)));
                        }
                    }

                    //Check if ID Field has value
                    string value = await Page.Locator("input[name=\"IdContact\"]").First.InputValueAsync();

                    if (string.IsNullOrEmpty(value))
                    {
                        throw new Exception("Error saving contact");
                    }
                    


                }
                catch
                {
                    throw;
                }
                finally
                {
                    //For opening the trace file use this command.
                    // ./bin/Debug/net6.0/playwright.ps1 show-trace ./Sample_Project_InterfaceTest/bin/Debug/net6.0/tracing/SaveObject.zip
                    await context.Tracing.StopAsync(new()
                    {
                        Path = "./tracing/SaveObject.zip"
                    });
                }

                if (jsErrors.Count > 0)
                {

                    throw new Exception(String.Join(".\n", jsErrors.ToArray()));
                }

            }
            catch
            {
                throw;
            }
        }
    }
}