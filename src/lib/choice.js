export default function choice(options, rng) { return options[Math.floor(rng() * options.length)] }
