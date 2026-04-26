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
        bannerUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u1-l2',
        number: 2,
        title: '身近なAIを探してみよう',
        description: 'スマホ・家電・サービスに潜むAI技術を発見し、AIが日常にどれだけ浸透しているかを実感します。',
        type: 'activity',
        duration: 30,
        bannerUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u1-l3',
        number: 3,
        title: 'AIとプログラムの違い',
        description: '従来のプログラムとAI（機械学習）の根本的な違いを理解します。',
        type: 'lecture',
        duration: 30,
        bannerUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u1-l4',
        number: 4,
        title: '第1章まとめクイズ',
        description: 'AIの基礎知識を確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
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
        bannerUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u2-l2',
        number: 2,
        title: 'データの重要性',
        description: 'AIの性能はデータで決まる。良いデータとは何かを学びます。',
        type: 'lecture',
        duration: 35,
        bannerUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u2-l3',
        number: 3,
        title: 'モデルの評価方法',
        description: 'AIモデルの性能をどう測るか。精度・過学習の概念を学びます。',
        type: 'lecture',
        duration: 35,
        bannerUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u2-l4',
        number: 4,
        title: '第2章まとめクイズ',
        description: '機械学習の仕組みを確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
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
        bannerUrl: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u3-l2',
        number: 2,
        title: 'CNN・RNN・Transformer',
        description: '代表的なニューラルネットワークのアーキテクチャを学びます。',
        type: 'lecture',
        duration: 40,
        bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u3-l3',
        number: 3,
        title: '第3章まとめクイズ',
        description: 'ニューラルネットワークの知識を確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
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
        bannerUrl: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u4-l2',
        number: 2,
        title: 'プライバシーとAI監視',
        description: '顔認識技術・データ収集・監視社会について考えます。',
        type: 'lecture',
        duration: 30,
        bannerUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u4-l3',
        number: 3,
        title: 'AIと仕事の未来',
        description: 'どんな仕事がAIに代替されるか、これからの時代に必要なスキルを考えます。',
        type: 'lecture',
        duration: 30,
        bannerUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u4-l4',
        number: 4,
        title: '第4章まとめクイズ',
        description: 'AI倫理・社会への影響の理解を確認します。',
        type: 'quiz',
        duration: 15,
        bannerUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
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
    title: 'AI実践入門',
    subtitle: 'Hands-on AI Practice',
    description: '生成AI・画像認識・自然言語処理を実際に動かし、AIの応用力を身につけます。',
    icon: '🚀',
    color: 'from-pink-600 to-pink-800',
    accentColor: 'text-pink-400',
    bgAccent: 'bg-pink-950/50 border-pink-800/50',
    difficulty: 'advanced',
    totalLessons: 3,
    estimatedMinutes: 120,
    lessons: [
      {
        id: 'u5-l1',
        number: 1,
        title: '生成AIを使いこなす',
        description: 'ChatGPT・Claudeなどの生成AIを効果的に活用するプロンプト技術を学びます。',
        type: 'activity',
        duration: 40,
        bannerUrl: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u5-l2',
        number: 2,
        title: 'Pythonで機械学習体験',
        description: 'Scikit-learnを使った実際の機械学習コードを読み解き、AIの動作を体感します。',
        type: 'activity',
        duration: 45,
        bannerUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
      },
      {
        id: 'u5-l3',
        number: 3,
        title: '第5章まとめクイズ',
        description: 'AI実践の知識を確認するクイズです。',
        type: 'quiz',
        duration: 15,
        bannerUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
        slideUrl: null,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'プロンプトエンジニアリングで「ロールプレイ」とはどのテクニックですか？',
              options: [
                'AIにゲームをさせる',
                'AIに特定の役割（「専門家として…」等）を与えて回答品質を上げる',
                'プロンプトをランダムに変えて最適解を探す',
                'AIのパラメータを手動で調整する',
              ],
              answer: 1,
              explanation: 'ロールプレイはAIに「あなたは経験豊富な〇〇です」と役割を与えることで、そのドメインに適した詳しい回答を引き出すテクニックです。',
            },
            {
              id: 'q2',
              question: 'Scikit-learnの model.fit(X_train, y_train) は何をしていますか？',
              options: [
                'テストデータで性能を評価する',
                '訓練データを使ってモデルを学習させる',
                'データを可視化する',
                'モデルをファイルに保存する',
              ],
              answer: 1,
              explanation: '.fit() は訓練データ（X_train）と正解ラベル（y_train）を使ってモデルを学習させるメソッドです。',
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
