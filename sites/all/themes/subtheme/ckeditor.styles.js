/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/*
 * This file is used/requested by the 'Styles' button.
 * The 'Styles' button is not enabled by default in DrupalFull and DrupalFiltered toolbars.
 */
if(typeof(CKEDITOR) !== 'undefined') {
    CKEDITOR.addStylesSet( 'drupal',
    [
            /* Block Styles */

            // These styles are already available in the "Format" drop-down list, so they are
            // not needed here by default. You may enable them to avoid placing the
            // "Format" drop-down list in the toolbar, maintaining the same features.
            /*
            { name : 'Paragraph'		, element : 'p' },
            { name : 'Heading 1'		, element : 'h1' },
            { name : 'Heading 2'		, element : 'h2' },
            { name : 'Heading 3'		, element : 'h3' },
            { name : 'Heading 4'		, element : 'h4' },
            { name : 'Heading 5'		, element : 'h5' },
            { name : 'Heading 6'		, element : 'h6' },
            { name : 'Preformatted Text', element : 'pre' },
            { name : 'Address'			, element : 'address' },
           

            { name : 'Blue Title'		, element : 'h3', styles : { 'color' : 'Blue' } },*/
            { name : 'Blau'				, element : 'span', styles : { 'color' : '#004f9e' } }, 
			
            { name : 'Mehr Button'		, element : 'div', attributes : { 'class' : 'more' } 		}, 
            { name : 'Grey Square'		, element : 'p', attributes : { 'class' : 'greysquare' } }, 
            { name : 'Red Square'		, element : 'h3', attributes : { 'class' : 'redsquare' } }, 


            { name : 'Download'		, element : 'div', attributes : 	{ 'class' : 'fileicon download' } },
            { name : 'Flyer'			, element : 'div', attributes : 	{ 'class' : 'fileicon flyer' } },
            { name : 'Video'			, element : 'div', attributes : 	{ 'class' : 'fileicon video' } },
            { name : 'White Paper'	, element : 'div', attributes : 	{ 'class' : 'fileicon whitepaper' } },
            { name : 'Download'		, element : 'div', attributes : 	{ 'class' : 'fileicon download' } },
			
            { name : 'Logos'			, element : 'div', attributes : 	{ 'class' : 'partnerlogos' } },

            { name : 'Contact Info' , element : 'ul', attributes : 	{ 'class' : 'contactinfo' } }, 





            /* Inline Styles */

            // These are core styles available as toolbar buttons. You may opt enabling
            // some of them in the "Styles" drop-down list, removing them from the toolbar.
            /*
            { name : 'Strong'			, element : 'strong', overrides : 'b' },
            { name : 'Emphasis'			, element : 'em'	, overrides : 'i' },
            { name : 'Underline'		, element : 'u' },
            { name : 'Strikethrough'	, element : 'strike' },
            { name : 'Subscript'		, element : 'sub' },
            { name : 'Superscript'		, element : 'sup' },
            

            { name : 'Marker: Yellow'	, element : 'span', styles : { 'background-color' : 'Yellow' } },
            { name : 'Marker: Green'	, element : 'span', styles : { 'background-color' : 'Lime' } },

            { name : 'Big'				, element : 'big' },
            { name : 'Small'			, element : 'small' },
            { name : 'Typewriter'		, element : 'tt' },

            { name : 'Computer Code'	, element : 'code' },
            { name : 'Keyboard Phrase'	, element : 'kbd' },
            { name : 'Sample Text'		, element : 'samp' },
            { name : 'Variable'			, element : 'var' },

            { name : 'Deleted Text'		, element : 'del' },
            { name : 'Inserted Text'	, element : 'ins' },

            { name : 'Cited Work'		, element : 'cite' },
            { name : 'Inline Quotation'	, element : 'q' },

            { name : 'Language: RTL'	, element : 'span', attributes : { 'dir' : 'rtl' } },
            { name : 'Language: LTR'	, element : 'span', attributes : { 'dir' : 'ltr' } },
*/
            /* Object Styles */
            {
                    name : 'Image on Left',
                    element : 'img',
                    attributes :
                    {
                            'style' : 'float: left; margin-right: 15px; height:auto; width:347px;',
                    }
            },

            {
                    name : 'Image on Right',
                    element : 'img',
                    attributes :
                    {
                            'style' : 'float: right; margin-left: 15px; height:auto; width:347px;',
                    }
            },
            {
                    name : 'Fotorahmen',
                    element : 'img',
                    attributes :
                    {
                            'class' : 'fotorahmen',
                    }
            }
    ]);
}