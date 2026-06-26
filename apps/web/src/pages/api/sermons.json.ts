export const prerender = false;

import type { APIRoute } from 'astro';
import { YOUTUBE_API_KEY } from 'astro:env/server';

const CHANNEL_ID = 'UCgneXaRspkl-5lwShOP0ElQ';
const DEFAULT_PLAYLIST_ID = 'UU' + CHANNEL_ID.slice(2);

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = parseInt(match[1] || '0');
  const m = parseInt(match[2] || '0');
  const s = parseInt(match[3] || '0');
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const pageToken = url.searchParams.get('pageToken') ?? '';
  const maxResults = Math.min(parseInt(url.searchParams.get('maxResults') ?? '6'), 24);
  const playlistId = url.searchParams.get('playlistId') || DEFAULT_PLAYLIST_ID;
  const key = YOUTUBE_API_KEY;

  const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  playlistUrl.searchParams.set('part', 'snippet');
  playlistUrl.searchParams.set('playlistId', playlistId);
  playlistUrl.searchParams.set('maxResults', String(maxResults));
  playlistUrl.searchParams.set('key', key);
  if (pageToken) playlistUrl.searchParams.set('pageToken', pageToken);

  const playlistRes = await fetch(playlistUrl.toString());
  if (!playlistRes.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch playlist' }), { status: 502 });
  }
  const playlistData = await playlistRes.json();
  const { items, nextPageToken = null, prevPageToken = null } = playlistData;

  const videoIds = items.map(({ snippet }: any) => snippet.resourceId.videoId).join(',');
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${key}`
  );
  if (!detailsRes.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch video details' }), { status: 502 });
  }
  const { items: details } = await detailsRes.json();

  const detailsById = Object.fromEntries(details.map((d: any) => [d.id, d]));

  const sermons = items.map(({ snippet }: any) => {
    const videoId = snippet.resourceId.videoId;
    const detail = detailsById[videoId] as any;
    const isUpcoming = detail?.snippet?.liveBroadcastContent === 'upcoming';
    return {
      videoId,
      title: snippet.title,
      publishedAt: snippet.publishedAt,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      duration: isUpcoming ? 'Upcoming' : (detail ? parseDuration(detail.contentDetails.duration) : ''),
    };
  });

  return new Response(JSON.stringify({ sermons, nextPageToken, prevPageToken }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
