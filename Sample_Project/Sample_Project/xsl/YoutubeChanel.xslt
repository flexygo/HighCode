<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:media="http://search.yahoo.com/mrss/" xmlns:n1="http://www.w3.org/2005/Atom" >
  <xsl:template match="/">
    <div class="container">
      <!--<h1><xsl:value-of select="n1:feed/n1:title"/> </h1>-->
              <xsl:for-each select="n1:feed/n1:entry">
                  
                  <div class="col-3 col-m-4 col-s-6 video">
                    <figure>
                    <xsl:element name="a">
                      <xsl:attribute name="class">
                        <xsl:value-of select="'fancybox-media'"/>
                      </xsl:attribute>
                      <xsl:attribute name="rel">
                        video
                      </xsl:attribute>
                      <xsl:attribute name="href">
                        <xsl:value-of select="./n1:link/@href" />
                      </xsl:attribute>
                      
                        <xsl:element name="img">
                          <xsl:attribute name="class">
                            <xsl:value-of select="'videoThumb'"/>
                          </xsl:attribute>
                          <xsl:attribute name="src">
                            <xsl:value-of select="./media:group/media:thumbnail/@url"/>
                          </xsl:attribute>
                        </xsl:element>
                        <div class="videoTitle" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                          <xsl:value-of select="./n1:title"/>
                        </div>
                    </xsl:element>
                    </figure>
                  </div>
                  
          </xsl:for-each>
    </div>
    <script >
      function initVideos(){$('.fancybox-media').fancybox({helpers : {media : {},thumbs : {width: 50,height: 50}},autoSize  : true,closeClick  : true, openEffect  : 'elastic', closeEffect : 'elastic'}); }
    </script>
    <style>
      .video {background: #fff;padding:0px;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);margin: 2%;}
      .videoTitle{font-size:14px;font-weight:bold;text-align:center;line-height:40px;}
      .video img {width: 100%;opacity: 1;}
      .video img:hover, .video img:active, .video img:focus {opacity: 0.75;}
    </style>
  </xsl:template>
</xsl:stylesheet>


