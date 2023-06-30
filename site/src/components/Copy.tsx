import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

import { useState } from "react";

const Copy = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };
    return (
        <div className="copy" onClick={copy} style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
        }}>
            {copied ? <DoneIcon /> : <ContentCopyIcon />}
        </div>
    );
};

export default Copy;
