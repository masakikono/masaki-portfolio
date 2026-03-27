import React from "react";

const About = () => {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      <h2 className="text-sm md:text-base font-medium mb-16 tracking-[0.3em] uppercase text-muted">Identity</h2>
      
      <div className="space-y-12 text-base md:text-lg font-light leading-relaxed text-neutral-300">
        <p>
          「やってみないとわからない。」
        </p>
        <p>
          机上の空論よりも、自らの体感と失敗から得たデータを信じる。それが僕の生存戦略だ。
        </p>
        <p>
          外資系医療メーカーの営業を経て、単身フィリピンへ。そしてメルボルン、オスロ、ロンドンへと渡り、世界トップクラスのコーヒーカルチャーの中でバリスタ・焙煎士としての刃を研いできた。
        </p>
        <p>
          単なる技術者にはならない。<br />
          農園からカップに至るまで全てを繋ぐ、「Total Coffee Man」であることが僕のゴールだ。
        </p>
        <p>
          そして、僕のもう一つの顔が「写真」だ。<br />
          目の前にある美しい瞬間を切り取り、そこにある文脈や手仕事のクラフト感を視覚化する。
        </p>
        <p>
          コーヒーも写真も、本質は同じだ。<br />
          誰かにとっての良い影響（GIVE）を生み出すための、僕なりの表現手段である。
        </p>
      </div>
    </section>
  );
};

export default About;
