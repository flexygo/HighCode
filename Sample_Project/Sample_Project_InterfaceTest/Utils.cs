using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceTest_Flexygo
{
    public class Util
    {


        async public static Task<IBrowserContext> GetBrowserAsync(string name = "chrome")
        {
            var playwright = await Playwright.CreateAsync();

            IBrowser browser;
            var options = new BrowserTypeLaunchOptions { Headless = false };


            switch (name)
            {
                case "firefox":
                    browser = await playwright.Firefox.LaunchAsync(options);
                    break;
                case "webkit":
                    browser = await playwright.Webkit.LaunchAsync(options);
                    break;
                case "edge":
                    options.Channel = "msedge";
                    browser = await playwright.Chromium.LaunchAsync(options);
                    break;
                default:
                    options.Channel = "chrome";
                    browser = await playwright.Chromium.LaunchAsync(options);
                    break;
            }

            var context = await browser.NewContextAsync();

            return context;
        }
        async public static Task StartTracing(IBrowserContext context)
        {
            await context.Tracing.StartAsync(new()
            {
                Screenshots = true,
                Snapshots = true,
                Sources = true
            });
        }

        async public static Task GoToLogin(IPage page, string URL, string username, string password)
        {

            await page.GotoAsync(URL + "/Account/Login");
            // Click #UserName
            await page.Locator("#UserName").ClickAsync();
            // Fill #UserName
            await page.Locator("#UserName").FillAsync(username);
            // Click #Password
            await page.Locator("#Password").ClickAsync();
            // Fill #Password
            await page.Locator("#Password").FillAsync(password);
            // Click #MainButton
            await page.Locator("#MainButton").ClickAsync();
            await page.WaitForURLAsync(URL + "/Index");
        }

        async public static Task SetDeveloperMode(IPage page)
        {
            //(IJavaScriptExecutor)driver.ExecuteScript("flexygo.utils.animationTime=0;");
            //(IJavaScriptExecutor)driver.ExecuteScript("flexygo.utils.testMode=true;");
            await page.WaitForSelectorAsync("#mainMenu");
            // Click on tools
            await page.Locator("#mainMenu li[title='Tools'], #mainMenu li[title='Herramientas']").ClickAsync();
            // Set Developer mode
            await page.Locator("#mainMenu li[title='Develop Mode'], #mainMenu li[title='Modo Desarrollo']").ClickAsync();

        }

        public static void GetJavascriptErrors(IPage page, IBrowserContext context, List<string> jsErrors)
        {

            page.Console += (_, msg) =>
            {
                if ("error".Equals(msg.Type))
                {
                    jsErrors.Add(msg.Location + ": " + msg.Text);
                }

            };
        }


        public class notify
        {
            public string ?title=default;
            public string? message=default;
        }
        public static async Task<notify> GetNotifyContentAsync(IPage page)
        {

            string? title = default;
            string? message = default;
            IElementHandle? notify = await page.WaitForSelectorAsync(".lobibox-notify-wrapper.bottom.right .lobibox-notify");

            if (notify == null)
            {

                return null;
            }
            else
            {

                title = await notify.QuerySelectorAsync(".lobibox-notify-title").Result.TextContentAsync();
                message = await notify.QuerySelectorAsync(".lobibox-notify-msg").Result.TextContentAsync();
            }

            return (new notify { title = title, message = message });
        }

    }
}
