"use client";

import React from 'react';

function ResultGrid(result) {
	if (!result || !result.result) {
		return <div></div>;
	}

	const perimeter = result.result.perimeter;
	const scale = Math.min(600 / perimeter.width, 400 / perimeter.height);
    const canvasWidth = perimeter.width * scale;
    const canvasHeight = perimeter.height * scale;

	const boxes = result.result.placement;
	const boxColors = {
		'A': '#007bff',
		'B': '#28a745',
		'C': '#dc3545'
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', padding: '20px' }}>
			<svg width={canvasWidth} height={canvasHeight} style={{ border: "2px solid #333", display: "block" }}>
				<rect
					x={0}
					y={0}
					width={canvasWidth}
					height={canvasHeight}
					fill="#f0f0f0"
					stroke="#333"
					strokeWidth={2}
				/>
				{Object.keys(boxes).map(key => {
					const box = boxes[key];
					const x = box.x * scale;
					const y = box.y * scale;
					const width = box.width * scale;
					const height = box.height * scale;

					return (
						<g key={key}>
							<rect
								x={x}
								y={y}
								width={width}
								height={height}
								fill={boxColors[key]}
								stroke="#333"
								strokeWidth={2}
							/>
							<text
								x={x + width / 2}
								y={y + height / 2}
								textAnchor="middle"
								dominantBaseline="middle"
								fill="#fff"
								fontSize={Math.max(12, Math.min(width, height) / 3)}
								fontWeight="bold"
							>
								{key}
							</text>
						</g>
					);
				})}
			</svg>
		</div>
	);
}

export default ResultGrid;
