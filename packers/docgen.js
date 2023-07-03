
const uglify = require("uglify-js");
const csso = require("csso");
const path = require("path");

const fs = require("fs");
const ZenethPkg = require("../package.json");
const docPath = "./site/src/pages/docs/" + ZenethPkg.version;
const base = path.resolve(process.cwd(), docPath);

const files = fs.readdirSync(base);

function walk(base) {
    const files = fs.readdirSync(base);
    for (const fileordir of files) {
        const fsStats = fs.statSync(path.join(base, fileordir));
        if (fsStats.isDirectory()) {
            walk(path.join(base, fileordir));
        } else {
            if (!fileordir.endsWith(".html")) continue;

            const content = fs.readFileSync(
                path.join(base, fileordir),
                "utf-8",
            );
            // fixing all the relative links
            const replaced = content
                // replace href to tho anchors which are in the same page in format of SamePage.html#anchor
                .replace(/href=".+?\.html#.+?"/g, (match) => {
                    console.log(match);
                    if (match.startsWith('href="/Zeneth/')) return match;
                    if (match.startsWith('href="#')) return match;
                    if (match.startsWith('href="https://')) return match;
                    if (match.startsWith('href="http://')) return match;
                    if (match.startsWith('href="../'))
                        return `href="/Zeneth/${match.replaceAll('../','').slice(6)}`.replaceAll(".html","");
                    const category = base.split("/").pop();
                    return `href="/Zeneth/docs/${
                        ZenethPkg.version
                    }/${category}/${match.slice(6)}`.replaceAll(".html","");
                })
                .replace(/src=".*?"/g, (match) => {
                    if (match.startsWith('src="/Zeneth/')) return match;
                    if (match.startsWith('src="https://')) return match;
                    if (match.startsWith('src="http://')) return match;
                    if (match.startsWith('src="../'))
                    return `src="/Zeneth/${match.replaceAll('../','').slice(5)}`;
                    if (match.startsWith('src="./')) {
                        return `src="/Zeneth/${match.replaceAll('./','').slice(5)}`;
                    }
                    return `src="/Zeneth/${match.slice(5)}`;
                })
                .replace(/href=".*?"/g, (match) => {
                    if (match.startsWith('href="/Zeneth/')) return match;
                    if (match.startsWith('href="#')) return match;
                    if (match.startsWith('href="https://')) return match;
                    if (match.startsWith('href="http://')) return match;
                    if([
                        ".css\"",".png\"",".jpg\"",".jpeg\""].some((e)=>match.endsWith(e))
                    ) 
                        {
                            if(match.startsWith('href="../'))
                                return `href="/Zeneth/${match.replaceAll('../','').slice(6)}`;
                            else if(match.startsWith('href="./')) {
                                return `href="/Zeneth/${match.replaceAll('./','').slice(6)}`;
                            } else return `href="/Zeneth/${match.slice(6)}`
                        }
                    if (match.startsWith('href="../'))
                        return `href="/Zeneth/docs/${ZenethPkg.version}/${match
                            .replaceAll("../", "")
                            .slice(6)}`.replaceAll(".html","");
                    const category = base.split("/").pop();
                    if(category === ZenethPkg.version)
                        return `href="/Zeneth/docs/${ZenethPkg.version}/${match.slice(6)}`.replaceAll(".html","");
                    return `href="/Zeneth/docs/${
                        ZenethPkg.version
                    }/${category}/${match.slice(6)}`.replaceAll(".html","");
                });

            fs.writeFileSync(path.join(base, fileordir), replaced);
        }
    }
}

function moveAssets() {
    const assetsPath = path.resolve(process.cwd(), `./site/src/pages/docs/${ZenethPkg.version}/assets`);
    const newAssetsPath = path.resolve(process.cwd(), "./site/public/assets");

    if(!fs.existsSync(newAssetsPath)) fs.mkdirSync(newAssetsPath);

    const files = fs.readdirSync(assetsPath);

    for(const file of files) {
        let content = fs.readFileSync(path.join(assetsPath, file)).toString();

        if(file === "search.js") {
            content = content.replaceAll(".html","");
        }
        if(file === "main.js") {
            content = content.replace("n.base",`n.base + "${ZenethPkg.version}/"`);
        }
        let minified;
        if(file.endsWith(".css")) {
            minified = csso.minify(content).css;
        } else
        minified = uglify.minify(content).code;
        console.log(minified);
        fs.writeFileSync(path.join(newAssetsPath, file), minified);
    }

    fs.rmSync(assetsPath, {recursive: true});
}

walk(base);
moveAssets();


