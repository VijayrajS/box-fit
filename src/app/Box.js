class Box {
	constructor(width, height, coords = [null, null]) {
		this.width = width;
		this.height = height;
		this.x = coords[0];
		this.y = coords[1];
	}
	
	get right() {
        return this.x + this.width;
    }

    get top() {
        return this.y + this.height;
    }
}

export default Box;
