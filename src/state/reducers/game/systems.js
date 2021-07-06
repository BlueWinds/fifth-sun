import {progressAllOrbits} from '@lib/orbits'
import survey from '@lib/survey'

export default function systems(state = defaultState, action) {
  switch (action.type) {
    case 'PASS_TIME':
      return progressAllOrbits(action.duration, state)
    default:
      return state
  }
}

// Planetary masses, radii: https://ssd.jpl.nasa.gov/?planet_phys_par
// Plantary orbits: https://ssd.jpl.nasa.gov/txt/p_elem_t1.txt, https://ssd.jpl.nasa.gov/?planet_pos
// Moon masses, radii: https://ssd.jpl.nasa.gov/?sat_phys_par
// Moon orbits: https://ssd.jpl.nasa.gov/?sat_elem

// Asteroid masses: https://space.fandom.com/wiki/List_of_solar_system_objects_by_mass

const AU = 149.6e9
const DAY = 3600 * 24

const EARTH_RADIUS = 6371e3

const defaultState = {
  SolSystem: {
    galacticPosition: [0, 0],
    displayName: 'Sol System',
    type: 'StarSystem',
    objects: {
      Sol: {
        displayName: 'Sol',
        type: 'Star',
        params: {
          mass: 1.988e30,
          radius: 696.342e6,
          color: '#FFF',
          atmosphereColor: '#FFF',
          atmosphereDepth: 15e9,
        },
        objects: {
          Mercury: {
            displayName: 'Mercury',
            type: 'Planet',
            params: {
              semiMajor:  0.38709927 * AU,
              eccentricity: 0.205630,
              argPeriapsis: 77.45779628 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 7600530,
              mass: 0.330114e24,
              radius: 2439.7e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Venus: {
            displayName: 'Venus',
            type: 'Planet',
            params: {
              semiMajor:  0.72333566 * AU,
              eccentricity: 0.006772,
              argPeriapsis: 131.60246718 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 224.701 * DAY,
              mass: 4.8675e24,
              radius: 6051.8e3,
              color: '#cbb186',
              atmosphereColor: '#b48b5d',
              atmosphereDepth: 300e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Earth: survey({
            displayName: 'Earth',
            type: 'Planet',
            params: {
              semiMajor:  AU,
              eccentricity: 0.01671123,
              argPeriapsis: 102.93768193 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 365.256 * DAY,
              mass: 5.97237e24,
              radius: EARTH_RADIUS,
              color: '#284b6f',
              atmosphereColor: '#2f8bdb',
              atmosphereDepth: 270e3,
            },
            resources: {
              surveyed: 0,
              minerals: {},
            },
            objects: {
              Luna: {
                displayName: 'Luna',
                type: 'Moon',
                params: {
                  semiMajor:  384400e3,
                  eccentricity: 0.0544,
                  argPeriapsis: 318.15 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 27.321 * DAY,
                  mass: 7.342e22,
                  radius: 1737.1e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
            },
          }, EARTH_RADIUS * EARTH_RADIUS * 4 * Math.PI, Math.random),
          Mars: {
            displayName: 'Mars',
            type: 'Planet',
            params: {
              semiMajor:  1.52371 * AU,
              eccentricity: 0.0933941,
              argPeriapsis: (360 - 23.94362959) / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 686.971 * DAY,
              mass: 0.641712e24,
              radius: 3389.5e3,
              color: '#835521',
              atmosphereColor: '#c69241',
              atmosphereDepth: 100e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {
              Phobos: {
                displayName: 'Phobos',
                type: 'Moon',
                params: {
                  semiMajor: 9376e3,
                  eccentricity: 0.0151,
                  argPeriapsis: 150.057 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 0.31891023 * DAY,
                  mass: 1.0659e16,
                  radius: 11.27e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Demos: {
                displayName: 'Demos',
                type: 'Moon',
                params: {
                  semiMajor: 23458e3,
                  eccentricity: 0.0002,
                  argPeriapsis: 260.729 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 1.263 * DAY,
                  mass: 1.4762e15,
                  radius: 6.2e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
            },
          },
          Jupiter: {
            displayName: 'Jupiter',
            type: 'Planet',
            params: {
              semiMajor:  5.202887 * AU,
              eccentricity: 0.04838624,
              argPeriapsis: 14.72847983 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 4332.59 * DAY,
              mass: 1898.187e24,
              radius: 69911e3,
              color: '#e49959',
              atmosphereColor: '#e49959',
              atmosphereDepth: 10000e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {
              Amalthea: {
                displayName: 'Amalthea',
                type: 'Moon',
                params: {
                  semiMajor: 181366e3,
                  eccentricity: 0.0032,
                  argPeriapsis: 155.873 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 0.498 * DAY,
                  mass: 208e16,
                  radius: 167e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Thebe: {
                displayName: 'Thebe',
                type: 'Moon',
                params: {
                  semiMajor: 221900e3,
                  eccentricity: 0.0176,
                  argPeriapsis: 234.269 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 0.675 * DAY,
                  mass: 43e16,
                  radius: 98.6e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Io: {
                displayName: 'Io',
                type: 'Moon',
                params: {
                  semiMajor: 421800e3,
                  eccentricity: 0.0041,
                  argPeriapsis: 84.129 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 1.769 * DAY,
                  mass: 8931900e16,
                  radius: 3643.2e3 / 2,
                  color: '#fffba1',
                  atmosphereColor: '#a09c38',
                  atmosphereDepth: 1e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Europa: {
                displayName: 'Europa',
                type: 'Moon',
                params: {
                  semiMajor: 671100e3,
                  eccentricity: 0.0094,
                  argPeriapsis: 88.970 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 3.551 * DAY,
                  mass: 4800000e16,
                  radius: 3121.6e3 / 2,
                  color: '#90693e',
                  atmosphereColor: '#b0b6a8',
                  atmosphereDepth: 1e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Ganymede: {
                displayName: 'Ganymede',
                type: 'Moon',
                params: {
                  semiMajor: 1070400e3,
                  eccentricity: 0.0013,
                  argPeriapsis: 192.417 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 7.155 * DAY,
                  mass: 14819000e16,
                  radius: 5262.4e3 / 2,
                  color: '#948371',
                  atmosphereColor: '#dfcac5',
                  atmosphereDepth: 1e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Callisto: {
                displayName: 'Callisto',
                type: 'Moon',
                params: {
                  semiMajor: 1882700e3,
                  eccentricity: 0.0074,
                  argPeriapsis: 52.643 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 16.69 * DAY,
                  mass: 10759000e16,
                  radius: 4820.6e3 / 2,
                  color: '#473b2d',
                  atmosphereColor: '#566967',
                  atmosphereDepth: 1e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Himalia: {
                displayName: 'Himalia',
                type: 'Moon',
                params: {
                  semiMajor: 11460000e3,
                  eccentricity: 0.1586,
                  argPeriapsis: 331.234 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 250.56 * DAY,
                  mass: 420e16,
                  radius: 139.6e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Elara: {
                displayName: 'Elara',
                type: 'Moon',
                params: {
                  semiMajor: 11740000e3,
                  eccentricity: 0.2108,
                  argPeriapsis: 142.001 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 259.64 * DAY,
                  mass: 87e16,
                  radius: 79.9e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
            },
          },
          Saturn: {
            displayName: 'Saturn',
            type: 'Planet',
            params: {
              semiMajor:  9.53667594 * AU,
              eccentricity: 0.05386179,
              argPeriapsis: 92.59887831 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 10759.22 * DAY,
              mass: 568.336e24,
              radius: 58232e3,
              color: '#cfb289',
              atmosphereColor: '#cfb289',
              atmosphereDepth: 10000e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {
              Titan: {
                displayName: 'Titan',
                type: 'Moon',
                params: {
                  semiMajor: 1221865e3,
                  eccentricity: 0.0288,
                  argPeriapsis: 180.532 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 15.95 * DAY,
                  mass: 134520e18,
                  radius: 5149.46e3 / 2,
                  color: '#244357',
                  atmosphereColor: '#c08567',
                  atmosphereDepth: 500e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Rhea: {
                displayName: 'Rhea',
                type: 'Moon',
                params: {
                  semiMajor: 527068e3,
                  eccentricity: 0.0002,
                  argPeriapsis: 241.619	 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 4.518 * DAY,
                  mass: 2306518e15,
                  radius: 1527.6e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Iaptus: {
                displayName: 'Iaptus',
                type: 'Moon',
                params: {
                  semiMajor: 3560854e3,
                  eccentricity: 0.0293,
                  argPeriapsis: 271.606 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 79.33 * DAY,
                  mass: 1805635e15,
                  radius: 1468.6e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Dione: {
                displayName: 'Dione',
                type: 'Moon',
                params: {
                  semiMajor: 377415e3,
                  eccentricity: 0.0022,
                  argPeriapsis: 284.315 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 2.737 * DAY,
                  mass: 1095452e15,
                  radius: 1122.8e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Tethys: {
                displayName: 'Tethys',
                type: 'Moon',
                params: {
                  semiMajor: 294672e3,
                  eccentricity: 0.0001,
                  argPeriapsis: 45.202 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 1.888 * DAY,
                  mass: 617449e15,
                  radius: 1062.2e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Enceladus: {
                displayName: 'Enceladus',
                type: 'Moon',
                params: {
                  semiMajor: 238042e3,
                  eccentricity: 0,
                  argPeriapsis: 0,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 1.370 * DAY,
                  mass: 108022e15,
                  radius: 504.2e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Mimas: {
                displayName: 'Mimas',
                type: 'Moon',
                params: {
                  semiMajor: 185539e3,
                  eccentricity: 0.0196,
                  argPeriapsis: 332.499 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 0.942 * DAY,
                  mass: 37493e15,
                  radius: 396.4e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Phoebe: {
                displayName: 'Phoebe',
                type: 'Moon',
                params: {
                  semiMajor: 12947918e3,
                  eccentricity: 0.1634,
                  argPeriapsis: 342.5 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 548.02 * DAY,
                  mass: 8292e15,
                  radius: 213e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Hyperion: {
                displayName: 'Hyperion',
                type: 'Moon',
                params: {
                  semiMajor: 1500933e3,
                  eccentricity: 0.0232,
                  argPeriapsis: 303.178 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 21.28 * DAY,
                  mass: 5619.9e15,
                  radius: 270e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Janus: {
                displayName: 'Janus',
                type: 'Moon',
                params: {
                  semiMajor: 151450e3,
                  eccentricity: 0.0098,
                  argPeriapsis: 16.012 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 0.695 * DAY,
                  mass: 1897.5e15,
                  radius: 179e3 / 2,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
            },
          },
          Uranus: {
            displayName: 'Uranus',
            type: 'Planet',
            params: {
              semiMajor: 19.18916464 * AU,
              eccentricity: 0.04725744,
              argPeriapsis: 170.9542763 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 30688.5 * DAY,
              mass: 86.8127e24,
              radius: 25362e3,
              color: '#c4eaed',
              atmosphereColor: '#c4eaed',
              atmosphereDepth: 5000e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {
              Titania: {
                displayName: 'Titania',
                type: 'Moon',
                params: {
                  semiMajor: 435910e3,
                  eccentricity: 0.0011,
                  argPeriapsis: 284.40 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 8.706 * DAY,
                  mass: 3.4e21,
                  radius: 788.4e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Oberon: {
                displayName: 'Oberon',
                type: 'Moon',
                params: {
                  semiMajor: 583520e3,
                  eccentricity: 0.0014,
                  argPeriapsis: 104.4 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 13.463 * DAY,
                  mass: 3.076e21,
                  radius: 761.4e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Ariel: {
                displayName: 'Ariel',
                type: 'Moon',
                params: {
                  semiMajor: 191020e3,
                  eccentricity: 0.0012,
                  argPeriapsis: 115.349 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 2.52 * DAY,
                  mass: 1.251e21,
                  radius: 578.9e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Umbriel: {
                displayName: 'Umbriel',
                type: 'Moon',
                params: {
                  semiMajor: 266000e3,
                  eccentricity: 0.0039,
                  argPeriapsis: 84.709 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 4.144 * DAY,
                  mass: 1.275e21,
                  radius: 584.7e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Miranda: {
                displayName: 'Miranda',
                type: 'Moon',
                params: {
                  semiMajor: 129390e3,
                  eccentricity: 0.0013,
                  argPeriapsis: 68.312 / 180 * Math.PI,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 1.413479 * DAY,
                  mass: 6.4e19,
                  radius: 235.8e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Puck: {
                displayName: 'Puck',
                type: 'Moon',
                params: {
                  semiMajor: 86004e3,
                  eccentricity: 0.00012,
                  argPeriapsis: 0,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 0.76183287 * DAY,
                  mass: 2.9e18,
                  radius: 81e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Sycorax: {
                displayName: 'Sycorax',
                type: 'Moon',
                params: {
                  semiMajor: 12193230e3,
                  eccentricity: 0.4841889,
                  argPeriapsis: 16.2968 / 180 * Math.PI, // ???
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 1286.28 * DAY,
                  mass: 2.5e18,
                  radius: 80e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
              Portia: {
                displayName: 'Portia',
                type: 'Moon',
                params: {
                  semiMajor: 66097.e3,
                  eccentricity: 0.00005,
                  argPeriapsis: 0,
                  eccentricAnomaly: Math.random() * Math.PI * 2,
                  orbitalPeriod: 0.5132 * DAY,
                  mass: 1.7e18,
                  radius: 67.6e3,
                },
                resources: {surveyed: 0, minerals: {}},
                objects: {},
              },
            },
          },
          Neptune: {
            displayName: 'Neptune',
            type: 'Planet',
            params: {
              semiMajor: 30.06992276 * AU,
              eccentricity: 0.00859048,
              argPeriapsis: 44.964762273 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 60182 * DAY,
              mass: 102.4126e24,
              radius: 24622e3,
              color: '#4469fc',
              atmosphereColor: '#4469fc',
              atmosphereDepth: 5000e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {
//               Triton
//               Proteus
//               Nereid
//               Larissa
//               Galatea
//               Despina
            },
          },
          Eris: {
            displayName: 'Eris',
            type: 'Planet',
            params: {
              semiMajor: 67.864 * AU,
              eccentricity: 0.43607,
              argPeriapsis: 151.63 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 204199 * DAY,
              mass: 1.6466e22,
              radius: 1163e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Pluto: {
            displayName: 'Pluto',
            type: 'Planet',
            params: {
              semiMajor: 39.482  * AU,
              eccentricity: 0.2488,
              argPeriapsis: 113.834 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 90560 * DAY,
              mass: 1.303e22,
              radius: 1188.3e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Haumea: {
            displayName: 'Haumea',
            type: 'Planet',
            params: {
              semiMajor: 43.182 * AU,
              eccentricity: 0.19489,
              argPeriapsis: 238.778 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 103647 * DAY,
              mass: 4.006e21,
              radius: 780e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Quaoar: {
            displayName: 'Quaoar',
            type: 'Planet',
            params: {
              semiMajor: 43.694 * AU,
              eccentricity: 0.04106,
              argPeriapsis: 147.48 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 105495 * DAY,
              mass: 1.4e21,
              radius: 555e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {
            },
          },
          Ceres: {
            displayName: 'Ceres',
            type: 'Planet',
            params: {
              semiMajor: 2.769 * AU,
              eccentricity: 0.076,
              argPeriapsis: 73.597 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 1683.145 * DAY,
              mass: 9.3835e20,
              radius: 469.73e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Orcus: {
            displayName: 'Orcus',
            type: 'Planet',
            params: {
              semiMajor: 39.174 * AU,
              eccentricity: 0.22701,
              argPeriapsis: 72.31 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 89557 * DAY,
              mass: 6.348e20,
              radius: 915e3 / 2,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '20000 Varuna': {
            displayName: '20000 Varuna',
            type: 'Planet',
            params: {
              semiMajor: 42.718 * AU,
              eccentricity: 0.05617,
              argPeriapsis: 262.22 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 101980 * DAY,
              mass: 1.55e20,
              radius: 678e3 / 2,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {
            },
          },
          Vesta: {
            displayName: 'Vesta',
            type: 'Planet',
            params: {
              semiMajor: 2.36179 * AU,
              eccentricity: 0.08874,
              argPeriapsis: 151.198 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 1325.75 * DAY,
              mass: 2.59e20,
              radius: 262.5e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Pallas: {
            displayName: 'Pallas',
            type: 'Planet',
            params: {
              semiMajor: 2.773 * AU,
              eccentricity: 0.23,
              argPeriapsis: 310.202 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 1687.4 * DAY,
              mass: 2.04e20,
              radius: 256e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Hygiea: {
            displayName: 'Hygiea',
            type: 'Planet',
            params: {
              semiMajor: 3.1415 * AU,
              eccentricity: 0.1125,
              argPeriapsis: 312.32 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 2033.8 * DAY,
              mass: 8.32e19,
              radius: 217e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '704 Interamnia': {
            displayName: '704 Interamnia',
            type: 'Planet',
            params: {
              semiMajor: 3.0575 * AU,
              eccentricity: 0.15431,
              argPeriapsis: 95.208 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 1952.8 * DAY,
              mass: 3.79e19,
              radius: 166e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '52 Europa': {
            displayName: '52 Europa',
            type: 'Planet',
            params: {
              semiMajor: 3.101 * AU,
              eccentricity: 0.102,
              argPeriapsis: 343.553 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 1994.6 * DAY,
              mass: 2.26e20,
              radius: 122.5e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '511 Davida': {
            displayName: '511 Davida',
            type: 'Planet',
            params: {
              semiMajor: 3.164 * AU,
              eccentricity: 0.187,
              argPeriapsis: 338.178 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 2056.39 * DAY,
              mass: 3.77e19,
              radius: 144.5e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '15 Eunomia': {
            displayName: '15 Eunomia',
            type: 'Planet',
            params: {
              semiMajor: 2.643 * AU,
              eccentricity: 0.187,
              argPeriapsis: 97.909 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 1569.687 * DAY,
              mass: 3.18e19,
              radius: 127e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          Juno: {
            displayName: 'Juno',
            type: 'Planet',
            params: {
              semiMajor: 2.67 * AU,
              eccentricity: 0.25545,
              argPeriapsis: 248.41 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 4.36463 * 365.24 * DAY,
              mass: 2.86e19,
              radius: 135.7e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '16 Psyche': {
            displayName: '16 Psyche',
            type: 'Planet',
            params: {
              semiMajor: 2.921 * AU,
              eccentricity: 0.14,
              argPeriapsis: 228.047 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 1823.115 * DAY,
              mass: 2.41e19,
              radius: 111e3,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '31 Euphrosyne': {
            displayName: '31 Euphrosyne',
            type: 'Planet',
            params: {
              semiMajor: 3.852 * AU,
              eccentricity: 0.2209,
              argPeriapsis: 61.4704 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 2041.585 * DAY,
              mass: 1.7e19,
              radius: 267e3 / 2,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },
          '87 Sylvia': {
            displayName: '87 Sylvia',
            type: 'Planet',
            params: {
              semiMajor: 3.49 * AU,
              eccentricity: 0.08,
              argPeriapsis: 266.195 / 180 * Math.PI,
              eccentricAnomaly: Math.random() * Math.PI * 2,
              orbitalPeriod: 2381.697 * DAY,
              mass: 1.478e19,
              radius: 286e3 / 2,
            },
            resources: {surveyed: 0, minerals: {}},
            objects: {},
          },

//           6 Hebe
//           624 Hektor
//           65 Cybele
//           107 Camilla
//           7 Iris
//           324 Bamberga
//           9 Metis
//           22 Kalliope
//           45 Eugenia
//           20 Massalia
//           8 Flora
//           85 Io
//           2060 Chiron
//           5 Astraea
//           141 Lumen
//           140 Siwa
//           159 Aemilia
//           21 Lutetia
//           100 Hekate
//           253 Mathilde
        },
      },
    },
  },
}