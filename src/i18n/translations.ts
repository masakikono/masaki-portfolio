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
      subtitle: "Coffee x AI x Traveler",
      tagline: "Bridging Specialty Coffee and Technology.",
      valueProp: "ロンドン仕込みのホスピタリティと、最新のフロントエンド技術で、ビジネスの課題を解決する。",
      scroll: "SCROLL"
    },
    about: {
      title: "IDENTITY",
      content: `Coffee × AI × 旅人。外資メーカーの営業、フィリピン・メルボルンでの留学、東京でのエンジニア経験。紆余曲折を経て、現在はロンドンで「旅するコーヒーマン」として活動しています。

私にとってコーヒーは単なる飲料ではなく、農園から一杯のカップまで続く深い探求の旅です。エンジニアとしての視点は、その探求をより精密にし、言語化するための強力な武器になっています。

「机上の空論よりも、自らの体感と失敗から得たデータを信じる」その実体験至上主義を胸に、世界のどこかで今日も、最高の一杯と新しいコードを追求しています。`
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
          id: "beandy-dripper",
          name: "BEANDY Dripper",
          price: "¥4,800",
          description: "2026年より日本代理店を務める、新世代のコーヒードリッパー。安定した抽出とクリーンな味わいを実現します。",
          image: "/images/blue-lagoon-drink.jpg",
          checkoutUrl: "https://shop.masakikono.com/products/beandy"
        },
        {
          id: "oslo-light-roast",
          name: "Oslo Selection (Whole Bean)",
          price: "¥2,800",
          description: "北欧の焙煎哲学に基づいた、果実味あふれる浅煎りコーヒー。現地ロースターとのコラボレーションモデル。",
          image: "/images/kaf-coffee.jpg",
          checkoutUrl: "https://shop.masakikono.com/products/oslo-selection"
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
          date: "2026.03",
          category: "AI & Tech",
          title: "Master Prompt Generation Pipeline: AIとの対話品質を極限まで高める設計",
          link: "https://note.com/masakikono_3_0",
          image: "/images/laughing-laptop.jpg"
        },
        {
          date: "2026.03",
          category: "LifeHack",
          title: "アトピーと食事によるパフォーマンス改善（生存戦略）",
          link: "https://note.com/masakikono_3_0",
          image: "/images/Iceland.jpg"
        },
        {
          date: "2025.10",
          category: "Coffee",
          title: "Specialty Coffeeの抽出論理とフロントエンド設計の共通点",
          link: "https://note.com/masakikono_3_0",
          image: "/images/kaf-coffee.jpg"
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
      subtitle: "Coffee x AI x Traveler",
      tagline: "Bridging Specialty Coffee and Technology.",
      valueProp: "Solving business challenges with London-crafted hospitality and cutting-edge frontend technology.",
      scroll: "SCROLL"
    },
    about: {
      title: "IDENTITY",
      content: "Coffee x AI x Traveler. From sales at a foreign manufacturer to studying in Cebu and Melbourne, followed by engineering in Tokyo. My journey has been non-linear, and I now operate as an 'eternal walking coffee traveler' based in London. To me, coffee is not just a beverage; it is a deep journey of exploration from the farm to the cup. My background as an engineer provides a precise lens to understand and articulate this exploration. Guided by the principle of 'experience over speculation,' I pursue the perfect pour and clean code wherever my journey takes me."
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
          id: "beandy-dripper",
          name: "BEANDY Dripper",
          price: "£28.00",
          description: "A next-generation dripper that achieves stable flow and clean flavor. Proud sales agent for BEANDY since 2026.",
          image: "/images/blue-lagoon-drink.jpg",
          checkoutUrl: "https://shop.masakikono.com/products/beandy"
        },
        {
          id: "oslo-light-roast",
          name: "Oslo Selection (Whole Bean)",
          price: "£16.00",
          description: "Collaboration series with Nordic roasters, featuring the vibrant acidity of the light roast culture.",
          image: "/images/kaf-coffee.jpg",
          checkoutUrl: "https://shop.masakikono.com/products/oslo-selection"
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
          date: "2026.03",
          category: "AI & Tech",
          title: "Master Prompt Generation Pipeline: Maximizing Communication Quality with AI",
          link: "https://note.com/masakikono_3_0",
          image: "/images/laughing-laptop.jpg"
        },
        {
          date: "2026.03",
          category: "LifeHack",
          title: "Performance Optimization through Diet and Atopic Dermatitis Management",
          link: "https://note.com/masakikono_3_0",
          image: "/images/Iceland.jpg"
        },
        {
          date: "2025.10",
          category: "Coffee",
          title: "The Overlap Between Specialty Coffee Extraction and Frontend Architecture",
          link: "https://note.com/masakikono_3_0",
          image: "/images/kaf-coffee.jpg"
        }
      ],
      readMore: "READ ON NOTE"
    },
    contact: {
      title: "LET'S TALK ABOUT YOUR PROJECT",
      content: "From coffee consulting to sophisticated frontend development and AI integration. Let's schedule a 15-min discovery call. Currently highly accepting remote engineering opportunities.",
      bookCall: "15-MIN DISCOVERY CALL",
      resume: "DOWNLOAD RESUME"
    },
    footer: {
      builtWith: "Designed & Built with AI"
    }
  }
};
