export default class AttachmentBuilder {
    #private;
    name: string;
    data: any;
    description?: string;
    spoiler: boolean;
    file: Blob;
    constructor();
    setName(name: string): this;
    setDescription(description: string): this;
    setSpoiler(spoiler: boolean): this;
    setData(data: any): this;
    static from(data: any): AttachmentBuilder;
}
//# sourceMappingURL=Attachment.d.ts.map