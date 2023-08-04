import { parseColor } from "../../index.js";
import {
    EmbedAuthor,
    EmbedBuild,
    EmbedField,
    EmbedFooter,
    EmbedImage,
    EmbedThumbnail,
} from "./interface.js";
import { ColorResolve } from "./type.js";

export default class EmbedBuilder {
    title?: string;
    description?: string;
    color?: number;
    fields: EmbedField[];
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    timestamp?: Date;
    url?: string;
    author?: EmbedAuthor;
    constructor() {
        this.fields = [];
    }
    setTitle(title: string) {
        this.title = title;
        return this;
    }
    setDescription(description: string) {
        this.description = description;
        return this;
    }
    setColor(color: ColorResolve) {
        this.color = parseColor(color);
        return this;
    }
    addField(name: string, value: string, inline?: boolean) {
        this.fields.push({ name, value, inline });
        return this;
    }
    addFields(...fields: EmbedField[]) {
        this.fields.push(...fields);
        return this;
    }
    setFooter(text: string, iconUrl?: string) {
        this.footer = { text, iconUrl };
        return this;
    }
    setImage(url: string) {
        this.image = { url };
        return this;
    }
    setThumbnail(url: string) {
        this.thumbnail = { url };
        return this;
    }
    setTimestamp(timestamp: Date = new Date()) {
        this.timestamp = timestamp;
        return this;
    }
    setURL(url: string) {
        this.url = url;
        return this;
    }
    setAuthor(name: string, iconUrl?: string, url?: string) {
        this.author = { name, iconUrl, url };
        return this;
    }

    static from(data: EmbedBuild | EmbedBuilder): EmbedBuilder {
        if (data instanceof EmbedBuilder) return data;
        else {
            const builder = new EmbedBuilder();
            builder.title = data.title;
            builder.description = data.description;
            builder.color = data.color ? parseColor(data.color) : undefined;
            builder.fields = data.fields;
            builder.footer = data.footer;
            builder.image = data.image;
            builder.thumbnail = data.thumbnail;
            builder.timestamp = data.timestamp;
            builder.url = data.url;
            return builder;
        }
    }
}
