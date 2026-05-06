export const translations = {
  ja: {
    nav: {
      about: "ABOUT",
      journey: "JOURNEY",
      portfolio: "PORTFOLIO",
      bench: "APP",
      work: "WORK",
      contact: "CONTACT",
      insights: "INSIGHTS",
      products: "PRODUCTS"
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
      projects: {
        artera: {
          name: "ARTERA Strategist",
          role: "Frontend Developer (Next.js / AI Integration)",
          problem: "コーヒー焙煎のデータ分析が手動で煩雑であり、再現性の高いプロファイル作成に時間がかかっていた。",
          solution: "Vision AIを活用した画像解析機能を実装。焙煎チャートのスクリーンショットから数値を自動抽出し、AIによる改善提案を行うダッシュボードを構築。",
          result: "データ入力時間を80%削減。直感的なビジュアライゼーションにより、焙煎士の意思決定スピードが大幅に向上しました。"
        }
      }
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
          year: "- 2016",
          location: "Japan",
          role: "University / Walking across Japan",
          description: "大学時代、徒歩での日本縦断を完遂。「やってみないとわからない」という実体験至上主義の精神を確立。"
        }
      ]
    },
    bench: {
        title: "ROAST CALCULATOR",
        description: "数値を入力して焙煎のプロファイルとDevelopment（現像率）をシミュレーションできるインタラクティブなダッシュボードです。",
        currentlyBrewing: "ROAST PROFILE INPUTS",
        roastProfile: "ROAST VISUALIZATION",
        notes: "NOTES"
    },
    products: {
      title: "CURATED PRODUCTS",
      content: "プロフェッショナルな抽出を支える、こだわり抜いたコーヒー器具をセレクトしています。",
      items: [
        {
          id: "stork-coffee-beans",
          name: "Stork Coffee Roasters (Whole Bean)",
          price: "Coming Soon",
          description: "独自のプロファイルで焙煎されたスペシャルティコーヒー豆。現在販売準備中です。",
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "#",
          buttonText: "COMING SOON",
          disabled: true
        },
        {
          id: "beandy-dripper",
          name: "BEANDY Dripper",
          price: "",
          description: "2026年より日本代理店を務める、新世代のコーヒードリッパー。安定した抽出とクリーンな味わいを実現します。",
          image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "https://beandycoffee.com/",
          buttonText: "VIEW ON BEANDYCOFFEE.COM"
        },
        {
          id: "portrait-photography",
          name: "Portrait Photography",
          price: "Custom",
          description: "ポートレート撮影の依頼を受け付けています。あなたの自然な魅力を引き出す1枚を撮影します。",
          image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/...",
          buttonText: "CONTACT FOR DETAILS"
        },
        {
          id: "wh-migration-consulting",
          name: "Overseas WH / Migration Consulting",
          price: "Custom",
          description: "海外でのワーキングホリデーや移住に関するコンサルティング。実体験に基づいたリアルなアドバイスを提供します。",
          image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/...",
          buttonText: "BOOK A CONSULTATION"
        }
      ],
      buyNow: "購入する",
      checkoutRedirect: "Shopifyへリダイレクト中..."
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
          image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1000&auto=format&fit=crop"
        },
        {
          date: "2024.02",
          category: "LifeHack",
          title: "アトピーと食事によるパフォーマンス改善（生存戦略）",
          link: "https://note.com/masaki_19931015/n/n38fa05000094",
          image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000&auto=format&fit=crop"
        },
        {
          date: "2024.01",
          category: "Career",
          title: "メルボルンでバリスタの仕事が見つかって思うこと",
          link: "https://note.com/masaki_19931015/n/n005581aa2811",
          image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      readMore: "READ ON NOTE"
    },
    contact: {
      title: "LET'S TALK ABOUT YOUR PROJECT",
      content: "珈琲のコンサルティング、フロントエンド開発、AI導入など、まずは15分のカジュアル面談でお話しませんか？現在リモートエンジニアリングの案件を優先してお受けしています。",
      bookCall: "15-MIN DISCOVERY CALL",
      resume: "DOWNLOAD RESUME"
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
      bench: "APP",
      work: "WORK",
      contact: "CONTACT",
      insights: "INSIGHTS",
      products: "PRODUCTS"
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
      projects: {
        artera: {
          name: "ARTERA Strategist",
          role: "Frontend Developer (Next.js / AI Integration)",
          problem: "Coffee roast data analysis was manual and cumbersome, making it time-consuming to recreate high-reproducibility profiles.",
          solution: "Implemented an image analysis function utilizing Vision AI. Built a dashboard that automatically extracts numerical data from screenshots of roasting charts and provides AI-driven improvement suggestions.",
          result: "Reduced data entry time by 80%. Intuitive visualization significantly improved the roaster's decision-making speed."
        }
      }
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
          year: "- 2016",
          location: "Japan",
          role: "University / Walking across Japan",
          description: "Completed a walking traverse of Japan during university. Established the 'practical experience first' mindset."
        }
      ]
    },
    bench: {
        title: "ROAST CALCULATOR",
        description: "An interactive dashboard that simulates roast development and visualizes the curve based on your inputs.",
        currentlyBrewing: "ROAST PROFILE INPUTS",
        roastProfile: "ROAST VISUALIZATION",
        notes: "NOTES"
    },
    products: {
      title: "CURATED PRODUCTS",
      content: "Selecting high-performance coffee tools that support professional extraction and consistent quality.",
      items: [
        {
          id: "stork-coffee-beans",
          name: "Stork Coffee Roasters (Whole Bean)",
          price: "Coming Soon",
          description: "Specialty coffee beans roasted with our proprietary profiles. Currently preparing for launch.",
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "#",
          buttonText: "COMING SOON",
          disabled: true
        },
        {
          id: "beandy-dripper",
          name: "BEANDY Dripper",
          price: "",
          description: "A next-generation dripper that achieves stable flow and clean flavor. Proud sales agent for BEANDY since 2026.",
          image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "https://beandycoffee.com/",
          buttonText: "VIEW ON BEANDYCOFFEE.COM"
        },
        {
          id: "portrait-photography",
          name: "Portrait Photography",
          price: "Custom",
          description: "Accepting portrait photography requests. Capturing the natural essence and unique story of each individual.",
          image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/...",
          buttonText: "CONTACT FOR DETAILS"
        },
        {
          id: "wh-migration-consulting",
          name: "WH & Migration Consulting",
          price: "Custom",
          description: "Consulting services for overseas working holidays and migration. Real advice based on authentic global experiences.",
          image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop",
          checkoutUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/...",
          buttonText: "BOOK A CONSULTATION"
        }
      ],
      buyNow: "BUY NOW",
      checkoutRedirect: "Redirecting to Shopify..."
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
          image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1000&auto=format&fit=crop"
        },
        {
          date: "2024.02",
          category: "LifeHack",
          title: "Performance Optimization through Diet and Atopic Dermatitis Management",
          link: "https://note.com/masaki_19931015/n/n38fa05000094",
          image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000&auto=format&fit=crop"
        },
        {
          date: "2024.01",
          category: "Career",
          title: "Reflections on Finding a Barista Job in Melbourne",
          link: "https://note.com/masaki_19931015/n/n005581aa2811",
          image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      readMore: "READ ON NOTE"
    },
    contact: {
      title: "LET'S TALK ABOUT YOUR PROJECT",
      content: "From specialty coffee consulting to sophisticated frontend development and AI integration. Let's explore how we can build something exceptional. Currently accepting remote engineering and AI evaluation opportunities.",
      bookCall: "15-MIN DISCOVERY CALL",
      resume: "DOWNLOAD RESUME"
    },
    footer: {
      builtWith: "Designed & Built with AI"
    }
  }
};
