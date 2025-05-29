const foods = ["膳当家黄焖鸡米饭", "驴蹄子面", "土豆片夹馍", "自选快餐", "沙县小吃", "小碗菜","牛肉面","擀面皮肉夹馍","古觉面片","铁板黄焖鸡米饭","笼笼肉夹馍","大盘鸡拌面"];
let spinning = false;
let anglePerSegment = 360 / foods.length;

// 工具函数：创建扇形路径
function createWedgePath(startAngle, endAngle, radius = 250) {
  const x1 = 250 + radius * Math.cos((startAngle * Math.PI) / 180);
  const y1 = 250 + radius * Math.sin((startAngle * Math.PI) / 180);
  const x2 = 250 + radius * Math.cos((endAngle * Math.PI) / 180);
  const y2 = 250 + radius * Math.sin((endAngle * Math.PI) / 180);
  return `M 250 250 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
}

function drawWheel() {
  const wheel = document.getElementById("wheel");
  wheel.innerHTML = '';

  for (let i = 0; i < foods.length; i++) {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;

    // 创建扇形
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", createWedgePath(startAngle, endAngle));
    path.setAttribute("fill", `hsl(${(360 / foods.length) * i}, 70%, 50%)`);
    wheel.appendChild(path);

    // 添加文字
    const midAngle = startAngle + anglePerSegment / 2;
    const textRadius = 150;
    const x = 250 + textRadius * Math.cos((midAngle * Math.PI) / 180);
    const y = 250 + textRadius * Math.sin((midAngle * Math.PI) / 180);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("fill", "#fff");
    text.setAttribute("font-size", "16");
    text.setAttribute("transform", `rotate(${midAngle}, ${x}, ${y})`);
    text.textContent = foods[i];
    wheel.appendChild(text);
  }
}

function spin() {
  if (spinning) return;
  spinning = true;

  const total = foods.length;
  const wheel = document.getElementById("wheel");

  // 随机选择一个扇区索引
  const targetIndex = Math.floor(Math.random() * total);

  // 扇区中心角度（SVG 中 0° 是向右，所以要加 90 才能对齐指针方向）
  let finalAngle = (targetIndex * anglePerSegment + anglePerSegment / 2 + 90) % 360;

  // 加上若干圈数
  const extraRotations = Math.floor(Math.random() * 3 + 5); // 5~7 圈
  const destinationAngle = extraRotations * 360 + (360 - finalAngle);

  const duration = 4 + Math.random(); // 动画时间约4~5秒

  // 设置过渡属性
  wheel.style.transition = `transform ${duration}s cubic-bezier(0.33, 1, 0.68, 1)`;
  wheel.style.transform = `rotate(${destinationAngle}deg)`;

  // 动画结束后弹出结果并解锁
  setTimeout(() => {
    alert(`今天吃：${foods[targetIndex]}`);
    spinning = false;

    // 可选：重置 wheel 的旋转状态，方便下一次从 0 开始
    wheel.style.transition = 'none'; // 关闭过渡
    wheel.style.transform = 'rotate(0deg)';
  }, duration * 1000);
}

drawWheel();