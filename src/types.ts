export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  kbps: number | null;
  albumArtData?: ArrayBuffer;
  albumArtMime?: string;
  fileKey: string;
  addedAt: number;
  fileName: string;
  fileSize: number;
  playCount: number;
  lastPlayedAt: number;
}

export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
  createdAt: number;
}

export interface Preferences {
  accentColor: string;
}

export interface HistoryEntry {
  id: string;        // `${songId}-${timestamp}`
  songId: string;
  playedAt: number;
}

export type RepeatMode = 'off' | 'all' | 'one';
export type ShuffleMode = 'off' | 'view' | 'library';
export type AppView = 'library' | 'liked' | 'most-played' | 'stats' | 'queue' | { type: 'playlist'; id: string };

// Format support: added Opus (Ogg container, same as .ogg) and AIFF/AIF.
// WMA and APE are deliberately NOT included -- no mainstream browser ships a
// decoder for either, so <audio>/Web Audio simply can't play them back. Real
// support would mean bundling a full transcoder (e.g. ffmpeg.wasm, ~25-30MB)
// just to unlock two formats, which is a much bigger call than a format-list
// change -- flagging this rather than quietly shipping files that import
// but won't play.
export const AUDIO_EXTENSIONS = ['.mp3', '.flac', '.wav', '.ogg', '.opus', '.aac', '.m4a', '.aiff', '.aif'];
export const DEFAULT_ACCENT = '#1DB954';
export const ROW_HEIGHT = 56;
