import Box from './Box.js';

function checkIndividualBoxFit(box, perimeter, spacing) {
    // Check if an individual box fits within the perimeter with spacing
	return box.width + 2 * spacing <= perimeter.width && box.height + 2 * spacing <= perimeter.height;
}

function checkCombinedBoxAreaFit(boxes, perimeter, spacing) {
    // Naive area check without spacing

	let totalArea = 0;
	Object.keys(boxes).forEach(key => {
		totalArea += (boxes[key].width * boxes[key].height);
        
        // A box will have a minimum of 2 sides exposed to spacing
        // We take the minimum of width and height to ensure we don't overestimate
        totalArea += spacing*Math.min(boxes[key].width, boxes[key].height) * 2; 
	});
	console.log(`Total area with spacing: ${totalArea}`);
	return totalArea <= (perimeter.width * perimeter.height);
}

function boxesOverlap(box1, box2, spacing) {
    return !(box1.right + spacing <= box2.x || box2.right + spacing <= box1.x ||
             box1.top + spacing <= box2.y || box2.top + spacing <= box1.y);
}


// Check if all boxes are within boundary and don't overlap
function isValidPlacement(boxes, boundary, spacing) {
    for (const box of boxes) {
        if (box.x - spacing < 0 || box.y - spacing < 0 ||
            box.right + spacing > boundary.width || 
            box.top + spacing > boundary.height) {
            return false;
        }
    }

    // Check all pairs for overlaps
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            if (boxesOverlap(boxes[i], boxes[j], spacing)) {
                return false;
            }
        }
    }
    return true;
}

function tryAllPlacements(boxes, boundary, spacing) {
    const boxList = Object.values(boxes);
    const keys = Object.keys(boxes);
    const permutations = [
        [0, 1, 2], [0, 2, 1], [1, 0, 2],
        [1, 2, 0], [2, 0, 1], [2, 1, 0]
    ];

    for (const perm of permutations) {
        const tempBoxes = [
            new Box(boxList[perm[0]].width, boxList[perm[0]].height),
            new Box(boxList[perm[1]].width, boxList[perm[1]].height),
            new Box(boxList[perm[2]].width, boxList[perm[2]].height)
        ];

        // Try placing first box in bottom-left corner
        tempBoxes[0].x = spacing;
        tempBoxes[0].y = spacing;

        // Try placing second box to the right or above first box
        const options = [
            { x: tempBoxes[0].right + spacing, y: spacing }, // Right
            { x: spacing, y: tempBoxes[0].top + spacing }    // Above
        ];

        for (const opt of options) {
            tempBoxes[1].x = opt.x;
            tempBoxes[1].y = opt.y;

            // Try placing third box in remaining space
            const thirdOptions = [
                { x: tempBoxes[0].right + spacing, y: tempBoxes[1].top + spacing },
                { x: tempBoxes[1].right + spacing, y: spacing },
                { x: spacing, y: tempBoxes[1].top + spacing },
                { x: tempBoxes[1].right + spacing, y: tempBoxes[0].top + spacing }
            ];

            for (const thirdOpt of thirdOptions) {
                tempBoxes[2].x = thirdOpt.x;
                tempBoxes[2].y = thirdOpt.y;

                if (isValidPlacement(tempBoxes, boundary, spacing)) {
                    // Return the boxes in original key order
                    const result = {
						[keys[perm[0]]]: tempBoxes[0],
						[keys[perm[1]]]: tempBoxes[1],
						[keys[perm[2]]]: tempBoxes[2]
					};
                    return result;
                }
            }
        }
    }
    return null; // No valid placement found
}

function checkBoxesFit(boxes, perimeter, spacing){
	// boxes = {'A': Box(), 'B': Box(), ...}
    for (const key of Object.keys(boxes)) {
        if (!checkIndividualBoxFit(boxes[key], perimeter, spacing)) {
            return { 
                success: false, 
                errorMsg: `Box ${key} is too large to fit inside the boundary with required spacing.` 
            };
        }
    }

	if (!checkCombinedBoxAreaFit(boxes, perimeter, spacing)) {
        return { 
            success: false, 
            errorMsg: 'Combined boxes\' area exceed available boundary area.' 
        };
	}

	let validPlacement = tryAllPlacements(boxes, perimeter, spacing);
	if (validPlacement) {
		return {
			success: true,
			placement: validPlacement,
            perimeter: perimeter
		};
	}

    return { 
        success: false, 
        errorMsg: 'Placement impossible: insufficient space to avoid box overlap.' 
    };
}

export default checkBoxesFit;