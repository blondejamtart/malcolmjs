import splineUtils from './splineUtils';

const pointsMatch = (actual, expected) => {
  const regex = new RegExp('[-\\d.]+,[-\\d.]+', 'g'); // match number pairs ##.###,##.####
  const matches = [];
  let match = regex.exec(actual);
  while (match != null) {
    const point = match[0].split(',');
    matches.push({ x: parseFloat(point[0]), y: parseFloat(point[1]) });
    match = regex.exec(actual);
  }

  expect(matches).toHaveLength(expected.length);
  matches.forEach((actualPoint, i) => {
    expect(actualPoint.x).toBeCloseTo(expected[i].x, 5);
    expect(actualPoint.y).toBeCloseTo(expected[i].y, 5);
  });
};

describe('SplineUtils', () => {
  it('generates spline between two normal points', () => {
    const points = [{ x: 0, y: 0 }, { x: 50, y: 0 }];
    const spline = splineUtils.buildPath(points);

    expect(spline).toHaveLength(1);
    pointsMatch(spline[0], [
      { x: 0, y: 0 },
      { x: 40, y: 0 },
      { x: 10, y: 0 },
      { x: 50, y: 0 },
    ]);
  });

  it('generates spline between two points where the target is behind', () => {
    const points = [{ x: 0, y: 0 }, { x: -200, y: 200 }];
    const spline = splineUtils.buildPath(points);

    expect(spline).toHaveLength(1);
    pointsMatch(spline[0], [
      { x: 0, y: 0 },
      { x: 150, y: 133.333333333 },
      { x: -350, y: 66.666666666 },
      { x: -200, y: 200 },
    ]);
  });

  it('generates loopback spline between two points where the target is behind but at the same level', () => {
    const points = [{ x: 0, y: 0 }, { x: -200, y: 0 }];
    const spline = splineUtils.buildPath(points);

    expect(spline).toHaveLength(19);
    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 4.755089450508175, y: -5.13331147514406 },
      { x: 9.51017890101635, y: -10.26662295028812 },
      { x: 13.598865597232757, y: -15.956575401079094 },
      { x: 13.598865597232757, y: -15.956575401079094 },
      { x: 17.687552293449166, y: -21.64652785187007 },
      { x: 21.10983623537381, y: -27.89312127830795 },
      { x: 22.833569788075668, y: -34.68842920168488 },
      { x: 22.833569788075668, y: -34.68842920168488 },
      { x: 24.557303340777526, y: -41.483737125061815 },
      { x: 24.582486504256597, y: -48.82775954537779 },
      { x: 22.27704228168745, y: -55.318839813544834 },
      { x: 22.27704228168745, y: -55.318839813544834 },
      { x: 19.971598059118303, y: -61.80992008171188 },
      { x: 15.335526450500936, y: -67.44805819773 },
      { x: 9.985552235563071, y: -72.03642226112895 },
      { x: 9.985552235563071, y: -72.03642226112895 },
      { x: 4.635578020625206, y: -76.62478632452789 },
      { x: -1.4282988006331578, y: -80.16337633530772 },
      { x: -7.75784899884375, y: -83.1335529305104 },
      { x: -7.75784899884375, y: -83.1335529305104 },
      { x: -14.087399197054342, y: -86.10372952571309 },
      { x: -20.682622772217172, y: -88.50549270533872 },
      { x: -27.390931973918725, y: -90.5024561399969 },
      { x: -27.390931973918725, y: -90.5024561399969 },
      { x: -34.09924117562028, y: -92.49941957465506 },
      { x: -40.92063600386055, y: -94.09158326434576 },
      { x: -47.79807940064316, y: -95.37915762069616 },
      { x: -47.79807940064316, y: -95.37915762069616 },
      { x: -54.67552279742577, y: -96.66673197704657 },
      { x: -61.60901476275069, y: -97.64971700005671 },
      { x: -68.56834355158165, y: -98.37862254452153 },
      { x: -68.56834355158165, y: -98.37862254452153 },
      { x: -75.52767234041261, y: -99.10752808898636 },
      { x: -82.51283795274955, y: -99.58235415490583 },
      { x: -89.5060862372225, y: -99.81976718786558 },
      { x: -89.5060862372225, y: -99.81976718786558 },
      { x: -96.49933452169546, y: -100.05718022082533 },
      { x: -103.5006654783044, y: -100.05718022082534 },
      { x: -110.49391376277738, y: -99.8197671878656 },
      { x: -110.49391376277738, y: -99.8197671878656 },
      { x: -117.48716204725037, y: -99.58235415490584 },
      { x: -124.47232765958736, y: -99.10752808898633 },
      { x: -131.4316564484183, y: -98.3786225445215 },
      { x: -131.4316564484183, y: -98.3786225445215 },
      { x: -138.39098523724923, y: -97.64971700005668 },
      { x: -145.32447720257414, y: -96.66673197704654 },
      { x: -152.20192059935675, y: -95.37915762069616 },
      { x: -152.20192059935675, y: -95.37915762069616 },
      { x: -159.07936399613936, y: -94.09158326434579 },
      { x: -165.90075882437966, y: -92.49941957465511 },
      { x: -172.60906802608122, y: -90.50245613999695 },
      { x: -172.60906802608122, y: -90.50245613999695 },
      { x: -179.31737722778277, y: -88.5054927053388 },
      { x: -185.91260080294563, y: -86.10372952571319 },
      { x: -192.24215100115623, y: -83.13355293051046 },
      { x: -192.24215100115623, y: -83.13355293051046 },
      { x: -198.57170119936683, y: -80.16337633530773 },
      { x: -204.6355780206252, y: -76.62478632452792 },
      { x: -209.98555223556303, y: -72.03642226112896 },
      { x: -209.98555223556303, y: -72.03642226112896 },
      { x: -215.33552645050088, y: -67.44805819773 },
      { x: -219.97159805911826, y: -61.80992008171189 },
      { x: -222.27704228168744, y: -55.318839813544855 },
      { x: -222.27704228168744, y: -55.318839813544855 },
      { x: -224.58248650425662, y: -48.82775954537782 },
      { x: -224.55730334077748, y: -41.483737125061836 },
      { x: -222.8335697880757, y: -34.68842920168492 },
      { x: -222.8335697880757, y: -34.68842920168492 },
      { x: -221.1098362353739, y: -27.893121278308 },
      { x: -217.6875522934492, y: -21.64652785187014 },
      { x: -213.59886559723276, y: -15.956575401079164 },
      { x: -213.59886559723276, y: -15.956575401079164 },
      { x: -209.51017890101633, y: -10.266622950288186 },
      { x: -204.75508945050817, y: -5.133311475144093 },
      { x: -200, y: 0 },
    ];

    for (let i = 0; i < 19; i += 1) {
      pointsMatch(spline[i], expectedPoints.slice(i * 4, (i + 1) * 4));
    }
  });

  it('generates spline between three normal points', () => {
    const points = [{ x: 0, y: 0 }, { x: 200, y: 200 }, { x: 400, y: 0 }];
    const spline = splineUtils.buildPath(points);

    expect(spline).toHaveLength(2);
    pointsMatch(spline[0], [
      { x: 0, y: 0 },
      { x: 66.66666666667, y: 100 },
      { x: 133.333333333, y: 200 },
      { x: 200, y: 200 },
    ]);

    pointsMatch(spline[1], [
      { x: 200, y: 200 },
      { x: 266.666666666, y: 200 },
      { x: 333.333333333, y: 100 },
      { x: 400, y: 0 },
    ]);
  });

  it('generates spline between four normal points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 200, y: 200 },
      { x: 400, y: 0 },
      { x: 600, y: -200 },
    ];
    const spline = splineUtils.buildPath(points);

    expect(spline).toHaveLength(3);
    pointsMatch(spline[0], [
      { x: 0, y: 0 },
      { x: 66.66666666667, y: 102.2222222 },
      { x: 133.333333333, y: 204.44444444 },
      { x: 200, y: 200 },
    ]);

    pointsMatch(spline[1], [
      { x: 200, y: 200 },
      { x: 266.666666666, y: 195.55555555 },
      { x: 333.333333333, y: 84.444444444 },
      { x: 400, y: 0 },
    ]);

    pointsMatch(spline[2], [
      { x: 400, y: 0 },
      { x: 466.666666666, y: -84.44444444 },
      { x: 533.333333333, y: -142.22222222 },
      { x: 600, y: -200 },
    ]);
  });
});
