<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Index.aspx.vb" Inherits="FLEXYGO.Index" %>
<%@ Import Namespace="FLEXYGO.Authentication.Identity.IdentityExtensions" %>
<!DOCTYPE html>
<html  lang="<%= Context.User.Identity.GetCultureId()%>">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title><%= Me.getProjectName()%> by Flexygo</title>
    <link rel="manifest" href="./manifest.json">
     <!-- FAVICON -->
    <%= Me.getFavIcon()%>

    <!-- CSS -->
    <%= Me.getCssScripts()%>
    <%= System.Web.Optimization.Styles.Render("~/bnd-" & FLEXYGO.Web.GlobalVars.VersionStr & "/plugins/css").ToHtmlString()%>
    <%= System.Web.Optimization.Styles.Render("~/bnd-" & FLEXYGO.Web.GlobalVars.VersionStr & "/css").ToHtmlString()%>
    <!--Skin CSS-->
    <%= Me.getSkinCss()%>
    <!--Interface CSS-->
    <%= Me.getInterfaceCss()%>
    <!-- /CSS -->

    <script type="text/javascript" src="./js/flexygo/dynamic/context.ashx"></script>
    <!-- JS -->
     <%= Me.getJsScripts()%>
    <!--TODO_AL: temporal (Eliminar)-->
    <!-- Pruebas AL -->
    <!--<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="andt6p5bshv729h"></script>
    <script type="text/javascript" src="https://apis.google.com/js/api.js"></script>-->
    <!-- SIGNAL R -->
    <script src="./js/plugins/signalr/jquery.signalR-2.2.0.min.js"></script>
    <script src="signalr/hubs"></script>
    <!-- SIGNAL R -->

    <%= System.Web.Optimization.Scripts.Render("~/bnd-" & FLEXYGO.Web.GlobalVars.VersionStr & "/plugins/js").ToHtmlString()%>
  
    <%= System.Web.Optimization.Scripts.Render("~/bnd-" & FLEXYGO.Web.GlobalVars.VersionStr & "/js").ToHtmlString()%>
     <!--Skin JS-->
    <%= Me.getSkinScripts()%>
    <!--Interface JS-->
    <%= Me.getInterfaceScripts()%>

    <%= Me.getInitScripts()%>
    <!-- /JS -->
   
    <script id="dynamicHead"></script>
</head>
<body style="display: none;" mode="<%=getUserMode()%>">
    <header>
         <%=getMainMenu()%>
    </header>
    <div id="mainBlock" >
         <%=getMainNavPanel()%>
        <div id="mainContent" >            
            <main id="realMain" class="realMain pageContainer">
            </main>
            <!--Added in runtime after WebComponents are ready
            
            <flx-footermenu id="mainFooterMenu">                
            </flx-footermenu>
            <flx-sidepanel id="mainSidePanel"></flx-sidepanel>
            
            -->
            <footer></footer>
        </div>
    </div>

    <script>
        configureFirebase()
    </script>
</body>
     <%= Me.getMissingFiles()%>
     <%= Me.getDatabaseScriptJobErrors()%>
</html>
