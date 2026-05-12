import { cn } from '../../lib/cn';
import { Thumbnail } from './Thumbnail';

export type DownloadStatus = 'downloading' | 'paused' | 'queued' | 'parsing' | 'failed' | 'complete';

export interface DownloadCardProps {
  title: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  placeholderGradient?: string;
  status: DownloadStatus;
  progress?: number;
  speed?: string;
  eta?: string;
  stage?: string;
  actions?: React.ReactNode;
  className?: string;
}

const stageToneMap: Partial<Record<DownloadStatus, 'warn' | 'danger' | 'success'>> = {
  paused: 'warn',
  failed: 'danger',
  complete: 'success',
};

const stageLabels: Record<DownloadStatus, string> = {
  downloading: '下载中',
  paused: '已暂停',
  queued: '排队中',
  parsing: '解析中',
  failed: '失败',
  complete: '已完成',
};

export function DownloadCard({
  title,
  thumbnailSrc,
  thumbnailAlt,
  placeholderGradient,
  status,
  progress = 0,
  speed,
  eta,
  stage,
  actions,
  className,
}: DownloadCardProps) {
  const stageTone = stageToneMap[status];
  const isIndeterminate = status === 'parsing' || status === 'queued';

  return (
    <div
      className={cn('dcard', className)}
      data-status={status}
    >
      <Thumbnail
        src={thumbnailSrc}
        alt={thumbnailAlt}
        placeholderGradient={placeholderGradient}
      />
      <div className="dcard-body">
        <h3 className="dcard-title">{title}</h3>
        <div className="dcard-stats">
          <span className="stage" data-tone={stageTone}>
            {stage ?? stageLabels[status]}
          </span>
          {speed && <><span className="sep">·</span><span>{speed}</span></>}
          {eta && <><span className="sep">·</span><span>{eta}</span></>}
        </div>
        {status !== 'complete' && (
          <div
            className="dcard-progress"
            data-indeterminate={isIndeterminate ? 'true' : undefined}
          >
            <div
              className="dcard-progress-fill"
              style={{ width: isIndeterminate ? undefined : `${progress}%` }}
            />
          </div>
        )}
      </div>
      {actions && <div className="dcard-actions">{actions}</div>}
    </div>
  );
}
