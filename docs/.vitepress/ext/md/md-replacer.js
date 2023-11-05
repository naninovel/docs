import { inherits } from "node:util";

// Based on https://github.com/rlidwka/markdown-it-regexp.

let instanceId = 0;

/** @property {string} id
 *  @property {RegExp} regexp
 *  @property {(match: string[], env: MarkdownEnv) => string} replace */
export function Replacer(regexp, replace) {
    let self = md => self.init(md);
    self.__proto__ = Replacer.prototype;
    self.regexp = new RegExp("^" + regexp.source, regexp.flags);
    self.replace = replace;
    self.id = `md-replacer-${instanceId}`;
    instanceId++;
    return self;
}

inherits(Replacer, Function);

/** @param import("vitepress").MarkdownRenderer md */
Replacer.prototype.init = function (md) {
    md.inline.ruler.push(this.id, this.parse.bind(this));
    md.renderer.rules[this.id] = this.render.bind(this);
};

Replacer.prototype.parse = function (state, silent) {
    let match = this.regexp.exec(state.src.slice(state.pos));
    if (!match) return false;

    state.pos += match[0].length;
    if (silent) return true;

    let token = state.push(this.id, "", 0);
    token.meta = { match: match };
    return true;
};

/** @param import("vitepress").MarkdownEnv env */
Replacer.prototype.render = function (tokens, id, options, env) {
    return this.replace(tokens[id].meta.match, env);
};
