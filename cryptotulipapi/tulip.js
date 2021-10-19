const { createSVGWindow } = require('svgdom')
const window = createSVGWindow();
const SVG = require('svgjs')(window)
require('svg.path.js')
const document = window.document;

const PALETTE = ['#ffffff', '#331700', '#295f99', '#ff7f00', '#ffff00', '#7f007f', '#00a833', '#ff0000', '#dbe4ee', '#552900', '#4d79aa', '#dd6e00', '#ffffd4', '#3f1315', '#226b88', '#ff6a00', '#ffff2a', '#72036a', '#069c44', '#ff1500', '#d4f008', '#94006a', '#2ab62a', '#e90015', '#ffd4d4', '#2a3008', '#ffe900', '#710f83', '#ff2a2a', '#08902a', '#ff9400', '#374f94', '#ffffaa', '#4c0f2a', '#ffff55', '#660755', '#ffd400', '#621f88', '#ffaa00', '#463f90', '#ff2a00', '#0d8f55', '#ff5500', '#1b7777', '#ffaaaa', '#224811', '#ff5555', '#117822', '#b7c9dd', '#773a00', '#aae211', '#aa0055', '#d4002a', '#55c522', '#bb5c00', '#7094bb', '#ff3f00', '#148366', '#bf003f', '#7fd319', '#ffbf00', '#542f8c', '#994b00', '#94afcc', '#ffff7f', '#590b3f', '#ff7f7f', '#196019', '#ff8307', '#2f5a83', '#db8301', '#59659f', '#df5b03', '#478394', '#ffe623', '#65156f', '#d5da07', '#881474', '#ff3c23', '#10853c', '#4d4007', '#ddbec9', '#e71211', '#30ac3f', '#d5ee2e', '#8a0658', '#ffd8b1', '#362a1d', '#dae6c7', '#5f2211', '#e72639', '#319f23', '#ffcd1c', '#582674', '#ff9b0e', '#3d487e', '#d7c505', '#7c287f', '#da9902', '#655194', '#b87302', '#7a7baa', '#accb0e', '#a01866', '#ff710e', '#286471', '#715105', '#bca8bf', '#acde32', '#a10946', '#ffe246', '#591a5a', '#5aae1c', '#cf2148', '#bf4d07', '#6c9ca1', '#d6ec55', '#7f0d46', '#38871c', '#e44c5d', '#ffdb8d', '#422531', '#ff4d1c', '#187a4d', '#e14907', '#418e7f', '#d9e8a1', '#6a1b23', '#59bd3b', '#d00f23', '#ffb18d', '#2c4124', '#ff6346', '#196e34', '#46580e', '#e098a5', '#b5cdbb', '#7f300e', '#e5240e', '#36a255', '#ffdf6a', '#4d1f46', '#ff8a6a', '#23582c', '#ffb415', '#4a3779', '#ff5f15', '#206f5f', '#d7ea7b', '#741435', '#e27281', '#3f6f15', '#d8af04', '#703c8a', '#e3370a', '#3b986a', '#b80c35', '#82cd37', '#9f3f0a', '#90b5ae', '#946204', '#9b91b4', '#83bc15', '#b81d57', '#d7d627', '#7e1b62', '#dd740a', '#526f8a', '#dcc3a9', '#573919', '#e53530', '#389538', '#ffb871', '#373a38', '#ffc638', '#4d2d60', '#ff8d1c', '#34526b', '#afb50b', '#963177', '#b58905', '#836299', '#609616', '#ca4366', '#b3d199', '#88261c', '#aed955', '#991338', '#ff7138', '#226546', '#cc1e1c', '#5eb455', '#c33d0e', '#67a488', '#c186a1', '#6b680b', '#ffbf55', '#42334c', '#ff9455', '#2d4f3f', '#ffaa2a', '#403f66', '#ff7f2a', '#2b5b59', '#b0d577', '#901d2a', '#b29f08', '#8d4a88', '#c72e15', '#62ac6e', '#88a611', '#b03a6e', '#c66483', '#667f11', '#a2749d', '#907908', '#b2192a', '#86c755', '#a53215', '#8dbb90', '#b9aea1', '#794815', '#dbc788', '#61312b', '#d8d148', '#752350', '#afc52b', '#982255', '#d8bd20', '#73306c', '#db8c11', '#5d5a80', '#89c172', '#ac251f', '#5fa533', '#cb2f3c', '#de9f8b', '#4f5021', '#ff9f3f', '#374752', '#4b7876', '#df6414', '#3e8b4c', '#e34526', '#407e30', '#e3594e', '#8c8f0c', '#a95785', '#bc650e', '#748492', '#87b52f', '#b22849', '#d9cc68', '#6b2a3d', '#daa519', '#000000', '#684576'];

