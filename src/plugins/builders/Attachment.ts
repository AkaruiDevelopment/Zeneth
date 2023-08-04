import { getFileData } from "../../utils/helpers.js";

export default class AttachmentBuilder {
    name!: string;
    data!: any;
    description?: string;
    spoiler: boolean = false;
    file!: Blob;
    constructor() {
        this.name = "file";
    }
    async #getFileData() {
        this.file = await getFileData(this.data);
    }

    setName(name: string) {
        this.name = name;
        return this;
    }
    setDescription(description: string) {
        this.description = description;
        return this;
    }
    setSpoiler(spoiler: boolean) {
        this.spoiler = spoiler;
        return this;
    }
    setData(data: any) {
        this.data = data;
        this.#getFileData();
        return this;
    }

    static from(data: any): AttachmentBuilder;
    static from(
        data: any,
        options?: {
            name: string;
            description?: string;
            spoiler?: boolean;
        },
    ): AttachmentBuilder {
        const builder = new AttachmentBuilder();
        builder.setData(data);
        options?.name && builder.setName(options.name);
        options?.description && builder.setDescription(options.description);
        options?.spoiler && builder.setSpoiler(options.spoiler);

        return builder;
    }
}
