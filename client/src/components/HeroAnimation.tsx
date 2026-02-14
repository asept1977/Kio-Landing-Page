import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";

interface NodeDef {
  label: string;
  x: number;
  y: number;
  color: string;
  side: "left" | "right";
  iconPath?: string;
  iconViewBox?: number;
  customIcon?: (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) => void;
}

const LEFT_COLOR = "#4da3ff";
const RIGHT_COLOR = "#9b7bff";
const CORE_COLOR = "#ff6a1a";
const BG_COLOR = "#0b1d2c";

const ICON_PATHS: Record<string, { path: string; viewBox: number }> = {
  Miro: {
    path: "M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z",
    viewBox: 24,
  },
  Atlassian: {
    path: "M7.12 11.084a.683.683 0 00-1.16.126L.075 22.974a.703.703 0 00.63 1.018h8.19a.678.678 0 00.63-.39c1.767-3.65.696-9.203-2.406-12.52zM11.434.386a15.515 15.515 0 00-.906 15.317l3.95 7.9a.703.703 0 00.628.388h8.19a.703.703 0 00.63-1.017L12.63.38a.664.664 0 00-1.196.006z",
    viewBox: 24,
  },
  Statista: {
    path: "M.8597 0a.84.84 0 0 0-.8404.8404v15.2165H.14s3.6114-.0681 5.1428-.8739a10.89 10.89 0 0 0 3.337-3.0513l.903-1.2746.2857-.4062c.0343-.04.1821-.2571.2678-.3828s.4581-.6506.8181-1.1764a16.94 16.94 0 0 1 5.2623-4.7433c3.3371-1.7142 7.76-1.5424 7.76-1.5424h.0681V.8917A.84.84 0 0 0 23.1455 0Zm23.1195 7.9487a.9.9 0 0 1-.2166.029s-3.6054.068-5.154.8794a10.86 10.86 0 0 0-3.3382 3.0458l-.885 1.2801c-.1314.1829-.257.3652-.2913.4052l-.269.3828-.817 1.1774s-2.1776 3.1433-5.2633 4.7433c-3.2 1.6629-7.3882 1.5539-7.731 1.5425v1.7142A.84.84 0 0 0 .8541 24h22.2857a.84.84 0 0 0 .8393-.8404z",
    viewBox: 24,
  },
};

function drawMicrosoftLogo(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, _color: string) {
  const s = size / 2;
  const gap = size * 0.06;
  ctx.fillStyle = "#f25022";
  ctx.fillRect(cx - s, cy - s, s - gap, s - gap);
  ctx.fillStyle = "#7fba00";
  ctx.fillRect(cx + gap, cy - s, s - gap, s - gap);
  ctx.fillStyle = "#00a4ef";
  ctx.fillRect(cx - s, cy + gap, s - gap, s - gap);
  ctx.fillStyle = "#ffb900";
  ctx.fillRect(cx + gap, cy + gap, s - gap, s - gap);
}

function drawERPIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const s = size * 0.45;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.fillStyle = `${color}30`;
  ctx.beginPath();
  ctx.moveTo(cx - s, cy + s * 0.6);
  ctx.lineTo(cx - s, cy - s * 0.4);
  ctx.lineTo(cx, cy - s);
  ctx.lineTo(cx + s, cy - s * 0.4);
  ctx.lineTo(cx + s, cy + s * 0.6);
  ctx.lineTo(cx, cy + s);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - s, cy - s * 0.4);
  ctx.lineTo(cx, cy + s * 0.15);
  ctx.lineTo(cx + s, cy - s * 0.4);
  ctx.strokeStyle = `${color}60`;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.15);
  ctx.lineTo(cx, cy + s);
  ctx.stroke();
}

function drawCRMIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const s = size * 0.4;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy - s * 0.35, s * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 0.55, s * 0.7, s * 0.45, 0, Math.PI, 0, true);
  ctx.fill();
}

function drawDatabaseIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const w = size * 0.45;
  const h = size * 0.45;
  const ey = h * 0.25;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.fillStyle = `${color}20`;
  ctx.beginPath();
  ctx.ellipse(cx, cy - h + ey, w, ey, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - w, cy - h + ey);
  ctx.lineTo(cx - w, cy + h - ey);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + w, cy - h + ey);
  ctx.lineTo(cx + w, cy + h - ey);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy + h - ey, w, ey, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, w, ey, 0, 0, Math.PI, false);
  ctx.strokeStyle = `${color}60`;
  ctx.stroke();
}

function drawGlobeIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const r = size * 0.4;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 0.45, r, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx + r, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx, cy + r);
  ctx.stroke();
}

function drawDocIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const w = size * 0.32;
  const h = size * 0.42;
  const fold = size * 0.12;
  ctx.fillStyle = `${color}20`;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - w, cy - h);
  ctx.lineTo(cx + w - fold, cy - h);
  ctx.lineTo(cx + w, cy - h + fold);
  ctx.lineTo(cx + w, cy + h);
  ctx.lineTo(cx - w, cy + h);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + w - fold, cy - h);
  ctx.lineTo(cx + w - fold, cy - h + fold);
  ctx.lineTo(cx + w, cy - h + fold);
  ctx.stroke();
  for (let i = 0; i < 3; i++) {
    const ly = cy - h * 0.3 + i * h * 0.35;
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.6, ly);
    ctx.lineTo(cx + w * 0.4, ly);
    ctx.strokeStyle = `${color}50`;
    ctx.stroke();
  }
}

function drawSearchIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const r = size * 0.28;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(cx - size * 0.08, cy - size * 0.08, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + r * 0.55, cy + r * 0.55);
  ctx.lineTo(cx + size * 0.35, cy + size * 0.35);
  ctx.stroke();
}

interface NodeConfig {
  label: string;
  color: string;
  iconPath?: string;
  iconViewBox?: number;
  customIcon?: (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) => void;
}

const LEFT_NODES: NodeConfig[] = [
  { label: "ERP", color: LEFT_COLOR, customIcon: drawERPIcon },
  { label: "CRM", color: LEFT_COLOR, customIcon: drawCRMIcon },
  { label: "Miro", color: LEFT_COLOR, ...ICON_PATHS.Miro },
  { label: "Outlook", color: LEFT_COLOR, customIcon: drawMicrosoftLogo },
  { label: "SharePoint", color: LEFT_COLOR, customIcon: drawMicrosoftLogo },
  { label: "Teams", color: LEFT_COLOR, customIcon: drawMicrosoftLogo },
  { label: "Atlassian", color: LEFT_COLOR, ...ICON_PATHS.Atlassian },
  { label: "Database", color: LEFT_COLOR, customIcon: drawDatabaseIcon },
];

const RIGHT_NODES: NodeConfig[] = [
  { label: "North Data", color: RIGHT_COLOR, customIcon: drawGlobeIcon },
  { label: "Statista", color: RIGHT_COLOR, ...ICON_PATHS.Statista },
  { label: "DIP", color: RIGHT_COLOR, customIcon: drawDocIcon },
  { label: "Lobbyregister", color: RIGHT_COLOR, customIcon: drawDocIcon },
  { label: "Dun & Bradstreet", color: RIGHT_COLOR, customIcon: drawSearchIcon },
];

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function drawSvgPath(ctx: CanvasRenderingContext2D, pathStr: string, cx: number, cy: number, size: number, viewBox: number, color: string) {
  const scale = size / viewBox;
  ctx.save();
  ctx.translate(cx - (viewBox * scale) / 2, cy - (viewBox * scale) / 2);
  ctx.scale(scale, scale);
  const path2d = new Path2D(pathStr);
  ctx.fillStyle = color;
  ctx.fill(path2d);
  ctx.restore();
}

function createNodeTexture(node: NodeConfig, w: number, h: number): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, w, h);

  const color = node.color;
  const bgColor = `${color}12`;
  const borderColor = `${color}60`;

  const r = 8;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(w - r, 0);
  ctx.quadraticCurveTo(w, 0, w, r);
  ctx.lineTo(w, h - r);
  ctx.quadraticCurveTo(w, h, w - r, h);
  ctx.lineTo(r, h);
  ctx.quadraticCurveTo(0, h, 0, h - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();

  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const iconSize = h * 0.52;
  const iconCx = h * 0.55;
  const iconCy = h / 2;

  if (node.customIcon) {
    node.customIcon(ctx, iconCx, iconCy, iconSize, color);
  } else if (node.iconPath && node.iconViewBox) {
    drawSvgPath(ctx, node.iconPath, iconCx, iconCy, iconSize, node.iconViewBox, color);
  }

  const textX = iconCx + iconSize * 0.55 + 8;
  ctx.font = "bold 22px Inter, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(node.label, textX, h / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createCoreTexture(w: number, h: number): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) / 2 - 8;

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grd.addColorStop(0, `${CORE_COLOR}60`);
  grd.addColorStop(0.6, `${CORE_COLOR}25`);
  grd.addColorStop(1, `${CORE_COLOR}08`);

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  ctx.strokeStyle = `${CORE_COLOR}90`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = "bold 64px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("KIO", cx, cy);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface PulseData {
  t: number;
  speed: number;
  curve: THREE.QuadraticBezierCurve3;
  mesh: THREE.Mesh;
}

