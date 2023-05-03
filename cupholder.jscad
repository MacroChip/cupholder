const jscad = require('@jscad/modeling')
const { cuboid, roundedCuboid, cylinder } = jscad.primitives
const { intersect, subtract, union } = jscad.booleans;
const { center, rotateX, translate } = jscad.transforms;

const getParameterDefinitions = () => {
  return [
    {name: 'cupholderOuterDiameter', caption: 'Outer width of cupholder:', type: 'float', initial: 30},
    {name: 'wallThickness', caption: 'Wall Thickness:', type: 'float', initial: 2},
    {name: 'cupholderHeight', caption: 'Cupholder height:', type: 'float', initial: 30},
   ];
};

const main = (params) => {
  const cupholderOuterRadius = params.cupholderOuterDiameter / 2.0;
  const cupholder = subtract(
    outerCupholder(cupholderOuterRadius, params),
    innerCupholder(cupholderOuterRadius, params)
  );
  const legs = makeLegs(params);
  return union(cupholder, legs);
}

const makeLegs = (params) => {
  return union(
    translate([0, 0, -params.cupholderHeight / 2.0], cuboid({size: [5, 80, 5]})),
    translate([0, 0, -params.cupholderHeight / 2.0], cuboid({size: [80, 5, 5]})),
  );
}

const outerCupholder = (cupholderOuterRadius, params) => {
	return cylinder({ radius: cupholderOuterRadius, height: params.cupholderHeight });
}

const innerCupholder = (cupholderOuterRadius, params) => {
	return cylinder({ radius: cupholderOuterRadius - params.wallThickness, height: params.cupholderHeight });
}

module.exports = { main, getParameterDefinitions }
