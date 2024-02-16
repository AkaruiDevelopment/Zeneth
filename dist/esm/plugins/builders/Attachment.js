import { getFileData } from "../../utils/helpers.js";
export default class AttachmentBuilder {
    name;
    data;
    description;
    spoiler = false;
    file;
    constructor() {
        this.name = "file";
    }
    async #getFileData() {
        this.file = await getFileData(this.data);
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setSpoiler(spoiler) {
        this.spoiler = spoiler;
        return this;
    }
    setData(data) {
        this.data = data;
        this.#getFileData();
        return this;
    }
    static from(data, options) {
        const builder = new AttachmentBuilder();
        builder.setData(data);
        options?.name && builder.setName(options.name);
        options?.description && builder.setDescription(options.description);
        options?.spoiler && builder.setSpoiler(options.spoiler);
        return builder;
    }
}
//# sourceMappingURL=Attachment.js.map