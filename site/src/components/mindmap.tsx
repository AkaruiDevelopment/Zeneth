import HyperTree from "./hypertree";
import json from "../data/data.json";
import { useState } from "react";

export const prerender = true;

const getNameAndChildren = (obj:any,url:any) => {
    const res: { name: string; children: any[], url:string,wiki?:string } = {
        name: "",
        children: [],
        url: "",
    };
    res.name = obj.name;
    res.url = obj.name;
    if (obj.children) {
        res.children = obj.children.map((x) => {
            const res = {
                name: x.name,
            }
            if(!x.children?.length) {
                //@ts-ignore
                res.wiki = `/Zeneth/docs/1.0.0-dev/${url}#${x.name}`
            }
            return res;
        });

        
    }

    return res;
};

const getData = () => {
    // return 2 levels deep of json instead of the whole thing
    const url = new URL(window.location.href);
    const node = url.searchParams.get("node");
    console.log(node);
    const nodes = node ? node.split("/") : [];
    //@ts-ignore
    const objj = nodes.length
        ? nodes.reduce(
            //@ts-ignore
              (acc, cur) => {
                const a = acc.children.find((x) => x.name === cur);

                return a;
            },
              json,
          )
        : json;
    const obj = getNameAndChildren(objj,node);
    return async () => obj;
};

export default function Zeneth() {


    const [key, setKey] = useState(0);
    
    window.addEventListener("pushState", () => {
        setKey(key + 1);
    });

    window.addEventListener("popstate", () => {
        setKey(key + 1);
    });

    window.addEventListener('beforeunload',e=>{
        e.preventDefault();
        // if the back button goes outside /mindmap, then we just use the default behavior
        if(window.location.pathname !== "/Zeneth/mindmap") window.location.href = window.location.href;
        // otherwise, we want to go back to the previous node
        setKey(key + 1);
    });

    return <HyperTree  funcs={getData()} title="Zeneth" key={key} />;
}
