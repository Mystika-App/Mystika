import { useState, useEffect, useRef, useCallback } from "react";

// ── Fonts via Google Fonts (loaded in style tag) ──────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --deep: #0a0612;
      --void: #06030e;
      --purple-dark: #1a0a2e;
      --purple-mid: #2d1054;
      --purple: #6b21a8;
      --purple-light: #a855f7;
      --purple-glow: #c084fc;
      --gold: #d4af37;
      --gold-light: #f0d060;
      --gold-dim: #8a7020;
      --gold-glow: #fde68a;
      --cream: #fdf8ee;
      --mist: #e8d5f5;
      --font-display: 'Cinzel Decorative', serif;
      --font-heading: 'Cinzel', serif;
      --font-body: 'Crimson Pro', serif;
    }

    html, body { height: 100%; background: var(--void); }

    .mystika-root {
      min-height: 100vh;
      background: var(--void);
      font-family: var(--font-body);
      color: var(--cream);
      position: relative;
      overflow-x: hidden;
    }

    /* Star field */
    .stars {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background:
        radial-gradient(1px 1px at 10% 15%, rgba(212,175,55,0.6) 0%, transparent 100%),
        radial-gradient(1px 1px at 25% 40%, rgba(168,85,247,0.5) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 40% 8%, rgba(253,230,138,0.7) 0%, transparent 100%),
        radial-gradient(1px 1px at 55% 60%, rgba(212,175,55,0.4) 0%, transparent 100%),
        radial-gradient(1px 1px at 70% 20%, rgba(168,85,247,0.6) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 85% 45%, rgba(253,230,138,0.5) 0%, transparent 100%),
        radial-gradient(1px 1px at 15% 75%, rgba(212,175,55,0.5) 0%, transparent 100%),
        radial-gradient(1px 1px at 60% 85%, rgba(168,85,247,0.4) 0%, transparent 100%),
        radial-gradient(1px 1px at 90% 70%, rgba(253,230,138,0.6) 0%, transparent 100%),
        radial-gradient(1px 1px at 35% 90%, rgba(212,175,55,0.3) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 78% 5%, rgba(192,132,252,0.7) 0%, transparent 100%),
        radial-gradient(1px 1px at 5% 50%, rgba(212,175,55,0.5) 0%, transparent 100%),
        radial-gradient(1px 1px at 95% 30%, rgba(168,85,247,0.5) 0%, transparent 100%),
        radial-gradient(1px 1px at 48% 35%, rgba(253,230,138,0.4) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 20% 95%, rgba(212,175,55,0.6) 0%, transparent 100%);
    }

    /* Nebula background */
    .nebula {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background:
        radial-gradient(ellipse 60% 40% at 20% 30%, rgba(107,33,168,0.15) 0%, transparent 70%),
        radial-gradient(ellipse 50% 60% at 80% 70%, rgba(45,16,84,0.2) 0%, transparent 70%),
        radial-gradient(ellipse 40% 30% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%);
    }

    /* Navigation */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 32px;
      background: linear-gradient(180deg, rgba(6,3,14,0.95) 0%, transparent 100%);
      border-bottom: 1px solid rgba(212,175,55,0.1);
    }
    .nav-logo {
      font-family: var(--font-display);
      font-size: 1.4rem;
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 0.1em;
      text-shadow: none;
      cursor: pointer;
    }
    .nav-tabs {
      display: flex; gap: 4px;
    }
    .nav-tab {
      font-family: var(--font-heading);
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 7px 14px;
      background: transparent;
      border: 1px solid transparent;
      color: rgba(232,213,245,0.5);
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 2px;
    }
    .nav-tab:hover {
      color: var(--gold-light);
      border-color: rgba(212,175,55,0.3);
    }
    .nav-tab.active {
      color: var(--gold);
      border-color: rgba(212,175,55,0.5);
      background: rgba(212,175,55,0.06);
    }

    /* Page wrapper */
    .page {
      position: relative; z-index: 1;
      min-height: 100vh;
      padding-top: 80px;
    }

    /* Gold divider */
    .gold-divider {
      width: 120px; height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      margin: 0 auto 24px;
    }

    /* Section title */
    .section-title {
      font-family: var(--font-display);
      font-size: 2rem;
      text-align: center;
      background: linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 40%, var(--gold-light) 60%, var(--gold) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      margin-bottom: 8px;
      letter-spacing: 0.05em;
    }
    .section-subtitle {
      font-family: var(--font-body);
      font-size: 1.05rem;
      color: rgba(232,213,245,0.6);
      text-align: center;
      font-style: italic;
      margin-bottom: 32px;
    }

    /* ═══════════════════════════════════════════════
       SECTION 1 — HOROSCOPES
    ═══════════════════════════════════════════════ */
    .horoscope-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
      max-width: 900px;
      margin: 0 auto 48px;
      padding: 0 24px;
    }
    .sign-card {
      background: linear-gradient(135deg, rgba(26,10,46,0.8) 0%, rgba(45,16,84,0.4) 100%);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 8px;
      padding: 20px 12px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .sign-card::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .sign-card:hover { border-color: rgba(212,175,55,0.5); transform: translateY(-2px); }
    .sign-card:hover::before { opacity: 1; }
    .sign-card.selected {
      border-color: var(--gold);
      background: linear-gradient(135deg, rgba(45,16,84,0.9) 0%, rgba(107,33,168,0.3) 100%);
      box-shadow: 0 0 20px rgba(212,175,55,0.15);
    }
    .sign-emoji { font-size: 2rem; margin-bottom: 8px; }
    .sign-name {
      font-family: var(--font-heading);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold);
    }
    .sign-dates { font-size: 0.7rem; color: rgba(232,213,245,0.4); margin-top: 3px; }
    .sign-fav {
      position: absolute; top: 8px; right: 8px;
      font-size: 0.8rem; opacity: 0.4; transition: opacity 0.2s;
    }
    .sign-card.selected .sign-fav { opacity: 1; }

    .horoscope-detail {
      max-width: 680px; margin: 0 auto;
      padding: 0 24px 48px;
      animation: fadeUp 0.4s ease;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .horo-card {
      background: linear-gradient(135deg, rgba(26,10,46,0.9) 0%, rgba(45,16,84,0.5) 100%);
      border: 1px solid rgba(212,175,55,0.3);
      border-radius: 12px;
      padding: 36px;
    }
    .horo-header {
      display: flex; align-items: center; gap: 20px; margin-bottom: 24px;
    }
    .horo-icon { font-size: 3.5rem; }
    .horo-title {
      font-family: var(--font-display);
      font-size: 1.6rem;
      color: var(--gold-light);
    }
    .horo-month {
      font-family: var(--font-heading);
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--purple-glow);
      margin-top: 4px;
    }
    .horo-text {
      font-size: 1.05rem;
      line-height: 1.85;
      color: var(--mist);
      font-weight: 300;
      margin-bottom: 24px;
    }
    .horo-aspects {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 12px;
      margin-bottom: 24px;
    }
    .aspect {
      background: rgba(107,33,168,0.2);
      border: 1px solid rgba(168,85,247,0.2);
      border-radius: 6px; padding: 12px 8px; text-align: center;
    }
    .aspect-label {
      font-family: var(--font-heading);
      font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--purple-glow); margin-bottom: 4px;
    }
    .aspect-value { font-size: 0.9rem; color: var(--gold-light); }

    .notify-btn {
      width: 100%;
      padding: 14px;
      font-family: var(--font-heading);
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 50%, var(--gold-dim) 100%);
      color: var(--void);
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 600;
    }
    .notify-btn:hover {
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
      box-shadow: 0 4px 20px rgba(212,175,55,0.3);
    }
    .notify-btn.subscribed {
      background: linear-gradient(135deg, rgba(107,33,168,0.4) 0%, rgba(168,85,247,0.3) 100%);
      color: var(--purple-glow);
      border: 1px solid rgba(168,85,247,0.4);
    }
    .back-btn {
      background: transparent;
      border: 1px solid rgba(212,175,55,0.3);
      color: var(--gold);
      padding: 8px 20px;
      font-family: var(--font-heading);
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 4px;
      margin-bottom: 24px;
      transition: all 0.2s;
    }
    .back-btn:hover { background: rgba(212,175,55,0.08); }

    /* ═══════════════════════════════════════════════
       SECTION 2 — TERESA REYES / WHATSAPP
    ═══════════════════════════════════════════════ */
    .teresa-container {
      max-width: 680px; margin: 0 auto; padding: 0 24px 48px;
    }
    .teresa-profile {
      display: flex; align-items: center; gap: 24px;
      background: linear-gradient(135deg, rgba(26,10,46,0.9) 0%, rgba(45,16,84,0.5) 100%);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 12px;
      padding: 28px;
      margin-bottom: 28px;
    }
    .teresa-avatar {
      width: 88px; height: 88px; border-radius: 50%;
      background: linear-gradient(135deg, var(--purple-mid) 0%, var(--purple) 100%);
      border: 2px solid var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 2.8rem; flex-shrink: 0;
      box-shadow: 0 0 24px rgba(107,33,168,0.4);
    }
    .teresa-info { flex: 1; }
    .teresa-name {
      font-family: var(--font-display);
      font-size: 1.3rem;
      color: var(--gold-light);
      margin-bottom: 4px;
    }
    .teresa-title {
      font-family: var(--font-heading);
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--purple-glow);
      margin-bottom: 10px;
    }
    .teresa-bio {
      font-size: 0.95rem;
      line-height: 1.7;
      color: rgba(232,213,245,0.7);
      font-style: italic;
    }

    .consult-form {
      background: linear-gradient(135deg, rgba(26,10,46,0.9) 0%, rgba(45,16,84,0.5) 100%);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 12px;
      padding: 32px;
    }
    .form-title {
      font-family: var(--font-heading);
      font-size: 0.8rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 24px;
      text-align: center;
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { margin-bottom: 18px; }
    .form-label {
      font-family: var(--font-heading);
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--purple-glow);
      margin-bottom: 6px;
      display: block;
    }
    .form-input, .form-select, .form-textarea {
      width: 100%;
      background: rgba(6,3,14,0.6);
      border: 1px solid rgba(168,85,247,0.25);
      border-radius: 6px;
      padding: 11px 14px;
      color: var(--cream);
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: rgba(212,175,55,0.5);
    }
    .form-select option { background: var(--deep); }
    .form-textarea { resize: vertical; min-height: 90px; }

    .whatsapp-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #1a7a3c 0%, #25d366 50%, #1a7a3c 100%);
      border: none; border-radius: 6px;
      color: #fff;
      font-family: var(--font-heading);
      font-size: 0.8rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      font-weight: 600;
      margin-top: 8px;
    }
    .whatsapp-btn:hover { box-shadow: 0 4px 20px rgba(37,211,102,0.3); filter: brightness(1.1); }

    /* ═══════════════════════════════════════════════
       SECTION 3 — MAGIC BALL
    ═══════════════════════════════════════════════ */
    .ball-container {
      display: flex; flex-direction: column; align-items: center;
      padding: 24px 24px 48px;
      max-width: 560px; margin: 0 auto;
    }
    .ball-wrap {
      position: relative; width: 260px; height: 260px;
      margin: 32px 0 40px;
      cursor: pointer;
    }
    .ball {
      width: 260px; height: 260px; border-radius: 50%;
      background:
        radial-gradient(circle at 35% 30%, rgba(192,132,252,0.3) 0%, transparent 50%),
        radial-gradient(circle at 65% 70%, rgba(26,10,46,0.5) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, #1a0a2e 0%, #06030e 100%);
      border: 2px solid rgba(107,33,168,0.4);
      box-shadow:
        0 0 60px rgba(107,33,168,0.4),
        0 0 120px rgba(107,33,168,0.15),
        inset 0 -20px 40px rgba(0,0,0,0.5),
        inset 0 20px 40px rgba(192,132,252,0.05);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.1s, box-shadow 0.3s;
      position: relative; overflow: hidden;
    }
    .ball::before {
      content: '';
      position: absolute; top: 15%; left: 20%;
      width: 35%; height: 25%;
      background: radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 100%);
      border-radius: 50%;
      transform: rotate(-30deg);
    }
    .ball.shaking { animation: shake 0.6s ease; }
    @keyframes shake {
      0%,100% { transform: rotate(0deg) scale(1); }
      15% { transform: rotate(-8deg) scale(1.03); }
      30% { transform: rotate(8deg) scale(1.03); }
      45% { transform: rotate(-5deg) scale(1.05); }
      60% { transform: rotate(5deg) scale(1.05); }
      75% { transform: rotate(-3deg) scale(1.02); }
      90% { transform: rotate(3deg) scale(1.02); }
    }
    .ball-window {
      width: 110px; height: 110px; border-radius: 50%;
      background: radial-gradient(circle, rgba(10,6,18,0.95) 0%, rgba(45,16,84,0.8) 100%);
      border: 1px solid rgba(168,85,247,0.3);
      display: flex; align-items: center; justify-content: center;
      text-align: center; padding: 12px;
      position: relative; z-index: 1;
    }
    .ball-answer {
      font-family: var(--font-display);
      font-size: 0.7rem;
      letter-spacing: 0.05em;
      line-height: 1.4;
      transition: all 0.3s;
    }
    .ball-answer.yes { color: #6ee7b7; text-shadow: 0 0 12px rgba(110,231,183,0.5); }
    .ball-answer.no { color: #fca5a5; text-shadow: 0 0 12px rgba(252,165,165,0.5); }
    .ball-answer.maybe { color: var(--gold-light); text-shadow: 0 0 12px rgba(240,208,96,0.5); }
    .ball-answer.idle { color: rgba(168,85,247,0.6); font-size: 1.8rem; }

    .ball-question-wrap {
      width: 100%; position: relative; margin-bottom: 20px;
    }
    .ball-input {
      width: 100%;
      background: rgba(6,3,14,0.7);
      border: 1px solid rgba(168,85,247,0.3);
      border-radius: 30px;
      padding: 14px 56px 14px 24px;
      color: var(--cream);
      font-family: var(--font-body);
      font-size: 1rem;
      font-style: italic;
      outline: none;
      transition: border-color 0.2s;
    }
    .ball-input::placeholder { color: rgba(168,85,247,0.35); }
    .ball-input:focus { border-color: rgba(212,175,55,0.4); }
    .ball-ask-btn {
      position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
      width: 42px; height: 42px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold-dim), var(--gold));
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      transition: all 0.2s;
    }
    .ball-ask-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .ball-ask-btn:not(:disabled):hover { box-shadow: 0 0 16px rgba(212,175,55,0.4); }

    .ball-history {
      width: 100%;
      border-top: 1px solid rgba(168,85,247,0.15);
      padding-top: 20px;
      margin-top: 8px;
    }
    .ball-history-title {
      font-family: var(--font-heading);
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(168,85,247,0.5);
      margin-bottom: 12px;
      text-align: center;
    }
    .history-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 14px;
      background: rgba(26,10,46,0.4);
      border-radius: 6px; margin-bottom: 6px;
      border: 1px solid rgba(107,33,168,0.15);
    }
    .history-q { font-size: 0.88rem; color: rgba(232,213,245,0.6); flex: 1; padding-right: 12px; }
    .history-a {
      font-family: var(--font-heading);
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .history-a.yes { color: #6ee7b7; }
    .history-a.no { color: #fca5a5; }
    .history-a.maybe { color: var(--gold-light); }

    .ball-hint {
      font-size: 0.85rem;
      color: rgba(168,85,247,0.5);
      font-style: italic;
      text-align: center;
      margin-top: 8px;
    }

    /* ═══════════════════════════════════════════════
       SECTION 4 — TAROT CHAT
    ═══════════════════════════════════════════════ */
    .chat-container {
      max-width: 760px; margin: 0 auto; padding: 0 24px 48px;
    }

    /* Payment gate */
    .payment-gate {
      background: linear-gradient(135deg, rgba(26,10,46,0.95) 0%, rgba(45,16,84,0.6) 100%);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 16px;
      padding: 48px 40px;
      text-align: center;
      animation: fadeUp 0.4s ease;
    }
    .payment-icon { font-size: 3.5rem; margin-bottom: 16px; }
    .payment-title {
      font-family: var(--font-display);
      font-size: 1.6rem;
      color: var(--gold-light);
      margin-bottom: 8px;
    }
    .payment-subtitle {
      font-size: 1rem;
      color: rgba(232,213,245,0.6);
      font-style: italic;
      margin-bottom: 36px;
    }
    .plans-grid {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: 16px; margin-bottom: 32px;
    }
    .plan-card {
      background: rgba(6,3,14,0.7);
      border: 1px solid rgba(168,85,247,0.25);
      border-radius: 10px;
      padding: 24px 16px;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
    }
    .plan-card:hover { border-color: rgba(212,175,55,0.4); transform: translateY(-3px); }
    .plan-card.chosen {
      border-color: var(--gold);
      background: rgba(45,16,84,0.5);
      box-shadow: 0 0 24px rgba(212,175,55,0.12);
    }
    .plan-badge {
      position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
      background: var(--gold);
      color: var(--void);
      font-family: var(--font-heading);
      font-size: 0.55rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 10px;
      font-weight: 700;
    }
    .plan-time {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--gold-light);
      margin-bottom: 6px;
    }
    .plan-price {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      color: var(--cream);
      margin-bottom: 4px;
    }
    .plan-desc { font-size: 0.8rem; color: rgba(232,213,245,0.4); }

    .pay-btn {
      padding: 16px 48px;
      background: linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 50%, var(--gold-dim) 100%);
      border: none; border-radius: 8px;
      color: var(--void);
      font-family: var(--font-heading);
      font-size: 0.8rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
    }
    .pay-btn:hover { box-shadow: 0 6px 28px rgba(212,175,55,0.35); filter: brightness(1.1); }
    .pay-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* Chat UI */
    .chat-ui {
      background: linear-gradient(135deg, rgba(26,10,46,0.95) 0%, rgba(45,16,84,0.5) 100%);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 16px;
      overflow: hidden;
      animation: fadeUp 0.4s ease;
    }
    .chat-header {
      display: flex; align-items: center; gap: 14px;
      padding: 16px 20px;
      background: rgba(6,3,14,0.5);
      border-bottom: 1px solid rgba(212,175,55,0.15);
    }
    .chat-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, var(--purple-mid), var(--purple));
      border: 1.5px solid var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem;
    }
    .chat-name {
      font-family: var(--font-heading);
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      color: var(--gold-light);
    }
    .chat-status { font-size: 0.75rem; color: #6ee7b7; display: flex; align-items: center; gap: 5px; }
    .status-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #6ee7b7;
      box-shadow: 0 0 6px #6ee7b7;
      animation: pulse-green 2s infinite;
    }
    @keyframes pulse-green {
      0%,100% { opacity: 1; } 50% { opacity: 0.4; }
    }
    .timer-display {
      margin-left: auto;
      font-family: var(--font-heading);
      font-size: 1rem;
      letter-spacing: 0.08em;
    }
    .timer-display.urgent { color: #fca5a5; animation: blink 1s step-end infinite; }
    .timer-display.normal { color: var(--gold); }
    @keyframes blink { 50% { opacity: 0.4; } }

    .chat-messages {
      height: 380px;
      overflow-y: auto;
      padding: 20px;
      display: flex; flex-direction: column; gap: 14px;
      scroll-behavior: smooth;
    }
    .chat-messages::-webkit-scrollbar { width: 4px; }
    .chat-messages::-webkit-scrollbar-track { background: transparent; }
    .chat-messages::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 2px; }

    .msg { display: flex; gap: 10px; max-width: 85%; }
    .msg.user { align-self: flex-end; flex-direction: row-reverse; }
    .msg.tarot { align-self: flex-start; }
    .msg-avatar {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, var(--purple-mid), var(--purple));
      border: 1px solid rgba(212,175,55,0.4);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem;
    }
    .msg-bubble {
      padding: 11px 16px;
      border-radius: 12px;
      font-size: 0.95rem;
      line-height: 1.65;
    }
    .msg.tarot .msg-bubble {
      background: rgba(45,16,84,0.6);
      border: 1px solid rgba(168,85,247,0.2);
      color: var(--mist);
      border-top-left-radius: 4px;
    }
    .msg.user .msg-bubble {
      background: linear-gradient(135deg, rgba(107,33,168,0.4), rgba(168,85,247,0.2));
      border: 1px solid rgba(212,175,55,0.2);
      color: var(--cream);
      border-top-right-radius: 4px;
    }
    .typing-indicator { display: flex; gap: 5px; align-items: center; padding: 4px 0; }
    .typing-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--purple-glow);
      animation: typing 1.4s infinite;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing {
      0%,80%,100% { transform: translateY(0); opacity: 0.4; }
      40% { transform: translateY(-6px); opacity: 1; }
    }

    .chat-input-row {
      display: flex; gap: 10px;
      padding: 14px 16px;
      background: rgba(6,3,14,0.4);
      border-top: 1px solid rgba(168,85,247,0.15);
    }
    .chat-input {
      flex: 1;
      background: rgba(6,3,14,0.6);
      border: 1px solid rgba(168,85,247,0.2);
      border-radius: 24px;
      padding: 11px 18px;
      color: var(--cream);
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .chat-input:focus { border-color: rgba(212,175,55,0.4); }
    .chat-input:disabled { opacity: 0.4; cursor: not-allowed; }
    .chat-send {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold-dim), var(--gold));
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      transition: all 0.2s; flex-shrink: 0;
    }
    .chat-send:disabled { opacity: 0.3; cursor: not-allowed; }
    .chat-send:not(:disabled):hover { box-shadow: 0 0 14px rgba(212,175,55,0.4); }

    /* Session ended overlay */
    .session-ended {
      padding: 48px 32px; text-align: center; animation: fadeUp 0.4s ease;
    }
    .ended-icon { font-size: 3rem; margin-bottom: 16px; }
    .ended-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--gold-light);
      margin-bottom: 8px;
    }
    .ended-text { font-size: 0.95rem; color: rgba(232,213,245,0.6); margin-bottom: 28px; }
    .ended-actions { display: flex; gap: 12px; justify-content: center; }
    .btn-primary {
      padding: 13px 28px;
      background: linear-gradient(135deg, var(--gold-dim), var(--gold));
      border: none; border-radius: 6px;
      color: var(--void);
      font-family: var(--font-heading);
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-primary:hover { box-shadow: 0 4px 20px rgba(212,175,55,0.3); }
    .btn-secondary {
      padding: 13px 28px;
      background: transparent;
      border: 1px solid rgba(212,175,55,0.35);
      border-radius: 6px;
      color: var(--gold);
      font-family: var(--font-heading);
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-secondary:hover { background: rgba(212,175,55,0.07); }

    /* Toast */
    .toast {
      position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, rgba(26,10,46,0.97), rgba(45,16,84,0.97));
      border: 1px solid var(--gold);
      padding: 14px 28px;
      border-radius: 8px;
      font-family: var(--font-heading);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold-light);
      z-index: 999;
      animation: toastIn 0.3s ease;
      box-shadow: 0 8px 32px rgba(107,33,168,0.3);
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(-50%) translateY(10px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    /* Hero intro */
    .hero {
      text-align: center;
      padding: 60px 24px 40px;
    }
    .hero-logo {
      font-family: var(--font-display);
      font-size: 3.2rem;
      background: linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 30%, var(--gold-light) 60%, var(--gold) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      margin-bottom: 8px;
      letter-spacing: 0.08em;
      filter: drop-shadow(0 0 30px rgba(212,175,55,0.2));
    }
    .hero-tagline {
      font-family: var(--font-body);
      font-size: 1.05rem;
      color: rgba(168,85,247,0.7);
      font-style: italic;
      letter-spacing: 0.05em;
      margin-bottom: 40px;
    }
    .home-grid {
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap: 20px;
      max-width: 700px; margin: 0 auto;
      padding: 0 24px;
    }
    .home-card {
      background: linear-gradient(135deg, rgba(26,10,46,0.85) 0%, rgba(45,16,84,0.4) 100%);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 12px;
      padding: 32px 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.35s ease;
    }
    .home-card:hover {
      border-color: rgba(212,175,55,0.5);
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(107,33,168,0.25);
    }
    .home-card-icon { font-size: 2.8rem; margin-bottom: 14px; }
    .home-card-title {
      font-family: var(--font-display);
      font-size: 0.9rem;
      color: var(--gold);
      margin-bottom: 8px;
      letter-spacing: 0.05em;
    }
    .home-card-desc { font-size: 0.85rem; color: rgba(232,213,245,0.5); line-height: 1.6; }

    /* ═══════════════════════════════════════════════
       RESPONSIVE — MOBILE FIRST
    ═══════════════════════════════════════════════ */

    /* Nav: stack logo + tabs on very small screens */
    @media (max-width: 480px) {
      .nav {
        flex-direction: column;
        align-items: stretch;
        padding: 10px 12px 8px;
        gap: 8px;
      }
      .nav-logo {
        font-size: 1rem;
        text-align: center;
      }
      .nav-tabs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3px;
      }
      .nav-tab {
        font-size: 0.5rem;
        padding: 6px 4px;
        text-align: center;
        letter-spacing: 0.06em;
      }

      /* Give extra top padding to pages since nav is taller */
      .page { padding-top: 110px !important; }

      /* Hero */
      .hero { padding: 20px 16px 24px; }
      .hero-logo { font-size: 2rem; }
      .hero-tagline { font-size: 0.88rem; }

      /* Home grid: always 2x2 */
      .home-grid {
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 0 16px;
      }
      .home-card { padding: 20px 12px; }
      .home-card-icon { font-size: 2rem; margin-bottom: 8px; }
      .home-card-title { font-size: 0.75rem; }
      .home-card-desc { font-size: 0.75rem; }

      /* Section titles */
      .section-title { font-size: 1.25rem; }
      .section-subtitle { font-size: 0.88rem; }

      /* Horoscope grid: 3 columns on mobile */
      .horoscope-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        padding: 0 12px;
      }
      .sign-card { padding: 12px 6px; }
      .sign-emoji { font-size: 1.4rem; }
      .sign-name { font-size: 0.62rem; }
      .sign-dates { font-size: 0.58rem; }

      /* Horoscope detail */
      .horoscope-detail { padding: 0 12px 32px; }
      .horo-card { padding: 20px 16px; }
      .horo-header { gap: 12px; }
      .horo-icon { font-size: 2.4rem; }
      .horo-title { font-size: 1.2rem; }
      .horo-text { font-size: 0.92rem; line-height: 1.75; }
      .horo-aspects { grid-template-columns: repeat(3, 1fr); gap: 8px; }
      .aspect { padding: 8px 4px; }
      .aspect-label { font-size: 0.55rem; }
      .aspect-value { font-size: 0.8rem; }
      .notify-btn { font-size: 0.65rem; padding: 12px; }
      .back-btn { font-size: 0.62rem; padding: 7px 14px; }

      /* Teresa */
      .teresa-container { padding: 0 12px 32px; }
      .teresa-profile {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 20px 16px;
        gap: 14px;
      }
      .teresa-avatar { width: 68px; height: 68px; font-size: 2.2rem; }
      .teresa-name { font-size: 1.1rem; }
      .teresa-bio { font-size: 0.85rem; }
      .consult-form { padding: 20px 16px; }
      .form-row { grid-template-columns: 1fr; }
      .form-input, .form-select, .form-textarea { font-size: 0.88rem; padding: 10px 12px; }
      .whatsapp-btn { font-size: 0.7rem; padding: 13px; }

      /* Ball */
      .ball-container { padding: 16px 16px 32px; }
      .ball-wrap { width: 190px; height: 190px; margin: 20px 0 28px; }
      .ball { width: 190px; height: 190px; }
      .ball-window { width: 90px; height: 90px; padding: 10px; }
      .ball-answer { font-size: 0.62rem; }
      .ball-answer.idle { font-size: 1.5rem; }
      .ball-input { font-size: 0.88rem; padding: 11px 50px 11px 16px; }
      .ball-ask-btn { width: 38px; height: 38px; font-size: 1rem; }
      .ball-history-title { font-size: 0.6rem; }
      .history-q { font-size: 0.8rem; }
      .history-a { font-size: 0.6rem; }
      .history-item { padding: 7px 10px; }

      /* Chat payment gate */
      .chat-container { padding: 0 12px 32px; }
      .payment-gate { padding: 28px 16px; }
      .payment-icon { font-size: 2.5rem; }
      .payment-title { font-size: 1.2rem; }
      .payment-subtitle { font-size: 0.85rem; margin-bottom: 24px; }
      .plans-grid { grid-template-columns: 1fr; gap: 10px; }
      .plan-card { padding: 18px 14px; }
      .plan-time { font-size: 1.1rem; }
      .plan-price { font-size: 1.2rem; }
      .plan-desc { font-size: 0.75rem; }
      .pay-btn { padding: 13px 32px; font-size: 0.72rem; }

      /* Chat UI */
      .chat-header { padding: 12px 14px; gap: 10px; }
      .chat-avatar { width: 36px; height: 36px; font-size: 1.1rem; }
      .chat-name { font-size: 0.78rem; }
      .chat-status { font-size: 0.68rem; }
      .timer-display { font-size: 0.88rem; }
      .chat-messages { height: 320px; padding: 14px 12px; gap: 10px; }
      .msg { max-width: 92%; }
      .msg-bubble { font-size: 0.88rem; padding: 9px 13px; }
      .chat-input-row { padding: 10px 12px; gap: 8px; }
      .chat-input { font-size: 0.88rem; padding: 10px 14px; }
      .chat-send { width: 38px; height: 38px; font-size: 1rem; }

      /* Session ended */
      .session-ended { padding: 32px 16px; }
      .ended-title { font-size: 1.15rem; }
      .ended-text { font-size: 0.88rem; }
      .ended-actions { flex-direction: column; align-items: center; gap: 10px; }
      .btn-primary, .btn-secondary { width: 100%; max-width: 260px; padding: 13px; font-size: 0.68rem; }
    }

    /* Medium mobile (481–600px): less aggressive */
    @media (min-width: 481px) and (max-width: 600px) {
      .nav { padding: 12px 16px; }
      .nav-logo { font-size: 1.05rem; }
      .nav-tabs { gap: 3px; }
      .nav-tab { font-size: 0.55rem; padding: 6px 8px; }
      .section-title { font-size: 1.4rem; }
      .home-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
      .plans-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .horo-aspects { grid-template-columns: repeat(3, 1fr); }
      .ball-wrap { width: 200px; height: 200px; }
      .ball { width: 200px; height: 200px; }
      .teresa-profile { flex-direction: column; align-items: center; text-align: center; }
      .ended-actions { flex-direction: column; align-items: center; }
      .btn-primary, .btn-secondary { width: 100%; max-width: 260px; }
    }
  `}</style>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const SIGNS = [
  { name: "Aries", emoji: "♈", dates: "21 Mar – 19 Abr", element: "Fuego", ruling: "Marte" },
  { name: "Tauro", emoji: "♉", dates: "20 Abr – 20 May", element: "Tierra", ruling: "Venus" },
  { name: "Géminis", emoji: "♊", dates: "21 May – 20 Jun", element: "Aire", ruling: "Mercurio" },
  { name: "Cáncer", emoji: "♋", dates: "21 Jun – 22 Jul", element: "Agua", ruling: "Luna" },
  { name: "Leo", emoji: "♌", dates: "23 Jul – 22 Ago", element: "Fuego", ruling: "Sol" },
  { name: "Virgo", emoji: "♍", dates: "23 Ago – 22 Sep", element: "Tierra", ruling: "Mercurio" },
  { name: "Libra", emoji: "♎", dates: "23 Sep – 22 Oct", element: "Aire", ruling: "Venus" },
  { name: "Escorpio", emoji: "♏", dates: "23 Oct – 21 Nov", element: "Agua", ruling: "Plutón" },
  { name: "Sagitario", emoji: "♐", dates: "22 Nov – 21 Dic", element: "Fuego", ruling: "Júpiter" },
  { name: "Capricornio", emoji: "♑", dates: "22 Dic – 19 Ene", element: "Tierra", ruling: "Saturno" },
  { name: "Acuario", emoji: "♒", dates: "20 Ene – 18 Feb", element: "Aire", ruling: "Urano" },
  { name: "Piscis", emoji: "♓", dates: "19 Feb – 20 Mar", element: "Agua", ruling: "Neptuno" },
];

const HOROSCOPES = {
  Aries: "Las estrellas te invitan a un profundo proceso de renovación interior. Marte, tu planeta regente, activa tu sector de transformación, impulsándote a soltar viejos patrones que ya no sirven tu evolución. En el amor, Venus trae encuentros inesperados que despiertan tu corazón. En lo profesional, una puerta que creías cerrada puede abrirse de forma sorpresiva. Confía en tu intuición.",
  Tauro: "Venus ilumina tu casa del hogar y la familia, trayendo armonía y dulzura a tus relaciones más cercanas. Es momento de consolidar proyectos que llevas tiempo cultivando. Tu perseverancia da frutos este mes. En el plano económico, Júpiter favorece inversiones y nuevas fuentes de ingreso. Permítete disfrutar de los placeres simples que tanto te nutren.",
  Géminis: "Mercurio retrógrado te invita a revisar comunicaciones pasadas y replantear proyectos. No es el mejor momento para firmar contratos, pero sí para reflexionar y clarificar. En el amor, viejos vínculos resurgen con nueva energía. Tu mente brillante encontrará soluciones creativas a desafíos aparentemente complejos. La clave está en la flexibilidad.",
  Cáncer: "La Luna llena en tu signo ilumina tus emociones más profundas. Es un mes poderoso para la sanación emocional y el cierre de ciclos. Tus dotes intuitivos están en su máximo esplendor: confía en lo que sientes sin necesidad de explicarlo. En el trabajo, tu sensibilidad es tu mayor fortaleza. Rodéate de personas que valoren tu mundo interior.",
  Leo: "El Sol atraviesa tu casa del reconocimiento, trayendo visibilidad y oportunidades de brillar. Es tu momento de dar el paso que has estado postergando. En las relaciones, tu generosidad y calidez atraen vínculos genuinos. Ojo con la tendencia al exceso en gastos. Canaliza esa energía creativa hacia proyectos que dejen huella.",
  Virgo: "Mercurio potencia tu análisis y capacidad organizativa. Es el mes ideal para poner orden en finanzas, salud y rutinas. Un proyecto que requería perfeccionamiento llega a su punto óptimo. En el amor, la comunicación honesta fortalece los lazos. No te exijas tanto: la perfección está en el proceso, no solo en el resultado.",
  Libra: "Venus en tu signo te envuelve de un magnetismo especial que atrae amor, belleza y oportunidades. Es momento de tomar decisiones que llevas tiempo aplazando. La diplomacia te abre puertas que la confrontación cierra. En lo espiritual, una práctica meditativa regular transformará tu bienestar. Confía en que el equilibrio que buscas ya está dentro de ti.",
  Escorpio: "Plutón activa tus profundidades, llevándote a confrontar verdades que ya no puedes ignorar. Este mes es de poder personal y transformación. En el amor, la intimidad y la vulnerabilidad son las llaves. Profesionalmente, tu capacidad investigativa te lleva a descubrimientos valiosos. Suelta el control y permite que la magia de lo desconocido te sorprenda.",
  Sagitario: "Júpiter expande tu horizonte y te invita a explorar, aprender y aventurarte. Viajes, estudios o enseñanzas traen crecimiento significativo este mes. En el amor, la libertad y el respeto mutuo son pilares fundamentales. Tu optimismo es contagioso y atrae personas afines a tu espíritu. Aprovecha esta energía para dar el salto que tanto deseas.",
  Capricornio: "Saturno consolida tu estructura interna y te recompensa por la disciplina mantenida. Metas a largo plazo comienzan a tomar forma concreta. Es buen momento para compromisos serios tanto en lo personal como en lo profesional. Recuerda equilibrar la ambición con el descanso: tu cuerpo necesita recuperarse para seguir escalando.",
  Acuario: "Urano trae innovación y cambios repentinos a tu vida. Lo que parecía estable puede sacudirse para dar paso a algo más auténtico. Tu visión de futuro es tu mayor don: compártela sin miedo. En el amor, las conexiones intelectuales son tan importantes como las emocionales. Abraza tu singularidad; es tu verdadero superpoder.",
  Piscis: "Neptuno potencia tu sensibilidad, creatividad e intuición. Es un mes mágico para el arte, la espiritualidad y la conexión con lo sagrado. En el amor, los sueños y la imaginación nutren tus vínculos. Cuida tus límites energéticos: no todos merecen acceso a tu mundo interior. La meditación y el contacto con el agua traen claridad y paz profunda.",
};

const BALL_ANSWERS = [
  { text: "Sí, así será", cls: "yes" },
  { text: "Sin duda", cls: "yes" },
  { text: "Los astros lo confirman", cls: "yes" },
  { text: "El universo lo avala", cls: "yes" },
  { text: "No lo veo claro", cls: "no" },
  { text: "Las estrellas dicen no", cls: "no" },
  { text: "No esta vez", cls: "no" },
  { text: "Quizás pronto", cls: "maybe" },
  { text: "El misterio persiste", cls: "maybe" },
  { text: "Tal vez… espera", cls: "maybe" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

// 1. Horoscopes
function HoroscopeSection({ hasActiveBanner, onGoHome }) {
  const [selected, setSelected] = useState(null);
  const [subscribed, setSubscribed] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mystika_subscribed") || "{}"); }
    catch { return {}; }
  });

  const saveSubscribed = (next) => {
    setSubscribed(next);
    try { localStorage.setItem("mystika_subscribed", JSON.stringify(next)); } catch {}
  };

  const toggleSubscription = async (signName) => {
    const isSubscribed = subscribed[signName];
    if (isSubscribed) {
      const next = { ...subscribed };
      delete next[signName];
      saveSubscribed(next);
      return;
    }
    // Request browser notification permission
    let permission = Notification.permission;
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }
    const next = { ...subscribed, [signName]: true };
    saveSubscribed(next);
    if (permission === "granted") {
      const sign = SIGNS.find(s => s.name === signName);
      new Notification("✦ Mystika — Notificaciones activadas", {
        body: `Recibirás el horóscopo mensual de ${sign.emoji} ${signName} cada mes.`,
        icon: "https://cdn.jsdelivr.net/npm/twemoji@14/assets/72x72/2726.png",
      });
    }
  };

  const sign = selected ? SIGNS.find(s => s.name === selected) : null;

  return (
    <div className="page" style={{ paddingTop: hasActiveBanner ? 104 : 80 }}>
      <div style={{ padding: "28px 24px 20px", position: "relative" }}>
        <button className="back-btn" onClick={onGoHome} style={{ marginBottom: 12 }}>← Inicio</button>
        <div className="gold-divider" />
        <h2 className="section-title">Horóscopos Mensuales</h2>
        <p className="section-subtitle">Descubre lo que las estrellas revelan para ti este mes</p>
      </div>

      {!selected ? (
        <div className="horoscope-grid">
          {SIGNS.map(s => (
            <div
              key={s.name}
              className={`sign-card${subscribed[s.name] ? " selected" : ""}`}
              onClick={() => setSelected(s.name)}
            >
              <span className="sign-fav">{subscribed[s.name] ? "🔔" : "🔕"}</span>
              <div className="sign-emoji">{s.emoji}</div>
              <div className="sign-name">{s.name}</div>
              <div className="sign-dates">{s.dates}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="horoscope-detail">
          <button className="back-btn" onClick={() => setSelected(null)}>← Volver</button>
          <div className="horo-card">
            <div className="horo-header">
              <div className="horo-icon">{sign.emoji}</div>
              <div>
                <div className="horo-title">{sign.name}</div>
                <div className="horo-month">Mayo 2025 · ruthmontenegro.com</div>
              </div>
            </div>
            <p className="horo-text">{HOROSCOPES[selected]}</p>
            <div className="horo-aspects">
              <div className="aspect">
                <div className="aspect-label">Elemento</div>
                <div className="aspect-value">{sign.element}</div>
              </div>
              <div className="aspect">
                <div className="aspect-label">Planeta</div>
                <div className="aspect-value">{sign.ruling}</div>
              </div>
              <div className="aspect">
                <div className="aspect-label">Energía</div>
                <div className="aspect-value">⭐⭐⭐⭐</div>
              </div>
            </div>
            <button
              className={`notify-btn${subscribed[selected] ? " subscribed" : ""}`}
              onClick={() => toggleSubscription(selected)}
            >
              {subscribed[selected]
                ? "🔔 Notificaciones activadas · Toca para desactivar"
                : "🔕 Activar notificaciones para " + selected}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Teresa Reyes
function TeresaSection({ hasActiveBanner, onGoHome }) {
  const [form, setForm] = useState({
    nombre: "", signo: "", consulta: "", mensaje: ""
  });

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `¡Hola Teresa! Soy ${form.nombre || "[nombre]"} y me gustaría reservar una consulta contigo.\n\n` +
      `♈ Signo: ${form.signo || "—"}\n` +
      `🔮 Tipo de consulta: ${form.consulta || "—"}\n` +
      `💬 Mensaje: ${form.mensaje || "—"}\n\n` +
      `¡Gracias!`
    );
    window.open(`https://wa.me/34622164400?text=${msg}`, "_blank");
  };

  return (
    <div className="page" style={{ paddingTop: hasActiveBanner ? 104 : 80 }}>
      <div style={{ padding: "28px 24px 20px" }}>
        <button className="back-btn" onClick={onGoHome} style={{ marginBottom: 12 }}>← Inicio</button>
        <div className="gold-divider" />
        <h2 className="section-title">Consulta con Teresa</h2>
        <p className="section-subtitle">Reserva tu sesión privada de tarot y videncia</p>
      </div>
      <div className="teresa-container">
        <div className="teresa-profile">
          <div className="teresa-avatar">🔮</div>
          <div className="teresa-info">
            <div className="teresa-name">Teresa Reyes</div>
            <div className="teresa-title">Tarotista · Vidente · Consultora Espiritual</div>
            <p className="teresa-bio">
              Con más de 20 años de experiencia en las artes adivinatorias, Teresa acompaña a sus consultantes en momentos clave de su vida. Su lectura intuitiva del Tarot Marsella y su capacidad vidente han guiado a miles de personas hacia su camino de luz.
            </p>
          </div>
        </div>

        <div className="consult-form">
          <div className="form-title">Formulario de Reserva</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input className="form-input" placeholder="Tu nombre..." value={form.nombre} onChange={e => handleChange("nombre", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tu signo zodiacal</label>
              <select className="form-select" value={form.signo} onChange={e => handleChange("signo", e.target.value)}>
                <option value="">Seleccionar...</option>
                {SIGNS.map(s => <option key={s.name} value={s.name}>{s.emoji} {s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de consulta</label>
            <select className="form-select" value={form.consulta} onChange={e => handleChange("consulta", e.target.value)}>
              <option value="">Seleccionar...</option>
              <option>Tirada General</option>
              <option>Amor y Relaciones</option>
              <option>Trabajo y Economía</option>
              <option>Salud y Bienestar</option>
              <option>Camino Espiritual</option>
              <option>Otra consulta</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">¿Qué quieres consultar?</label>
            <textarea className="form-textarea" placeholder="Cuéntale brevemente a Teresa en qué necesitas orientación..." value={form.mensaje} onChange={e => handleChange("mensaje", e.target.value)} />
          </div>

          <button className="whatsapp-btn" onClick={handleWhatsApp}>
            <span>💬</span> Contactar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Magic Ball
function BallSection({ hasActiveBanner, question, setQuestion, current, setCurrent, history, setHistory, onGoHome }) {
  const [shaking, setShaking] = useState(false);

  const ask = () => {
    const q = question.trim();
    if (!q) return;
    setQuestion("");
    if (history[q.toLowerCase()]) {
      setCurrent({ q, ans: history[q.toLowerCase()] });
      setShaking(true);
      setTimeout(() => setShaking(false), 700);
      return;
    }
    setShaking(true);
    setTimeout(() => {
      const ans = BALL_ANSWERS[Math.floor(Math.random() * BALL_ANSWERS.length)];
      setHistory(h => ({ ...h, [q.toLowerCase()]: ans }));
      setCurrent({ q, ans });
      setShaking(false);
    }, 650);
  };

  const historyEntries = Object.entries(history).slice(-5).reverse();

  return (
    <div className="page" style={{ paddingTop: hasActiveBanner ? 104 : 80 }}>
      <div style={{ padding: "28px 24px 20px" }}>
        <button className="back-btn" onClick={onGoHome} style={{ marginBottom: 12 }}>← Inicio</button>
        <div className="gold-divider" />
        <h2 className="section-title">La Bola Mágica</h2>
        <p className="section-subtitle">Haz tu pregunta y deja que el universo responda</p>
      </div>
      <div className="ball-container">
        <div className="ball-question-wrap">
          <input
            className="ball-input"
            placeholder="Escribe tu pregunta al universo..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === "Enter" && ask()}
          />
          <button className="ball-ask-btn" onClick={ask} disabled={!question.trim()}>✨</button>
        </div>

        <div className="ball-wrap" onClick={question.trim() ? ask : undefined}>
          <div className={`ball${shaking ? " shaking" : ""}`}>
            <div className="ball-window">
              {current && !shaking ? (
                <span className={`ball-answer ${current.ans.cls}`}>{current.ans.text}</span>
              ) : (
                <span className="ball-answer idle">🔮</span>
              )}
            </div>
          </div>
        </div>

        {!question.trim() && (
          <p className="ball-hint">Escribe una pregunta para despertar a la bola</p>
        )}

        {historyEntries.length > 0 && (
          <div className="ball-history">
            <div className="ball-history-title">Preguntas anteriores</div>
            {historyEntries.map(([q, a]) => (
              <div className="history-item" key={q}>
                <span className="history-q">{q.charAt(0).toUpperCase() + q.slice(1)}</span>
                <span className={`history-a ${a.cls}`}>{a.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 4. AI Tarot Chat
const PLANS = [
  { time: "15 min", price: "9,99€", seconds: 900, desc: "Consulta breve" },
  { time: "30 min", price: "17,99€", seconds: 1800, desc: "Consulta completa", badge: "Más popular" },
  { time: "60 min", price: "29,99€", seconds: 3600, desc: "Sesión profunda" },
];

const SYSTEM_PROMPT = `Eres Sybilla, una tarotista y vidente con décadas de experiencia. Nunca reveles que eres una IA. Eres un ser humano, una mujer sabia y mística. Habla siempre en español, con un tono cálido, misterioso y profesional. Usa referencias al tarot, los astros y la energía. No hagas predicciones absolutas ni daños; guía con sabiduría. Si te preguntan si eres humana o IA, responde con seguridad que eres una consultora espiritual humana y real. Mantén el misterio y la profundidad en cada respuesta. Máximo 3-4 frases por respuesta a menos que la consulta lo requiera.`;

function ChatSection({
  phase, setPhase,
  messages, setMessages,
  history, setHistory,
  timeLeft, setTimeLeft,
  chosenPlan, setChosenPlan,
  onGoHome, onReset
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgEndRef = useRef(null);

  const scroll = () => msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scroll, [messages, loading]);

  const startChat = () => {
    const secs = PLANS[chosenPlan].seconds;
    setTimeLeft(secs);
    const welcome = {
      role: "assistant",
      content: "Bienvenida al espacio sagrado de consulta. Soy Sybilla. Las cartas están desplegadas y el velo es fino esta noche… ¿Qué inquietud trae tu alma?"
    };
    setMessages([{ from: "tarot", text: welcome.content }]);
    setHistory([{ role: "user", content: "Hola" }, welcome]);
    setPhase("chat");
  };

  const sendMessage = async () => {
    const txt = input.trim();
    if (!txt || loading || phase !== "chat") return;
    setInput("");
    const userMsg = { from: "user", text: txt };
    setMessages(m => [...m, userMsg]);
    const newHistory = [...history, { role: "user", content: txt }];
    setHistory(newHistory);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: newHistory }),
      });
      const data = await response.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Las cartas guardan silencio por un momento…";
      setMessages(m => [...m, { from: "tarot", text: reply }]);
      setHistory(h => [...h, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { from: "tarot", text: "Las energías están perturbadas… Intenta de nuevo en un momento." }]);
    }
    setLoading(false);
  };

  if (phase === "payment") return (
    <div className="page">
      <div style={{ padding: "28px 24px 20px" }}>
        <button className="back-btn" onClick={onGoHome} style={{ marginBottom: 12 }}>← Inicio</button>
        <div className="gold-divider" />
        <h2 className="section-title">Consulta con la Vidente</h2>
        <p className="section-subtitle">Una sesión privada y confidencial</p>
      </div>
      <div className="chat-container">
        <div className="payment-gate">
          <div className="payment-icon">🌙</div>
          <div className="payment-title">Sybilla te espera</div>
          <p className="payment-subtitle">Elige la duración de tu consulta y abre el canal espiritual</p>
          <div className="plans-grid">
            {PLANS.map((p, i) => (
              <div key={i} className={`plan-card${chosenPlan === i ? " chosen" : ""}`} onClick={() => setChosenPlan(i)}>
                {p.badge && <span className="plan-badge">{p.badge}</span>}
                <div className="plan-time">{p.time}</div>
                <div className="plan-price">{p.price}</div>
                <div className="plan-desc">{p.desc}</div>
              </div>
            ))}
          </div>
          <button className="pay-btn" onClick={startChat}>
            ✨ Iniciar consulta · {PLANS[chosenPlan].price}
          </button>
          <p style={{ marginTop: 14, fontSize: "0.75rem", color: "rgba(168,85,247,0.4)", fontStyle: "italic" }}>
            Pago seguro simulado — Integración Stripe disponible
          </p>
        </div>
      </div>
    </div>
  );

  if (phase === "ended") return (
    <div className="page">
      <div style={{ padding: "40px 0 20px" }}>
        <div className="gold-divider" />
        <h2 className="section-title">Consulta Finalizada</h2>
      </div>
      <div className="chat-container">
        <div className="chat-ui">
          <div className="session-ended">
            <div className="ended-icon">🕯️</div>
            <div className="ended-title">El tiempo de consulta ha concluido</div>
            <p className="ended-text">
              Sybilla agradece este encuentro. Las revelaciones de hoy son semillas; cuídalas con reflexión y calma.
            </p>
            <div className="ended-actions">
              <button className="btn-primary" onClick={onReset}>
                🔮 Nueva consulta
              </button>
              <button className="btn-secondary" onClick={onGoHome}>
                ← Menú principal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div style={{ padding: "40px 0 20px" }}>
        <div className="gold-divider" />
        <h2 className="section-title">Consulta Espiritual</h2>
      </div>
      <div className="chat-container">
        <div className="chat-ui">
          <div className="chat-header">
            <div className="chat-avatar">🔮</div>
            <div>
              <div className="chat-name">Sybilla · Vidente</div>
              <div className="chat-status"><span className="status-dot" /> En sesión</div>
            </div>
            <div className={`timer-display ${timeLeft <= 120 ? "urgent" : "normal"}`}>
              ⏳ {formatTime(timeLeft)}
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {m.from === "tarot" && <div className="msg-avatar">🔮</div>}
                <div className="msg-bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="msg tarot">
                <div className="msg-avatar">🔮</div>
                <div className="msg-bubble">
                  <div className="typing-indicator">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={msgEndRef} />
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Escribe tu consulta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button className="chat-send" onClick={sendMessage} disabled={loading || !input.trim()}>✨</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function Mystika() {
  const [tab, setTab] = useState("home");
  const [toast, setToast] = useState(null);

  // ── Session state lifted to root so it survives tab changes ──
  const [chatPhase, setChatPhase] = useState("payment"); // payment | chat | ended
  const [chatMessages, setChatMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatTimeLeft, setChatTimeLeft] = useState(0);
  const [chosenPlan, setChosenPlan] = useState(1);
  const timerRef = useRef(null);

  // ── Ball state lifted to root so memory persists across tab changes ──
  const [ballQuestion, setBallQuestion] = useState("");
  const [ballCurrent, setBallCurrent] = useState(null);
  const [ballHistory, setBallHistory] = useState({});

  // Timer lives here — never interrupted by tab changes
  useEffect(() => {
    if (chatPhase === "chat") {
      timerRef.current = setInterval(() => {
        setChatTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setChatPhase("ended");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [chatPhase]);

  const resetChat = () => {
    setChatPhase("payment");
    setChatMessages([]);
    setChatHistory([]);
    setChatTimeLeft(0);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const hasActiveSession = chatPhase === "chat";

  const TABS = [
    { id: "horoscopes", label: "Horóscopos" },
    { id: "teresa", label: "Teresa Reyes" },
    { id: "chat", label: "Vidente" },
    { id: "ball", label: "Bola Mágica" },
  ];

  return (
    <div className="mystika-root">
      <GlobalStyles />
      <div className="stars" />
      <div className="nebula" />

      <nav className="nav">
        <div className="nav-logo" onClick={() => setTab("home")}>✦ Mystika</div>
        <div className="nav-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`nav-tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.id === "chat" && hasActiveSession && (
                <span style={{
                  display: "inline-block", width: 7, height: 7, borderRadius: "50%",
                  background: "#6ee7b7", boxShadow: "0 0 6px #6ee7b7",
                  marginLeft: 6, verticalAlign: "middle",
                  animation: "pulse-green 2s infinite"
                }} />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Active session reminder banner — visible on all tabs except chat */}
      {hasActiveSession && tab !== "chat" && (
        <div
          onClick={() => setTab("chat")}
          style={{
            position: "fixed", top: 57, left: 0, right: 0, zIndex: 99,
            background: "linear-gradient(90deg, rgba(26,10,46,0.97) 0%, rgba(107,33,168,0.3) 50%, rgba(26,10,46,0.97) 100%)",
            borderBottom: "1px solid rgba(212,175,55,0.35)",
            padding: "9px 20px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            cursor: "pointer",
            fontSize: "0.78rem",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--gold-light)",
          }}
        >
          <span style={{ color: "#6ee7b7", animation: "pulse-green 2s infinite" }}>●</span>
          Consulta en curso · {formatTime(chatTimeLeft)} restantes — Toca para volver
          <span style={{ color: "#6ee7b7", animation: "pulse-green 2s infinite" }}>●</span>
        </div>
      )}

      {tab === "home" && (
        <div className="page" style={{ paddingTop: hasActiveSession ? 104 : 80 }}>
          <div className="hero">
            <div className="hero-logo">✦ Mystika ✦</div>
            <p className="hero-tagline">El universo tiene respuestas. Solo hay que saber escuchar.</p>
          </div>
          <div className="home-grid">
            <div className="home-card" onClick={() => setTab("horoscopes")}>
              <div className="home-card-icon">🌟</div>
              <div className="home-card-title">Horóscopos</div>
              <p className="home-card-desc">Descubre lo que las estrellas revelan para tu signo este mes</p>
            </div>
            <div className="home-card" onClick={() => setTab("teresa")}>
              <div className="home-card-icon">🔮</div>
              <div className="home-card-title">Teresa Reyes</div>
              <p className="home-card-desc">Reserva tu consulta privada con nuestra tarotista y vidente</p>
            </div>
            <div className="home-card" onClick={() => setTab("ball")}>
              <div className="home-card-icon">🎱</div>
              <div className="home-card-title">Bola Mágica</div>
              <p className="home-card-desc">Pregunta lo que el corazón guarda y recibe la respuesta del cosmos</p>
            </div>
            <div className="home-card" onClick={() => setTab("chat")}>
              <div className="home-card-icon">🌙</div>
              <div className="home-card-title">Consulta Vidente</div>
              <p className="home-card-desc">Sesión privada con Sybilla, consultora espiritual exclusiva</p>
            </div>
          </div>
        </div>
      )}

      {tab === "horoscopes" && <HoroscopeSection hasActiveBanner={hasActiveSession} onGoHome={() => setTab("home")} />}
      {tab === "teresa" && <TeresaSection hasActiveBanner={hasActiveSession} onGoHome={() => setTab("home")} />}
      {tab === "ball" && (
        <BallSection
          hasActiveBanner={hasActiveSession}
          question={ballQuestion} setQuestion={setBallQuestion}
          current={ballCurrent} setCurrent={setBallCurrent}
          history={ballHistory} setHistory={setBallHistory}
          onGoHome={() => setTab("home")}
        />
      )}
      {tab === "chat" && (
        <ChatSection
          phase={chatPhase} setPhase={setChatPhase}
          messages={chatMessages} setMessages={setChatMessages}
          history={chatHistory} setHistory={setChatHistory}
          timeLeft={chatTimeLeft} setTimeLeft={setChatTimeLeft}
          chosenPlan={chosenPlan} setChosenPlan={setChosenPlan}
          onGoHome={() => setTab("home")}
          onReset={resetChat}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
