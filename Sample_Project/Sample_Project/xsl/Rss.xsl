<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
     xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
     exclude-result-prefixes="xsl">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>

<xsl:template match="/">
     <div class="row">
     <xsl:apply-templates select="rss/channel"/>
     </div>
</xsl:template>

<xsl:template match="rss/channel">
     <xsl:variable name="link" select="link"/>
     <xsl:variable name="description" select="description"/>
     <xsl:variable name="image" select="image/url"/>
     <xsl:if test="$image">
             <img src="{$image}" style="float: right; margin: 2px;" />
     </xsl:if>
     <h2 class="page-header">
        <a href="{$link}" title="{$description}"><xsl:value-of select="title" /></a>
     </h2>
  <div class="row">
    <div class="col-md-12 col-sm-12">
     <ul class="icon-ul"><xsl:apply-templates select="item"/></ul>
   </div>
  </div>
</xsl:template>

<xsl:template match="item">
     <xsl:variable name="item_link" select="link"/>
     <xsl:variable name="item_title" select="description"/>
     <li ><a href="{$item_link}" target="_blank"><i class="flx-icon icon-li icon-rss"></i> <xsl:value-of select="title"/></a>
       <span class="small"><xsl:value-of select="pubDate" />
       </span>
     </li>
</xsl:template>

</xsl:stylesheet>