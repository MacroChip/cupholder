const jscad = require('@jscad/modeling')
const { cuboid, roundedCuboid, cylinder } = jscad.primitives
const { intersect, subtract, union } = jscad.booleans;
const { center, rotateX, translate } = jscad.transforms;

const getParameterDefinitions = () => {
  return [
    {name: 'cupholderOuterDiameter', caption: 'Outer width of cupholder:', type: 'float', initial: 880},
    {name: 'wallThickness', caption: 'Wall Thickness:', type: 'float', initial: 40},
    {name: 'cupholderHeight', caption: 'Cupholder height:', type: 'float', initial: 800},
    {name: 'legLength', caption: 'Leg Length:', type: 'float', initial: 2200},
    {name: 'legHeight', caption: 'Leg Height (and width):', type: 'float', initial: 140},
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
    translate([0, 0, -params.cupholderHeight / 2.0], cuboid({size: [params.legHeight, params.legLength, params.legHeight]})),
    translate([0, 0, -params.cupholderHeight / 2.0], cuboid({size: [params.legLength, params.legHeight, params.legHeight]})),
  );
}

const outerCupholder = (cupholderOuterRadius, params) => {
	return cylinder({ radius: cupholderOuterRadius, height: params.cupholderHeight });
}

const innerCupholder = (cupholderOuterRadius, params) => {
	return cylinder({ radius: cupholderOuterRadius - params.wallThickness, height: params.cupholderHeight });
}

module.exports = { main, getParameterDefinitions }
