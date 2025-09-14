import { test, expect } from '@playwright/test';

test('Slow video on minimal HTML5 player', async ({ page }) => {
  test.setTimeout(60000); // extend timeout just in case

  await page.goto('https://www.w3schools.com/html/mov_bbb.mp4', { waitUntil: 'domcontentloaded' });

  // The above is a direct video file, so you may not get a video tag unless embedded

  // OR use a custom HTML page that embeds the video:
 // await page.goto('https://videojs.com/', { waitUntil: 'domcontentloaded' });

  await page.evaluate(() => {
    const video = document.querySelector('video');
    if (video) {
      video.controls = true;
      video.playbackRate = 0.5;
      video.play();
    }
  });

  await page.waitForTimeout(10000);
});
