import { EmbedAuthor, EmbedBuild, EmbedField, EmbedFooter, EmbedImage, EmbedThumbnail } from "./interface.js";
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
    constructor();
    setTitle(title: string): this;
    setDescription(description: string): this;
    setColor(color: ColorResolve): this;
    addField(name: string, value: string, inline?: boolean): this;
    addFields(...fields: EmbedField[]): this;
    setFooter(text: string, iconUrl?: string): this;
    setImage(url: string): this;
    setThumbnail(url: string): this;
    setTimestamp(timestamp?: Date): this;
    setURL(url: string): this;
    setAuthor(name: string, iconUrl?: string, url?: string): this;
    static from(data: EmbedBuild | EmbedBuilder): EmbedBuilder;
}
//# sourceMappingURL=Embed.d.ts.map