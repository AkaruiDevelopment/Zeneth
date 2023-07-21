//@ts-nocheck
import { useLayoutEffect, useState } from "react";
import * as hyt from "d3-hypertree";
import "./index.css";
export default function HyperTree({
    funcs,
    title,
}: {
    funcs: () => Promise<any>;
    title: string;
}) {
    const π = Math.PI;
    const hasLazy = (n: { hasOutChildren: any; isOutλ: any }) =>
        n.hasOutChildren && n.isOutλ;
    const isLeaf = (n: hyt.N) => !n.children || !n.children.length;
    const isRoot = (n: { parent: any }) => !n.parent;
    const hasCircle = (n: any) => hasLazy(n) || isRoot(n) || isLeaf(n);
    const nodeInitR =
        (c: number) => (ud: any, d: { children: any; parent: any }) =>
            c * (d.children && d.parent ? innerNodeScale(d) : 1);
    const nodeInitRNoInner = (c: any) => (ud: any, d: any) => c;
    const nodeScale = (d: { distScale: number }) =>
        d.distScale * (hasLazy(d) ? 0.8 : 1);
    const nodeScaleNoInner = (d: { distScale: any }) => d.distScale;
    const innerNodeScale = (d: { precalc: { weightScale: any } }) =>
        d.precalc.weightScale;

    const url = new URL(window.location.href);
    const node = url.searchParams.get("node");
    var pushState = history.pushState;
    history.pushState = function () {
        pushState.apply(history, arguments);
        const event = new Event("pushState");
        window.dispatchEvent(event); // Some event-handling function
    };
    useLayoutEffect(() => {
        const app = {
            root: document.querySelector("body"),
            navigation: null,
            splitter: null,
            hypertree: null,
            focusview: null,
            currentNode: null,
        };
        (async () => {
            const f = await funcs();
            const ht = new hyt.Hypertree(
                { parent: document.getElementById("hyt") as HTMLElement },

                {
                    langInitBFS: (ht, n) => {
                        n.precalc.label = n.data.name;
                        n.precalc.clickable = true;
                        if (!isRoot(n))
                            n.precalc.wiki =
                                n.data.wiki ??
                                `/Zeneth/mindmap?node=${
                                    node
                                        ? node + "/" + n.data.name
                                        : n.data.name
                                }`;
                        n.precalc.cell = true;
                        n.precalc.labellen = n.precalc.label?.length;
                    },
                    dataInitBFS(ht, n) {
                        if (n.children && n.height % 2 === 0)
                            n.children = n.children.reverse();
                    },
                    //@ts-ignore
                    dataloader: (ok) =>
                        //@ts-ignore
                        ok(f),
                    filter: {
                        cullingRadius: 0.98,
                    },
                    //@ts-ignore
                    interaction: {
                        λbounds: [0.1, 1.5],
                        onNodeSelect(n) {
                            if (n.precalc.wiki) {
                                // use history api to change url without reloading
                                window.history.pushState(
                                    {},
                                    "",
                                    n.precalc.wiki,
                                );
                            }
                        },

                        //@ts-ignore
                        onNodeClick: (n, m, l) => {
                            if (n.precalc.wiki) {
                                // use history api to change url without reloading
                                if(n.precalc.wiki.startsWith("/Zeneth/mindmap"))
                                 window.history.pushState(
                                    {},
                                    "",
                                    n.precalc.wiki,
                                );
                                else window.location.href = n.precalc.wiki;
                            }
                        },
                    },
                    geometry: {
                        nodeRadius: nodeInitR(0.0075),
                        layerOptions: {
                            cells: { invisible: true, hideOnDrag: true },
                            images: { width: 0.1, height: 0.1 },
                            "link-arcs": {
                                linkColor: (n) => {},
                            },
                        },
                        nodes: {
                            nodeColor: (n) => {
                                if (n.mergeId == 12) return "yellow";
                                if (!n.children) return "red";
                                return "#a5d6a7";
                            },
                        },
                        clipRadius: 1,
                    },
                    layout: {
                        weight: (n) => (isLeaf(n) ? 1 : 0),
                        initSize: 1,
                    },
                },
            );
            ht.initPromise
                .then(() => new Promise((ok, err) => ht.animateUp(ok, err)))
                .then(() => ht.drawDetailFrame());
        })();
    });

    return (
        <div className="node selected">
            <div className="titleText">{title}</div>
            <div id="hyt" className="tree"></div>
        </div>
    );
}