// constants
const STEM_START = 0;
const STEM_COLOR = 1;
const BACK_COLOR = 2;
const FRONT_COLOR = 3;
const SHAPES = 4;
const ANGLE = 0;
const RADIUS = 1;
const LC = 2;
const RC = 3;
const POINT_SIZE = 4;
const GENOME_LENGTH = 32;
const ANGLE_STEP = 360 / 256.0;
const POLAR_ANGLE_STEP = 360 / 16.0;
const ABS_STEP = 200 / 7.0;
const LINE_WIDTH = 10;


const split = (gene) =>
  [(gene >> 4), (gene & 0x0F)]; // eslint-disable-line no-bitwise

const absPosition = (gene) => {
  const splitted = split(gene);
  return [(splitted[0] - 7) * ABS_STEP, (splitted[1] - 7) * ABS_STEP];
};

const toPolar = (tuple) => {
  const rad = tuple[0] * 10;
  const angle = POLAR_ANGLE_STEP * tuple[1];
  return [rad, angle];
};

const xy = (tuple) => ({ x: tuple[0], y: tuple[1] });

const controlAbs = (controlGene, point) => {
  const polar = toPolar(split(controlGene));
  return [
    point[0] + (polar[0] * Math.cos(toRadians(polar[1]))),
    point[1] + (polar[0] * Math.sin(toRadians(polar[1]))),
  ];
};

const toRadians = (angle) => (angle * (Math.PI / 180));

const stringToGenes = (genestring) => {
  const genestrings = genestring.match(/.{2}/g);
  const offset = genestrings[0] === '0x' ? 1 : 0;
  const genes = new Uint8Array(GENOME_LENGTH);
  for (let i = 0; i < GENOME_LENGTH; i += 1) {
    genes[i] = parseInt(genestrings[i + offset], 16);
  }
  return genes;
};

function drawLine(draw, genes) {
  const start = absPosition(genes[STEM_START]);
  const end = absPosition(101);
  const color = PALETTE[genes[STEM_COLOR]];
  draw.line(start[0], start[1], end[0], end[1])
    .stroke({ width: LINE_WIDTH + 8, linecap: 'round', color: '#000' });
  draw.line(start[0], start[1], end[0], end[1])
      .stroke({ width: LINE_WIDTH, linecap: 'round', color: color });
}

function drawShape(draw, type, genes, curStart = SHAPES) {
  const color = PALETTE[genes[type === 'back' ? BACK_COLOR : FRONT_COLOR]];
  const origin = [0, 0];

  let cur = curStart;
  const path = draw.path()
    .attr({
      stroke: '#000',
      fill: color,
      'stroke-width': 4,
      'stroke-linecap': 'round' });

  let curAngle = genes[cur + ANGLE] * ANGLE_STEP;
  let radius = genes[cur + RADIUS];
  const points = [];
  const lcs = []; // left control points
  const rcs = []; // right control points

  // extract points & controls
  while (curAngle < 360 && cur < GENOME_LENGTH) {
    const x = origin[0] + (radius * Math.cos(toRadians(curAngle)));
    const y = origin[1] + (radius * Math.sin(toRadians(curAngle)));
    points.push([x, y]);
    lcs.push(controlAbs(genes[cur + LC], [x, y]));
    rcs.push(controlAbs(genes[cur + RC], [x, y]));

    cur += POINT_SIZE;
    radius += (genes[cur + RADIUS] - 128) * 0.5;
    curAngle += (genes[cur + ANGLE] * ANGLE_STEP) / 2.0;
  }

  // draw
  if (points.length > 0) {
    path.M({ x: points[0][0], y: points[0][1] });
    for (let i = 1; i <= points.length; i += 1) {
      const p = points[i % points.length];
      const start = rcs[i - 1];
      const end = lcs[i % points.length];
      path.C(xy(start), xy(end), xy(p));
    }
    path.Z();
  }
  return cur;
}

var renderSVG = function(genome, width) {
  const genes = stringToGenes(genome);
  document.documentElement.innerHTML = '';
  const draw = SVG(document.documentElement).size(width, width).viewbox(-256, -256, 512, 512);
  drawLine(draw, genes);
  const cur = drawShape(draw, 'back', genes);
  drawShape(draw, 'front', genes, cur);

  return draw.svg()
}

module.exports.renderSVG = renderSVG;
  