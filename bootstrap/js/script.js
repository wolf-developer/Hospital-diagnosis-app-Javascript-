jQuery(document).ready(function(){
    var chash=window.location.hash;
    var ishaschange_click=0;
    if(chash!=="")
    {
        jQuery("div[data-role='page']").hide();
        jQuery("html, body").animate({scrollTop: 0 });
        jQuery(chash).fadeIn('fast');
    }
    
    jQuery("div[data-role='page'] a").click(function(){
        ishaschange_click=1;
        if(jQuery(jQuery(this).attr('href')).length===1)
        {
            jQuery(this).parents("div[data-role='page']").hide();
            jQuery("html, body").animate({scrollTop: 0 });
            jQuery(jQuery(this).attr('href')).fadeIn('fast');
        }
    });
    
    /*custom multiselect control*/    
    jQuery('body').on('keyup','.search-field',function(){
	var target=jQuery(this).parents().next('.search-control');
	var $rows = jQuery(target).find('li');
	var val = jQuery.trim(jQuery(this).val()).replace(/ +/g, ' ').toLowerCase();
	$rows.show().filter(function() {
	    var text = jQuery(this).text().replace(/\s+/g, ' ').toLowerCase();
	    return !~text.indexOf(val);
	}).hide();
    });
    /*custom multiselect control*/
    
    jQuery(window).bind('hashchange', function(event) {
        if(ishaschange_click===0)
        {
            var id=window.location.hash;
            if(id==="") id="#home";
            jQuery("div[data-role='page']").hide();
            jQuery("html, body").animate({scrollTop: 0 });
            jQuery(id).fadeIn('fast');
        }
        ishaschange_click=0;
    });
});