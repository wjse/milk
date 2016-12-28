/*!
 * jQuery Upload File Plugin
 * version: 3.1.0
 * @requires jQuery v1.5 or later & form plugin
 * Copyright (c) 2013 Ravishanker Kusuma
 * http://hayageek.com/
 */
(function(b) {
    if (b.fn.ajaxForm == undefined) {
        b.getScript("http://malsup.github.io/jquery.form.js")
    }
    var a = {};
    a.fileapi = b("<input type='file'/>").get(0).files !== undefined;
    a.formdata = window.FormData !== undefined;
    b.fn.uploadFile = function(r) {
        var q = b.extend({
            url: "",
            method: "POST",
            enctype: "multipart/form-data",
            formData: null,
            returnType: null,
            allowedTypes: "*",
            fileName: "file",
            formData: {},
            dynamicFormData: function() {
                return {}
            },
            maxFileSize: -1,
            multiple: true,
            dragDrop: true,
            autoSubmit: true,
            showCancel: true,
            showAbort: true,
            showDone: true,
            showDelete: false,
            showError: true,
            showStatusAfterSuccess: true,
            showStatusAfterError: true,
            showFileCounter: true,
            fileCounterStyle: "). ",
            showProgress: false,
            onSelect: function(s) {
                return true
            },
            onSubmit: function(s, t) {},
            onSuccess: function(t, s, u) {},
            onError: function(u, s, t) {},
            deleteCallback: false,
            afterUploadAll: false,
            uploadButtonClass: "ajax-file-upload",
            dragDropStr: "<span><b>Drag &amp; Drop Files</b></span>",
            abortStr: "Abort",
            cancelStr: "Cancel",
            deletelStr: "Delete",
            doneStr: "Done",
            multiDragErrorStr: "Multiple File Drag &amp; Drop is not allowed.",
            extErrorStr: "is not allowed. Allowed extensions: ",
            sizeErrorStr: "is not allowed. Allowed Max size: ",
            uploadErrorStr: "Upload is not allowed"
        }, r);
        this.fileCounter = 1;
        this.fCounter = 0;
        this.sCounter = 0;
        this.tCounter = 0;
        var d = "ajax-file-upload-" + (new Date().getTime());
        this.formGroup = d;
        this.hide();
        this.errorLog = b("<div></div>");
        this.after(this.errorLog);
        this.responses = [];
        if (!a.formdata) {
            q.dragDrop = false
        }
        var l = this;
        var e = b("<div>" + b(this).html() + "</div>");
        b(e).addClass(q.uploadButtonClass);
        (function j() {
            if (b.fn.ajaxForm) {
                if (q.dragDrop) {
                    var s = b('<div class="ajax-upload-dragdrop" style="vertical-align:top;"></div>');
                    b(l).before(s);
                    b(s).append(e);
                    b(s).append(b(q.dragDropStr));
                    f(l, q, s)
                } else {
                    b(l).before(e)
                }
                p(l, d, q, e)
            } else {
                window.setTimeout(j, 10)
            }
        })();
        this.startUpload = function() {
            b("." + this.formGroup).each(function(t, s) {
                if (b(this).is("form")) {
                    b(this).submit()
                }
            })
        };
        this.stopUpload = function() {
            b(".ajax-file-upload-red").each(function(t, s) {
                if (b(this).hasClass(l.formGroup)) {
                    b(this).click()
                }
            })
        };
        this.getResponses = function() {
            return this.responses
        };
        var g = false;

        function i() {
            if (q.afterUploadAll && !g) {
                g = true;
                (function s() {
                    if (l.sCounter != 0 && (l.sCounter + l.fCounter == l.tCounter)) {
                        q.afterUploadAll(l);
                        g = false
                    } else {
                        window.setTimeout(s, 100)
                    }
                })()
            }
        }
        function f(v, t, u) {
            u.on("dragenter", function(s) {
                s.stopPropagation();
                s.preventDefault();
                b(this).css("border", "2px solid #A5A5C7")
            });
            u.on("dragover", function(s) {
                s.stopPropagation();
                s.preventDefault()
            });
            u.on("drop", function(w) {
                b(this).css("border", "2px dotted #A5A5C7");
                w.preventDefault();
                v.errorLog.html("");
                var s = w.originalEvent.dataTransfer.files;
                if (!t.multiple && s.length > 1) {
                    if (t.showError) {
                        b("<div style='color:red;'>" + t.multiDragErrorStr + "</div>").appendTo(v.errorLog)
                    }
                    return
                }
                if (t.onSelect(s) == false) {
                    return
                }
                k(t, v, s)
            });
            b(document).on("dragenter", function(s) {
                s.stopPropagation();
                s.preventDefault()
            });
            b(document).on("dragover", function(s) {
                s.stopPropagation();
                s.preventDefault();
                u.css("border", "2px dotted #A5A5C7")
            });
            b(document).on("drop", function(s) {
                s.stopPropagation();
                s.preventDefault();
                u.css("border", "2px dotted #A5A5C7")
            })
        }
        function h(s) {
            var u = "";
            var t = s / 1024;
            if (parseInt(t) > 1024) {
                var v = t / 1024;
                u = v.toFixed(2) + " MB"
            } else {
                u = t.toFixed(2) + " KB"
            }
            return u
        }
        function n(w) {
            var x = [];
            if (jQuery.type(w) == "string") {
                x = w.split("&")
            } else {
                x = b.param(w).split("&")
            }
            var t = x.length;
            var s = [];
            var v, u;
            for (v = 0; v < t; v++) {
                x[v] = x[v].replace(/\+/g, " ");
                u = x[v].split("=");
                s.push([decodeURIComponent(u[0]), decodeURIComponent(u[1])])
            }
            return s
        }
        function k(G, A, t) {
            for (var B = 0; B < t.length; B++) {
                if (!c(A, G, t[B].name)) {
                    if (G.showError) {
                        b("<div style='color:red;'><b>" + t[B].name + "</b> " + G.extErrorStr + G.allowedTypes + "</div>").appendTo(A.errorLog)
                    }
                    continue
                }
                if (G.maxFileSize != -1 && t[B].size > G.maxFileSize) {
                    if (G.showError) {
                        b("<div style='color:red;'><b>" + t[B].name + "</b> " + G.sizeErrorStr + h(G.maxFileSize) + "</div>").appendTo(A.errorLog)
                    }
                    continue
                }
                var C = G;
                var v = new FormData();
                var z = G.fileName.replace("[]", "");
                v.append(z, t[B]);
                var x = G.formData;
                if (x) {
                    var E = n(x);
                    for (var y = 0; y < E.length; y++) {
                        if (E[y]) {
                            v.append(E[y][0], E[y][1])
                        }
                    }
                }
                C.fileData = v;
                var D = new o(A, G);
                var F = "";
                if (G.showFileCounter) {
                    F = A.fileCounter + G.fileCounterStyle + t[B].name
                } else {
                    F = t[B].name
                }
                D.filename.html(F);
                var u = b("<form style='display:block; position:absolute;left: 150px;' class='" + A.formGroup + "' method='" + G.method + "' action='" + G.url + "' enctype='" + G.enctype + "'></form>");
                u.appendTo("body");
                var w = [];
                w.push(t[B].name);
                m(u, C, D, w, A);
                A.fileCounter++
            }
        }
        function c(v, u, x) {
            var w = u.allowedTypes.toLowerCase().split(",");
            var t = x.split(".").pop().toLowerCase();
            if (u.allowedTypes != "*" && jQuery.inArray(t, w) < 0) {
                return false
            }
            return true
        }
        function p(x, A, C, t) {
            var z = "ajax-upload-id-" + (new Date().getTime());
            var v = b("<form method='" + C.method + "' action='" + C.url + "' enctype='" + C.enctype + "'></form>");
            var u = "<input type='file' id='" + z + "' name='" + C.fileName + "'/>";
            if (C.multiple) {
                if (C.fileName.indexOf("[]") != C.fileName.length - 2) {
                    C.fileName += "[]"
                }
                u = "<input type='file' id='" + z + "' name='" + C.fileName + "' multiple/>"
            }
            var y = b(u).appendTo(v);
            y.change(function() {
                x.errorLog.html("");
                var J = C.allowedTypes.toLowerCase().split(",");
                var F = [];
                if (this.files) {
                    for (G = 0; G < this.files.length; G++) {
                        F.push(this.files[G].name)
                    }
                    if (C.onSelect(this.files) == false) {
                        return
                    }
                } else {
                    var H = b(this).val();
                    var E = [];
                    F.push(H);
                    if (!c(x, C, H)) {
                        if (C.showError) {
                            b("<div style='color:red;'><b>" + H + "</b> " + C.extErrorStr + C.allowedTypes + "</div>").appendTo(x.errorLog)
                        }
                        return
                    }
                    E.push({
                        name: H,
                        size: "NA"
                    });
                    if (C.onSelect(E) == false) {
                        return
                    }
                }
                t.unbind("click");
                v.hide();
                p(x, A, C, t);
                v.addClass(A);
                if (a.fileapi && a.formdata) {
                    v.removeClass(A);
                    var I = this.files;
                    k(C, x, I)
                } else {
                    var D = "";
                    for (var G = 0; G < F.length; G++) {
                        if (C.showFileCounter) {
                            D += x.fileCounter + C.fileCounterStyle + F[G] + "<br>"
                        } else {
                            D += F[G] + "<br>"
                        }
                        x.fileCounter++
                    }
                    var s = new o(x, C);
                    s.filename.html(D);
                    m(v, C, s, F, x)
                }
            });
            v.css({
                margin: 0,
                padding: 0
            });
            var B = b(t).width() + 10;
            if (B == 10) {
                B = 120
            }
            var w = t.height() + 10;
            if (w == 10) {
                w = 35
            }
            t.css({
                position: "relative",
                overflow: "hidden",
                cursor: "default"
            });
            y.css({
                position: "absolute",
                cursor: "pointer",
                top: "0px",
                width: B,
                height: w,
                left: "0px",
                "z-index": "100",
                opacity: "0.0",
                filter: "alpha(opacity=0)",
                "-ms-filter": "alpha(opacity=0)",
                "-khtml-opacity": "0.0",
                "-moz-opacity": "0.0"
            });
            v.appendTo(t)
        }
        function o(u, t) {
            this.statusbar = b("<div class='ajax-file-upload-statusbar'></div>");
            this.filename = b("<div class='ajax-file-upload-filename'></div>").appendTo(this.statusbar);
            this.progressDiv = b("<div class='ajax-file-upload-progress'>").appendTo(this.statusbar).hide();
            this.progressbar = b("<div class='ajax-file-upload-bar " + u.formGroup + "'></div>").appendTo(this.progressDiv);
            this.abort = b("<div class='ajax-file-upload-red " + u.formGroup + "'>" + t.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel = b("<div class='ajax-file-upload-red'>" + t.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done = b("<div class='ajax-file-upload-green'>" + t.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.del = b("<div class='ajax-file-upload-red'>" + t.deletelStr + "</div>").appendTo(this.statusbar).hide();
            u.errorLog.after(this.statusbar);
            return this
        }
        function m(y, x, t, v, z) {
            var w = null;
            var u = {
                cache: false,
                contentType: false,
                processData: false,
                forceSync: false,
                data: x.formData,
                formData: x.fileData,
                dataType: x.returnType,
                beforeSubmit: function(E, B, D) {
                    if (x.onSubmit.call(this, v) != false) {
                        var A = x.dynamicFormData();
                        if (A) {
                            var s = n(A);
                            if (s) {
                                for (var C = 0; C < s.length; C++) {
                                    if (s[C]) {
                                        if (x.fileData != undefined) {
                                            D.formData.append(s[C][0], s[C][1])
                                        } else {
                                            D.data[s[C][0]] = s[C][1]
                                        }
                                    }
                                }
                            }
                        }
                        z.tCounter += v.length;
                        i();
                        return true
                    }
                    t.statusbar.append("<div style='color:red;'>" + x.uploadErrorStr + "</div>");
                    t.cancel.show();
                    y.remove();
                    t.cancel.click(function() {
                        t.statusbar.remove()
                    });
                    return false
                },
                beforeSend: function(A, s) {
                    t.progressDiv.show();
                    t.cancel.hide();
                    t.done.hide();
                    if (x.showAbort) {
                        t.abort.show();
                        t.abort.click(function() {
                            A.abort()
                        })
                    }
                    if (!a.formdata) {
                        t.progressbar.width("5%")
                    } else {
                        t.progressbar.width("1%")
                    }
                },
                uploadProgress: function(D, s, C, B) {
                    if (B > 98) {
                        B = 98
                    }
                    var A = B + "%";
                    if (B > 1) {
                        t.progressbar.width(A)
                    }
                    if (x.showProgress) {
                        t.progressbar.html(A);
                        t.progressbar.css("text-align", "center")
                    }
                },
                success: function(A, s, B) {
                    z.responses.push(A);
                    t.progressbar.width("100%");
                    if (x.showProgress) {
                        t.progressbar.html("100%");
                        t.progressbar.css("text-align", "center")
                    }
                    t.abort.hide();
                    x.onSuccess.call(this, v, A, B);
                    if (x.showStatusAfterSuccess) {
                        if (x.showDone) {
                            t.done.show();
                            t.done.click(function() {
                                t.statusbar.hide("slow");
                                t.statusbar.remove()
                            })
                        } else {
                            t.done.hide()
                        }
                        if (x.showDelete) {
                            t.del.show();
                            t.del.click(function() {
                                if (x.deleteCallback) {
                                    x.deleteCallback.call(this, A, t)
                                }
                            })
                        } else {
                            t.del.hide()
                        }
                    } else {
                        t.statusbar.hide("slow");
                        t.statusbar.remove()
                    }
                    y.remove();
                    z.sCounter += v.length
                },
                error: function(B, s, A) {
                    t.abort.hide();
                    if (B.statusText == "abort") {
                        t.statusbar.hide("slow")
                    } else {
                        x.onError.call(this, v, s, A);
                        if (x.showStatusAfterError) {
                            t.progressDiv.hide();
                            t.statusbar.append("<span style='color:red;'>ERROR: " + A + "</span>")
                        } else {
                            t.statusbar.hide();
                            t.statusbar.remove()
                        }
                    }
                    y.remove();
                    z.fCounter += v.length
                }
            };
            if (x.autoSubmit) {
                y.ajaxSubmit(u)
            } else {
                if (x.showCancel) {
                    t.cancel.show();
                    t.cancel.click(function() {
                        y.remove();
                        t.statusbar.remove()
                    })
                }
                y.ajaxForm(u)
            }
        }
        return this
    }
}(jQuery));