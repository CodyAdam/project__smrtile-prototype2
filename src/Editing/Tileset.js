import Tile from "./Tile";

export default class Tileset {
    constructor(source, sourceJSON) {
        this.active = false;
        this.tilesetID = 0;
        this.source = source;
        this.image = new Image();
        this.image.src = this.source;
        const { tileSize, autor, type, data } = JSON.parse(sourceJSON);
        this.tileSize = tileSize;
        this.autor = autor;
        this.type = type;
        this.data = data;
    }

    create(id, pos) {
        return new Tile(this.image, this.tileSize, id, pos, this.data);
    }
}

export class AutoTileset extends Tileset {
    constructor(source, sourceJSON) {
        this.active = false;
        this.tilesetID = 0;
        this.source = source;
        this.image = new Image();
        this.image.src = this.source;
        const { tileSize, autor, type, data } = JSON.parse(sourceJSON);
        this.tileSize = tileSize;
        this.autor = autor;
        this.type = type;
        this.data = data;
    }
}
