import { useState } from 'react';
import { Alert } from '../../components/feedback/Alert';
import { ToastStack, createToastId } from '../../components/feedback/Toast';
import type { ToastData } from '../../components/feedback/Toast';
import { Dialog } from '../../components/feedback/Dialog';
import { Drawer } from '../../components/feedback/Drawer';
import { Menu } from '../../components/feedback/Menu';
import { EmptyState } from '../../components/feedback/EmptyState';
import { AuthCard } from '../../components/feedback/AuthCard';
import { Button } from '../../components/primitives/Button';
import { Input, Field } from '../../components/primitives/Input';

function Section({ title, num, children }: { title: string; num: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingBottom: 48, borderBottom: '1px solid var(--line-hairline)', marginBottom: 48 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>{num}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, letterSpacing: '-0.01em', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6.5" /><path d="M8 7v5M8 5v.5" strokeLinecap="round" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 2L1 14h14L8 2z" strokeLinejoin="round" /><path d="M8 6v4M8 11v1" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 4h10M6 4V2h4v2M5 4l.5 9h5L11 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function FeedbackSection() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const addToast = (tone?: ToastData['tone']) => {
    setToasts((ts) => [...ts, {
      id: createToastId(),
      tone,
      title: tone === 'success' ? '已保存' : tone === 'danger' ? '操作失败' : tone === 'warning' ? '注意' : '消息',
      message: `这是一条 ${tone ?? 'info'} 类型的通知。`,
      action: tone !== 'danger' ? { label: '撤销', onClick: () => {} } : undefined,
    }]);
  };

  return (
    <div>
      <Section title="提示条" num="01 · Alert">
        <div style={{ display: 'grid', gap: 10 }}>
          <Alert tone="info" icon={<InfoIcon />} title="同步中" message="正在获取最新的视频信息，这可能需要几秒钟。" />
          <Alert tone="success" icon={<CheckIcon />} title="已保存" message="你的修改已成功保存。" />
          <Alert tone="warning" icon={<WarnIcon />} title="代理未配置" message="某些视频可能无法播放。" />
          <Alert tone="danger" icon={<WarnIcon />} title="源失效" message="无法连接到视频源，请检查网络或稍后重试。" />
        </div>
      </Section>

      <Section title="Toast 通知" num="02 · Toast">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => addToast()}>默认</Button>
          <Button variant="secondary" onClick={() => addToast('success')}>成功</Button>
          <Button variant="secondary" onClick={() => addToast('warning')}>警告</Button>
          <Button variant="secondary" onClick={() => addToast('danger')}>错误</Button>
        </div>
        <ToastStack toasts={toasts} onDismiss={(id) => setToasts((ts) => ts.filter((t) => t.id !== id))} />
      </Section>

      <Section title="对话框" num="03 · Dialog">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>编辑对话框</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>删除确认</Button>
        </div>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="编辑视频"
          eyebrow="元数据"
          body={
            <div style={{ display: 'grid', gap: 16 }}>
              <Field label="标题"><Input defaultValue="这是一个示例视频标题" /></Field>
              <Field label="备注"><Input placeholder="添加个人备注…" /></Field>
            </div>
          }
          footer={
            <>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>取消</Button>
              <Button variant="primary" onClick={() => setDialogOpen(false)}>保存</Button>
            </>
          }
        />

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          variant="confirm"
          tone="danger"
          title="删除此视频？"
          confirmIcon={<TrashIcon />}
          body="此操作无法撤销。视频将从你的收藏中永久删除。"
          footer={
            <>
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>取消</Button>
              <Button variant="danger-solid" onClick={() => setConfirmOpen(false)}>删除</Button>
            </>
          }
        />
      </Section>

      <Section title="抽屉" num="04 · Drawer">
        <Button variant="secondary" onClick={() => setDrawerOpen(true)}>打开视频详情</Button>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="视频详情"
          body={
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={{ aspectRatio: '16/9', background: 'var(--media-placeholder)', borderRadius: 10 }} />
              <Field label="标题"><Input defaultValue="示例视频" /></Field>
              <Field label="标签"><Input placeholder="添加标签…" /></Field>
            </div>
          }
          footer={
            <>
              <Button variant="ghost" onClick={() => setDrawerOpen(false)}>取消</Button>
              <Button variant="primary" onClick={() => setDrawerOpen(false)}>保存</Button>
            </>
          }
        />
      </Section>

      <Section title="菜单" num="05 · Menu">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button variant="secondary" onClick={() => setMenuOpen((o) => !o)}>更多操作</Button>
          <Menu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4 }}
            groups={[
              {
                items: [
                  { id: 'edit', label: '编辑元数据', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 2l3 3L4 13H1v-3L9 2z" strokeLinejoin="round" /></svg> },
                  { id: 'collection', label: '加入合集', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="10" height="10" rx="1.5" /><path d="M7 5v4M5 7h4" strokeLinecap="round" /></svg> },
                  { id: 'open', label: '访问原网页', hint: '⌘↵', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 2H2v10h10V8M8 2h4v4M8 6l4-4" strokeLinecap="round" strokeLinejoin="round" /></svg> },
                ],
              },
              {
                items: [
                  { id: 'delete', label: '删除', tone: 'danger' as const, icon: <TrashIcon /> },
                ],
              },
            ]}
          />
        </div>
      </Section>

      <Section title="空状态" num="06 · EmptyState">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24 }}>
            <EmptyState
              icon={<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="20" height="20" rx="3" /><path d="M14 10v8M10 14h8" strokeLinecap="round" /></svg>}
              title="合集是空的"
              body="把你喜欢的视频加入这个合集，方便之后回看。"
              actions={<Button variant="accent">添加视频</Button>}
            />
          </div>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24 }}>
            <EmptyState
              tone="danger"
              icon={<WarnIcon />}
              title="无法加载"
              body="视频源出现了问题，请稍后重试。"
              actions={<Button variant="secondary">重试</Button>}
            />
          </div>
        </div>
      </Section>

      <Section title="登录" num="07 · Auth">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <AuthCard
            title="登录 VEW"
            subtitle="你的私人视觉灵感库"
            form={
              <>
                <Field label="邮箱"><Input type="email" placeholder="name@example.com" /></Field>
                <Field label="密码"><Input type="password" placeholder="••••••••" /></Field>
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 12, color: 'var(--text-secondary)' }}>
                  <a href="#" style={{ color: 'inherit', borderBottom: '1px solid var(--line-soft)', textDecoration: 'none' }}>忘记密码</a>
                </div>
                <Button variant="primary" style={{ width: '100%' }}>登录</Button>
              </>
            }
            footer={<>还没有账号？ <a href="#" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--line-soft)', textDecoration: 'none' }}>注册</a></>}
          />
        </div>
      </Section>
    </div>
  );
}
