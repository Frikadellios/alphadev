<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

  let controlsLayout = [
    'previousFrame',
    'playpause',
    'stop',
    'nextFrame',
    'progress',
    'frame',
    'loop',
    'spacer',
    'background',
    'snapshot',
    'zoom',
    'info',
  ];
</script>

<LottiePlayer
  src="https://assets2.lottiefiles.com/packages/lf20_wxUJzo.json"
  autoplay="{true}"
  loop="{true}"
  controls="{true}"
  renderer="svg"
  background="transparent"
  height="{600}"
  width="{600}"
  controlsLayout="{controlsLayout}"
/>