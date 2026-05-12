import { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '../../lib/cn';

export type PlayerState = 'ready' | 'loading' | 'playing' | 'paused' | 'buffering' | 'error';

export interface PlayerChapter {
  time: number;
  label: string;
}

export interface PlayerBookmark {
  time: number;
  label?: string;
}

export interface PlayerProps {
  src?: string;
  title?: string;
  creator?: string;
  thumbnailSrc?: string;
  chapters?: PlayerChapter[];
  bookmarks?: PlayerBookmark[];
  initialState?: PlayerState;
  autoplay?: boolean;
  errorMessage?: string;
  className?: string;
  onClose?: () => void;
  onAddBookmark?: (time: number) => void;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function Player({
  src,
  title,
  creator,
  thumbnailSrc,
  chapters,
  bookmarks,
  initialState = 'ready',
  autoplay = false,
  errorMessage = '无法播放此视频',
  className,
  onClose,
}: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrubRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<PlayerState>(initialState);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [idle, setIdle] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [scrubTime, setScrubTime] = useState<number | null>(null);
  const [scrubX, setScrubX] = useState(0);

  const resetIdleTimer = useCallback(() => {
    setIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (state === 'playing') {
      idleTimerRef.current = setTimeout(() => setIdle(true), 3000);
    }
  }, [state]);

  useEffect(() => {
    resetIdleTimer();
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [resetIdleTimer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlers = {
      loadstart: () => setState('loading'),
      canplay: () => setState(autoplay ? 'playing' : 'ready'),
      playing: () => setState('playing'),
      pause: () => setState('paused'),
      waiting: () => setState('buffering'),
      ended: () => setState('ready'),
      error: () => setState('error'),
      timeupdate: () => setCurrentTime(video.currentTime),
      durationchange: () => setDuration(video.duration),
      progress: () => {
        if (video.buffered.length > 0) {
          setBuffered(video.buffered.end(video.buffered.length - 1));
        }
      },
    };

    Object.entries(handlers).forEach(([evt, fn]) => video.addEventListener(evt, fn));
    return () => { Object.entries(handlers).forEach(([evt, fn]) => video.removeEventListener(evt, fn)); };
  }, [autoplay]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video || !containerRef.current?.matches(':focus-within, :hover')) return;

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;
        case 'ArrowLeft':
        case 'j':
          video.currentTime = Math.max(0, video.currentTime - 5);
          resetIdleTimer();
          break;
        case 'ArrowRight':
        case 'l':
          video.currentTime = Math.min(video.duration, video.currentTime + 5);
          resetIdleTimer();
          break;
        case 'f':
          e.preventDefault();
          if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setFullscreen(true);
          } else {
            document.exitFullscreen();
            setFullscreen(false);
          }
          break;
        case 'm':
          video.muted = !video.muted;
          setMuted(video.muted);
          break;
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [resetIdleTimer]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * duration;
  }, [duration]);

  const handleProgressMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setScrubTime(ratio * duration);
    setScrubX(e.clientX - rect.left);
  }, [duration]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferProgress = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={cn('player', className)}
      data-state={state}
      data-idle={idle && state === 'playing' ? 'true' : undefined}
      data-fullscreen={fullscreen ? 'true' : undefined}
      onMouseMove={resetIdleTimer}
      tabIndex={0}
    >
      {thumbnailSrc && (
        <div
          className="player-backdrop"
          style={{ backgroundImage: `url(${thumbnailSrc})` }}
          aria-hidden
        />
      )}

      {src && (
        <video
          ref={videoRef}
          className="player-video"
          src={src}
          autoPlay={autoplay}
          playsInline
        />
      )}

      <div className="player-fade-top" aria-hidden />
      <div className="player-fade-bottom" aria-hidden />

      {(title || creator) && (
        <div className="player-title">
          <div>
            <h3>{title}</h3>
            {creator && <div className="meta">{creator}</div>}
          </div>
          {onClose && (
            <div className="player-title-actions">
              <button className="pi-btn" aria-label="Close" onClick={onClose}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="player-bigplay" onClick={togglePlay} role="button" aria-label={state === 'paused' ? 'Play' : 'Pause'}>
        <div className="player-bigplay-disc">
          {state === 'paused' ? (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
              <path d="M8 5v16l13-8z" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
              <path d="M8 5v16l13-8z" />
            </svg>
          )}
        </div>
      </div>

      {(state === 'loading' || state === 'buffering') && (
        <div className="player-loading" aria-hidden>
          <div className="ring" role="status" aria-label="Loading" />
        </div>
      )}

      {state === 'buffering' && (
        <div className="player-buffering-label" aria-live="polite">buffering</div>
      )}

      {state === 'error' && (
        <div className="player-error" role="alert">
          <span className="err-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="9" r="7" />
              <path d="M9 5v4M9 12v1" strokeLinecap="round" />
            </svg>
          </span>
          <p className="err-title">{errorMessage}</p>
          <p className="err-sub">请检查视频来源或稍后重试。</p>
          <div className="err-actions">
            <button className="btn" data-variant="secondary" onClick={() => setState('ready')}>重试</button>
          </div>
        </div>
      )}

      <div className="player-controls">
        <div
          className="player-progress"
          onClick={seek}
          onMouseMove={handleProgressMouseMove}
          onMouseLeave={() => setScrubTime(null)}
          role="slider"
          aria-label="Playback position"
          aria-valuenow={Math.round(currentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
        >
          {scrubTime != null && (
            <div
              ref={scrubRef}
              className="player-scrub-preview"
              style={{ left: scrubX }}
            >
              <div
                className="player-scrub-thumb"
                style={thumbnailSrc ? { backgroundImage: `url(${thumbnailSrc})` } : undefined}
              />
              <div className="player-scrub-time">{formatTime(scrubTime)}</div>
            </div>
          )}
          <div className="player-progress-track">
            <div className="player-progress-buffer" style={{ width: `${bufferProgress}%` }} />
            <div className="player-progress-fill" style={{ width: `${progress}%` }} />
            <div className="player-progress-thumb" style={{ left: `${progress}%` }} />
          </div>
          {chapters?.map((ch) => (
            <div
              key={ch.time}
              className="player-mark"
              style={{ left: `${(ch.time / duration) * 100}%` }}
              title={ch.label}
            />
          ))}
          {bookmarks?.map((bm) => (
            <div
              key={bm.time}
              className="player-mark"
              data-tone="accent"
              style={{ left: `${(bm.time / duration) * 100}%` }}
              title={bm.label}
            />
          ))}
        </div>

        <div className="player-bar">
          <div className="player-bar-left">
            <button
              className="player-btn"
              data-size="lg"
              aria-label={state === 'playing' ? 'Pause' : 'Play'}
              onClick={togglePlay}
            >
              {state === 'playing' ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <rect x="4" y="3" width="4" height="12" rx="1" />
                  <rect x="10" y="3" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M5 3v12l10-6z" />
                </svg>
              )}
            </button>

            <div className="player-volume">
              <button
                className="player-btn"
                aria-label={muted ? 'Unmute' : 'Mute'}
                onClick={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  video.muted = !video.muted;
                  setMuted(video.muted);
                }}
              >
                {muted || volume === 0 ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 4v8M3 6h2l3-2v8L5 10H3V6z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6l2 4M14 6l-2 4" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 4v8M3 6h2l3-2v8L5 10H3V6z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 6.5a3 3 0 010 3" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <div className="slider">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    if (videoRef.current) { videoRef.current.volume = v; videoRef.current.muted = v === 0; }
                    setMuted(v === 0);
                  }}
                  aria-label="Volume"
                />
              </div>
            </div>

            <div className="player-time" aria-live="off">
              {formatTime(currentTime)}
              <span className="sep">/</span>
              {formatTime(duration)}
            </div>
          </div>

          <div />

          <div className="player-bar-right">
            <button
              className="player-pill"
              aria-label="Playback speed"
              onClick={() => {
                const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
                const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
                setSpeed(next);
                if (videoRef.current) videoRef.current.playbackRate = next;
              }}
            >
              {speed === 1 ? '1×' : `${speed}×`}
            </button>

            <button
              className="player-btn"
              aria-label="Toggle fullscreen"
              onClick={() => {
                if (!document.fullscreenElement) {
                  containerRef.current?.requestFullscreen();
                  setFullscreen(true);
                } else {
                  document.exitFullscreen();
                  setFullscreen(false);
                }
              }}
            >
              {fullscreen ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 1H2a1 1 0 00-1 1v3M11 1h3a1 1 0 011 1v3M5 15H2a1 1 0 01-1-1v-3M11 15h3a1 1 0 001-1v-3" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 5V2a1 1 0 011-1h3M11 1h3a1 1 0 011 1v3M1 11v3a1 1 0 001 1h3M15 11v3a1 1 0 01-1 1h-3" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
