const video = document.getElementById('mainVideo');
const videoTitle = document.querySelector('.video-title');

function loadHls(source) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = source;
    video.addEventListener('loadedmetadata', () => video.play());
  }
}

// Initial load (live stream)
loadHls('/stream/live.m3u8');

function playVideo(source, title) {
  videoTitle.textContent = title;

  if (source.endsWith('.m3u8')) {
    loadHls(source);
  } else {
    video.src = source;
    video.play();
  }

  document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth' });
}