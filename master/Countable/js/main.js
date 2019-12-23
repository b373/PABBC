function text(a, b) {
    "textContent" in document.body ? a.textContent = b : a.innerText = b
}

// function event(a, b, c, d) {
//     "add" === a ? window.addEventListener ? b.addEventListener(c, d) : window.attachEvent && b.attachEvent(c, d) : "remove" === a && (window.removeEventListener ? b.removeEventListener(c, d) : window.detachEvent && b.detachEvent(c, d))
// }

function async(a) {
    var b = document.createElement("script"),
        c = document.scripts[0];
    b.src = a, c.parentNode.insertBefore(b, c)
}

function scrollAbr() {
    _gaq.push(["_trackEvent", "Site", "Scrolled", "The user scrolled the page at least once"]), event("remove", window, "scroll", scrollAbr)
}! function () {
    var a = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
        b = self.Prism = {
            util: {
                type: function (a) {
                    return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]
                }, clone: function (a) {
                    var c = b.util.type(a);
                    switch (c) {
                    case "Object":
                        var d = {};
                        for (var e in a) a.hasOwnProperty(e) && (d[e] = b.util.clone(a[e]));
                        return d;
                    case "Array":
                        return a.slice()
                    }
                    return a
                }
            },
            languages: {
                extend: function (a, c) {
                    var d = b.util.clone(b.languages[a]);
                    for (var e in c) d[e] = c[e];
                    return d
                }, insertBefore: function (a, c, d, e) {
                    e = e || b.languages;
                    var f = e[a],
                        g = {};
                    for (var h in f)
                        if (f.hasOwnProperty(h)) {
                            if (h == c)
                                for (var i in d) d.hasOwnProperty(i) && (g[i] = d[i]);
                            g[h] = f[h]
                        }
                    return e[a] = g
                }, DFS: function (a, c) {
                    for (var d in a) c.call(a, d, a[d]), "Object" === b.util.type(a) && b.languages.DFS(a[d], c)
                }
            },
            highlightAll: function (a, c) {
                for (var d, e = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), f = 0; d = e[f++];) b.highlightElement(d, a === !0, c)
            }, highlightElement: function (d, e, f) {
                for (var g, h, i = d; i && !a.test(i.className);) i = i.parentNode;
                if (i && (g = (i.className.match(a) || [, ""])[1], h = b.languages[g]), h) {
                    d.className = d.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g, i = d.parentNode, /pre/i.test(i.nodeName) && (i.className = i.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g);
                    var j = d.textContent;
                    if (j) {
                        j = j.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00a0/g, " ");
                        var k = {
                            element: d,
                            language: g,
                            grammar: h,
                            code: j
                        };
                        if (b.hooks.run("before-highlight", k), e && self.Worker) {
                            var l = new Worker(b.filename);
                            l.onmessage = function (a) {
                                k.highlightedCode = c.stringify(JSON.parse(a.data), g), k.element.innerHTML = k.highlightedCode, f && f.call(k.element), b.hooks.run("after-highlight", k)
                            }, l.postMessage(JSON.stringify({
                                language: k.language,
                                code: k.code
                            }))
                        } else k.highlightedCode = b.highlight(k.code, k.grammar, k.language), k.element.innerHTML = k.highlightedCode, f && f.call(d), b.hooks.run("after-highlight", k)
                    }
                }
            }, highlight: function (a, d, e) {
                return c.stringify(b.tokenize(a, d), e)
            }, tokenize: function (a, c) {
                var d = b.Token,
                    e = [a],
                    f = c.rest;
                if (f) {
                    for (var g in f) c[g] = f[g];
                    delete c.rest
                }
                a: for (var g in c)
                    if (c.hasOwnProperty(g) && c[g]) {
                        var h = c[g],
                            i = h.inside,
                            j = !!h.lookbehind || 0;
                        h = h.pattern || h;
                        for (var k = 0; k < e.length; k++) {
                            var l = e[k];
                            if (e.length > a.length) break a;
                            if (!(l instanceof d)) {
                                h.lastIndex = 0;
                                var m = h.exec(l);
                                if (m) {
                                    j && (j = m[1].length);
                                    var n = m.index - 1 + j,
                                        m = m[0].slice(j),
                                        o = m.length,
                                        p = n + o,
                                        q = l.slice(0, n + 1),
                                        r = l.slice(p + 1),
                                        s = [k, 1];
                                    q && s.push(q);
                                    var t = new d(g, i ? b.tokenize(m, i) : m);
                                    s.push(t), r && s.push(r), Array.prototype.splice.apply(e, s)
                                }
                            }
                        }
                    }
                return e
            }, hooks: {
                all: {},
                add: function (a, c) {
                    var d = b.hooks.all;
                    d[a] = d[a] || [], d[a].push(c)
                }, run: function (a, c) {
                    var d = b.hooks.all[a];
                    if (d && d.length)
                        for (var e, f = 0; e = d[f++];) e(c)
                }
            }
        },
        c = b.Token = function (a, b) {
            this.type = a, this.content = b
        };
    if (c.stringify = function (a, d, e) {
        if ("string" == typeof a) return a;
        if ("[object Array]" == Object.prototype.toString.call(a)) return a.map(function (b) {
            return c.stringify(b, d, a)
        }).join("");
        var f = {
            type: a.type,
            content: c.stringify(a.content, d, e),
            tag: "span",
            classes: ["token", a.type],
            attributes: {},
            language: d,
            parent: e
        };
        "comment" == f.type && (f.attributes.spellcheck = "true"), b.hooks.run("wrap", f);
        var g = "";
        for (var h in f.attributes) g += h + '="' + (f.attributes[h] || "") + '"';
        return "<" + f.tag + ' class="' + f.classes.join(" ") + '" ' + g + ">" + f.content + "</" + f.tag + ">"
    }, !self.document) return self.addEventListener("message", function (a) {
        var c = JSON.parse(a.data),
            d = c.language,
            e = c.code;
        self.postMessage(JSON.stringify(b.tokenize(e, b.languages[d]))), self.close()
    }, !1), void 0;
    var d = document.getElementsByTagName("script");
    d = d[d.length - 1], d && (b.filename = d.src, document.addEventListener && !d.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", b.highlightAll))
}(), Prism.languages.clike = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
        pattern: /((?:class|interface|extends|implements|trait|instanceof|new)\s+)[a-z0-9_\.\\]+/gi,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/gi,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
}, Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,
        inside: {
            tag: {
                pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        }
    }
}), setTimeout(function () {
    _gaq.push(["_trackEvent", "Site", "Read", "The user stayed on the page for 15 seconds or longer"])
}, 15e3);
var fields = {
    paragraphs: document.getElementById("result__paragraphs"),
    words: document.getElementById("result__words"),
    characters: document.getElementById("result__characters"),
    all: document.getElementById("result__all")
};
Countable.live(document.getElementById("countableArea"), function (a) {
    for (var b in fields) text(fields[b], a[b])
}), async("https://api.github.com/repos/RadLikeWhoa/Countable?callback=watchCount"), window.watchCount = function (a) {
    if (a) {
        var b = document.getElementById("github-watch-count"),
            c = a.data.watchers;
        if (b && c) {
            text(b, c), b.parentNode.style.display = "inline-block", b.parentNode.title = "Countable has " + c + " stargazers on GitHub";
            try {
                delete window.watchCount
            } catch (d) {
                window.watchCount = void 0
            }
        }
    }
};
var _gaq = [
    ["_setAccount", "UA-39380123-1"],
    ["_trackPageview"]
];
 window.twttr = function () {
    var a;
    return window.twttr || (a = {
        _e: [],
        ready: function (b) {
            a._e.push(b)
        }
    })
}(), twttr.ready(function () {
    var a = function (a) {
        _gaq.push(["_trackEvent", "Twitter", a.type])
    };
    twttr.events.bind("click", a), twttr.events.bind("tweet", a), twttr.events.bind("follow", a)
}), Prism.languages.insertBefore("javascript", "keyword", {
    "countable-class": /Countable/
});