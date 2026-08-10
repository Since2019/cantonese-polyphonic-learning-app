"use client";

import { useMemo, useRef, useState } from "react";

const words = [
  {
    char: "行",
    note: "一个字，换个场景就换把声。",
    readings: [
      { jyutping: "haang4", label: "行走", example: "行街 · 行路", gloss: "走、步行", audio: "/audio/haang4.mp3" },
      { jyutping: "hong4", label: "行业", example: "銀行 · 行家", gloss: "行业、行列", audio: "/audio/hong4.mp3" },
    ],
  },
  {
    char: "重",
    note: "声调一转，动作和重量就分开了。",
    readings: [
      { jyutping: "cung4", label: "重复", example: "重新 · 重逢", gloss: "再次、重复", audio: "/audio/cung4.mp3" },
      { jyutping: "zung6", label: "重量", example: "重要 · 重量", gloss: "分量大、要紧", audio: "/audio/zung6.mp3" },
    ],
  },
  {
    char: "長",
    note: "是长度，还是成长？语境会告诉你。",
    readings: [
      { jyutping: "coeng4", label: "长度", example: "長短 · 長城", gloss: "距离或时间长", audio: "/audio/coeng4.mp3" },
      { jyutping: "zoeng2", label: "成长", example: "長大 · 校長", gloss: "成长、年长者", audio: "/audio/zoeng2.mp3" },
    ],
  },
  {
    char: "樂",
    note: "快乐和音乐，只差一个读音。",
    readings: [
      { jyutping: "lok6", label: "快乐", example: "快樂 · 樂趣", gloss: "开心、欢喜", audio: "/audio/lok6.mp3" },
      { jyutping: "ngok6", label: "音乐", example: "音樂 · 樂器", gloss: "乐音、乐器", audio: "/audio/ngok6.mp3" },
    ],
  },
];

const mistakes = [
  { wrong: "我係屋企", right: "我喺屋企", title: "喺 ≠ 係", tip: "「喺」讲位置；「係」表示是。" },
  { wrong: "我既朋友", right: "我嘅朋友", title: "嘅 ≠ 既", tip: "粤语所属关系用「嘅」，不要用同音字代替。" },
  { wrong: "宜家出发", right: "而家出發", title: "而家 ≠ 宜家", tip: "表示“现在”的常用粤语正字是「而家」。" },
];

const pronunciationTraps = [
  {
    char: "弥",
    traditional: "彌",
    jyutping: "mei4",
    example: "彌補 · 彌漫",
    audio: "/audio/mei4.mp3",
    reminder: "书面本读 mei4；口语亦常听到 nei4，认识两者就不易听错。",
  },
  {
    char: "憧",
    traditional: "憧",
    jyutping: "cung1",
    example: "憧憬 cung1 ging2",
    audio: "/audio/cung1.mp3",
    reminder: "不要见到「童」就直接猜 tung4；在「憧憬」里读 cung1。",
  },
  {
    char: "烁",
    traditional: "爍",
    jyutping: "soek3",
    example: "閃爍 sim2 soek3",
    audio: "/audio/soek3.mp3",
    reminder: "这是入声字，结尾短促；不要按普通话或声旁随意猜音。",
  },
];

const quiz = [
  { prompt: "「銀行」里面的「行」点读？", options: ["haang4", "hong4", "hang6"], answer: 1, explain: "「銀行」属于行业义，读 hong4。" },
  { prompt: "边句写法更准确？", options: ["我係学校", "我喺學校", "我系學校"], answer: 1, explain: "讲所在位置要用「喺」；「係」表示“是”。" },
  { prompt: "「音樂」里面的「樂」点读？", options: ["lok6", "ngok6", "zoek6"], answer: 1, explain: "表示音乐、乐器时，「樂」读 ngok6。" },
  { prompt: "「閃爍」里面的「爍」点读？", options: ["lok6", "soek3", "zoek6"], answer: 1, explain: "「閃爍」读 sim2 soek3，「爍」是短促的入声字。" },
];