function Canvas2DFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    interface FallbackNode {
      label: string;
      color: string;
      x: number;
      y: number;
      config: NodeConfig;
    }

    interface FallbackPulse {
      t: number;
      speed: number;
      nodeIdx: number;
    }

    let nodes: FallbackNode[] = [];
    let pulses: FallbackPulse[] = [];
    let coreX = 0;
    let coreY = 0;

    const setupLayout = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const isMobile = w < 768;

      coreX = w / 2;
      coreY = h * 0.6;

      const leftList = isMobile ? LEFT_NODES.slice(0, 5) : LEFT_NODES;
      const rightList = isMobile ? RIGHT_NODES.slice(0, 3) : RIGHT_NODES;

      const leftX = w * 0.08;
      const rightX = w * 0.92;
      const startY = h * 0.12;
      const spacingL = (h * 0.76) / Math.max(leftList.length - 1, 1);
      const spacingR = (h * 0.76) / Math.max(rightList.length - 1, 1);

      nodes = [];
      leftList.forEach((n, i) => {
        nodes.push({ label: n.label, color: n.color, x: leftX, y: startY + i * spacingL, config: n });
      });
      rightList.forEach((n, i) => {
        nodes.push({ label: n.label, color: n.color, x: rightX, y: startY + i * spacingR, config: n });
      });

      pulses = [];
      if (!prefersReduced) {
        nodes.forEach((_, idx) => {
          pulses.push({ t: Math.random(), speed: 0.15 + Math.random() * 0.1, nodeIdx: idx });
        });
      }
    };
    setupLayout();

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((node) => {
        const cpX = (node.x + coreX) / 2;
        const cpY = node.y + (coreY - node.y) * 0.3;

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.quadraticCurveTo(cpX, cpY, coreX, coreY);
        ctx.strokeStyle = node.color === LEFT_COLOR ? `${LEFT_COLOR}25` : `${RIGHT_COLOR}30`;
        ctx.lineWidth = node.color === LEFT_COLOR ? 1 : 1.5;
        ctx.stroke();
      });

      if (!prefersReduced) {
        pulses.forEach((pulse) => {
          pulse.t += pulse.speed * 0.016;
          if (pulse.t > 1) pulse.t -= 1;

          const node = nodes[pulse.nodeIdx];
          const cpX = (node.x + coreX) / 2;
          const cpY = node.y + (coreY - node.y) * 0.3;

          const tt = pulse.t;
          const px = (1 - tt) * (1 - tt) * node.x + 2 * (1 - tt) * tt * cpX + tt * tt * coreX;
          const py = (1 - tt) * (1 - tt) * node.y + 2 * (1 - tt) * tt * cpY + tt * tt * coreY;

          let opacity = 0.8;
          if (tt < 0.1) opacity = tt / 0.1;
          else if (tt > 0.85) opacity = (1 - tt) / 0.15;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }

      nodes.forEach((node) => {
        const iconSize = 16;
        const textWidth = ctx.measureText(node.label).width;
        const tw = iconSize + 8 + textWidth + 20;
        const th = 26;
        const rx = node.x - tw / 2;
        const ry = node.y - th / 2;

        ctx.fillStyle = `${node.color}12`;
        ctx.strokeStyle = `${node.color}60`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(rx, ry, tw, th, 4);
        ctx.fill();
        ctx.stroke();

        const iconCx = rx + 10 + iconSize / 2;
        if (node.config.customIcon) {
          node.config.customIcon(ctx, iconCx, node.y, iconSize, node.color);
        } else if (node.config.iconPath && node.config.iconViewBox) {
          drawSvgPath(ctx, node.config.iconPath, iconCx, node.y, iconSize, node.config.iconViewBox, node.color);
        }

        ctx.font = "bold 11px Inter, system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = node.color;
        ctx.fillText(node.label, iconCx + iconSize / 2 + 6, node.y);
      });

      const coreRadius = 40;
      const grd = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, coreRadius);
      grd.addColorStop(0, `${CORE_COLOR}50`);
      grd.addColorStop(0.7, `${CORE_COLOR}20`);
      grd.addColorStop(1, `${CORE_COLOR}05`);
      ctx.beginPath();
      ctx.arc(coreX, coreY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.strokeStyle = `${CORE_COLOR}70`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 18px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("KIO", coreX, coreY);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      data-testid="hero-animation-canvas"
    />
  );
}

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const pulsesRef = useRef<PulseData[]>([]);
  const coreRingRef = useRef<THREE.Mesh | null>(null);
  const outputLineRef = useRef<THREE.Mesh | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const isMobileRef = useRef(false);
  const curvesRef = useRef<THREE.QuadraticBezierCurve3[]>([]);
  const cableMeshesRef = useRef<THREE.Line[]>([]);
  const [webglAvailable, setWebglAvailable] = useState(true);

  const getLayout = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    isMobileRef.current = isMobile;

    const aspect = width / height;
    const viewH = 10;
    const viewW = viewH * aspect;

    const coreX = 0;
    const coreY = isMobile ? -2.5 : -2.5;

    const leftNodes = isMobile
      ? LEFT_NODES.slice(0, 5)
      : LEFT_NODES;
    const rightNodes = isMobile
      ? RIGHT_NODES.slice(0, 3)
      : RIGHT_NODES;

    const leftX = isMobile ? -viewW * 0.38 : -viewW * 0.42;
    const rightX = isMobile ? viewW * 0.38 : viewW * 0.42;

    const leftStartY = coreY + (leftNodes.length - 1) * 0.75;
    const rightStartY = coreY + (rightNodes.length - 1) * 0.75;

    const leftPositioned: NodeDef[] = leftNodes.map((n, i) => ({
      ...n,
      x: leftX,
      y: leftStartY - i * 1.5,
      side: "left" as const,
    }));

    const rightPositioned: NodeDef[] = rightNodes.map((n, i) => ({
      ...n,
      x: rightX,
      y: rightStartY - i * 1.5,
      side: "right" as const,
    }));

    return { viewW, viewH, coreX, coreY, leftPositioned, rightPositioned, isMobile };
  }, []);

  const prefersReduced = useRef(false);

  const init = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      setWebglAvailable(false);
      return;
    }

    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = container.clientWidth;
    const h = container.clientHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglAvailable(false);
      return;
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(BG_COLOR), 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const layout = getLayout(w, h);
    const { viewW, viewH, coreX, coreY, leftPositioned, rightPositioned } = layout;

    const camera = new THREE.OrthographicCamera(
      -viewW / 2, viewW / 2,
      viewH / 2, -viewH / 2,
      0.1, 100
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    const coreTex = createCoreTexture(256, 256);
    const coreSize = layout.isMobile ? 1.8 : 2.2;
    const coreMat = new THREE.SpriteMaterial({ map: coreTex, transparent: true });
    const coreSprite = new THREE.Sprite(coreMat);
    coreSprite.position.set(coreX, coreY, 0);
    coreSprite.scale.set(coreSize, coreSize, 1);
    scene.add(coreSprite);

    const ringGeo = new THREE.RingGeometry(0.55, 0.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(CORE_COLOR),
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(coreX, coreY, 0.1);
    scene.add(ring);
    coreRingRef.current = ring;

    const outputGeo = new THREE.PlaneGeometry(0.03, 2.5);
    const outputMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
    });
    const outputLine = new THREE.Mesh(outputGeo, outputMat);
    outputLine.position.set(coreX, coreY + 2.2, 0.1);
    scene.add(outputLine);
    outputLineRef.current = outputLine;

    const curves: THREE.QuadraticBezierCurve3[] = [];
    const cables: THREE.Line[] = [];

    const allNodes = [...leftPositioned, ...rightPositioned];
    const nodeScale = layout.isMobile ? 0.7 : 0.85;

    allNodes.forEach((node) => {
      const nodeConfig = [...LEFT_NODES, ...RIGHT_NODES].find(n => n.label === node.label)!;
      const tex = createNodeTexture(nodeConfig, 320, 72);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(node.x, node.y, 0);
      sprite.scale.set(2.8 * nodeScale, 0.63 * nodeScale, 1);
      scene.add(sprite);

      const cpX = node.x + (coreX - node.x) * 0.5;
      const cpY = node.y + (coreY - node.y) * 0.3;

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(node.x, node.y, 0),
        new THREE.Vector3(cpX, cpY, 0),
        new THREE.Vector3(coreX, coreY, 0)
      );
      curves.push(curve);

      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineColor = node.side === "left" ? LEFT_COLOR : RIGHT_COLOR;
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: node.side === "left" ? 0.15 : 0.2,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      cables.push(line);
    });

    curvesRef.current = curves;
    cableMeshesRef.current = cables;

    if (!prefersReduced.current) {
      const pulseGeo = new THREE.CircleGeometry(0.06, 16);

      allNodes.forEach((node, idx) => {
        const baseSpeed = node.side === "left" ? 0.4 : 0.28;
        const numPulses = node.side === "left" ? 2 : 1;

        for (let p = 0; p < numPulses; p++) {
          const pulseMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(node.color),
            transparent: true,
            opacity: 0.9,
          });
          const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
          pulseMesh.position.z = 0.2;
          scene.add(pulseMesh);

          pulsesRef.current.push({
            t: p * 0.5,
            speed: baseSpeed + Math.random() * 0.08,
            curve: curves[idx],
            mesh: pulseMesh,
          });
        }
      });
    }
  }, [getLayout]);

  const isAnimatingRef = useRef(false);

  const animate = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    const elapsed = clockRef.current.getElapsedTime();

    if (coreRingRef.current && !prefersReduced.current) {
      coreRingRef.current.rotation.z = elapsed * 0.3;
      const scale = 1 + Math.sin(elapsed * 1.2) * 0.06;
      coreRingRef.current.scale.set(scale, scale, 1);
    }

    if (outputLineRef.current && !prefersReduced.current) {
      const mat = outputLineRef.current.material as THREE.MeshBasicMaterial;
      const cycle = (elapsed % 10) / 10;
      if (cycle > 0.5 && cycle < 0.8) {
        const progress = (cycle - 0.5) / 0.3;
        mat.opacity = Math.sin(progress * Math.PI) * 0.4;
      } else {
        mat.opacity = 0;
      }
    }

    pulsesRef.current.forEach((pulse) => {
      pulse.t += pulse.speed * 0.016;
      if (pulse.t > 1) pulse.t -= 1;

      const pos = pulse.curve.getPoint(pulse.t);
      pulse.mesh.position.set(pos.x, pos.y, 0.2);

      const mat = pulse.mesh.material as THREE.MeshBasicMaterial;
      if (pulse.t < 0.1) {
        mat.opacity = pulse.t / 0.1;
      } else if (pulse.t > 0.85) {
        mat.opacity = (1 - pulse.t) / 0.15;
      } else {
        mat.opacity = 0.85;
      }
    });

    renderer.render(scene, camera);
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    init();

    const handleResize = () => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      if (!container || !renderer || !camera) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);

      const layout = getLayout(w, h);
      camera.left = -layout.viewW / 2;
      camera.right = layout.viewW / 2;
      camera.top = layout.viewH / 2;
      camera.bottom = -layout.viewH / 2;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animFrameRef.current = requestAnimationFrame(animate);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        isAnimatingRef.current = false;
        cancelAnimationFrame(animFrameRef.current);
      } else if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        clockRef.current.start();
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      isAnimatingRef.current = false;
      cancelAnimationFrame(animFrameRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
            obj.geometry?.dispose();
            if (obj.material instanceof THREE.Material) {
              obj.material.dispose();
            }
          }
          if (obj instanceof THREE.Sprite) {
            obj.material.map?.dispose();
            obj.material.dispose();
          }
        });
      }
      pulsesRef.current = [];
    };
  }, [init, animate, getLayout]);

  if (!webglAvailable) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
        data-testid="hero-animation"
      >
        <Canvas2DFallback />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      data-testid="hero-animation"
    />
  );
}
