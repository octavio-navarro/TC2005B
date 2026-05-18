/*
* Definition of the Level class
* This reads a string with the design of a game area, and translates
* each character into a corresponding object.
*
* Gilberto Echeverria
* 2025-04-03
*/

class Level {
    // Read a string with the description of the objects in the level
    constructor(plan) {
        // Split the plan string into a matrix of strings
        let rows = plan.trim().split('\n').map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.actors = [];
        this.enemies = [];

        // Fill the rows array with a label for the type of element in the cell
        // Most cells are 'empty', except for the 'wall'
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let item = levelChars[ch];
                let objClass = item.objClass;
                let cellType = item.label;
                // Create a new instance of the type specified
                let actor = new objClass("grey", 1, 1, x, y, item.label);
                // Configurations for each type of cell
                if (actor.type == "player") {
                    this.configureAnimatedObject(item, actor, x, y);
                    this.player = actor;
                    cellType = "empty";
                } else if (actor.type == "coin") {
                    this.configureAnimatedObject(item, actor, x, y);
                    this.actors.push(actor);
                    cellType = "empty";
                } else if (actor.type == "enemy") {
                    this.configureAnimatedObject(item, actor, x, y);
                    this.enemies.push(actor);
                    cellType = "empty";
                } else if (actor.type == "wall") {
                    // Randomize sprites for each wall tile
                    let instanceRect = this.randomTile(31, 10, 17);     // green broken bricks
                    //let instanceRect = this.randomTile(2, 3, 19);     // grey bricks with ivy
                    actor.setSprite(item.sprite, instanceRect);
                    this.actors.push(actor);
                    cellType = "wall";
                } else if (actor.type == "floor") {
                    // Randomize sprites for each wall tile
                    let instanceRect = this.randomTile(11, 4, 17);     // beige dirt
                    actor.setSprite(item.sprite, instanceRect);
                    this.actors.push(actor);
                    cellType = "floor";
                }
                return cellType;
            });
        });
    }

    configureAnimatedObject(item, actor, x, y) {
        // Also instantiate a floor tile behind the object
        this.addBackgroundFloor(x, y);
        // Need to create a new instance of Rect for each item
        let instanceRect = new Rect(...item.rectParams);
        actor.setSprite(item.sprite, instanceRect);
        actor.sheetCols = item.sheetCols;
        actor.setAnimation(...item.startFrame, true, 100);
    }

    addBackgroundFloor(x, y) {
        let floor = levelChars['.'];
        let floorActor = new GameObject("grey", 1, 1, x, y, floor.label);
        let instanceRect = this.randomTile(11, 4, 17);     // beige dirt
        floorActor.setSprite(floor.sprite, instanceRect);
        this.actors.push(floorActor);
    }

    // Randomize sprites for each wall tile
    randomTile(xStart, xRange, y) {
        let tile = Math.floor(Math.random() * xRange + xStart);
        return new Rect(tile, y, 32, 32);
    }

    // Detect when the player touches a wall of the level
    contact(playerPos, playerSize, type) {
        // Determine which cells the player is occupying
        let xStart = Math.floor(playerPos.x);
        let xEnd = Math.ceil(playerPos.x + playerSize.x);
        let yStart = Math.floor(playerPos.y);
        let yEnd = Math.ceil(playerPos.y + playerSize.y);

        // Check each of those cells
        for (let y=yStart; y<yEnd; y++) {
            for (let x=xStart; x<xEnd; x++) {
                // Anything outside of the bounds of the canvas is considered
                // to be a wall, so it blocks the player's movement
                let isOutside = x < 0 || x >= this.width ||
                                y < 0 || y >= this.height;
                let here = isOutside ? 'wall' : this.rows[y][x];
                // Detect if an object of type specified is being touched
                if (here == type) return true;
            }
        }
        return false;
    }
}