export default function Home() {
  const [activeWord, setActiveWord] = useState(0);
  const [question, setQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const activeAudio = useRef<HTMLAudioElement | null>(null);
  const word = words[activeWord];
  const current = quiz[question];

  const progress = useMemo(() => Math.round(((question + (selected !== null ? 1 : 0)) / quiz.length) * 100), [question, selected]);

  function playCantonese(src: string) {
    activeAudio.current?.pause();
    const audio = new Audio(src);
    activeAudio.current = audio;
    void audio.play();
  }

  function choose(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === current.answer) setScore((value) => value + 1);
  }

  function nextQuestion() {
    if (question === quiz.length - 1) {
      setFinished(true);
      return;
    }
    setQuestion((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setQuestion(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="粤字醒首页"><span>粵</span> 粤字醒</a>
        <nav aria-label="主导航">
          <a href="#learn">识字</a><a href="#mistakes">避错</a><a href="#quiz">挑战</a>
        </nav>
        <a className="nav-cta" href="#quiz">今日开练 <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>●</span> 粤语唔止一种读法</p>
          <h1>一字多音，<br /><em>唔好读错。</em></h1>
          <p className="intro">从一句话的语境，听懂一个字的变化。每日 5 分钟，认清粤语多音字同常见错字。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#learn">开始第一课 <span>→</span></a>
            <button className="sound-button" onClick={() => playCantonese("/audio/hero.mp3")}>◖)) <span>听听粤语</span></button>
          </div>
          <div className="social-proof"><strong>3,280+</strong><span>个学习者今日已经醒目咗</span></div>
        </div>
        <div className="hero-stage" aria-label="行字多音示例">
          <div className="stamp">今日一字<br /><strong>01</strong></div>
          <div className="big-char">行</div>
          <div className="reading-card card-a"><b>haang4</b><span>行街 · 行路</span></div>
          <div className="reading-card card-b"><b>hong4</b><span>銀行 · 行家</span></div>
          <div className="connector c1" /><div className="connector c2" />
          <p className="stage-caption">同一个「行」字，<br />你读啱咗未？</p>
        </div>
      </section>

      <section className="ticker" aria-label="学习重点">
        <span>多音字</span><b>◆</b><span>正字辨析</span><b>◆</b><span>粤拼声调</span><b>◆</b><span>生活例句</span><b>◆</b><span>每日挑战</span>
      </section>

      <section className="lesson section" id="learn">
        <div className="section-heading">
          <div><p className="eyebrow dark"><span>●</span> 今日重点</p><h2>睇清语境，<br />自然读得啱。</h2></div>
          <p>点选汉字，比较它在不同词语里的读音。按小喇叭，还可以听整组词语。</p>
        </div>
        <div className="word-tabs" role="tablist" aria-label="选择多音字">
          {words.map((item, index) => <button role="tab" aria-selected={activeWord === index} key={item.char} onClick={() => setActiveWord(index)}><span>{item.char}</span><small>0{index + 1}</small></button>)}
        </div>
        <div className="word-workbench">
          <div className="word-focus"><span className="focus-label">多音字档案</span><strong>{word.char}</strong><p>{word.note}</p></div>
          <div className="reading-list">
            {word.readings.map((reading, index) => (
              <article key={reading.jyutping}>
                <span className="reading-num">0{index + 1}</span>
                <div><p className="jyutping">{reading.jyutping}</p><h3>{reading.label}</h3><p>{reading.gloss}</p></div>
                <div className="example"><span>例词</span><b>{reading.example}</b></div>
                <button className="play" aria-label={`播放${reading.example}的粤语录音`} onClick={() => playCantonese(reading.audio)}>▶</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mistakes section" id="mistakes">
        <div className="section-heading light">
          <div><p className="eyebrow"><span>●</span> 眼利训练</p><h2>唔好贪同音，<br />写错第二个字。</h2></div>
          <p>口语听落一样，写出来未必一样。认住字义，比死记字形更有效。</p>
        </div>
        <div className="mistake-grid">
          {mistakes.map((item, index) => <article key={item.title}>
            <div className="card-index">0{index + 1}</div><h3>{item.title}</h3>
            <p className="wrong"><span>×</span>{item.wrong}</p><p className="right"><span>✓</span>{item.right}</p>
            <p className="tip">{item.tip}</p>
          </article>)}
        </div>
        <div className="pronunciation-block">
          <div className="pronunciation-heading">
            <p><span>02</span> 读音陷阱</p>
            <h3>望落熟口熟面，<br />开口先知读错。</h3>
          </div>
          <div className="trap-list">
            {pronunciationTraps.map((item) => <article key={item.char}>
              <button className="trap-char" onClick={() => playCantonese(item.audio)} aria-label={`播放${item.char}字粤语例词`}>
                {item.char}<small>{item.traditional === item.char ? "" : `繁：${item.traditional}`}</small>
              </button>
              <div className="trap-copy">
                <p className="trap-jyutping">{item.jyutping}</p>
                <h4>{item.example}</h4>
                <p>{item.reminder}</p>
              </div>
              <button className="trap-play" onClick={() => playCantonese(item.audio)} aria-label={`听${item.example}的粤语录音`}>▶</button>
            </article>)}
          </div>
        </div>
      </section>

      <section className="quiz-section section" id="quiz">
        <div className="quiz-intro"><p className="eyebrow dark"><span>●</span> 30 秒挑战</p><h2>你有几醒？</h2><p>三题快问快答，马上知道自己最容易错边度。</p><div className="quiz-mark">粤<br />字<br />醒</div></div>
        <div className="quiz-card">
          {finished ? <div className="result">
            <span className="result-icon">醒</span><p className="eyebrow dark">挑战完成</p><h3>{score} / {quiz.length}</h3><p>{score === quiz.length ? "全中！你对粤语字音好敏感。" : "有进步空间，返去温多次就稳阵。"}</p><button className="primary-button" onClick={restart}>再试一次 <span>↻</span></button>
          </div> : <>
            <div className="quiz-meta"><span>问题 {question + 1} / {quiz.length}</span><span>{progress}%</span></div>
            <div className="progress"><i style={{ width: `${progress}%` }} /></div>
            <h3>{current.prompt}</h3>
            <div className="options">
              {current.options.map((option, index) => {
                const state = selected === null ? "" : index === current.answer ? "correct" : index === selected ? "wrong-answer" : "dim";
                return <button className={state} key={option} onClick={() => choose(index)} disabled={selected !== null}><span>{String.fromCharCode(65 + index)}</span>{option}<b>{state === "correct" ? "✓" : state === "wrong-answer" ? "×" : ""}</b></button>;
              })}
            </div>
            {selected !== null && <div className={`feedback ${selected === current.answer ? "good" : "try"}`}><strong>{selected === current.answer ? "答啱咗！" : "差少少！"}</strong><span>{current.explain}</span><button onClick={nextQuestion}>{question === quiz.length - 1 ? "睇成绩" : "下一题"} →</button></div>}
          </>}
        </div>
      </section>

      <footer><div className="brand"><span>粵</span> 粤字醒</div><p>听得明，更要读得准、写得啱。</p><a href="#top">返到上面 ↑</a></footer>
    </main>
  );
}
