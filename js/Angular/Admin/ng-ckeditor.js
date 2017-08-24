﻿/*! ngCkeditor v0.2.1 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-ckeditor - New BSD License */
"use strict";
! function (a, b) {
    return "function" == typeof define && define.amd ? void define(["angular", "ckeditor"], function (a) {
        return b(a)
    }) : b(a)
}(angular || null, function (a) {
    var b, c = a.module("ngCkeditor", []),
        d = !1;
    return c.run(["$q", "$timeout", function (c, e) {
        function f() {
            "loaded" === CKEDITOR.status ? (d = !0, b.resolve()) : f()
        }
        if (b = c.defer(), a.isUndefined(CKEDITOR)) throw new Error("CKEDITOR not found");
        CKEDITOR.disableAutoInline = !0, CKEDITOR.on("loaded", f), e(f, 100)
    }]), c.directive("ckeditor", ["$timeout", "$q", function (c, e) {
        return {
            restrict: "AC",
            require: ["ngModel", "^?form"],
            scope: !1,
            link: function (f, g, h, i) {
                var j = i[0],
                    k = i[1] || null,
                    l = "<p></p>",
                    m = "textarea" === g[0].tagName.toLowerCase(),
                    n = [],
                    o = !1;
                m || g.attr("contenteditable", !0);

                var p = function () {
                    var b = {
                        toolbar: "full",
                        toolbar_full: [{
                            name: "basicstyles",
                            items: ["Bold", "Italic", "Strike", "Underline"]
                        }, {
                            name: "paragraph",
                            items: ["BulletedList", "NumberedList", "Blockquote"]
                        }, {
                            name: "editing",
                            items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"]
                        }, {
                            name: "links",
                            items: ["Link", "Unlink", "Anchor"]
                        }, {
                            name: "tools",
                            items: ["SpellChecker", "Maximize"]
                        }, "/", {
                            name: "styles",
                            items: ["Format", "FontSize", "TextColor", "PasteText", "PasteFromWord", "RemoveFormat"]
                        }, {
                            name: "insert",
                            items: ["Image", "Table", "SpecialChar"]
                        }, {
                            name: "forms",
                            items: ["Outdent", "Indent"]
                        }, {
                            name: "clipboard",
                            items: ["Undo", "Redo"]
                        }, {
                            name: "Shashank",
                            items: ["SpecialChar"]
                        },
                        {
                            name: "document",
                            items: ["PageBreak", "Source"]
                        }],
                        disableNativeSpellChecker: !1,
                        uiColor: "#FAFAFA",
                        height: "250px",
                        width: "100%"
                    };
                    b = a.extend(b, f[h.ckeditor]);                                  


                    var d = m ? CKEDITOR.replace(g[0], b) : CKEDITOR.inline(g[0], b),i = e.defer();                  
                   
                    console.log('Data');
                    console.log(b);

                    g.bind("$destroy", function () {
                        d && CKEDITOR.instances[d.name] && CKEDITOR.instances[d.name].destroy()

                    });
                    var p = function (a) {
                        var b = d.getData();
                        "" === b && (b = null), c(function () {
                            (a !== !0 || b !== j.$viewValue) && j.$setViewValue(b), a === !0 && k && k.$setPristine()
                        }, 0)
                    },
                        q = function (a) {
                            if (n.length) {
                                var b = n.pop() || l;
                                o = !1, d.setData(b, function () {
                                    p(a), o = !0
                                })
                            }
                        };
                    d.on("change", p), d.on("blur", p), d.on("instanceReady", function () {
                        f.$broadcast("ckeditor.ready"), f.$apply(function () {
                            q(!0)
                        }), d.document.on("keyup", p)
                    }), d.on("customConfigLoaded", function () {
                        i.resolve()
                    }), j.$render = function () {
                        n.push(j.$viewValue), o && q()
                    }
                };
                "loaded" === CKEDITOR.status && (d = !0), d ? p() : b.promise.then(p)
            }
        }
    }]), c
});
//# sourceMappingURL=ng-ckeditor.min.js.map


