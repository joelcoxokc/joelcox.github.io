Number.isInteger||(Number.isInteger=function(a){return"number"===typeof a&&isFinite(a)&&-9007199254740992<a&&9007199254740992>a&&Math.floor(a)===a});Object.size=function(a){var c=0,e;for(e in a)a.hasOwnProperty(e)&&c++;return c};
(function(a){Messenger.options={theme:"block",messageDefaults:{hideAfter:6,showCloseButton:!0}};var c={stickers:{visit_interval:30,time_interval:604800,impression_limit:-1,content:a("#promo .swag-promo").html(),messengerOptions:{extraClasses:"messenger-on-bottom",postOptions:{}},conditions:function(a){return!0}}};if(0<a("body.app").length&&Modernizr.localstorage){var e=a.extend(!0,{last_visit:Date.now(),visit_number:0,messages:{}},JSON.parse(localStorage.getItem("messageStats"))),f={};a.each(c,function(c,
b){var d;if(d=e.last_visit<Date.now()-1E3*b.time_interval||Number.isInteger(e.visit_number/b.visit_interval))d=b.impression_limit,d=-1==d?!0:!(e.messages[c]&&e.messages[c].impression_count>=d),d=d&&b.conditions(e);d&&(1<=Object.size(f)||(f[c]=b,e.messages[c]?(a.extend(!0,e.messages[c],{last_seen:Date.now(),visit_number:e.visit_number}),e.messages[c].impression_count++):e.messages[c]={last_seen:Date.now(),visit_number:e.visit_number,impression_count:1}))});e.messages&&a.each(e.messages,function(a){c[a]||
delete e.messages[a]});e.last_visit=Date.now();e.visit_number++;localStorage.setItem("messageStats",JSON.stringify(e));a.each(f,function(c,b){var d=a.extend(!0,{message:b.content},b.messengerOptions.postOptions);Messenger({extraClasses:b.messengerOptions.extraClasses}).post(d)})}})(jQuery);var SassMeister;
(function(a){function c(a){for(var b=window.location.hash.substring(1).split(","),c=0;c<b.length;c++){var d=b[c].split("=");if(d[0]==a)return d[1]}return!1}var e={sass:{input:"",compiler:"lib",syntax:"SCSS",original_syntax:"SCSS",output_style:"expanded",dependencies:{}},html:{input:"",syntax:"HTML"}},f={css:"",html:""},g={theme:"tomorrow",emmet:!1,vim:!1,scrollPastEnd:!1};window.SassMeister={timer:null,bypassConversion:!1,editors:{},layout:{orientation:"horizontal",html:"hide",css:"show"},ajaxCalls:{getExtensions:!1,
postCompileSass:!1,postConvertSass:!1,postCompileHtml:!1,postGistCreate:!1,postGistEdit:!1,postGistFork:!1},init:function(){var b;$this=this;this.inputs=e;this.outputs=f;this.preferences=g;(b=100*c("font-size"))&&a("head").append("<style>body { font-size: "+b+"%; }</style>");this.getStorage();this.editors.sass=this.initEditor(this.inputs.sass.input,"sass",this.inputs.sass.syntax);a(this.editors.sass.getSession()).bindWithDelay("change",function(a){!0==$this.bypassConversion?$this.bypassConversion=
!1:($this.inputs.sass.input=$this.editors.sass.getValue(),$this.compile.sass())},750);this.editors.html=this.initEditor(this.inputs.html.input,"html",this.inputs.html.syntax);a(this.editors.html.getSession()).bindWithDelay("change",function(a){$this.inputs.html.input=$this.editors.html.getValue();$this.compile.html()},750);this.editors.css=this.initEditor(this.outputs.css,"css","css");this.editors.css.setReadOnly(!0);this.editors.css.getValue()||$this.compile.sass();this.outputs.html?this.updateRender(this.outputs):
this.inputs.html.input&&$this.compile.html();this.initPanels();this.arrangePanels(this.layout.orientation);a(window).on("resize",function(a){SassMeister.arrangePanels(SassMeister.layout.orientation)});SassMeister.inputs.gist_id&&h();return this},initControls:function(){a("#syntax").text(this.inputs.sass.syntax).data("original",this.inputs.sass.syntax);a("#output").text(this.inputs.sass.output_style);a("#html-syntax").text(this.inputs.html.syntax)},initPanels:function(){window.gist&&(Modernizr.localstorage&&
localStorage.removeItem("casementSettings"),this.layout.html=this.inputs.html.input?"show":"hide");"hide"==this.layout.html&&(a('#rendered, [data-name="html"]').hide(),a("#toggle_html").data("state","show").removeClass("show"));"hide"==this.layout.css&&(a('[data-name="css"]').hide(),a("#toggle_css").data("state","show").removeClass("show"))},initEditor:function(a,b,l){b=ace.edit(b);var d=c("theme");b.setTheme(d?d:this.preferences.theme);this.preferences.vim?b.setKeyboardHandler("ace/keyboard/vim"):
b.setKeyboardHandler(null);b.setOption("enableEmmet",this.preferences.emmet);b.setOption("scrollPastEnd",this.preferences.scrollPastEnd);b.getSession().setMode("ace/mode/"+l.toLowerCase());b.getSession().setTabSize(2);b.getSession().setUseSoftTabs(!0);b.setValue(a);b.clearSelection();return b},updateRender:function(a){return b(a)},compile:{sass:function(){SassMeister.inputs.sass.input.trim()&&(_gaq.push(["_trackEvent","Form","Submit"]),a("#sass-compiling").removeClass("hide"),a("#compile-time").text("").removeClass("fade"),
SassMeister.ajaxCalls.postCompileSass&&SassMeister.ajaxCalls.postCompileSass.abort(),SassMeister.ajaxCalls.postCompileSass=a.post("/app/"+SassMeister.inputs.sass.compiler+"/compile",SassMeister.inputs.sass).done(function(c){SassMeister.editors.css.setValue(c.css,-1);SassMeister.outputs.css=c.css;SassMeister.inputs.sass.dependencies=c.dependencies;b({css:c.css});SassMeister.setStorage();a("#sass-compiling").addClass("hide");a("#compile-time").text("Compiled in "+c.time+"s").addClass("fade")}).always(function(){SassMeister.ajaxCalls.postCompileSass=
!1}))},html:function(){if(SassMeister.inputs.html.input.trim()){_gaq.push(["_trackEvent","Form","Submit"]);if("HTML"==SassMeister.inputs.html.syntax)b({css:SassMeister.outputs.css,html:SassMeister.inputs.html.input}),SassMeister.outputs.html=SassMeister.inputs.html.input;else if("Jade"==SassMeister.inputs.html.syntax){var c=function(a){data=window.jade.render(SassMeister.inputs.html.input,{pretty:!0});b({css:SassMeister.outputs.css,html:data});return data};window.jade?SassMeister.outputs.html=c(SassMeister.inputs.html.input):
a.ajax({url:"/js/jade.js",dataType:"script",cache:!0}).done(function(){SassMeister.outputs.html=c(SassMeister.inputs.html.input)})}else SassMeister.ajaxCalls.postCompileHtml&&SassMeister.ajaxCalls.postCompileHtml.abort(),SassMeister.ajaxCalls.postCompileHtml=a.post(window.sandbox,SassMeister.inputs.html).done(function(a){b({css:SassMeister.outputs.css,html:a});SassMeister.outputs.html=a}).always(function(){SassMeister.ajaxCalls.postCompileHtml=!1});SassMeister.setStorage()}}},convert:{sass:function(){SassMeister.ajaxCalls.postConvertSass&&
SassMeister.ajaxCalls.postConvertSass.abort();SassMeister.ajaxCalls.postConvertSass=a.post("/app/"+SassMeister.inputs.sass.compiler+"/convert",SassMeister.inputs.sass).done(function(b){SassMeister.bypassConversion=!0;SassMeister.editors.sass.setValue(b.css,-1);SassMeister.inputs.sass.input=b.css;SassMeister.inputs.sass.original_syntax=SassMeister.inputs.sass.syntax;SassMeister.inputs.sass.dependencies=b.dependencies;a("#syntax").data("original",SassMeister.inputs.sass.syntax);SassMeister.setStorage()}).always(function(){SassMeister.ajaxCalls.postConvertSass=
!1})}},gist:{create:function(){_gaq.push(["_trackEvent","Gist","Create"]);var b={inputs:SassMeister.inputs,outputs:SassMeister.outputs};SassMeister.ajaxCalls.postGistCreate&&SassMeister.ajaxCalls.postGistCreate.abort();SassMeister.ajaxCalls.postGistCreate=a.post("/gist/create",b).done(function(b){k('<a href="https://gist.github.com/'+b.id+'" target="_blank">Your Gist</a> is ready.');d("/gist/"+b.id);SassMeister.inputs.gist_id=b.id;SassMeister.inputs.sass_filename=b.sass_filename;SassMeister.inputs.html_filename=
b.html_filename;a("#save-gist").data("action","edit").html("<span>Update Gist</span>");1>a("#fork-gist").length&&a("#save-gist").parent("li").after('<li><a id="fork-gist" class="fork-gist" data-action="create"><span>Fork Gist</span></a></li>');1>a("#gist-link").length&&a("#cloud_actions li:first-child").after('<li><a href="https://gist.github.com/'+b.id+'" target="_blank" class="jump-icon" id="gist-link"><span>View on GitHub</span></a></li>');h();a("#share_actions").removeClass("hide")}).always(function(){SassMeister.ajaxCalls.postGistCreate=
!1})},edit:function(){_gaq.push(["_trackEvent","Gist","Edit"]);var b={inputs:SassMeister.inputs,outputs:SassMeister.outputs};SassMeister.ajaxCalls.postGistEdit&&SassMeister.ajaxCalls.postGistEdit.abort();SassMeister.ajaxCalls.postGistEdit=a.post("/gist/"+SassMeister.inputs.gist_id+"/edit",b).done(function(b){k('<a href="https://gist.github.com/'+b.id+'" target="_blank">Your Gist</a> has been updated.');a("#gist-link").attr("href","https://gist.github.com/"+b.id);d("/gist/"+b.id)}).always(function(){SassMeister.ajaxCalls.postGistEdit=
!1})},fork:function(){_gaq.push(["_trackEvent","Gist","Fork"]);SassMeister.ajaxCalls.postGistFork&&SassMeister.ajaxCalls.postGistFork.abort();SassMeister.ajaxCalls.postGistFork=a.post("/gist/"+SassMeister.inputs.gist_id+"/fork").done(function(b){k('<a href="https://gist.github.com/'+b.id+'" target="_blank">This Gist</a> has been forked.');a("#gist-link").attr("href","https://gist.github.com/"+b.id);d("/gist/"+b.id);SassMeister.inputs.gist_id=b.id;h();a("#save-gist").data("action","edit").attr("class",
"edit-gist").html("<span>Update Gist</span>")}).always(function(){SassMeister.ajaxCalls.postGistFork=!1})}},arrangePanels:function(b){"desktop"==window.viewportSize&&a.fn.casement?(a(".panel, .current").removeClass("hide-panel").removeClass("show-panel").removeClass("current"),a(document.body).removeClass("single-column"),"hide"==this.layout.html&&(a('#rendered, [data-name="html"]').hide(),a("#toggle_html").data("state","show").addClass("show")),"hide"==this.layout.css&&a("#toggle_css").data("state",
"show").addClass("show"),a("#source").casement({split:"horizontal"==b?"vertical":"horizontal",onDrag:function(){SassMeister.resizeEditors()}}),a("#casement").casement({split:b,onDragStart:function(){a("#sash_cover").show()},onDrag:function(){SassMeister.resizeEditors()},onDragEnd:function(){a("#sash_cover").hide()}})):(0<a("#source .sash").length&&(a("#source").casement("destroy"),a("#casement").casement("destroy")),1>a(".hide-panel").length&&(a(".panel").removeClass("show-panel").addClass("hide-panel"),
a('[data-name="sass"]').removeClass("hide-panel").addClass("show-panel"),a("#mobile-tabs .current").removeClass("current"),a('[data-tab="sass"]').addClass("current"),a(document.body).addClass("single-column")));SassMeister.resizeEditors()},resizeEditors:function(){a.each(this.editors,function(a,b){b.resize()})},setTheme:function(a){this.preferences.theme=a;this.editors.sass.setTheme(a);this.editors.css.setTheme(a);this.editors.html.setTheme(a);this.setStorage()},setEditorPreferences:function(b,c){var d=
this;d.preferences[b]=c;console.log(b,c);d.preferences.vim?(d.editors.sass.setKeyboardHandler("ace/keyboard/vim"),d.editors.css.setKeyboardHandler("ace/keyboard/vim"),d.editors.html.setKeyboardHandler("ace/keyboard/vim")):(d.editors.sass.setKeyboardHandler(null),d.editors.css.setKeyboardHandler(null),d.editors.html.setKeyboardHandler(null));d.preferences.emmet&&!window.emmet?a.ajax({url:"http://nightwing.github.io/emmet-core/emmet.js",dataType:"script",cache:!0}).done(function(){d.editors.sass.setOption("enableEmmet",
!0);d.editors.css.setOption("enableEmmet",!0);d.editors.html.setOption("enableEmmet",!0)}):(d.editors.sass.setOption("enableEmmet",d.preferences.emmet),d.editors.css.setOption("enableEmmet",d.preferences.emmet),d.editors.html.setOption("enableEmmet",d.preferences.emmet));d.preferences.scrollPastEnd?(d.editors.sass.setOption("scrollPastEnd",!0),d.editors.css.setOption("scrollPastEnd",!0),d.editors.html.setOption("scrollPastEnd",!0)):(d.editors.sass.setOption("scrollPastEnd",d.preferences.scrollPastEnd),
d.editors.css.setOption("scrollPastEnd",d.preferences.scrollPastEnd),d.editors.html.setOption("scrollPastEnd",d.preferences.scrollPastEnd));d.setStorage()},reset:function(){a("#save-gist").text("Save Gist").data("action","create");a("#share_actions").addClass("hide");this.editors.sass.setValue("");this.editors.css.setValue("");this.editors.html.setValue("");this.inputs=e;this.outputs=f;Modernizr.localstorage&&localStorage.clear();b({reset:!0});d("/")},getStorage:function(){window.gist?(this.inputs=
a.extend(!0,this.inputs,window.gist),this.inputs.sass.dependencies.libsass?this.inputs.sass.compiler="lib":this.inputs.sass.dependencies.Sass&&(this.inputs.sass.compiler=this.inputs.sass.dependencies.Sass.slice(0,3)),window.gist_output&&(this.outputs=a.extend(!0,this.outputs,window.gist_output))):(Modernizr.localstorage?(this.inputs=a.extend(!0,this.inputs,JSON.parse(localStorage.getItem("inputs"))),this.outputs=a.extend(!0,this.outputs,JSON.parse(localStorage.getItem("outputs")))):(this.inputs=a.extend(!0,
this.inputs,{}),this.outputs=a.extend(!0,this.outputs,{})),this.inputs.sass.dependencies.libsass?this.inputs.sass.compiler="lib":this.inputs.sass.dependencies.Sass&&(this.inputs.sass.compiler=this.inputs.sass.dependencies.Sass.slice(0,3)));Modernizr.localstorage?(this.layout=a.extend(!0,this.layout,JSON.parse(localStorage.getItem("layout"))),this.preferences=a.extend(!0,this.preferences,JSON.parse(localStorage.getItem("preferences")))):(this.layout=a.extend(!0,this.layout,{}),this.preferences=a.extend(!0,
this.preferences,{}));switch(this.inputs.sass.syntax.toLowerCase()){case "sass":this.inputs.sass.syntax="Sass";break;default:this.inputs.sass.syntax="SCSS"}this.inputs.html.input=this.inputs.html.input.replace(/<\\+\/script>/g,"\x3c/script>");this.outputs.html=this.outputs.html.replace(/<\\+\/script>/g,"\x3c/script>");switch(this.inputs.html.syntax.toLowerCase()){case "haml":this.inputs.html.syntax="Haml";break;case "slim":this.inputs.html.syntax="Slim";break;case "markdown":this.inputs.html.syntax=
"Markdown";break;case "textile":this.inputs.html.syntax="Textile";break;case "jade":this.inputs.html.syntax="Jade";break;default:this.inputs.html.syntax="HTML"}},setStorage:function(){!window.gist&&Modernizr.localstorage&&(localStorage.setItem("inputs",JSON.stringify(this.inputs)),localStorage.setItem("outputs",JSON.stringify(this.outputs)),localStorage.setItem("layout",JSON.stringify(this.layout)));localStorage.setItem("preferences",JSON.stringify(this.preferences))}};var b=function(b){a("#rendered-html")[0].contentWindow.postMessage(JSON.stringify(b),
"*")},d=function(a){history.pushState({},"SassMeister | The Sass Playground!",a);window.onpopstate=function(a){}},h=function(){var b='<p class="sassmeister" data-gist-id="'+SassMeister.inputs.gist_id+'" data-height="480" data-theme="'+SassMeister.preferences.theme+'"><a href="http://'+document.domain+"/gist/"+SassMeister.inputs.gist_id+'">Play with this gist on SassMeister.</a></p><script src="http://cdn.'+document.domain+'/js/embed.js" async>\x3c/script>';a("#share_actions textarea").val(b);a(".twitter-share-button").attr("src")&&
(b=a(".twitter-share-button").parent(),a(".twitter-share-button").remove(),a(b).prepend('<a href="https://twitter.com/share" class="twitter-share-button" data-text="Check out this sassy gist." data-url="http://'+document.domain+"/gist/"+SassMeister.inputs.gist_id+'" data-via="sassmeisterapp">Tweet</a>'),twttr.widgets.load())},k=function(a){Messenger({extraClasses:"messenger-on-top"}).post({message:a,hideAfter:5,type:"success"})}})(jQuery);
(function(a){if(0<a("body.app, body.embedded").length){var c=window.SassMeister.init();a("#rendered-html").attr("src",window.sandbox);a("a[href^='http://'], a[href^='https://']").attr("target","_blank");a("#mobile-tabs h2").on("click",function(b){a("body").hasClass("single-column")?(a(".panel").removeClass("show-panel").addClass("hide-panel"),a("#mobile-tabs .current").removeClass("current"),a(this).toggleClass("current"),a('[data-name="'+a(this).data("tab")+'"]').removeClass("hide-panel").addClass("show-panel")):
a(".panel").removeClass("hide-panel").removeClass("show-panel");c.resizeEditors()});window.onmessage=function(a){a.origin==window.sandbox&&"show"==c.layout.html&&(c.outputs.html?c.updateRender(c.outputs):c.compile.html())};0<a("body.app").length&&c.editors.sass.focus()}if(0<a("body.app").length){window.github_id=a.cookie("github_id");window.avatar_url=a.cookie("avatar_url");window.github_id&&window.avatar_url&&a("#github-auth").replaceWith('<div><span><img src="'+window.avatar_url+'" alt="" height="40"></span>      <ul id="account_actions">        <li class="checkmark-icon">Logged in as '+
window.github_id+'</li>        <li class="off-icon"><a href="/logout"><span>Logout</span></a></li>      </ul>    </div>');(function(){var b="";window.github_id&&(window.gist&&window.gist.owner==window.github_id?b+='<li><a id="save-gist" data-action="edit" class="edit-gist"><span>Update Gist</span></a></li>':window.gist||(b+='<li><a id="save-gist" data-action="create" class="create-gist"><span>Save Gist</span></a></li>'));window.github_id&&window.gist&&(b+='<li><a id="fork-gist" data-action="create" class="fork-gist"><span>Fork Gist</span></a></li>');
window.github_id||(b+='<li><a href="/authorize" class="github"><span>Log in with your GitHub account to save gists</span></a></li>');window.gist&&(b+='<li><a href="https://gist.github.com/'+window.gist.gist_id+'" class="github" id="gist-link"><span>View on GitHub</span></a></li>');a("#menu-placeholder").replaceWith(b)})();a("#control-column-bg").on("click",function(b){a("#control-column, #control-column-bg").removeClass("open")});a("#control-column").on("click",function(a){a.stopPropagation()});a(".control-icon").on("click",
function(b){b.stopPropagation();a("#control-column, #control-column-bg").toggleClass("open")});(function(){a(".sass-syntax-display").text(c.inputs.sass.syntax);a(".html-syntax-display").text(c.inputs.html.syntax);a('select[name="version"] option[value="'+c.inputs.sass.compiler+'"]').prop("selected",!0);a('input[name="syntax"][value="'+c.inputs.sass.syntax.toLowerCase()+'"]').prop("checked",!0);a('input[name="output-style"][value="'+c.inputs.sass.output_style+'"]').prop("checked",!0);a('input[name="html-syntax"][value="'+
c.inputs.html.syntax+'"]').prop("checked",!0);a('select[name="theme"] option[value="'+c.preferences.theme+'"]').prop("selected",!0);a('input[name="emmet"]').prop("checked",c.preferences.emmet);a('input[name="vim"]').prop("checked",c.preferences.vim);a('input[name="scrollPastEnd"]').prop("checked",c.preferences.scrollPastEnd);a('select[name="theme"]').dropdown({gutter:0,speed:25,onOptionSelect:function(a){c.setTheme(a.data("value"))}});a('select[name="version"]').dropdown({gutter:0,speed:25,onOptionSelect:function(a){_gaq.push(["_trackEvent",
"UI","SassVersion","v "+a.data("value")]);c.inputs.sass.compiler=a.data("value");f();c.compile.sass()}});ace.require("ace/ext/emmet");a('.edit-prefs input[type="checkbox"]').on("change",function(b){c.setEditorPreferences(a(this).attr("name"),a(this).prop("checked"))})})();a(".orientation").on("click",function(b){b=a(this).data("orientation");_gaq.push(["_trackEvent","UI","Orientation",b]);a("#source").casement("destroy");a("#casement").casement("destroy");c.arrangePanels(b)});a("[data-toggle-input]").on("click",
function(b){b=a("#"+a(this).attr("for")).val();var d=a(this).data("toggle-input");"sass"==d&&(_gaq.push(["_trackEvent","UI","SassSyntax",b]),c.inputs.sass.syntax=b,a(".sass-syntax-display").text(a(this).text()),c.convert.sass(),c.editors.sass.getSession().setMode("ace/mode/"+b.toLowerCase()));"css"==d&&(_gaq.push(["_trackEvent","UI","CSSOutput",b]),c.inputs.sass.output_style=b,c.compile.sass());"html"==d&&(_gaq.push(["_trackEvent","UI","HTMLSyntax",b]),c.inputs.html.syntax=b,a(".html-syntax-display").text(a(this).text()),
c.compile.html(),c.editors.html.getSession().setMode("ace/mode/"+b.toLowerCase()))});var e=function(b){var c=a("<ol />");a.each(b,function(a,b){c.append('<li><a data-import="'+b.import+'">'+a+"</a>"+(b.version?"&nbsp;&nbsp;(v"+b.version+")":"")+"</li>")});return c},f=function(){var b=a("input[value='"+c.inputs.sass.compiler+"']").data("extensions");b?a("#extension_list ol").replaceWith(e(b)):(c.ajaxCalls.getExtensions&&c.ajaxCalls.getExtensions.abort(),c.ajaxCalls.getExtensions=a.get("/app/"+c.inputs.sass.compiler+
"/extensions").done(function(b){a("#extension_list ol").replaceWith(e(b));a("input[value='"+c.inputs.sass.compiler+"']").data("extensions",b)}).always(function(){c.ajaxCalls.getExtensions=!1}))};f();a("#control-column").on("click","a[data-import]",function(b){b=a(this).data("import");var d=("SCSS"==c.inputs.sass.syntax?";":"")+"\n";_gaq.push(["_trackEvent","UI","SassExtensions",b]);b="true"===String(b)?[b]:b.split(",");a(b).each(function(){c.editors.sass.insert('@import "'+this+'"'+d)})});a("#save-gist, #fork-gist").on("click",
function(b){b.preventDefault();c.gist[a(this).data("action")]()});a("#reset").on("click",function(a){a.preventDefault();c.reset()});a("#toggle_css").on("click",function(b){b.preventDefault();b=a(this).data("state");_gaq.push(["_trackEvent","UI","ToggleCSS",b]);a("#source").casement("destroy");a("#casement").casement("destroy");a('[data-name="css"]')[b]();a("#rendered")[c.layout.html]();a('[data-name="html"]')[c.layout.html]();c.layout.css=b;c.arrangePanels(c.layout.orientation);localStorage.setItem("layout",
JSON.stringify(c.layout));"hide"==b?a(this).data("state","show").addClass("show"):a(this).data("state","hide").removeClass("show")});a("#toggle_html").on("click",function(b){b.preventDefault();b=a(this).data("state");_gaq.push(["_trackEvent","UI","ToggleHTML",b]);a("#source").casement("destroy");a("#casement").casement("destroy");a("#rendered")[b]();a('[data-name="html"]')[b]();a('[data-name="css"]')[c.layout.css]();c.layout.html=b;c.arrangePanels(c.layout.orientation);localStorage.setItem("layout",
JSON.stringify(c.layout));"hide"==b?a(this).data("state","show").addClass("show"):a(this).data("state","hide").removeClass("show").find("span")})}if(0<a("body.oops-404").length){var g=function(){var a=document.getElementById("gist-id").value;a&&(window.location="/gist/"+a);return!0};a("#gist-id").on("keydown",function(a){13==a.which&&g()});a("button").on("click",g)}})(jQuery);
