import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-cream to-warm-light relative overflow-hidden cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg')] bg-cover" />

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 max-w-2xl mx-auto">
        {/* Logo/Image placeholder */}
        <motion.div
          className="w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-4xl">🌱</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl font-bold text-foreground mb-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          WEB INTRO
        </motion.h1>

        {/* Main content */}
        <motion.div
          className="text-foreground/80 text-sm leading-relaxed space-y-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-base font-medium">
            你所抵抗的，會持續存在；你所接納的，會悄然改變 ----《接納》
            讓每一個感受，都像一縷風或一片雲，擁有穿過你整個內在天空的自由。你不必留住它，也不必趕走它，只需看著它，來去。
          </p>

          <p>
            這是一個專為飲食障礙康復者設計的數位支持空間。基於「接納與承諾療法」（ACT），我們協助您將日常生活中的負面思維、固化信念和自我批判，轉化為更靈活、更有助於價值生活的視角。
          </p>

          <div className="py-4 text-left bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <p className="font-semibold mb-2">🌱 體驗ACT的六大核心過程：</p>
            <ul className="space-y-1 text-sm">
              <li>- 認知解離 &gt;「想法只是文字和圖像」</li>
              <li>- 接納 &gt;「為感受騰出空間」</li>
              <li>- 當下覺察 &gt;「回到此時此刻」</li>
              <li>- 觀察性自我 &gt;「我是經歷這些的容器」</li>
              <li>- 價值澄清 &gt;「什麼對我真正重要」</li>
              <li>- 承諾行動 &gt;「朝著價值邁出一小步」</li>
            </ul>
          </div>

          <p>這是一個供您練習、反思與成長的安全空間。</p>

          <div className="pt-4 text-xs text-muted-foreground border-t border-border/50 mt-6">
            <p className="mb-2">
              此工具用於支持性探索，不能替代專業醫療建議、診斷或治療。如果您需要幫助，請務必聯繫合格的醫療專業人員。
            </p>
            <p>
              如需支持，請訪問：
              <a
                href="https://www.heda-hk.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                香港飲食失調康復會 HEDA
              </a>
            </p>
            <p className="mt-4 text-muted-foreground/70">V0：傅嘉怡 (Jenny)</p>
          </div>
        </motion.div>

        {/* Click hint */}
        <motion.p
          className="mt-12 text-sm text-muted-foreground animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          點擊任意位置進入 →
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Landing;
