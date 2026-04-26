// ─────────────────────────────────────────────────────────────────────────────
// カリキュラムデータ（静的・DB不使用）
//
// 各 lesson の slideUrl には Google スライドの共有URL / 編集URL を設定してください。
// 対応形式: /edit  /view  /pub  /present  /embed いずれも可
// 例: 'https://docs.google.com/presentation/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/edit'
//
// slideUrl が null のレッスンはプレースホルダーが表示されます。
// ─────────────────────────────────────────────────────────────────────────────

export const units = [
  {
    id: 'unit-1',
    number: 1,
    title: 'AIとは何か？',
    subtitle: 'Introduction to AI',
    description: '人工知能の基本概念を理解し、AIが私たちの生活をどのように変えているかを探ります。',
    icon: '🤖',
    color: 'from-blue-600 to-blue-800',
    accentColor: 'text-blue-400',
    bgAccent: 'bg-blue-950/50 border-blue-800/50',
    difficulty: 'beginner',
    totalLessons: 4,
    estimatedMinutes: 120,
    lessons: [
      {
        id: 'u1-l1',
        number: 1,
        title: 'AIの定義と歴史',
        description: '人工知能とは何かを定義し、1950年代から現在までの発展の歴史を学びます。',
        type: 'lecture',
        duration: 25,
        bannerUrl: '/images/claude-skills.jpg',
        slideUrl: null,
      },
      {
        id: 'u1-l2',
        number: 2,
        title: '身近なAIを探してみよう',
        description: 'スマホ・家電・サービスに潜むAI技術を発見し、AIが日常にどれだけ浸透しているかを実感します。',
        type: 'activity',
        duration: 30,
        bannerUrl: '/images/claude-intro.jpg',
        slideUrl: null,
      },
      {
        id: 'u1-l3',
        number: 3,
        title: 'AIとプログラムの違い',
        description: '従来のプログラムとAI（機械学習）の根本的な違いを理解します。',
        type: 'lecture',
        duration: 30,
        bannerUrl: '/images/ai-vs-program.jpg',
        slideUrl: null,
      },
      {
        id: 'u1-l4',
        number: 4,
        title: '第1章まとめクイズ',
        description: 'AIの基礎知識を確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: '/images/claude-intro.jpg',
        slideUrl: null,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: '「AI」という言葉が初めて使われたのはどの会議でしたか？',
              options: [
                'チューリング会議（1950年）',
                'ダートマス会議（1956年）',
                'MIT AI会議（1960年）',
                'シリコンバレー会議（1970年）',
              ],
              answer: 1,
              explanation: '1956年のダートマス会議でJohn McCarthyらがAIという言葉を提唱しました。',
            },
            {
              id: 'q2',
              question: '現在存在するAI（Siri、ChatGPTなど）は何に分類されますか？',
              options: [
                '強いAI（General AI）',
                '超知性AI（Super AI）',
                '弱いAI（Narrow AI）',
                '汎用AI（AGI）',
              ],
              answer: 2,
              explanation: '現在のAIはすべて特定タスクに特化した「弱いAI（Narrow AI）」です。人間と同等の汎用知性を持つAGIはまだ実現していません。',
            },
            {
              id: 'q3',
              question: 'AI（機械学習）と従来のプログラムの最も大きな違いは何ですか？',
              options: [
                'AIの方がプログラムが短い',
                'AIはデータからルールを自動学習する',
                'AIは電気を使わない',
                'AIはインターネットが必要',
              ],
              answer: 1,
              explanation: '従来のプログラムはルールを人間が書きますが、機械学習はデータから自動的にルール（パターン）を学習します。',
            },
            {
              id: 'q4',
              question: 'ディープラーニングが大きく注目されるようになったきっかけは何ですか？',
              options: [
                '1997年のチェスAIの勝利',
                '2012年の画像認識コンペでの躍進',
                '2016年の囲碁AIの勝利',
                '2022年のChatGPTの登場',
              ],
              answer: 1,
              explanation: '2012年のImageNetコンペでディープラーニングが従来手法を大幅に上回り、AI研究のブレークスルーとなりました。',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'unit-2',
    number: 2,
    title: '機械学習の仕組み',
    subtitle: 'How Machine Learning Works',
    description: '機械学習の3つの学習タイプを理解し、データがどのようにモデルを作るかを体験します。',
    icon: '📊',
    color: 'from-emerald-600 to-emerald-800',
    accentColor: 'text-emerald-400',
    bgAccent: 'bg-emerald-950/50 border-emerald-800/50',
    difficulty: 'intermediate',
    totalLessons: 4,
    estimatedMinutes: 140,
    lessons: [
      {
        id: 'u2-l1',
        number: 1,
        title: '3つの学習タイプ',
        description: '教師あり学習・教師なし学習・強化学習の違いを理解します。',
        type: 'lecture',
        duration: 30,
        bannerUrl: '/images/model-evaluation.jpg',
        slideUrl: null,
      },
      {
        id: 'u2-l2',
        number: 2,
        title: 'データの重要性',
        description: 'AIの性能はデータで決まる。良いデータとは何かを学びます。',
        type: 'lecture',
        duration: 35,
        bannerUrl: '/images/claude-projects.jpg',
        slideUrl: null,
      },
      {
        id: 'u2-l3',
        number: 3,
        title: 'モデルの評価方法',
        description: 'AIモデルの性能をどう測るか。精度・過学習の概念を学びます。',
        type: 'lecture',
        duration: 35,
        bannerUrl: '/images/claude-skills.jpg',
        slideUrl: null,
      },
      {
        id: 'u2-l4',
        number: 4,
        title: '第2章まとめクイズ',
        description: '機械学習の仕組みを確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: '/images/future-work.jpg',
        slideUrl: null,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'AlphaGoが囲碁を学習するために使ったのはどの学習方法ですか？',
              options: ['教師あり学習のみ', '教師なし学習のみ', '強化学習（＋教師あり学習）', 'ルールベースのプログラム'],
              answer: 2,
              explanation: 'AlphaGoは強化学習を主に使い、自己対戦を繰り返して強くなりました。初期段階では人間の棋譜（教師あり学習）も使用しました。',
            },
            {
              id: 'q2',
              question: 'Amazonが開発した採用AIが女性を差別した原因は何でしたか？',
              options: [
                'AIのバグ',
                '過去の採用データが男性に偏っていた',
                'テストデータが不足していた',
                '学習時間が短すぎた',
              ],
              answer: 1,
              explanation: '過去の採用データが男性ばかりだったため、AIは「男性的な特徴」を良い候補者の基準として学習してしまいました。',
            },
            {
              id: 'q3',
              question: '「過学習」とはどのような状態ですか？',
              options: [
                'モデルが訓練データを暗記して新しいデータに対応できない',
                'データが多すぎてモデルが重くなる',
                '学習を続けすぎてCPUが過負荷になる',
                '正解率が高すぎてテストが難しくなる',
              ],
              answer: 0,
              explanation: '過学習（Overfitting）は、訓練データには高精度だが、未知のデータには精度が低い状態です。',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'ニューラルネットワーク',
    subtitle: 'Neural Networks & Deep Learning',
    description: '人間の脳を模した神経回路網の仕組みと、ディープラーニングの革新について学びます。',
    icon: '🧠',
    color: 'from-purple-600 to-purple-800',
    accentColor: 'text-purple-400',
    bgAccent: 'bg-purple-950/50 border-purple-800/50',
    difficulty: 'intermediate',
    totalLessons: 3,
    estimatedMinutes: 110,
    lessons: [
      {
        id: 'u3-l1',
        number: 1,
        title: 'ニューロンとネットワーク',
        description: '人工ニューロンの仕組みとニューラルネットワークの構造を理解します。',
        type: 'lecture',
        duration: 35,
        bannerUrl: '/images/data-importance.jpg',
        slideUrl: null,
      },
      {
        id: 'u3-l2',
        number: 2,
        title: 'CNN・RNN・Transformer',
        description: '代表的なニューラルネットワークのアーキテクチャを学びます。',
        type: 'lecture',
        duration: 40,
        bannerUrl: '/images/quiz.jpg',
        slideUrl: null,
      },
      {
        id: 'u3-l3',
        number: 3,
        title: '第3章まとめクイズ',
        description: 'ニューラルネットワークの知識を確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: '/images/cnn-rnn.jpg',
        slideUrl: null,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'ディープラーニングの「ディープ（深い）」とは何を指しますか？',
              options: [
                'データの量が多いこと',
                '隠れ層が多いこと',
                '学習時間が長いこと',
                '出力の精度が高いこと',
              ],
              answer: 1,
              explanation: 'ディープラーニングの「深い」は隠れ層（Hidden Layer）が多いことを指します。',
            },
            {
              id: 'q2',
              question: 'ChatGPTのベースになっているアーキテクチャはどれですか？',
              options: ['CNN', 'RNN', 'LSTM', 'Transformer'],
              answer: 3,
              explanation: 'ChatGPT（GPTシリーズ）はTransformerアーキテクチャをベースにしています。',
            },
            {
              id: 'q3',
              question: '画像認識に最も適したニューラルネットワークはどれですか？',
              options: ['RNN', 'CNN', 'Transformer', 'LSTM'],
              answer: 1,
              explanation: 'CNN（畳み込みニューラルネットワーク）は画像の局所的な特徴を階層的に抽出するため、画像認識に特に適しています。',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'AI倫理と社会',
    subtitle: 'AI Ethics & Society',
    description: 'AIが社会に与える影響、バイアス・プライバシー・仕事の未来について考えます。',
    icon: '⚖️',
    color: 'from-orange-600 to-orange-800',
    accentColor: 'text-orange-400',
    bgAccent: 'bg-orange-950/50 border-orange-800/50',
    difficulty: 'beginner',
    totalLessons: 4,
    estimatedMinutes: 130,
    lessons: [
      {
        id: 'u4-l1',
        number: 1,
        title: 'AIバイアスとは何か',
        description: 'AIの偏見・差別問題を具体的な事例から学び、その原因と対策を考えます。',
        type: 'lecture',
        duration: 35,
        bannerUrl: '/images/claude-skills.jpg',
        slideUrl: null,
      },
      {
        id: 'u4-l2',
        number: 2,
        title: 'プライバシーとAI監視',
        description: '顔認識技術・データ収集・監視社会について考えます。',
        type: 'lecture',
        duration: 30,
        bannerUrl: '/images/everyday-ai.jpg',
        slideUrl: null,
      },
      {
        id: 'u4-l3',
        number: 3,
        title: 'AIと仕事の未来',
        description: 'どんな仕事がAIに代替されるか、これからの時代に必要なスキルを考えます。',
        type: 'lecture',
        duration: 30,
        bannerUrl: '/images/claude-intro.jpg',
        slideUrl: null,
      },
      {
        id: 'u4-l4',
        number: 4,
        title: '第4章まとめクイズ',
        description: 'AI倫理・社会への影響の理解を確認します。',
        type: 'quiz',
        duration: 15,
        bannerUrl: '/images/privacy.jpg',
        slideUrl: null,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'MITの研究でAIの顔認識精度が最も低かったのはどのグループでしたか？',
              options: ['白人男性', '白人女性', '黒人男性', '黒人女性'],
              answer: 3,
              explanation: 'MIT研究（Joy Buolamwini）によると、黒人女性の識別精度は65%と最も低く、白人男性の99%と大きな差がありました。',
            },
            {
              id: 'q2',
              question: 'EUのAI Actでリアルタイム生体認証（顔認識）はどのように扱われていますか？',
              options: [
                '完全に自由',
                '政府のみ利用可能',
                '原則禁止',
                '民間企業のみ禁止',
              ],
              answer: 2,
              explanation: 'EU AI Act（2024年）では、公共空間でのリアルタイム生体認証AIは原則禁止とされています。',
            },
            {
              id: 'q3',
              question: '「プロンプトエンジニア」とはどのような職業ですか？',
              options: [
                'AIのハードウェアを設計するエンジニア',
                'AIへの指示（プロンプト）を最適化するスペシャリスト',
                'データベースを管理するエンジニア',
                'Webサイトをデザインするエンジニア',
              ],
              answer: 1,
              explanation: 'プロンプトエンジニアはAIに対して効果的な指示を設計・最適化する職業で、生成AI普及に伴い急成長しています。',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'unit-5',
    number: 5,
    title: 'Claude AI実践入門',
    subtitle: 'Getting Started with Claude AI',
    description: 'AnthropicのAIアシスタント「Claude」を使いこなす。導入から初期設定・プロジェクト・スキルズ作成・実践活用まで一気に学びます。',
    icon: '🤝',
    color: 'from-pink-600 to-pink-800',
    accentColor: 'text-pink-400',
    bgAccent: 'bg-pink-950/50 border-pink-800/50',
    difficulty: 'beginner',
    totalLessons: 5,
    estimatedMinutes: 150,
    lessons: [
      {
        id: 'u5-l1',
        number: 1,
        title: 'Claude AIとは何か',
        description: 'AnthropicのAI「Claude」の特徴・できること・他のAIとの違いを理解し、なぜ今注目されているかを学びます。',
        type: 'lecture',
        duration: 25,
        bannerUrl: '/images/claude-setup.jpg',
        slideUrl: null,
      },
      {
        id: 'u5-l2',
        number: 2,
        title: 'アカウント作成と初期設定',
        description: 'Claude.aiへの登録手順・プランの選び方・画面の見方と基本的な操作方法を丁寧に解説します。',
        type: 'activity',
        duration: 30,
        bannerUrl: '/images/claude-skills.jpg',
        slideUrl: null,
      },
      {
        id: 'u5-l3',
        number: 3,
        title: 'プロジェクトの作成と活用',
        description: 'Claudeの「プロジェクト」機能でカスタム指示・知識ベースを設定し、用途に特化した専用AIを作る方法を学びます。',
        type: 'activity',
        duration: 35,
        bannerUrl: '/images/future-work.jpg',
        slideUrl: null,
      },
      {
        id: 'u5-l4',
        number: 4,
        title: 'スキルズの作成と管理',
        description: 'Claudeのスキルズ（カスタムツール）を作成・設定し、繰り返し使えるワークフローを自動化する方法を実践します。',
        type: 'activity',
        duration: 35,
        bannerUrl: '/images/ai-vs-program.jpg',
        slideUrl: null,
      },
      {
        id: 'u5-l5',
        number: 5,
        title: '第5章まとめクイズ',
        description: 'Claude AIの基本操作・プロジェクト・スキルズの理解を確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: '/images/future-work.jpg',
        slideUrl: null,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'Claude AIを開発している企業はどこですか？',
              options: [
                'OpenAI',
                'Google',
                'Anthropic',
                'Meta',
              ],
              answer: 2,
              explanation: 'ClaudeはAnthropicが開発したAIアシスタントです。AnthropicはAIの安全性研究を重視する企業として知られています。',
            },
            {
              id: 'q2',
              question: 'Claudeの「プロジェクト」機能の主な目的は何ですか？',
              options: [
                '複数のユーザーと同時にチャットする',
                'カスタム指示や知識ベースを設定して用途に特化したAIを作る',
                '画像を生成する',
                'インターネットを検索する',
              ],
              answer: 1,
              explanation: 'プロジェクト機能では、カスタム指示（System Prompt）や関連ファイルを登録することで、特定の業務や目的に最適化された専用AIアシスタントを作成できます。',
            },
            {
              id: 'q3',
              question: 'Claudeに指示を出すとき、より良い回答を得るために最も効果的なのはどれですか？',
              options: [
                'できるだけ短く一言で伝える',
                '目的・背景・出力形式を具体的に伝える',
                '英語で入力する',
                '同じ質問を何度も繰り返す',
              ],
              answer: 1,
              explanation: '目的（何をしたいか）・背景（文脈・制約）・出力形式（箇条書き・表など）を具体的に伝えることで、Claude はより正確で役立つ回答を生成できます。',
            },
            {
              id: 'q4',
              question: 'Claudeのスキルズを使うと何ができますか？',
              options: [
                'Claudeにインターネットへの常時接続を許可する',
                '繰り返し使うワークフローをカスタムツールとして登録・自動化できる',
                'Claudeのモデルを自分でトレーニングできる',
                '他のユーザーのチャット履歴を閲覧できる',
              ],
              answer: 1,
              explanation: 'スキルズはよく使う操作や処理をカスタムツールとして登録し、ワンクリックで呼び出せる機能です。定型作業の効率化やワークフローの自動化に役立ちます。',
            },
          ],
        },
      },
    ],
  },
]

// ─── ヘルパー関数 ──────────────────────────────────────────────────────────────

export const getDifficultyLabel = (difficulty) => {
  const map = { beginner: '初級', intermediate: '中級', advanced: '上級' }
  return map[difficulty] || difficulty
}

export const getDifficultyColor = (difficulty) => {
  const map = {
    beginner: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50',
    intermediate: 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50',
    advanced: 'bg-red-900/50 text-red-300 border-red-700/50',
  }
  return map[difficulty] || ''
}

export const getLessonTypeLabel = (type) => {
  const map = { lecture: '講義', activity: '実践', quiz: 'クイズ' }
  return map[type] || type
}

export const getLessonTypeColor = (type) => {
  const map = {
    lecture: 'bg-blue-900/50 text-blue-300 border-blue-700/50',
    activity: 'bg-green-900/50 text-green-300 border-green-700/50',
    quiz: 'bg-purple-900/50 text-purple-300 border-purple-700/50',
  }
  return map[type] || ''
}
