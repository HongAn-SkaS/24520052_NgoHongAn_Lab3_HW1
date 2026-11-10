
export const DRUM_PADS = [
  {
    id: "clap",
    name: "Clap",
    key: "W",
    code: "KeyW",
    sound: "clap",
    description: "Hand clap percussion",
  },
  {
    id: "hihat",
    name: "Hi-Hat",
    key: "A",
    code: "KeyA",
    sound: "hihat",
    description: "Closed hi-hat percussion",
  },
  {
    id: "kick",
    name: "Kick",
    key: "S",
    code: "KeyS",
    sound: "kick",
    description: "Bass drum",
  },
  {
    id: "openhat",
    name: "Open Hat",
    key: "D",
    code: "KeyD",
    sound: "openhat",
    description: "Open hi-hat percussion",
  },
  {
    id: "boom",
    name: "Boom",
    key: "J",
    code: "KeyJ",
    sound: "boom",
    description: "Low-frequency drum impact",
  },
  {
    id: "ride",
    name: "Ride",
    key: "K",
    code: "KeyK",
    sound: "ride",
    description: "Ride cymbal percussion",
  },
  {
    id: "snare",
    name: "Snare",
    key: "L",
    code: "KeyL",
    sound: "snare",
    description: "Snare drum percussion",
  },
];


export const DRUM_PAD_MAP = new Map(
  DRUM_PADS.map((pad) => [pad.code, pad]),
);
