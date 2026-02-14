import * as fs from "node:fs";
import * as path from "node:path";
import * as tm from "vscode-textmate";
import * as oni from "vscode-oniguruma";

export interface TokenInfo {
    text: string;
    scopes: string[];
}

const wasm = fs.readFileSync(path.resolve("node_modules/vscode-oniguruma/release/onig.wasm"));
const lib = oni.loadWASM(wasm.buffer).then(() => ({
    createOnigScanner: (patterns: string[]) => new oni.OnigScanner(patterns),
    createOnigString: (s: string) => new oni.OnigString(s)
}));
const registry = new tm.Registry({
    onigLib: lib,
    loadGrammar: async (scopeName: string) => {
        if (scopeName !== "source.naniscript") return null;
        const grammarPath = path.resolve("docs/.vitepress/ext/lang/textmate.json");
        const content = fs.readFileSync(grammarPath, "utf-8");
        return tm.parseRawGrammar(content, grammarPath);
    }
});

export async function tokenize(lines: string[]): Promise<TokenInfo[][]> {
    const grammar = await registry.loadGrammar("source.naniscript");
    if (!grammar) throw new Error("Failed to load naniscript grammar.");
    const result: TokenInfo[][] = [];
    let ruleStack = tm.INITIAL;
    for (const line of lines) {
        const lineTokens = grammar.tokenizeLine(line, ruleStack);
        const tokens: TokenInfo[] = [];
        for (const token of lineTokens.tokens)
            tokens.push({ text: line.substring(token.startIndex, token.endIndex), scopes: token.scopes });
        result.push(tokens);
        ruleStack = lineTokens.ruleStack;
    }
    return result;
}
