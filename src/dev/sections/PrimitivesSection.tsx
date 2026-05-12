import { useState } from 'react';
import { Button } from '../../components/primitives/Button';
import { IconButton } from '../../components/primitives/IconButton';
import { Tag } from '../../components/primitives/Tag';
import { Input, Textarea, Field } from '../../components/primitives/Input';
import { Select } from '../../components/primitives/Select';
import { Switch } from '../../components/primitives/Switch';
import { Checkbox } from '../../components/primitives/Checkbox';
import { Radio } from '../../components/primitives/Radio';
import { Avatar, AvatarStack } from '../../components/primitives/Avatar';
import { Skeleton } from '../../components/primitives/Skeleton';
import { Spinner } from '../../components/primitives/Spinner';
import { Divider } from '../../components/primitives/Divider';
import { Kbd } from '../../components/primitives/Kbd';

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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, alignItems: 'center', marginBottom: 16 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>{children}</div>
    </div>
  );
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5l3 3" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 15S3 11 3 6.5A3.5 3.5 0 019 4.5 3.5 3.5 0 0115 6.5C15 11 9 15 9 15z" />
  </svg>
);

const MoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <circle cx="5" cy="9" r="1.4" /><circle cx="9" cy="9" r="1.4" /><circle cx="13" cy="9" r="1.4" />
  </svg>
);

export function PrimitivesSection() {
  const [sw1, setSw1] = useState(true);
  const [sw2, setSw2] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [radio, setRadio] = useState('a');

  return (
    <div>
      <Section title="按钮" num="01 · Button">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24 }}>
          <Row label="variants">
            <Button data-variant="primary" variant="primary">主操作</Button>
            <Button variant="secondary">次操作</Button>
            <Button variant="ghost">幽灵</Button>
            <Button variant="accent">强调</Button>
            <Button variant="danger">危险</Button>
            <Button variant="danger-solid">删除</Button>
          </Row>
          <Row label="sizes">
            <Button variant="secondary" size="sm">小</Button>
            <Button variant="secondary">中</Button>
            <Button variant="secondary" size="lg">大</Button>
          </Row>
          <Row label="states">
            <Button variant="primary" disabled>禁用</Button>
            <Button variant="primary" loading>加载中</Button>
            <Button variant="secondary" leftIcon={<SearchIcon />}>搜索</Button>
          </Row>
        </div>
      </Section>

      <Section title="图标按钮" num="02 · IconButton">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24 }}>
          <Row label="sizes">
            <IconButton label="Like" size="sm"><HeartIcon /></IconButton>
            <IconButton label="Like"><HeartIcon /></IconButton>
            <IconButton label="Like" size="lg"><HeartIcon /></IconButton>
          </Row>
          <Row label="shape/tone">
            <IconButton label="Like" shape="round"><HeartIcon /></IconButton>
            <IconButton label="Like" tone="accent" active><HeartIcon /></IconButton>
            <IconButton label="More" tone="danger"><MoreIcon /></IconButton>
          </Row>
        </div>
      </Section>

      <Section title="标签" num="03 · Tag">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24 }}>
          <Row label="default">
            <Tag>视频</Tag>
            <Tag>设计</Tag>
            <Tag closable onClose={() => {}}>可删除</Tag>
            <Tag dot>未读</Tag>
          </Row>
          <Row label="tones">
            <Tag tone="accent">强调</Tag>
            <Tag tone="success">成功</Tag>
            <Tag tone="warning">警告</Tag>
            <Tag tone="danger">危险</Tag>
          </Row>
          <Row label="sizes">
            <Tag size="sm">小</Tag>
            <Tag>中</Tag>
            <Tag size="lg">大</Tag>
          </Row>
        </div>
      </Section>

      <Section title="输入" num="04 · Input">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24, display: 'grid', gap: 20, maxWidth: 480 }}>
          <Field label="邮箱" hint="我们不会把它分享给任何人。">
            <Input placeholder="name@example.com" prefix={<SearchIcon />} />
          </Field>
          <Field label="密码" hint="格式不正确" hintTone="error" required>
            <Input type="password" placeholder="至少 8 位" state="error" />
          </Field>
          <Select>
            <option>中文</option>
            <option>English</option>
          </Select>
          <Textarea placeholder="添加备注…" />
        </div>
      </Section>

      <Section title="开关 · 复选框 · 单选" num="05 · Controls">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24 }}>
          <Row label="switch">
            <Switch checked={sw1} onChange={setSw1} />
            <Switch checked={sw2} onChange={setSw2} />
            <Switch checked={true} disabled />
            <Switch size="lg" checked={sw1} onChange={setSw1} />
          </Row>
          <Row label="checkbox">
            <Checkbox checked={check1} onChange={setCheck1} label="选项 A" />
            <Checkbox checked={check2} onChange={setCheck2} label="选项 B" />
            <Checkbox indeterminate label="部分选中" />
            <Checkbox disabled label="禁用" />
          </Row>
          <Row label="radio">
            <Radio checked={radio === 'a'} value="a" onChange={setRadio} label="选项 A" name="demo" />
            <Radio checked={radio === 'b'} value="b" onChange={setRadio} label="选项 B" name="demo" />
            <Radio checked={radio === 'c'} value="c" onChange={setRadio} label="选项 C" name="demo" />
          </Row>
        </div>
      </Section>

      <Section title="头像 · 骨架 · 加载" num="06 · Display">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 24 }}>
          <Row label="avatar">
            <Avatar size="sm" initials="AB" />
            <Avatar initials="CD" />
            <Avatar size="lg" initials="EF" />
            <Avatar size="xl" initials="GH" />
            <AvatarStack>
              <Avatar initials="A" /><Avatar initials="B" /><Avatar initials="C" />
            </AvatarStack>
          </Row>
          <Row label="skeleton">
            <Skeleton width={120} height={14} />
            <Skeleton width={80} height={14} />
            <Skeleton width={40} height={40} shape="circle" />
          </Row>
          <Row label="spinner">
            <Spinner />
            <Spinner size="lg" />
            <Spinner tone="accent" />
          </Row>
          <Row label="divider + kbd">
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>保存</span>
            <Kbd>⌘</Kbd><Kbd>S</Kbd>
            <Divider vertical />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>搜索</span>
            <Kbd>⌘K</Kbd>
          </Row>
        </div>
      </Section>
    </div>
  );
}
