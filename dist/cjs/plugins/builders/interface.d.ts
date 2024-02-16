export interface EmbedAuthor {
    name: string;
    iconUrl?: string;
    url?: string;
}
export interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}
export interface EmbedFooter {
    text: string;
    iconUrl?: string;
}
export interface EmbedImage {
    url: string;
}
export interface EmbedThumbnail {
    url: string;
}
export interface EmbedBuild {
    title: string | undefined;
    description: string | undefined;
    color: number | undefined;
    fields: EmbedField[];
    footer: EmbedFooter | undefined;
    image: EmbedImage | undefined;
    thumbnail: EmbedThumbnail | undefined;
    timestamp: Date | undefined;
    url: string | undefined;
}
//# sourceMappingURL=interface.d.ts.map