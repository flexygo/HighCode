Add-Type -AssemblyName "WindowsBase";

$preURIpath = "/predeploy.sql";
$postURIpath = "/postdeploy.sql";
$partType = "text/plain";

function Get-Script {

Param ([string] $file, [ref] $pre, [ref] $post)
        
    
    $scriptSeparator = "`r`nGO`r`n";

    $fs = $null;
    try {

        $fs = New-Object System.IO.FileStream($file,[System.IO.FileMode]"Open");
        $p = [System.IO.Packaging.Package]::Open($fs);
        
        $preURI = New-Object System.Uri($preURIpath, [System.UriKind]"Relative");

        if ($p.PartExists($preURI)) {

            $pp = $p.GetPart($preURI);

            $psr = $null;
            try {
                $psr = New-Object System.IO.StreamReader($pp.GetStream());
                $pre.Value += $psr.ReadToEnd() + $scriptSeparator;
            } catch {
                 throw $_.Exception.Message
            } finally {
                if ($null -ne $psr) {
                $psr.Close();
                $psr.Dispose()}
            }

        }

        $postURI = New-Object System.Uri($postURIpath, [System.UriKind]"Relative");

        if ($p.PartExists($postURI)) {

            $pp = $p.GetPart($postURI);

            $psr = $null;
            try {
                $psr = New-Object System.IO.StreamReader($pp.GetStream());
                $post.Value += $psr.ReadToEnd() + $scriptSeparator;
            } catch {
                 throw $_.Exception.Message
            } finally {
                if ($null -ne $psr) {
                $psr.Close();
                $psr.Dispose()}
            }

        }

       
    
    } catch {
        throw $_.Exception.Message
    } finally {
        if ($null -ne $fs) {
            $fs.Close();
            $fs.Dispose();
        }
    } 
}

   
$SolutionDir = $args[0];
$ProjectName = $args[1];
$OutputPath =  $args[2];
$TargetPath =  $args[3];
$PrimaryDacPac = $args[4];

$dacpacFile = $TargetPath.Replace(".dll",".dacpac");

$modelURIpath = "/model.xml";
$mergedURIpath = "/mergedscript.txt";
$modelContent = "";


if (-not (Test-Path $dacpacFile)) 
{
    throw [System.IO.FileNotFoundException] "$file not found."
}

#Read DACPAC model to get references

$fs = $null;
try {

    $fs = New-Object System.IO.FileStream($dacpacFile,[System.IO.FileMode]"Open");
    $p = [System.IO.Packaging.Package]::Open($fs);

    #Check if file has been merged and exit
    $mergedURI = New-Object System.Uri($mergedURIpath, [System.UriKind]"Relative");
    $merged = $p.PartExists($mergedURIpath);
    if ($merged -eq $TRUE) {
        exit 0
    }

    $modelURI = New-Object System.Uri($modelURIpath, [System.UriKind]"Relative");
    $zpp = $p.GetPart($modelURI);

    $psr = $null;
    try {
        $psr = New-Object System.IO.StreamReader($zpp.GetStream());
        $modelContent = $psr.ReadToEnd();
    } catch {
         throw $_.Exception.Message
    } finally {
        if ($null -ne $psr) {
        $psr.Close();
        $psr.Dispose()}
    }
    
} catch {
    throw $_.Exception.Message
} finally {
    if ($null -ne $fs) {
        $fs.Close();
        $fs.Dispose();
    }
} 


#Parse project to get DACPAC file references

$refProjects = New-Object System.Collections.ArrayList;

$xml = [xml]$modelContent;
$header = $xml.GetElementsByTagName("Header")[0];

foreach ($ref in $header.GetElementsByTagName("CustomData")) {
    if ($ref.hasAttribute("Category") -and $ref.HasAttribute("Type")) {
        if (($ref.GetAttribute("Category") -eq "Reference") -and ($ref.GetAttribute("Type") -eq "SqlSchema")) {
            foreach ($md in $ref.GetElementsByTagName("Metadata")) {
                if ($md.hasAttribute("Name") -and $md.hasAttribute("Value")) {
                    if ($md.GetAttribute("Name") -eq "FileName") {
                        $l = $refProjects.Add($md.GetAttribute("Value"));
                    }
                }

            }
        }
    }
}


$finalPreScript = "";
$finalPostScript = "";
#Get scripts from each reference

foreach ($refDacPac in $refProjects) { 
	if((!$PrimaryDacPac) -or  ($refDacPac -like "*"+$PrimaryDacPac+"*")){
		Get-Script $refDacPac ([ref]$finalPreScript) ([ref]$finalPostScript)
	}
}

#Add scripts from compiled project

Get-Script $dacpacFile  ([ref]$finalPreScript) ([ref]$finalPostScript)

#Rewrite DACPAC

$fs = $null;
try {

    $fs = New-Object System.IO.FileStream($dacpacFile,[System.IO.FileMode]"Open",[System.IO.FileAccess]"ReadWrite");
    $p = [System.IO.Packaging.Package]::Open($fs,[System.IO.FileMode]"Open",[System.IO.FileAccess]"ReadWrite");
    
    $preURI = New-Object System.Uri($preURIpath, [System.UriKind]"Relative");

    if ($p.PartExists($preURI)) {
        
        $p.DeletePart($preURI);

    }

    $postURI = New-Object System.Uri($postURIpath, [System.UriKind]"Relative");

    if ($p.PartExists($postURI)) {

        $p.DeletePart($postURI);
    }

    $mergeURI = New-Object System.Uri($mergedURIPath, [System.UriKind]"Relative");


    $prePart = $p.CreatePart($preURI, $partType,[System.IO.Packaging.CompressionOption]"Normal");
    
    $psr = $null;
    try {
        $psr = New-Object System.IO.StreamWriter($prePart.GetStream());
        $psr.Write($finalPreScript);
    } catch {
            throw $_.Exception.Message
    } finally {
        if ($null -ne $psr) {
        $psr.Close();
        $psr.Dispose()}
    }

    $postPart = $p.CreatePart($postURI, $partType,[System.IO.Packaging.CompressionOption]"Normal");

    $psr = $null;
    try {
        $psr = New-Object System.IO.StreamWriter($postPart.GetStream());
        $psr.Write($finalPostScript);
    } catch {
            throw $_.Exception.Message
    } finally {
        if ($null -ne $psr) {
        $psr.Close();
        $psr.Dispose()}
    }

    #Dummy file to mark that merged has been done
    $mergePart = $p.CreatePart($mergeURI, $partType,[System.IO.Packaging.CompressionOption]"Normal");

    $psr = $null;
    try {
        $psr = New-Object System.IO.StreamWriter($mergePart.GetStream());
        $txt = (Get-Date).ToString();
        $psr.Write($txt);
    } catch {
            throw $_.Exception.Message
    } finally {
        if ($null -ne $psr) {
        $psr.Close();
        $psr.Dispose()}
    }
    
    $p.Close();
    $p.Dispose();
    
} catch {
    throw $_.Exception.Message
} finally {
    if ($null -ne $fs) {
        $fs.Close();
        $fs.Dispose();
    }
} 

exit 0;
