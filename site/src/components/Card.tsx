import { Card } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import "./card.css";

const loop = async (value,setFunc) => {
    let i = 0;
    let speed = Math.round(value / 100);
    if(speed < 1) speed = 1;
    const id = setInterval(() => {
        if (i < value) {
            i += Math.min(speed,value);
            setFunc(i);
            
        } else {
            clearInterval(id);
        }
    }, 10);
}

export default function NPMCard() {
    const [weekly, setWeekly] = useState(0);
    const [allTime, setAllTime] = useState(0);
    const [stars, setStars] = useState(0);
    const [commits, setCommits] = useState(0);



    useEffect(() => {
        const getDownloads = async () => {
            const res = await fetch(
                "https://api.npmjs.org/downloads/point/last-week/zeneth",
            );
            const json = await res.json();
            let commitlength = 0;
            let page = 1;
            const res2 = await fetch(
                "https://api.npmjs.org/downloads/point/1000-02-01:4000-02-08/zeneth",
            );

            const res3 = await fetch(
                "https://api.github.com/repos/akaruidevelopment/zeneth",
            );
            
            const json3 = await res3.json();
            const json2 = await res2.json();

            loop(json.downloads,setWeekly);
            loop(json2.downloads,setAllTime);
            loop(json3.stargazers_count ?? 10,setStars);
            loop(100,setCommits);
        
        };

        getDownloads();
    }, []);

    return (
        <Card
            sx={{
                width: "100%",
                height: "400px",
                backgroundColor: "rgb(8,15,28)",
                borderRadius: "1rem",
            }}
            className="box"
        >
            <div className="card">
                <div className="row">
                    <div className="weekly">
                        <div className="number cursor-pointer">{weekly}</div>
                        <div className="text">Weekly Downloads On NPM</div>
                    </div>

                    <div className="allTime">
                        <div className="number cursor-pointer">{allTime}</div>
                        <div className="text">Total Downloads On NPM</div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="row">
                    <div className="weekly">
                        <div className="number cursor-pointer">{stars}</div>
                        <div className="text">Stars on Github</div>
                    </div>

                    <div className="allTime">
                        <div className="number cursor-pointer">{commits ? commits + "+" : commits}</div>
                        <div className="text">Commits on current version</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
