import mermaid from "mermaid";
import { useEffect, useState } from "react";

export default function GitGraph() {
    const [commits, setCommits] = useState([]);
    useEffect(() => {
        const getCommits = async () => {
            const response = await fetch(
                "https://api.github.com/repos/akaruidevelopment/zeneth/commits",
            );
            const data = (await response.json()).map(
                (x: {
                    sha: any;
                    commit: {
                        message: any;
                        author: { name: any; date: string | number | Date };
                    };
                }) => {
                    return `commit id: "${x.sha.slice(0,5)}" msg: "${x.commit.message}"`;
                },
            );
            setCommits(data);
            setTimeout(() => {
                mermaid.initialize({
                    startOnLoad: true,
                    theme: "default",
                    gitGraph: {
                        diagramPadding: 150,
                        useWidth: 1000,
                        arrowMarkerAbsolute: true,
                        rotateCommitLabel: true,
                    },
                    darkMode: true,
                    fontFamily: "monospace",
                    // change branch color to yellow
                    themeCSS: `
                        .node rect,.label0 {
                            fill: #f1c40f;
                        }

                        .commit-label-bkg {
                            fill: #f492f1;
                            width: 100px;
                            height: 20px;
                            translate: -50px 0;
                        }

                        .commit-label {
                            translate: -20px 5px;
                            font-size: 14px;
                        }

                        .arrow0 {
                            stroke: #f1c40f;
                        }

                        .commit0 {
                            stroke: #f1c40f;
                            fill : #f492f1;
                        }

                    .branch-label0 {
                        fill: rgb(8,15,28);
                    }
                        svg[id^="mermaid-"] { min-width: 200px; max-width: 500px; }
                    .gitTitleText {
                        fill: #f492f1;
                    }
                    `,
                });

                mermaid.contentLoaded();
            }, 1000);
        };
        getCommits();
    }, []);

    const graph = `
---
title: Zeneth Git Graph
---
gitGraph
    ${commits.join("\n    ")}
`;
    return <div className="mermaid" style={{
        width: "100%",
        height: "100%",
    }}>{graph}</div>;
}
