export const translations = {
  ja: {
    nav: {
      about: "ABOUT",
      journey: "JOURNEY",
      portfolio: "PORTFOLIO",
      tools: "COFFEE TOOLS",
      work: "WORK",
      contact: "CONTACT",
      insights: "INSIGHTS",
      products: "SERVICES"
    },
    hero: {
      title: "MASAKI KONO",
      subtitle: "Coffee Professional / AI Strategist / Traveler",
      tagline: "Specialty Coffee, Strategic Sales, and AI Innovation.",
      valueProp: "ロンドン仕込みのホスピタリティと、AIを活用した戦略設計。珈琲と技術を横断し、価値を創造する。",
      scroll: "SCROLL"
    },
    about: {
      title: "IDENTITY",
      content: `Coffee × AI × 旅人。世界各国のカフェシーンで培った技術と、AIによる業務効率化・戦略立案を武器にする「旅するコーヒーマン」。

単なるバリスタやエンジニアの枠を超え、農園から一杯のカップ、そしてデジタルプロダクトの設計まで、一貫した思想で「プロセス」をデザインします。

「やってみないとわからない」という実体験至上主義を胸に、世界のどこかで今日も、最高の一杯と新しい解決策を追求しています。`
    },
    work: {
      title: "CASE STUDIES",
      subtitle: "コーヒー現場の課題を、エンジニアリングで解決した実例。",
      projects: {
        artera: {
          name: "ARTERA Strategist",
          role: "Frontend Developer (Next.js / AI Integration)",
          problem: "コーヒー焙煎のデータ分析が手動で煩雑であり、再現性の高いプロファイル作成に時間がかかっていた。",
          solution: "Vision AIを活用した画像解析機能を実装。焙煎チャートのスクリーンショットから数値を自動抽出し、AIによる改善提案を行うダッシュボードを構築。",
          result: "データ入力時間を80%削減。直感的なビジュアライゼーションにより、焙煎士の意思決定スピードが大幅に向上しました。"
        }
      },
      otherProjects: [
        {
          name: "EY Calculator",
          role: "Design & Development (Next.js / React)",
          description: "豆量・抽出量・TDSから抽出収率（Extraction Yield）を即時計算するバリスタ向けWebツール。現場の抽出調整を科学的にサポートします。",
          link: "/bench",
          linkLabel: "ツールを試す"
        },
        {
          name: "This Portfolio Site",
          role: "Design & Development (Next.js / Tailwind CSS / Three.js)",
          description: "本サイト自体もAIを活用して設計・開発。日英2言語対応、3D演出、アニメーションを実装したフルスタックプロジェクトです。",
          link: "https://github.com/masakikono",
          linkLabel: "GitHubを見る"
        }
      ]
    },
    journey: {
      title: "CAREER JOURNEY",
      items: [
        {
          year: "2025 - PRESENT",
          location: "London, UK",
          role: "Senior Barista & Roaster",
          description: "La Tostadora にてシニアバリスタ兼ロースターとして勤務。現場の抽出と焙煎の両面から、ロンドンのコーヒーシーンの最前線を支える。また、2026年よりコーヒードリッパー「BEANDY」の代理店営業としての活動も開始。"
        },
        {
          year: "2024",
          location: "Oslo, Norway",
          role: "Barista",
          description: "Supreme Roastworks 及び Fuglen にてバリスタとして勤務。北欧の浅煎り文化の聖地で研鑽を積み、独自の抽出哲学を深める。豆のポテンシャルを最大限に引き出すためのウォータープロファイルや精密な温度管理など、科学的アプローチによる抽出理論を体得。"
        },
        {
          year: "2022",
          location: "Melbourne, Australia",
          role: "Barista",
          description: "Axil Coffee Roasters にて勤務。世界最高峰のカフェ文化の中で、秒単位の調整が求められる高密度なサービスを経験。スピードとクオリティを極限まで両立させる技術とともに、多様なバックグラウンドを持つ顧客へのホスピタリティの本質を学びました。"
        },
        {
          year: "2016 - 2019",
          location: "Tokyo, Japan",
          role: "Foreign Manufacturer Sales",
          description: "医療機器系外資メーカーでの営業経験。複雑な交渉サイクルやステークホルダーマネジメントを担当し、BtoBセールスの基盤を構築。この時代に培ったヒアリング能力とホスピタリティが、現在のエンジニアリングやバリスタとしてのクライアントワークにおける「顧客課題の解像度の高さ」に直結しています。"
        },
        {
          year: "〜 2016",
          location: "Japan",
          role: "University / Walking across Japan",
          description: "大学時代、徒歩での日本縦断を完遂。「やってみないとわからない」という実体験至上主義の精神を確立。"
        }
      ]
    },
    bench: {
        title: "EY CALCULATOR",
        description: "豆の量、抽出量、TDS（濃度）から、瞬時に抽出収率（Extraction Yield）を計算します。理想的な一杯を科学的に再現するためのバリスタツールです。",
        currentlyBrewing: "BREW PARAMETERS",
        roastProfile: "EXTRACTION ANALYSIS",
        notes: "BREW RATIO",
        insights: {
          under: "抽出不足（アンダー）の傾向です。より細かい挽き目にするか、温度を上げる、または抽出時間を延ばすことを検討してください。",
          over: "過抽出（オーバー）の傾向です。粗めの挽き目にするか、温度を下げる、または抽出を早めに切り上げることで調整してください。",
          ideal: "理想的な収率です。豆のポテンシャルと甘みが最もバランス良く表現されているポイントです。"
        }
    },
    products: {
      title: "SERVICES",
      content: "ポートレート撮影とワーホリ・移住相談。実体験を生かした2つのサービスです。",
      items: [
        {
          id: "portrait-photography",
          name: "ポートレート撮影",
          price: "¥3,000",
          description: "あなたの自然な魅力とプロフェッショナルな一面を引き出すポートレート撮影を行います。",
          image: "/images/laughing-outdoors.jpg",
          checkoutUrl: "mailto:masaki19931015@gmail.com?subject=ポートレート撮影のご依頼",
          buttonText: "詳細を問い合わせる"
        },
        {
          id: "wh-migration-consulting",
          name: "ワーホリ・移住コンサル相談",
          price: "¥1,500 / 30分",
          description: "海外でのワーキングホリデーや移住に関する個別コンサルティング。実体験に基づいたリアルな戦略とアドバイスを提供します。",
          image: "/images/Iceland.jpg",
          checkoutUrl: "https://calendar.app.google/ekrsVZwBTgKx9YnV8",
          buttonText: "予約する (Google Calendar)"
        }
      ],
      buyNow: "申し込む",
      checkoutRedirect: "リダイレクト中...",
      features: [
        {
          title: "Real Experience",
          description: "東京・メルボルン・オスロ・ロンドン。4カ国での就労・移住経験に基づくリアルなアドバイス。"
        },
        {
          title: "Easy Booking",
          description: "Googleカレンダーから直接予約可能。時差を考慮した柔軟なスケジュール調整に対応します。"
        },
        {
          title: "Direct Communication",
          description: "仲介なし。ご相談から実施まで、すべて本人が直接対応します。"
        }
      ]
    },
    insights: {
      title: "THOUGHT LEADERSHIP",
      content: "日々の開発や焙煎、海外生活での気づきを言語化し、体系的なナレッジとして発信しています。",
      articles: [
        {
          date: "2024.03",
          category: "Coffee",
          title: "BEANDY Silk Dripper | 友人自作のドリッパーを勝手にレビュー",
          link: "https://note.com/masaki_19931015/n/n8eccb7cfd839",
          image: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=800&v=6"
        },
        {
          date: "2024.02",
          category: "LifeHack",
          title: "アトピーと食事によるパフォーマンス改善（生存戦略）",
          link: "https://note.com/masaki_19931015/n/n38fa05000094",
          image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1000&v=2"
        },
        {
          date: "2024.01",
          category: "Career",
          title: "メルボルンでバリスタの仕事が見つかって思うこと",
          link: "https://note.com/masaki_19931015/n/n005581aa2811",
          image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800&v=6"
        }
      ],
      readMore: "READ ON NOTE"
    },
    contact: {
      title: "LET'S TALK ABOUT YOUR PROJECT",
      content: "コーヒー関連のコンサルティング、または15分のカジュアル面談を受け付けております。お気軽にご連絡ください。",
      bookCall: "15-MIN DISCOVERY CALL",
      resume: "LINKEDIN PROFILE"
    },
    footer: {
      builtWith: "Designed & Built with AI"
    }
  },
  en: {
    nav: {
      about: "ABOUT",
      journey: "JOURNEY",
      portfolio: "PORTFOLIO",
      tools: "COFFEE TOOLS",
      work: "WORK",
      contact: "CONTACT",
      insights: "INSIGHTS",
      products: "SERVICES"
    },
    hero: {
      title: "MASAKI KONO",
      subtitle: "Coffee Professional / AI Strategist / Traveler",
      tagline: "Specialty Coffee. Strategic Sales. AI Innovation.",
      valueProp: "Bridging world-class hospitality and AI-driven architecture. Designing premium experiences that transcend physical and digital boundaries.",
      scroll: "SCROLL"
    },
    about: {
      title: "IDENTITY",
      content: "Coffee. AI. Global Nomad. Operating at the intersection of specialty coffee and software engineering. I transcend the traditional boundaries of a barista or developer—architecting processes from farm to cup, and from concept to digital product. Driven by a 'practical experience first' ethos, I pursue the perfect pour and innovative solutions wherever my journey takes me."
    },
    work: {
      title: "CASE STUDIES",
      subtitle: "Real-world coffee problems, solved with engineering.",
      projects: {
        artera: {
          name: "ARTERA Strategist",
          role: "Frontend Developer (Next.js / AI Integration)",
          problem: "Coffee roast data analysis was manual and cumbersome, making it time-consuming to recreate high-reproducibility profiles.",
          solution: "Implemented an image analysis function utilizing Vision AI. Built a dashboard that automatically extracts numerical data from screenshots of roasting charts and provides AI-driven improvement suggestions.",
          result: "Reduced data entry time by 80%. Intuitive visualization significantly improved the roaster's decision-making speed."
        }
      },
      otherProjects: [
        {
          name: "EY Calculator",
          role: "Design & Development (Next.js / React)",
          description: "A web tool for baristas that instantly calculates Extraction Yield from dose, beverage weight, and TDS — bringing scientific precision to everyday brewing.",
          link: "/bench",
          linkLabel: "Try the tool"
        },
        {
          name: "This Portfolio Site",
          role: "Design & Development (Next.js / Tailwind CSS / Three.js)",
          description: "This site itself is a full-stack project designed and built with AI — featuring bilingual support, 3D visuals, and motion design.",
          link: "https://github.com/masakikono",
          linkLabel: "View on GitHub"
        }
      ]
    },
    journey: {
      title: "CAREER JOURNEY",
      items: [
        {
          year: "2025 - PRESENT",
          location: "London, UK",
          role: "Senior Barista & Roaster",
          description: "Working as a Senior Barista and Roaster at La Tostadora in London, supporting the city's vibrant coffee scene from both the bar and the roastery. Also starting activities as a sales agent for the coffee dripper 'BEANDY' from 2026."
        },
        {
          year: "2024",
          location: "Oslo, Norway",
          role: "Barista",
          description: "Worked at Supreme Roastworks and Fuglen. Refined my craft in the spiritual home of Nordic light roast culture. Gained expertise in scientific extraction theories, including water profiling and precision temperature management, to maximize bean potential."
        },
        {
          year: "2022",
          location: "Melbourne, Australia",
          role: "Barista",
          description: "Worked at Axil Coffee Roasters. Experienced high-density service requiring second-by-second adjustments in the world's most sophisticated coffee culture. Learned the essence of hospitality for diverse backgrounds while mastering the balance of extreme speed and quality."
        },
        {
          year: "2016 - 2019",
          location: "Tokyo, Japan",
          role: "Global Medical Device Sales",
          description: "Sales executive for an international medical device manufacturer. Managed complex negotiation cycles and stakeholder relationships, building a strong foundation in B2B sales. The deep listening skills and hospitality cultivated during this period stand at the core of my current client work as an engineer and barista, enabling high-resolution understanding of client problems."
        },
        {
          year: "Until 2016",
          location: "Japan",
          role: "University / Walking across Japan",
          description: "Completed a walking traverse of Japan during university. Established the 'practical experience first' mindset."
        }
      ]
    },
    bench: {
        title: "EY CALCULATOR",
        description: "Instantly calculate Extraction Yield from dose, yield, and TDS. A professional barista tool to scientifically reproduce the perfect cup.",
        currentlyBrewing: "BREW PARAMETERS",
        roastProfile: "EXTRACTION ANALYSIS",
        notes: "BREW RATIO",
        insights: {
          under: "Indicative of under-extraction. Consider using a finer grind, increasing water temperature, or extending the brew time.",
          over: "Indicative of over-extraction. Consider using a coarser grind, lowering water temperature, or cutting the brew slightly shorter.",
          ideal: "Ideal extraction yield. This is the sweet spot where the coffee's potential and sweetness are most balanced."
        }
    },
    products: {
      title: "SERVICES",
      content: "From portrait photography to migration consulting — personal services grounded in real experience across four countries.",
      items: [
        {
          id: "portrait-photography",
          name: "Portrait Photography",
          price: "¥3,000",
          description: "Professional portrait photography sessions to capture your natural essence and unique story.",
          image: "/images/laughing-outdoors.jpg",
          checkoutUrl: "mailto:masaki19931015@gmail.com?subject=Portrait%20Photography%20Request",
          buttonText: "CONTACT FOR DETAILS"
        },
        {
          id: "wh-migration-consulting",
          name: "WH & Migration Consulting",
          price: "¥1,500 / 30 mins",
          description: "1-on-1 consulting services for overseas working holidays and migration. Real advice based on authentic global experiences.",
          image: "/images/Iceland.jpg",
          checkoutUrl: "https://calendar.app.google/ekrsVZwBTgKx9YnV8",
          buttonText: "BOOK A CONSULTATION"
        }
      ],
      buyNow: "BOOK NOW",
      checkoutRedirect: "Redirecting...",
      features: [
        {
          title: "Real Experience",
          description: "Advice grounded in hands-on work and migration experience across Tokyo, Melbourne, Oslo, and London."
        },
        {
          title: "Easy Booking",
          description: "Book directly via Google Calendar. Flexible scheduling across time zones."
        },
        {
          title: "Direct Communication",
          description: "No middlemen. Every inquiry and session is handled personally, end to end."
        }
      ]
    },
    insights: {
      title: "THOUGHT LEADERSHIP",
      content: "Articulating and structuring daily discoveries from software engineering, coffee roasting, and global living into actionable knowledge.",
      articles: [
        {
          date: "2024.03",
          category: "Coffee",
          title: "BEANDY Silk Dripper | Reviewing my friend's custom dripper",
          link: "https://note.com/masaki_19931015/n/n8eccb7cfd839",
          image: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=800&v=6"
        },
        {
          date: "2024.02",
          category: "LifeHack",
          title: "Performance Optimization through Diet and Atopic Dermatitis Management",
          link: "https://note.com/masaki_19931015/n/n38fa05000094",
          image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1000&v=2"
        },
        {
          date: "2024.01",
          category: "Career",
          title: "Reflections on Finding a Barista Job in Melbourne",
          link: "https://note.com/masaki_19931015/n/n005581aa2811",
          image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800&v=6"
        }
      ],
      readMore: "READ ON NOTE"
    },
    contact: {
      title: "LET'S TALK ABOUT YOUR PROJECT",
      content: "Accepting coffee-related consulting or 15-minute casual discovery calls. Please feel free to reach out.",
      bookCall: "15-MIN DISCOVERY CALL",
      resume: "LINKEDIN PROFILE"
    },
    footer: {
      builtWith: "Designed & Built with AI"
    }
  }
};
