import { useEffect, useState } from 'react'
import {
  detectInstallPlatform,
  isSecureForPwa,
  isStandaloneDisplay,
} from '../lib/install'

type DeferredPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface Props {
  compact?: boolean
}

export function InstallPrompt({ compact = false }: Props) {
  const [deferred, setDeferred] = useState<DeferredPrompt | null>(null)
  const [installed, setInstalled] = useState(isStandaloneDisplay)
  const [showGuide, setShowGuide] = useState(false)
  const [busy, setBusy] = useState(false)
  const platform = detectInstallPlatform()
  const secure = isSecureForPwa()

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferred(e as DeferredPrompt)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
      setShowGuide(false)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) {
    return (
      <section className={`install-panel ${compact ? 'is-compact' : ''}`}>
        <p className="install-title">已安裝到主畫面</p>
        <p className="install-desc">可離線開啟「今日去邊」，資料都喺呢部手機。</p>
      </section>
    )
  }

  const onInstallClick = async () => {
    if (deferred) {
      setBusy(true)
      try {
        await deferred.prompt()
        await deferred.userChoice
      } finally {
        setBusy(false)
      }
      return
    }
    setShowGuide((v) => !v)
  }

  return (
    <section className={`install-panel ${compact ? 'is-compact' : ''}`} id="install">
      <div className="install-copy">
        <p className="install-title">安裝到手機主畫面</p>
        <p className="install-desc">
          同一 Wi‑Fi 用手機開啟此頁 → 安裝 → 之後無網絡都用得。
        </p>
      </div>

      <button
        type="button"
        className="btn btn-primary install-btn"
        onClick={() => void onInstallClick()}
        disabled={busy}
      >
        {deferred ? (busy ? '開啟安裝…' : '安裝 PWA') : '點樣安裝？'}
      </button>

      {!secure && (
        <p className="install-warn">
          而家唔係安全連線（HTTPS）。同 Wi‑Fi 安裝請用電腦執行
          <code> npm run start:lan </code>
          ，再用手機開顯示嘅 <code>https://</code> 位址（首次或要信任憑證）。
        </p>
      )}

      {(showGuide || (!deferred && platform === 'ios')) && (
        <ol className="install-steps">
          {platform === 'ios' ? (
            <>
              <li>用 Safari 開啟呢個網址（唔好用 Chrome）。</li>
              <li>撳底部分享按鈕（方框加箭咀）。</li>
              <li>揀「加入主畫面」／Add to Home Screen。</li>
              <li>安裝後開 App，等佢載入一次，之後可離線用。</li>
            </>
          ) : platform === 'android' ? (
            <>
              <li>用 Chrome 開啟呢個網址。</li>
              <li>等頁面載入完成；若見到「安裝」掣就撳。</li>
              <li>或者撳瀏覽器選單 →「安裝應用程式」／「加到主畫面」。</li>
              <li>安裝後開一次，之後斷網都用得。</li>
            </>
          ) : (
            <>
              <li>用手機連同一 Wi‑Fi，瀏覽器開啟此頁 HTTPS 位址。</li>
              <li>Android Chrome：選單 → 安裝應用程式。</li>
              <li>iPhone Safari：分享 → 加入主畫面。</li>
              <li>首次連線載入後即可離線使用。</li>
            </>
          )}
        </ol>
      )}
    </section>
  )
}
