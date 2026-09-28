/**
 * Web Audio API synthesizer for realistic envelope sound effects (seal pop & paper rustle).
 * Music has been completely removed as requested.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Sound effect: Wax seal break & unfastening pop
 */
export function playSealPop() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);

    // Subtle crisp crackle
    const bufferSize = Math.floor(ctx.sampleRate * 0.08);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.01);
  } catch (e) {
    console.debug('Audio not supported or blocked by browser', e);
  }
}

/**
 * Sound effect: Crisp stationery slide / paper rustle
 */
export function playPaperRustle() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = Math.floor(ctx.sampleRate * 0.22);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch (e) {
    console.debug('Paper audio not supported', e);
  }
}

/**
 * Master sound effect: Envelope opening with sensory feedback.
 * Combines crisp wax seal detachment, rich stationery paper rustle, and flap glide whoosh.
 */
export function playEnvelopeOpenSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Crisp wax seal pop & fracture click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.14);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);

    // 2. High-frequency seal snap crackle
    const popBufferSize = Math.floor(ctx.sampleRate * 0.06);
    const popBuffer = ctx.createBuffer(1, popBufferSize, ctx.sampleRate);
    const popData = popBuffer.getChannelData(0);
    for (let i = 0; i < popBufferSize; i++) {
      popData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }
    const popNoise = ctx.createBufferSource();
    popNoise.buffer = popBuffer;
    const popNoiseGain = ctx.createGain();
    popNoiseGain.gain.setValueAtTime(0.2, now);
    popNoiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    popNoise.connect(popNoiseGain);
    popNoiseGain.connect(ctx.destination);
    popNoise.start(now + 0.005);

    // 3. Luxurious envelope paper rustle & stationery slide
    const rustleBufferSize = Math.floor(ctx.sampleRate * 0.45);
    const rustleBuffer = ctx.createBuffer(1, rustleBufferSize, ctx.sampleRate);
    const rustleData = rustleBuffer.getChannelData(0);
    for (let i = 0; i < rustleBufferSize; i++) {
      const progress = i / rustleBufferSize;
      const envelope = Math.sin(progress * Math.PI) * (1 - progress * 0.4);
      rustleData[i] = (Math.random() * 2 - 1) * envelope;
    }
    const rustleNoise = ctx.createBufferSource();
    rustleNoise.buffer = rustleBuffer;

    const rustleFilter = ctx.createBiquadFilter();
    rustleFilter.type = 'bandpass';
    rustleFilter.frequency.setValueAtTime(950, now);
    rustleFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.2);
    rustleFilter.frequency.exponentialRampToValueAtTime(700, now + 0.45);
    rustleFilter.Q.setValueAtTime(2.0, now);

    const rustleGain = ctx.createGain();
    rustleGain.gain.setValueAtTime(0.001, now);
    rustleGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    rustleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    rustleNoise.connect(rustleFilter);
    rustleFilter.connect(rustleGain);
    rustleGain.connect(ctx.destination);
    rustleNoise.start(now + 0.04);

    // 4. Subtle airy flap swing whoosh
    const whooshOsc = ctx.createOscillator();
    const whooshGain = ctx.createGain();
    whooshOsc.type = 'sine';
    whooshOsc.frequency.setValueAtTime(180, now + 0.08);
    whooshOsc.frequency.exponentialRampToValueAtTime(90, now + 0.35);

    whooshGain.gain.setValueAtTime(0.001, now + 0.08);
    whooshGain.gain.linearRampToValueAtTime(0.08, now + 0.18);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    whooshOsc.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    whooshOsc.start(now + 0.08);
    whooshOsc.stop(now + 0.36);
  } catch (e) {
    console.debug('Envelope opening audio not supported or blocked', e);
  }
}
