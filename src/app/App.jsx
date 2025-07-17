"use client";

import React from 'react';
import InputForm from './Input';
import ResultGrid from './ResultGrid';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

function App() {
	const [placementBoxes, setValidPlacementBoxes] = React.useState(null);
	return (
		<div>
			<Navbar className="bg-body-tertiary" data-bs-theme="dark">
				<Container>
					<Navbar.Brand>Box fitter</Navbar.Brand>
				</Container>
			</Navbar>
			<InputForm setValidPlacementBoxes={setValidPlacementBoxes} />
			<div style={{ border: '1px solid black' }}>
				{placementBoxes && placementBoxes.success && (
					<div>
						<Card
							bg={'success'}
							key={'success'}
							text={'white'}
							style={{ width: '20rem', alignContent: 'center', margin: '20px auto' }}
							className="mb-2"
						>
							<Card.Body>
								<Card.Title> Placement successful </Card.Title>
								<Card.Text>
									<h4>Box Coordinates</h4>
									<ul>
										{Object.keys(placementBoxes.placement).map(key => (
											<li key={key}>
												<b>Box {key}</b>: ({placementBoxes.placement[key].x}, {placementBoxes.placement[key].y}) -  
												{placementBoxes.placement[key].width } ft x {placementBoxes.placement[key].height} ft
											</li>
										))}
									</ul>
								</Card.Text>
							</Card.Body>
						</Card>
						<ResultGrid
							result={placementBoxes} 
							style={{ display: 'block', margin: 'auto', padding: '20px' }}
							/>
					</div>
				)}
				{placementBoxes && !placementBoxes.success && (
					<Card
						bg={'danger'}
						key={'danger'}
						text={'white'}
						style={{ width: '20rem', alignContent: 'center', margin: '20px auto' }}
						className="mb-2"
					>
						<Card.Body>
							<Card.Title> Failure </Card.Title>
							<Card.Text>
								{placementBoxes.errorMsg || 'An error occurred while trying to fit the boxes.'}
							</Card.Text>
						</Card.Body>
					</Card>
				)}
			</div>
		</div>
	);
}

export default App;