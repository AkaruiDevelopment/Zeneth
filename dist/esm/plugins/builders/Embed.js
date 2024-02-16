import { parseColor } from "../../index.js";
export default class EmbedBuilder {
    title;
    description;
    color;
    fields;
    footer;
    image;
    thumbnail;
    timestamp;
    url;
    author;
    constructor() {
        this.fields = [];
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setColor(color) {
        this.color = parseColor(color);
        return this;
    }
    addField(name, value, inline) {
        this.fields.push({ name, value, inline });
        return this;
    }
    addFields(...fields) {
        this.fields.push(...fields);
        return this;
    }
    setFooter(text, iconUrl) {
        this.footer = { text, iconUrl };
        return this;
    }
    setImage(url) {
        this.image = { url };
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
    setTimestamp(timestamp = new Date()) {
        this.timestamp = timestamp;
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setAuthor(name, iconUrl, url) {
        this.author = { name, iconUrl, url };
        return this;
    }
    static from(data) {
        if (data instanceof EmbedBuilder)
            return data;
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
//# sourceMappingURL=Embed.js.map